/**
 * Deep Thought connector for Claude (MCP server), added 2026-10-25.
 * POST /mcp — the Model Context Protocol over "Streamable HTTP", stateless, JSON responses.
 *
 * A Claude user adds https://<worker>/mcp as a custom connector (Settings → Connectors). Claude can
 * then call three read-only tools:
 *   - build_media_plan       the same plan engine as deepthought.marketing/digital-media-plan-builder.html
 *                            (plan.js: Claude picks, this code enforces minimums, splits dollars, strips prices)
 *   - list_channels          the 22 channels Deep Thought runs, with minimum monthly budgets
 *   - get_free_second_opinion  how to reach a person (Second Opinion form, booking, phone)
 *
 * v1 rules (Shajan, 2026-10-25): recommendations only. No ad accounts, no money, no logins. No contact
 * details are asked for or stored; each plan is logged anonymously in CHAT_LOG for 90 days (key m:...).
 *
 * Guards: MCP_DAILY_LIMIT plans per day across all users (default 200; KV counter), and a per-IP burst
 * limit. Calls come from Anthropic's servers, so the IP limit is generous on purpose.
 */
import { CHANNELS, pricing } from "./catalog.js";
import { OPTIONS, LOW_BUDGET, readBudget, parsePlan, publicPlan, forecastText, askClaude, rewritePlan } from "./plan.js";

const SUPPORTED = ["2025-06-18", "2025-03-26", "2024-11-05"];
const SERVER = { name: "deep-thought", title: "Deep Thought Marketing", version: "1.0.0" };
const PHONE = "770-299-9583";

const INSTRUCTIONS = `Deep Thought (deepthought.marketing) is a done-for-you digital marketing service for small and local businesses, based in Gwinnett County, GA, serving clients nationwide. Use build_media_plan when someone wants advice on where to advertise or how to split an ad budget. Ask for anything required that the person hasn't given (what the business does, town or ZIP, goal, monthly ad budget in dollars) before calling it. Present the plan in plain English. Plans are starting suggestions and estimates, not quotes or promises of results. If the person wants help running the plan, use get_free_second_opinion.`;

const money = (n) => "$" + Math.round(n).toLocaleString("en-US");
const s = (v, max = 120) => String(v ?? "").replace(/[\u0000-\u001f]+/g, " ").trim().slice(0, max);

