/**
 * Deep Thought connector for Claude (MCP server), added 2026-10-25.
 * POST /mcp — the Model Context Protocol over "Streamable HTTP", stateless, JSON responses.
 *
 * A Claude user adds https://<worker>/mcp as a custom connector (Settings → Connectors) and signs in with
 * a free Deep Thought account (auth.js: name, phone, email + email code). Claude can then call:
 *   - build_media_plan       the same plan engine as deepthought.marketing/digital-media-plan-builder.html
 *                            (plan.js: Claude picks, this code enforces minimums, splits dollars, strips prices).
 *                            The plan is also emailed to the user, with a copy to PLAN_NOTIFY_TO.
 *   - list_channels          the 22 channels Deep Thought runs, with minimum monthly budgets
 *   - request_campaign_setup the user said yes to "set up this campaign?": sends the lead (with their last plan)
 *                            to the leads sheet + email, and returns the AdOps.rocks sign-up link (ADOPS_SIGNUP_URL)
 *
 * Rules: v1 (2026-10-25, morning) was recommendations only with no logins. Changed the same day (Shajan) to
 * lead gen: accounts required, plans end by offering campaign setup. Still never touches ad accounts or money.
 * Each plan is logged in CHAT_LOG for 90 days (key m:...), and the user's last plan under ol:<email> for 30 days.
 *
 * Guards: MCP_DAILY_LIMIT plans per day across all users (default 200; KV counter), and a per-IP burst
 * limit. Calls come from Anthropic's servers, so the IP limit is generous on purpose.
 */
import { CHANNELS, pricing } from "./catalog.js";
import { OPTIONS, LOW_BUDGET, readBudget, parsePlan, publicPlan, forecastText, askClaude, rewritePlan, planEmailHtml, resend } from "./plan.js";
import { userFromRequest, unauthorized } from "./auth.js";

const SUPPORTED = ["2025-06-18", "2025-03-26", "2024-11-05"];
const SERVER = { name: "deep-thought", title: "Deep Thought Marketing", version: "1.0.0" };
const PHONE = "770-299-9583";

const INSTRUCTIONS = `Deep Thought (deepthought.marketing) is a done-for-you digital marketing service for small and local businesses, based in Gwinnett County, GA, serving clients nationwide. Use build_media_plan when someone wants advice on where to advertise or how to split an ad budget. Ask for anything required that the person hasn't given (what the business does, town or ZIP, goal, monthly ad budget in dollars) before calling it. Present the plan in plain English. Plans are starting suggestions and estimates, not quotes or promises of results. After showing a plan, ask the person if they'd like Deep Thought to set up the campaign. If they say yes, call request_campaign_setup and give them the sign-up link it returns.`;

const money = (n) => "$" + Math.round(n).toLocaleString("en-US");
const article = (w) => (/^(hvac|[aeio]|u(?!ni|s[eu]))/i.test(String(w).trim()) ? "An" : "A");
const s = (v, max = 120) => String(v ?? "").replace(/[\u0000-\u001f]+/g, " ").trim().slice(0, max);

const TOOLS = [
  {
    name: "build_media_plan",
    title: "Build a free digital media plan",
    description: "Builds a starting digital advertising plan for a small or local business: which channels to use (from the 22 Deep Thought runs, such as Google search ads, Local Services Ads, Facebook and Instagram, Nextdoor, YouTube, streaming TV), how to split the monthly ad budget in dollars, estimated reach where it can be forecast, first-month steps and numbers to watch. Enforces each channel's minimum budget. Free for signed-in users; the plan is also emailed to them. Takes about 10 to 20 seconds.",
    inputSchema: {
      type: "object",
      properties: {
        business_type: { type: "string", description: "What the business does, e.g. 'HVAC', 'dental practice', 'Italian restaurant', 'online store selling candles'." },
        location: { type: "string", description: "Town, city or ZIP code the business serves, e.g. 'Lawrenceville, GA' or '30043'." },
        monthly_budget: { type: "number", description: "Monthly ad budget in US dollars, e.g. 1500." },
        goal: { type: "string", enum: OPTIONS.goal, description: "The main result they want." },
        service_area: { type: "string", enum: OPTIONS.radius, description: "How far they serve customers. Defaults to 'About 25 miles'." },
        currently_running: { type: "array", items: { type: "string", enum: OPTIONS.current }, description: "Marketing they run today, if known." },
        business_name: { type: "string", description: "Optional business name. Defaults to the one on their Deep Thought account." },
        notes: { type: "string", description: "Optional extra context: seasonality, ideal customers, services to push, what hasn't worked." },
      },
      required: ["business_type", "location", "monthly_budget", "goal"],
      additionalProperties: false,
    },
    annotations: { title: "Build a free digital media plan", readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
  },
  {
    name: "list_channels",
    title: "List the advertising channels Deep Thought runs",
    description: "Lists the 22 advertising channels Deep Thought plans and runs for small businesses, with what each is best for and its minimum monthly ad budget.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { title: "List advertising channels", readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  {
    name: "request_campaign_setup",
    title: "Get this campaign set up by Deep Thought",
    description: "Call this only when the person says yes to having Deep Thought set up their campaign. It lets the Deep Thought team know (with the person's account details and their latest plan) and returns the link to create their account and set up the campaign. It does not charge anything or launch ads.",
    inputSchema: {
      type: "object",
      properties: {
        notes: { type: "string", description: "Optional: anything they said about timing, changes to the plan, or the best time to reach them." },
      },
      additionalProperties: false,
    },
    annotations: { title: "Request campaign setup", readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
  },
];

/* ---------- guards ---------- */
const BURST = { limit: 30, windowMs: 10 * 60 * 1000 };
const hits = new Map();
function burst(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < BURST.windowMs);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > BURST.limit;
}
const dayKey = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date()).replace(/-/g, "");
async function overDailyLimit(env) {
  if (!env.CHAT_LOG) return false;
  const limit = Number(env.MCP_DAILY_LIMIT || 200);
  const k = `mcpcount:${dayKey()}`;
  const n = Number((await env.CHAT_LOG.get(k)) || 0);
  if (n >= limit) return true;
  await env.CHAT_LOG.put(k, String(n + 1), { expirationTtl: 3 * 24 * 3600 });
  return false;
}

