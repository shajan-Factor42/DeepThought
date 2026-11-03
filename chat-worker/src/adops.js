/**
 * AdOps.rocks link for the Claude connector, added 2026-11-03 (growth/CMO chat).
 *
 * Deep Thought logins live on AdOps.rocks (deepthought.adops.rocks). When the CONNECTOR_SHARED_SECRET and
 * CONNECTOR_API_KEY Worker secrets are set, the connector signs people in there (auth.js -> /connect/claude ->
 * /oauth/callback) and these tools let them run campaigns from Claude.
 *
 * Rule (Shajan): a person on the Deep Thought team approves everything before it goes live. The only
 * instant action is pausing. No tool here launches a campaign, raises a budget or charges a card.
 *
 * API (AdOps.rocks, base ADOPS_API_BASE): Authorization: Bearer CONNECTOR_API_KEY + X-User-Id: <AdOps user id>.
 *   GET /me, POST /orders, GET /orders, GET /orders/{id}, GET /orders/{id}/report,
 *   POST /orders/{id}/change-requests, POST /orders/{id}/pause, POST /billing/setup-session
 * Response shapes are read loosely (id or order_id, url or checkout_url, ...) until we have samples.
 */
import { CHANNELS } from "./catalog.js";

const PHONE = "770-299-9583";
const CHANNEL_IDS = CHANNELS.map((c) => c.id);
const CHANNEL_NAME = Object.fromEntries(CHANNELS.map((c) => [c.id, c.name]));
const STATUSES = { awaiting_review: "Waiting for team review", needs_info: "Needs something from you", approved: "Approved, getting ready to launch",
  live: "Live", paused: "Paused", pause_pending: "Pausing (the team is on it)", ended: "Ended", declined: "Declined" };
const CHANGE_TYPES = ["resume", "budget_change", "channel_change", "creative_change", "other"];
const s = (v, max = 120) => String(v ?? "").replace(/[\u0000-\u001f]+/g, " ").trim().slice(0, max);
const money = (n) => "$" + Math.round(Number(n) || 0).toLocaleString("en-US");
const ymd = (d) => d.toISOString().slice(0, 10);
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export const adopsOn = (env) => !!(env.CONNECTOR_SHARED_SECRET && env.CONNECTOR_API_KEY);
const review = (env) => env.REVIEW_TARGET || "1 business day";

/* ---------- API client ---------- */
class ApiError extends Error { constructor(status, msg) { super(msg); this.status = status; } }
async function api(env, user, method, path, body, extraHeaders = {}) {
  const base = (env.ADOPS_API_BASE || "https://deepthought.adops.rocks/api/connector/").replace(/\/?$/, "/");
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 20000);
  let r;
  try {
    r = await fetch(base + path.replace(/^\//, ""), {
      method, signal: ctrl.signal,
      headers: { Authorization: `Bearer ${env.CONNECTOR_API_KEY}`, "X-User-Id": String(user.uid), "X-Source": "claude",
        Accept: "application/json", ...(body ? { "Content-Type": "application/json" } : {}), ...extraHeaders },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (e) {
    console.error("adops", method, path, e.name, e.message);
    throw new ApiError(0, `Deep Thought's campaign system didn't answer just now. Please try again in a minute, or call ${PHONE}.`);
  } finally { clearTimeout(timer); }
  const text = await r.text();
  let data = null; try { data = text ? JSON.parse(text) : {}; } catch { data = null; }
  if (!r.ok) {
    console.error("adops", method, path, r.status, text.slice(0, 300));
    if (r.status === 401 || r.status === 403) throw new ApiError(r.status, "Your Deep Thought account isn't connected anymore. In Claude, open Settings → Connectors, disconnect Deep Thought and connect it again.");
    if (r.status === 404) throw new ApiError(404, (data && data.error) || "We couldn't find that campaign on your account. Ask me to list your campaigns to see the right one.");
    throw new ApiError(r.status, (data && data.error) || `Something went wrong on our side. Please try again, or call ${PHONE}.`);
  }
  if (data === null) throw new ApiError(502, `Deep Thought's campaign system sent an answer we couldn't read. Please try again, or call ${PHONE}.`);
  return data;
}
const orderId = (o) => o && (o.id ?? o.order_id ?? o.orderId ?? o.uuid ?? (o.order && (o.order.id ?? o.order.order_id)) ?? (o.data && !Array.isArray(o.data) && (o.data.id ?? o.data.order_id)));
const listOf = (d, ...keys) => { if (Array.isArray(d)) return d; for (const k of keys) if (Array.isArray(d && d[k])) return d[k]; return []; };
const statusText = (st) => STATUSES[st] || s(st, 40) || "Unknown";
async function hash(text) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(b)].slice(0, 16).map((x) => x.toString(16).padStart(2, "0")).join("");
}