const TOOLS = [
  {
    name: "build_media_plan",
    title: "Build a free digital media plan",
    description: "Builds a starting digital advertising plan for a small or local business: which channels to use (from the 22 Deep Thought runs, such as Google search ads, Local Services Ads, Facebook and Instagram, Nextdoor, YouTube, streaming TV), how to split the monthly ad budget in dollars, estimated reach where it can be forecast, first-month steps and numbers to watch. Enforces each channel's minimum budget. Free. No contact details needed. Takes about 10 to 20 seconds.",
    inputSchema: {
      type: "object",
      properties: {
        business_type: { type: "string", description: "What the business does, e.g. 'HVAC', 'dental practice', 'Italian restaurant', 'online store selling candles'." },
        location: { type: "string", description: "Town, city or ZIP code the business serves, e.g. 'Lawrenceville, GA' or '30043'." },
        monthly_budget: { type: "number", description: "Monthly ad budget in US dollars, e.g. 1500." },
        goal: { type: "string", enum: OPTIONS.goal, description: "The main result they want." },
        service_area: { type: "string", enum: OPTIONS.radius, description: "How far they serve customers. Defaults to 'About 25 miles'." },
        currently_running: { type: "array", items: { type: "string", enum: OPTIONS.current }, description: "Marketing they run today, if known." },
        business_name: { type: "string", description: "Optional business name, used only to personalize the plan." },
        notes: { type: "string", description: "Optional extra context: seasonality, ideal customers, services to push, what hasn't worked." },
      },
      required: ["business_type", "location", "monthly_budget", "goal"],
      additionalProperties: false,
    },
    annotations: { title: "Build a free digital media plan", readOnlyHint: true, destructiveHint: false, idempotentHint: false, openWorldHint: true },
  },
  {
    name: "list_channels",
    title: "List the advertising channels Deep Thought runs",
    description: "Lists the 22 advertising channels Deep Thought plans and runs for small businesses, with what each is best for and its minimum monthly ad budget.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { title: "List advertising channels", readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  {
    name: "get_free_second_opinion",
    title: "Talk to a person at Deep Thought",
    description: "How to get a free, no-obligation Second Opinion from a person at Deep Thought: they review the plan and any ads the business runs today, then call back with a straight answer. Returns the links and phone number; it does not book anything itself.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { title: "Free Second Opinion", readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
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
export function readPlanArgs(a) {
  a = a && typeof a === "object" ? a : {};
  const goal = OPTIONS.goal.includes(a.goal) ? a.goal : "";
  const radius = OPTIONS.radius.includes(a.service_area) ? a.service_area : "About 25 miles";
  const input = {
    business: s(a.business_name, 100) || `A ${s(a.business_type, 60)} business`,
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

export function planMarkdown(plan, input, site) {
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
    `Want Deep Thought to run this? Get a free Second Opinion: a person reviews this plan and any ads you run today, then calls you back with a straight answer. ${site}/second-opinion.html or call ${PHONE}.`,
    "",
    "_This plan is a starting suggestion based on the answers given, made with the help of AI. Forecasts are estimates, not guarantees, and this is not a quote or a promise of results._",
  );
  return lines.join("\n");
}

async function buildMediaPlan(args, env, ctx, key) {
  const r = readPlanArgs(args);
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
  if (env.CHAT_LOG) {
    ctx.waitUntil(env.CHAT_LOG.put(`m:${dayKey()}-${Math.random().toString(36).slice(2, 12)}`,
      JSON.stringify({ at: new Date().toISOString(), source: "claude-connector", input, plan }), { expirationTtl: 90 * 24 * 3600 }).catch((e) => console.error("mcp log", e.message)));
  }
  return {
    content: [{ type: "text", text: planMarkdown(pub, input, site) }],
    structuredContent: { ...pub, secondOpinionUrl: `${site}/second-opinion.html`, phone: PHONE },
  };
}

function listChannels(env) {
  const price = pricing(env);
  const rows = CHANNELS.map((c) => ({ id: c.id, name: c.name, minimumMonthlyBudget: (price[c.id] && price[c.id].min) || null, bestFor: c.desc }));
  const text = [`Deep Thought plans and runs these ${rows.length} channels. Budgets under ${money(LOW_BUDGET)} a month get one channel only.`, "",
    ...rows.map((r) => `- **${r.name}**${r.minimumMonthlyBudget ? ` (minimum ${money(r.minimumMonthlyBudget)}/mo)` : ""}: ${r.bestFor}`)].join("\n");
  return { content: [{ type: "text", text }], structuredContent: { channels: rows } };
}

function secondOpinion(env) {
  const site = env.SITE || "https://deepthought.marketing";
  const out = {
    secondOpinionUrl: `${site}/second-opinion.html`,
    bookingUrl: `${site}/book-a-demo.html`,
    phone: PHONE,
    whatHappens: "A person at Deep Thought reviews your plan and any ads you run today, then calls you back with a straight answer. Free, no obligation.",
  };
  const text = `${out.whatHappens}\n\n- Free Second Opinion form: ${out.secondOpinionUrl}\n- Book a call: ${out.bookingUrl}\n- Call: ${PHONE}`;
  return { content: [{ type: "text", text }], structuredContent: out };
}

const toolError = (msg) => ({ content: [{ type: "text", text: msg }], isError: true });

/* ---------- JSON-RPC / MCP plumbing ---------- */
const rpcResult = (id, result) => ({ jsonrpc: "2.0", id, result });
const rpcError = (id, code, message) => ({ jsonrpc: "2.0", id: id ?? null, error: { code, message } });

async function handleOne(msg, env, ctx, key) {
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
        if (name === "build_media_plan") return rpcResult(id, await buildMediaPlan(args, env, ctx, key));
        if (name === "list_channels") return rpcResult(id, listChannels(env));
        if (name === "get_free_second_opinion") return rpcResult(id, secondOpinion(env));
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
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Cache-Control": "no-store" };
  if (request.method === "GET" || request.method === "DELETE") return new Response(null, { status: 405, headers: { Allow: "POST" } });
  if (request.method !== "POST") return new Response(null, { status: 405, headers: { Allow: "POST" } });
  if (burst(request.headers.get("CF-Connecting-IP") || "unknown"))
    return new Response(JSON.stringify(rpcError(null, -32000, "Too many requests. Please try again in a few minutes.")), { status: 429, headers });
  let body;
  try { body = await request.json(); } catch { return new Response(JSON.stringify(rpcError(null, -32700, "Parse error")), { status: 400, headers }); }
  if (Array.isArray(body)) {
    const out = (await Promise.all(body.map((m) => handleOne(m, env, ctx, key)))).filter(Boolean);
    return out.length ? new Response(JSON.stringify(out), { status: 200, headers }) : new Response(null, { status: 202, headers });
  }
  const out = await handleOne(body, env, ctx, key);
  return out ? new Response(JSON.stringify(out), { status: 200, headers }) : new Response(null, { status: 202, headers });
}