/* ---------- tool bodies ---------- */
export function readPlanArgs(a, user = {}) {
  a = a && typeof a === "object" ? a : {};
  const goal = OPTIONS.goal.includes(a.goal) ? a.goal : "";
  const radius = OPTIONS.radius.includes(a.service_area) ? a.service_area : "About 25 miles";
  const input = {
    business: s(a.business_name, 100) || s(user.business, 100) || `${article(s(a.business_type, 60))} ${s(a.business_type, 60)} business`,
    name: s(user.name, 80), phone: s(user.phone, 20), email: s(user.email, 120),
    trade: s(a.business_type, 80),
    location: s(a.location, 80),
    radius, goal,
    budget: readBudget(a.monthly_budget),
    current: (Array.isArray(a.currently_running) ? a.currently_running : []).filter((x) => OPTIONS.current.includes(x)).slice(0, 8),
    notes: s(a.notes, 400),
  };
  if (!input.trade) return { error: "Please say what the business does (business_type)." };
  if (!input.location) return { error: "Please give the town, city or ZIP code the business serves (location)." };
  if (!input.goal) return { error: `Please pick the main goal (goal), one of: ${OPTIONS.goal.join("; ")}.` };
  if (!input.budget) return { error: "Please give the monthly ad budget in US dollars (monthly_budget)." };
  if (input.budget > 5000000) return { error: "Please check the monthly ad budget." };
  return { input };
}

export function planMarkdown(plan, input) {
  const lines = [`# Digital media plan: ${input.business}`, "", plan.headline, ""];
  if (plan.channels.length) {
    lines.push(`## How to split ${money(plan.budget)} a month`, "");
    for (const c of plan.channels) {
      lines.push(`**${c.name}: ${money(c.dollars)}/mo (${c.share}%)**`);
      const f = forecastText(c);
      if (f) lines.push(f + ".");
      lines.push(c.why, "");
    }
  }
  if (plan.firstMonth.length) lines.push("## Your first month", ...plan.firstMonth.map((x, i) => `${i + 1}. ${x}`), "");
  if (plan.watch.length) lines.push("## Numbers to watch", ...plan.watch.map((x) => `- ${x}`), "");
  if (plan.note) lines.push(`> ${plan.note}`, "");
  lines.push(
    "**Would you like Deep Thought to set up this campaign for you?** Just say yes and I'll get it started.",
    "",
    "_This plan is a starting suggestion based on the answers given, made with the help of AI. Forecasts are estimates, not guarantees, and this is not a quote or a promise of results._",
  );
  return lines.join("\n");
}