/* ---------- tool definitions ---------- */
const confirmed = { type: "boolean", description: "Set true only after the person has seen the summary and said yes. Leave out (or false) to get the summary to show them first." };
const orderIdProp = { type: ["string", "number"], description: "The campaign's order id, from my_campaigns." };
const ann = (title, readOnly, destructive = false) => ({ title, readOnlyHint: readOnly, destructiveHint: destructive, idempotentHint: readOnly, openWorldHint: true });

export const ADOPS_TOOLS = [
  {
    name: "submit_campaign",
    title: "Submit a campaign to Deep Thought",
    description: "Turns the person's media plan into a campaign order for the Deep Thought team. Uses their latest plan from build_media_plan unless channels are given. Call first without confirmed to get a summary, show it, and call again with confirmed: true only after they say yes. A person on the Deep Thought team reviews every order before anything goes live (usually within 1 business day); nothing is charged or launched by this tool. If no card is on file, it returns a secure Stripe link to save one.",
    inputSchema: {
      type: "object",
      properties: {
        channels: { type: "array", description: "Optional. Overrides the plan's channels. Each item: a channel id from list_channels and its monthly dollars.",
          items: { type: "object", properties: { id: { type: "string", enum: CHANNEL_IDS }, monthly_dollars: { type: "number" } }, required: ["id", "monthly_dollars"], additionalProperties: false } },
        start_preference: { type: "string", description: "When they'd like to start, e.g. 'as soon as possible' or 'December 1'." },
        website: { type: "string", description: "The business website, if they have one." },
        notes: { type: "string", description: "Anything else the team should know: offers, services to push, areas to avoid." },
        confirmed,
      },
      additionalProperties: false,
    },
    annotations: ann("Submit a campaign for review", false),
  },
  {
    name: "my_campaigns",
    title: "List my Deep Thought campaigns",
    description: "Lists the person's Deep Thought campaigns and their status (waiting for review, needs info, approved, live, paused, ended). Give order_id for one campaign's details and any message from the team.",
    inputSchema: { type: "object", properties: { order_id: orderIdProp }, additionalProperties: false },
    annotations: ann("List my campaigns", true),
  },
  {
    name: "campaign_results",
    title: "Get campaign results",
    description: "Results for one campaign by channel: spend, impressions, clicks, and calls or leads where tracked. Defaults to the last 30 days.",
    inputSchema: { type: "object", properties: { order_id: orderIdProp,
      from: { type: "string", description: "Start date YYYY-MM-DD." }, to: { type: "string", description: "End date YYYY-MM-DD." } }, required: ["order_id"], additionalProperties: false },
    annotations: ann("Get campaign results", true),
  },
  {
    name: "request_change",
    title: "Request a campaign change",
    description: "Asks the Deep Thought team to change a campaign: resume a paused campaign, change the budget, change channels, change the ads, or something else. Nothing changes until a person on the team approves it (usually within 1 business day). Call without confirmed first, show the summary, then call again with confirmed: true after they say yes.",
    inputSchema: { type: "object", properties: { order_id: orderIdProp, type: { type: "string", enum: CHANGE_TYPES },
      details: { type: "string", description: "What they want changed, in their words, with numbers where given." }, confirmed }, required: ["order_id", "type", "details"], additionalProperties: false },
    annotations: ann("Request a change", false),
  },
  {
    name: "pause_ads",
    title: "Pause ads now",
    description: "Pauses a live campaign right away (all of it, or only the channels listed). This is the one change that doesn't wait for review, because it stops spending. Resuming later goes through request_change and the team's review. Call without confirmed first, then with confirmed: true after the person says yes.",
    inputSchema: { type: "object", properties: { order_id: orderIdProp,
      channels: { type: "array", items: { type: "string", enum: CHANNEL_IDS }, description: "Optional. Only pause these channels." },
      reason: { type: "string", description: "Optional reason, passed to the team." }, confirmed }, required: ["order_id"], additionalProperties: false },
    annotations: ann("Pause ads", false, true),
  },
  {
    name: "add_payment_card",
    title: "Save a payment card",
    description: "Checks whether the person has a card on file and, if not, gives them a secure Stripe page to save one. It's step 2 after submit_campaign when no card is on file: call it again when the person says they've saved the card, to confirm it went through. Saving a card doesn't charge it; the first charge happens only after the team approves an order.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: ann("Save a payment card", false),
  },
];
export const ADOPS_TOOL_NAMES = new Set(ADOPS_TOOLS.map((t) => t.name));

/* ---------- tool bodies ---------- */
const out = (text, structured) => ({ content: [{ type: "text", text }], ...(structured ? { structuredContent: structured } : {}) });
const fail = (msg) => ({ content: [{ type: "text", text: msg }], isError: true });
const needOrder = (a) => { const id = s(a && a.order_id, 60); return /^[\w-]+$/.test(id) ? id : ""; };

async function cardLink(env, user) {
  // Stripe sends them back to a "card saved, go back to Claude" page on this Worker (/card-saved in worker.js).
  const back = env.CARD_RETURN_URL || "https://deepthought-chat.shajan.workers.dev/card-saved";
  const d = await api(env, user, "POST", "billing/setup-session", { return_url: back, success_url: back, cancel_url: `${back}?canceled=1` });
  return d.url || d.checkout_url || d.session_url || "";
}
/** Step 2 of submitting: the card call to action (2026-11-03, Shajan: make saving the card the clear next step). */
const cardStep = (url) => `**Step 2 of 2: save your card** so the team can launch your campaign once it's approved. Nothing is charged now.\n\n**[Save your card securely with Stripe →](${url})**\n\nWhen you've saved it, come back here and say "done", and I'll check it went through.`;
async function newestOrderId(env, user) {
  try {
    const orders = listOf(await api(env, user, "GET", "orders"), "orders", "data", "items");
    const recent = orders.filter((o) => (o.source || "claude") === "claude" && Date.now() - Date.parse(o.created_at || o.createdAt || 0) < 5 * 60 * 1000)
      .sort((x, y) => Date.parse(y.created_at || y.createdAt) - Date.parse(x.created_at || x.createdAt));
    return recent.length ? orderId(recent[0]) : null;
  } catch (e) { console.error("newest order", e.message); return null; }
}

async function submitCampaign(a, env, user) {
  const last = env.CHAT_LOG ? await env.CHAT_LOG.get(`ol:${user.email}`, "json").catch(() => null) : null;
  let channels;
  if (Array.isArray(a.channels) && a.channels.length) {
    channels = a.channels.filter((c) => c && CHANNEL_IDS.includes(c.id) && Number(c.monthly_dollars) > 0)
      .map((c) => ({ id: c.id, name: CHANNEL_NAME[c.id], monthly_dollars: Math.round(Number(c.monthly_dollars)) }));
    if (!channels.length) return fail("Those channels don't look right. Use channel ids from list_channels with a monthly dollar amount for each.");
  } else if (last && last.plan && last.plan.channels && last.plan.channels.length) {
    channels = last.plan.channels.map((c) => ({ id: c.id, name: c.name, monthly_dollars: Math.round(c.dollars) }));
  } else return fail("There's no plan to submit yet. Build one with build_media_plan first (or list the channels and monthly dollars).");
  const budget = channels.reduce((t, c) => t + c.monthly_dollars, 0);
  const input = (last && last.input) || {};
  const start = s(a.start_preference, 80) || "As soon as possible";
  const lines = channels.map((c) => `- ${c.name}: ${money(c.monthly_dollars)}/mo`);
  const summary = [`**Campaign for ${input.business || user.business || "your business"}**${input.location ? ` (${input.location})` : ""}`, ...lines,
    `**Total: ${money(budget)} a month** (ad spend and management included)`, `Start: ${start}`, a.notes ? `Notes: ${s(a.notes, 400)}` : ""].filter(Boolean).join("\n");

  if (a.confirmed !== true) {
    return out(`${summary}\n\nIf this looks right, I'll send it to the Deep Thought team. A person reviews it before anything goes live (usually within ${review(env)}), and nothing is charged until they approve it. Shall I submit it?`,
      { preview: true, channels, monthlyBudget: budget, nextStep: "Show this summary. Only after the person says yes, call submit_campaign again with the same inputs and confirmed: true." });
  }

  const me = await api(env, user, "GET", "me");
  const body = {
    channels: channels.map((c) => ({ id: c.id, monthly_dollars: c.monthly_dollars })),
    monthly_budget: budget, start_preference: start,
    business_details: { business_name: input.business || me.business_name || user.business || "", business_type: input.trade || "", location: input.location || "",
      service_area: input.radius || "", goal: input.goal || "", website: s(a.website, 200) },
    notes: s(a.notes, 1000), source: "claude",
    plan_snapshot: last ? { at: last.at, input: last.input, plan: last.plan } : null,
  };
  const key = await hash(`${user.uid}|${JSON.stringify(body.channels)}|${start}|${ymd(new Date())}`);
  const order = await api(env, user, "POST", "orders", body, { "Idempotency-Key": key });
  const id = orderId(order) ?? (await newestOrderId(env, user));
  let card = "";
  const hasCard = me.has_payment_method === true || order.has_payment_method === true;
  if (!hasCard) { try { card = await cardLink(env, user); } catch (e) { console.error("card link", e.message); } }
  const done = `**Submitted.** Your campaign order${id ? ` #${id}` : ""} is with the Deep Thought team for review (usually within ${review(env)}).`;
  const text = hasCard
    ? [done, "Your card on file is charged only after the team approves the order. I can check on it any time: just ask about your campaigns."].join("\n\n")
    : [`**Step 1 of 2 done.** ${done.replace("**Submitted.** ", "")}`,
      card ? cardStep(card) : `**Step 2 of 2: save your card.** I couldn't open the card page just now. Ask me to add a payment card in a minute, or call ${PHONE}.`].join("\n\n");
  return out(text, { orderId: id ?? null, status: order.status || "awaiting_review", monthlyBudget: budget, cardLink: card || null, hasPaymentMethod: hasCard,
    nextStep: hasCard ? "Done. Offer to check on the campaign later." : "Present saving the card as step 2, with the link as the clear next action. When the person says they've saved it, call add_payment_card to confirm it's on file." });
}