async function buildMediaPlan(args, env, ctx, key, user) {
  const r = readPlanArgs(args, user);
  if (r.error) return toolError(r.error);
  if (!key) return toolError(`The plan builder isn't available right now. You can build a plan at https://deepthought.marketing/digital-media-plan-builder.html or call ${PHONE}.`);
  if (await overDailyLimit(env)) return toolError(`Deep Thought's plan builder has hit its limit for today. Please try again tomorrow, use https://deepthought.marketing/digital-media-plan-builder.html, or call ${PHONE}.`);
  const { input } = r;
  const price = pricing(env);
  let plan;
  try {
    try { plan = parsePlan(await askClaude(env, key, price, input), input.budget, price); }
    catch (e) { console.error("mcp plan retry", e.message); plan = parsePlan(await askClaude(env, key, price, input, "\n\n(Reply with valid JSON only, using exact channel ids from the list.)"), input.budget, price); }
  } catch (e) {
    console.error("mcp plan", e.message);
    return toolError(`Couldn't build the plan just now. Please try again in a minute, or call ${PHONE}.`);
  }
  if (plan.changed) {
    try { plan = await rewritePlan(env, key, input, plan); }
    catch (e) { console.error("mcp plan rewrite", e.message); plan = { ...plan, firstMonth: [], watch: [] }; }
  }
  const pub = publicPlan(plan);
  const site = env.SITE || "https://deepthought.marketing";
  const at = new Date().toISOString();
  const work = [];
  if (env.CHAT_LOG) {
    work.push(env.CHAT_LOG.put(`m:${dayKey()}-${Math.random().toString(36).slice(2, 12)}`, JSON.stringify({ at, source: "claude-connector", input, plan }), { expirationTtl: 90 * 24 * 3600 }));
    if (input.email) work.push(env.CHAT_LOG.put(`ol:${input.email}`, JSON.stringify({ at, input, plan }), { expirationTtl: 30 * 24 * 3600 }));
  }
  const from = env.PLAN_FROM || "Deep Thought Marketing <plans@deepthought.marketing>";
  const replyTo = env.PLAN_REPLY_TO || "shajan@deepthought.marketing";
  if (input.email) work.push(resend(env, { from, to: [input.email], reply_to: replyTo, subject: `Your digital media plan for ${input.business}`, html: planEmailHtml(pub, input, site) }));
  const notify = (env.PLAN_NOTIFY_TO || env.DIGEST_TO || "").split(",").map((x) => x.trim()).filter(Boolean);
  if (notify.length) work.push(resend(env, { from, to: notify, reply_to: input.email || replyTo, subject: `New media plan (Claude connector): ${input.business} (${input.trade}, ${input.location})`, html: planEmailHtml(plan, input, site, true) }));
  ctx.waitUntil(Promise.all(work.map((p) => Promise.resolve(p).catch((e) => console.error("mcp plan side", e.message)))));
  return {
    content: [{ type: "text", text: planMarkdown(pub, input) }],
    structuredContent: { ...pub, emailedTo: input.email || null, nextStep: "Ask if they'd like Deep Thought to set up this campaign; if yes, call request_campaign_setup." },
  };
}

function listChannels(env) {
  const price = pricing(env);
  const rows = CHANNELS.map((c) => ({ id: c.id, name: c.name, minimumMonthlyBudget: (price[c.id] && price[c.id].min) || null, bestFor: c.desc }));
  const text = [`Deep Thought plans and runs these ${rows.length} channels. Budgets under ${money(LOW_BUDGET)} a month get one channel only.`, "",
    ...rows.map((r) => `- **${r.name}**${r.minimumMonthlyBudget ? ` (minimum ${money(r.minimumMonthlyBudget)}/mo)` : ""}: ${r.bestFor}`)].join("\n");
  return { content: [{ type: "text", text }], structuredContent: { channels: rows } };
}

async function campaignSetup(args, env, ctx, user) {
  const signup = env.ADOPS_SIGNUP_URL || "https://deepthought.adops.rocks/";
  const notes = s(args && args.notes, 400);
  const last = env.CHAT_LOG && user.email ? await env.CHAT_LOG.get(`ol:${user.email}`, "json").catch(() => null) : null;
  const plan = last && last.plan;
  const mix = plan && plan.channels && plan.channels.length ? plan.channels.map((c) => `${c.name} ${money(c.dollars)}`).join(", ") : "";
  const what = last ? `${last.input.business} (${last.input.trade}, ${last.input.location}; ${money(last.input.budget)}/mo${mix ? ": " + mix : ""})` : (user.business || "(no plan on file)");
  const work = [];
  if (env.LEADS_ENDPOINT) {
    const body = new URLSearchParams({ name: user.name || "", phone: user.phone || "", email: user.email || "",
      business: `WANTS CAMPAIGN SETUP: ${what}${notes ? " | notes: " + notes : ""}`.slice(0, 290),
      page: "/mcp", place: "claude-setup", utm: "{}", referrer: "", source: "Claude connector", first_source: "Claude connector",
      first_page: "/mcp", first_seen: "", timezone: "", language: "" });
    work.push(fetch(env.LEADS_ENDPOINT, { method: "POST", body }).then((x) => console.log("connector setup lead", x.status)));
  }
  const notify = (env.PLAN_NOTIFY_TO || env.DIGEST_TO || "").split(",").map((x) => x.trim()).filter(Boolean);
  if (notify.length) {
    const site = env.SITE || "https://deepthought.marketing";
    const head = `<p><b>${esc(user.name)}</b> asked Deep Thought to set up their campaign (Claude connector).</p><p>Phone: ${esc(user.phone)}<br>Email: ${esc(user.email)}${notes ? `<br>Notes: ${esc(notes)}` : ""}</p>`;
    work.push(resend(env, { from: env.PLAN_FROM || "Deep Thought Marketing <plans@deepthought.marketing>", to: notify, reply_to: user.email || undefined,
      subject: `Campaign setup request: ${last ? last.input.business : user.name}`,
      html: head + (last ? planEmailHtml(plan, last.input, site, true) : "<p>No plan on file for this user.</p>") }));
  }
  ctx.waitUntil(Promise.all(work.map((p) => Promise.resolve(p).catch((e) => console.error("mcp setup side", e.message)))));
  const out = { signupUrl: signup, phone: PHONE, notified: true,
    whatHappens: "The Deep Thought team has your details and your plan. Create your account to set up the campaign; a person from Deep Thought will also follow up with you." };
  const text = `Done. The Deep Thought team has your details${last ? " and your plan" : ""}.\n\nNext step: create your Deep Thought account to set up the campaign: ${signup}\n\nA person from Deep Thought will also follow up with you. Questions? Call ${PHONE}.`;
  return { content: [{ type: "text", text }], structuredContent: out };
}
const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