function orderLine(o) {
  const b = o.monthly_budget ?? o.monthlyBudget;
  const name = o.business_name || o.name || (o.business_details && o.business_details.business_name) ||
    (Array.isArray(o.channels) && o.channels.length ? o.channels.map((c) => CHANNEL_NAME[typeof c === "string" ? c : c.id] || (typeof c === "string" ? c : c.name)).join(" + ") : "Campaign");
  return `- **#${orderId(o)}** ${s(name, 80)}: ${statusText(o.status)}${b ? `, ${money(b)}/mo` : ""}${o.message ? `. Note from the team: ${s(o.message, 300)}` : ""}`;
}

async function myCampaigns(a, env, user) {
  const id = needOrder(a);
  if (id) {
    const o = await api(env, user, "GET", `orders/${encodeURIComponent(id)}`);
    const ch = listOf(o, "channels").map((c) => typeof c === "string" ? `- ${CHANNEL_NAME[c] || s(c, 60)}` :
      `- ${CHANNEL_NAME[c.id] || s(c.name || c.id, 60)}${(c.monthly_dollars ?? c.dollars) != null ? `: ${money(c.monthly_dollars ?? c.dollars)}/mo` : ""}${c.status ? ` (${statusText(c.status)})` : ""}`);
    const text = [orderLine(o).slice(2), ...ch, o.message || o.team_message ? `\nMessage from the team: ${s(o.message || o.team_message, 600)}` : ""].filter(Boolean).join("\n");
    return out(text, { order: o });
  }
  const d = await api(env, user, "GET", "orders");
  const orders = listOf(d, "orders", "data", "items");
  if (!orders.length) return out("You don't have any Deep Thought campaigns yet. Want me to build a media plan?", { orders: [] });
  return out(`Your Deep Thought campaigns:\n${orders.map(orderLine).join("\n")}`, { orders });
}

async function campaignResults(a, env, user) {
  const id = needOrder(a);
  if (!id) return fail("Which campaign? Ask me to list your campaigns to get its order id.");
  const today = new Date();
  const to = DATE_RE.test(a.to || "") ? a.to : ymd(today);
  const from = DATE_RE.test(a.from || "") ? a.from : ymd(new Date(today.getTime() - 29 * 864e5));
  const d = await api(env, user, "GET", `orders/${encodeURIComponent(id)}/report?from=${from}&to=${to}`);
  const rows = listOf(d, "channels", "rows", "data");
  if (!rows.length) return out(`No results yet for campaign #${id} between ${from} and ${to}. Results show up once a campaign is live.`, { report: d });
  const n = (x) => (x == null ? null : Number(x).toLocaleString("en-US"));
  const lines = rows.map((r) => {
    const bits = [r.spend != null && `${money(r.spend)} spent`, r.impressions != null && `${n(r.impressions)} impressions`, r.clicks != null && `${n(r.clicks)} clicks`,
      r.calls != null && `${n(r.calls)} calls`, r.leads != null && `${n(r.leads)} leads`].filter(Boolean);
    return `- **${CHANNEL_NAME[r.id || r.channel] || s(r.name || r.channel || r.id, 60)}**: ${bits.join(", ") || "no data yet"}`;
  });
  return out(`Results for campaign #${id}, ${from} to ${to}:\n${lines.join("\n")}\n\nCalls and leads show only where tracking is set up.`, { report: d, from, to });
}