const toolError = (msg) => ({ content: [{ type: "text", text: msg }], isError: true });

/* ---------- JSON-RPC / MCP plumbing ---------- */
const rpcResult = (id, result) => ({ jsonrpc: "2.0", id, result });
const rpcError = (id, code, message) => ({ jsonrpc: "2.0", id: id ?? null, error: { code, message } });

async function handleOne(msg, env, ctx, key, user) {
  if (!msg || msg.jsonrpc !== "2.0" || typeof msg.method !== "string") return rpcError(msg && msg.id, -32600, "Invalid Request");
  const isNote = !("id" in msg);
  const { id, method, params = {} } = msg;
  if (isNote) return null; // notifications/initialized, notifications/cancelled, ...
  switch (method) {
    case "initialize": {
      const want = params.protocolVersion;
      return rpcResult(id, {
        protocolVersion: SUPPORTED.includes(want) ? want : SUPPORTED[0],
        capabilities: { tools: { listChanged: false } },
        serverInfo: SERVER,
        instructions: INSTRUCTIONS,
      });
    }
    case "ping": return rpcResult(id, {});
    case "tools/list": return rpcResult(id, { tools: TOOLS });
    case "tools/call": {
      const name = params.name, args = params.arguments || {};
      try {
        if (name === "build_media_plan") return rpcResult(id, await buildMediaPlan(args, env, ctx, key, user));
        if (name === "list_channels") return rpcResult(id, listChannels(env));
        if (name === "request_campaign_setup") return rpcResult(id, await campaignSetup(args, env, ctx, user));
        return rpcError(id, -32602, `Unknown tool: ${name}`);
      } catch (e) {
        console.error("mcp tool", name, e.message);
        return rpcResult(id, toolError(`Something went wrong. Please try again, or call ${PHONE}.`));
      }
    }
    case "resources/list": return rpcResult(id, { resources: [] });
    case "prompts/list": return rpcResult(id, { prompts: [] });
    default: return rpcError(id, -32601, `Method not found: ${method}`);
  }
}

/** The /mcp route. `key` is the Anthropic key (worker.js apiKey()). */
export async function handleMcp(request, env, ctx, key) {
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Access-Control-Expose-Headers": "WWW-Authenticate", "Cache-Control": "no-store" };
  if (request.method === "GET" || request.method === "DELETE") return new Response(null, { status: 405, headers: { Allow: "POST" } });
  if (request.method !== "POST") return new Response(null, { status: 405, headers: { Allow: "POST" } });
  const user = await userFromRequest(request, env);
  if (!user) return unauthorized(new URL(request.url).origin);
  if (burst(request.headers.get("CF-Connecting-IP") || "unknown"))
    return new Response(JSON.stringify(rpcError(null, -32000, "Too many requests. Please try again in a few minutes.")), { status: 429, headers });
  let body;
  try { body = await request.json(); } catch { return new Response(JSON.stringify(rpcError(null, -32700, "Parse error")), { status: 400, headers }); }
  if (Array.isArray(body)) {
    const out = (await Promise.all(body.map((m) => handleOne(m, env, ctx, key, user)))).filter(Boolean);
    return out.length ? new Response(JSON.stringify(out), { status: 200, headers }) : new Response(null, { status: 202, headers });
  }
  const out = await handleOne(body, env, ctx, key, user);
  return out ? new Response(JSON.stringify(out), { status: 200, headers }) : new Response(null, { status: 202, headers });
}