async function requestChange(a, env, user) {
  const id = needOrder(a);
  if (!id) return fail("Which campaign? Ask me to list your campaigns to get its order id.");
  if (!CHANGE_TYPES.includes(a.type)) return fail(`Pick a change type: ${CHANGE_TYPES.join(", ")}.`);
  const details = s(a.details, 1000);
  if (!details) return fail("Please describe the change.");
  const label = { resume: "Resume the campaign", budget_change: "Change the budget", channel_change: "Change channels", creative_change: "Change the ads", other: "Other change" }[a.type];
  if (a.confirmed !== true) {
    return out(`**Change request for campaign #${id}**\n${label}: ${details}\n\nA person on the Deep Thought team reviews this before anything changes (usually within ${review(env)}). Send it?`,
      { preview: true, nextStep: "Show this. Only after the person says yes, call request_change again with confirmed: true." });
  }
  const r = await api(env, user, "POST", `orders/${encodeURIComponent(id)}/change-requests`, { type: a.type, details, source: "claude" },
    { "Idempotency-Key": await hash(`${user.uid}|${id}|${a.type}|${details}`) });
  return out(`Sent. The Deep Thought team will review your request${r.id ? ` (#${r.id})` : ""} for campaign #${id}, usually within ${review(env)}. Nothing changes until they approve it.`, { changeRequest: r });
}

async function pauseAds(a, env, user) {
  const id = needOrder(a);
  if (!id) return fail("Which campaign? Ask me to list your campaigns to get its order id.");
  const channels = (Array.isArray(a.channels) ? a.channels : []).filter((c) => CHANNEL_IDS.includes(c));
  const what = channels.length ? channels.map((c) => CHANNEL_NAME[c]).join(", ") : "the whole campaign";
  if (a.confirmed !== true) {
    return out(`This pauses ${what} for campaign #${id} right away. To restart later, ask me and the team will review it. Pause now?`,
      { preview: true, nextStep: "Show this. Only after the person says yes, call pause_ads again with confirmed: true." });
  }
  const r = await api(env, user, "POST", `orders/${encodeURIComponent(id)}/pause`, { channels, reason: s(a.reason, 300), source: "claude" });
  const st = r.status || "paused";
  const text = st === "pause_pending"
    ? `Pause requested for ${what} on campaign #${id}. One of the ad platforms has to be paused by hand, so the team has been alerted and will do it within the hour. Call ${PHONE} if it's urgent.`
    : `Paused ${channels.length ? `${what} on campaign #${id}` : `campaign #${id}`}. Ads have stopped. To restart, just ask and the team will review it.`;
  return out(text, { status: st, result: r });
}

async function addPaymentCard(env, user) {
  const me = await api(env, user, "GET", "me");
  if (me.has_payment_method === true) {
    return out("**Your card is saved.** Your campaign is ready for the Deep Thought team to approve. Nothing is charged until they do, and I can check on it any time: just ask about your campaigns.",
      { hasPaymentMethod: true });
  }
  const url = await cardLink(env, user);
  if (!url) return fail(`We couldn't open the card page just now. Please try again, or call ${PHONE}.`);
  return out(`I don't see a saved card yet.\n\n${cardStep(url)}`, { hasPaymentMethod: false, url,
    nextStep: "Show the link as the clear next action. When the person says they've saved it, call add_payment_card again to confirm." });
}

/** Run one AdOps tool. `user.uid` must be set (signed in through AdOps.rocks). */
export async function runAdopsTool(name, args, env, user) {
  if (!adopsOn(env)) return fail(`Campaign management in Claude isn't switched on yet. Call ${PHONE} and the team will help.`);
  if (!user || !user.uid) return fail("To manage campaigns, reconnect Deep Thought with your Deep Thought account: in Claude, open Settings → Connectors, disconnect Deep Thought and connect it again.");
  const a = args && typeof args === "object" ? args : {};
  try {
    if (name === "submit_campaign") return await submitCampaign(a, env, user);
    if (name === "my_campaigns") return await myCampaigns(a, env, user);
    if (name === "campaign_results") return await campaignResults(a, env, user);
    if (name === "request_change") return await requestChange(a, env, user);
    if (name === "pause_ads") return await pauseAds(a, env, user);
    if (name === "add_payment_card") return await addPaymentCard(env, user);
    return fail(`Unknown tool: ${name}`);
  } catch (e) {
    if (e instanceof ApiError) return fail(e.message);
    console.error("adops tool", name, e.message);
    return fail(`Something went wrong. Please try again, or call ${PHONE}.`);
  }
}
