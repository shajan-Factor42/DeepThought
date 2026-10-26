/**
 * Media plan builder (added 2026-10-15; channel list and pricing 2026-10-16).
 * POST /plan from deepthought.marketing/digital-media-plan-builder.html.
 *
 * The visitor gives contact details, their business, area, goal, monthly ad budget (a number) and
 * what they run today. Claude picks and explains a starting mix from CHANNELS (catalog.js). This
 * file, not the model, does the money:
 *   - drops channels whose share of the budget is below their minimum (PRICING in catalog.js),
 *   - under $500 total: one channel that fits, plus advice to raise the budget,
 *   - splits the visitor's own budget in dollars and forecasts impressions (CPM) or views (CPV),
 *   - strips any dollar figure the model writes itself (it must never quote our prices),
 * then sends the lead to the lead sheet, emails the plan (visitor + Shajan's copy with fees and
 * rates), and logs it in CHAT_LOG for 90 days (key p:<YYYYMMDD>-<random>).
 *
 * Vars (wrangler.toml): SITE, MODEL, LEADS_ENDPOINT, PLAN_FROM, PLAN_REPLY_TO, PLAN_NOTIFY_TO.
 * Secrets: ANTHROPIC_API_KEY, RESEND_API_KEY (PLANNER_PRICING optional, overrides PRICING).
 */
import { CHANNELS, pricing } from "./catalog.js";

export const OPTIONS = {
  radius: ["Just my town", "About 10 miles", "About 25 miles", "My whole metro area", "My whole state", "Nationwide or online"],
  goal: ["More phone calls", "More booked appointments", "More quote requests or leads", "More store or showroom visits",
    "More online sales", "Get known in my area"],
  current: ["Google Search ads", "Google Business Profile", "Facebook or Instagram ads", "Local Services Ads", "Nextdoor",
    "Email marketing", "An agency runs my ads", "Nothing yet"],
};
export const LOW_BUDGET = 500; // below this total, one channel only and advice to raise the budget

/** "$2,500", "2500", "2.5k", "about 2 grand" -> 2500. Returns 0 if no number. */
export function readBudget(v) {
  if (typeof v === "number") return isFinite(v) && v > 0 ? Math.round(v) : 0;
  const t = String(v || "").toLowerCase().replace(/,/g, "");
  const m = t.match(/(\d+(?:\.\d+)?)\s*(k|thousand|grand)?/);
  if (!m) return 0;
  const n = parseFloat(m[1]) * (m[2] ? 1000 : 1);
  return isFinite(n) && n > 0 ? Math.round(n) : 0;
}
const money = (n) => "$" + Math.round(n).toLocaleString("en-US");

const RATE = { limit: 4, windowMs: 10 * 60 * 1000 };
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < RATE.windowMs);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > RATE.limit;
}

const s = (v, max = 120) => String(v ?? "").replace(/[\u0000-\u001f]+/g, " ").trim().slice(0, max);
const pick = (v, list) => (list.includes(v) ? v : "");
export function usDigits(v) {
  let d = String(v || "").replace(/\D/g, "");
  if (d.length === 11 && d[0] === "1") d = d.slice(1);
  return /^[2-9]\d{2}[2-9]\d{6}$/.test(d) ? d : "";
}
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Validate the form. Returns { input } or { error } with a message the page can show. */
export function readInput(b) {
  if (!b || typeof b !== "object") return { error: "Something went wrong. Please try again." };
  if (b.website) return { spam: true };
  const d = usDigits(b.phone);
  const input = {
    name: s(b.name, 80), email: s(b.email, 120).toLowerCase(), business: s(b.business, 100), trade: s(b.trade, 80),
    location: s(b.location, 80), radius: pick(b.radius, OPTIONS.radius), goal: pick(b.goal, OPTIONS.goal),
    budget: readBudget(b.budget),
    current: (Array.isArray(b.current) ? b.current : []).map((x) => pick(x, OPTIONS.current)).filter(Boolean).slice(0, 8),
    notes: s(b.notes, 400),
    phone: d ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : "",
  };
  if (!input.name || !input.business || !input.trade) return { error: "Please add your name, your business and what it does." };
  if (!d) return { error: "Please enter a US phone number with area code, like (404) 555-0142." };
  if (!EMAIL_RE.test(input.email)) return { error: "Please enter an email address so we can send you the plan." };
  if (!input.location) return { error: "Please tell us the town or ZIP code you serve." };
  if (!input.goal || !input.radius) return { error: "Please answer the questions about your goal and how far you serve." };
  if (!input.budget) return { error: "Please tell us roughly how much you'd like to spend on ads each month, in dollars." };
  if (input.budget > 5000000) return { error: "Please check your monthly ad budget." };
  const meta = {};
  for (const k of ["page", "source", "first_source", "first_page", "first_seen", "timezone", "language", "utm", "referrer"]) meta[k] = s(b[k], 300);
  return { input, meta };
}

export function buildPlanPrompt(price) {
  const list = CHANNELS.map((c) => {
    const p = price[c.id] || {};
    return `- id "${c.id}": ${c.name}${p.min ? ` (minimum ${money(p.min)} a month)` : ""}. ${c.desc}`;
  }).join("\n");
  return `You are Deep Thought Marketing's media planner. A small or local business owner has answered a short questionnaire on deepthought.marketing. Recommend a sensible STARTING mix of advertising channels for their monthly ad budget, explained in plain English.

## Channels you may recommend (use the id exactly; nothing else)
${list}

## How to choose
- A channel only works if it gets at least its minimum. share x budget must be at least that channel's minimum, so fewer channels on smaller budgets.
- If the total budget is under ${money(LOW_BUDGET)}: recommend exactly ONE channel that fits the budget and the goal (100%), and say in the note that a budget of at least ${money(LOW_BUDGET)} a month gives much more reliable results.
- Roughly: under ${money(1500)} -> 1 or 2 channels; up to ${money(5000)} -> 2 to 3; above that -> 3 to 5.
- Catch demand before creating it: for service businesses whose customers search when they need help (home services, legal, medical, dental, auto repair...), lead with search ads, and Local Services Ads where the trade is eligible.
- Match channels to the business: Nextdoor for neighbourhood services; LinkedIn only for selling to other businesses; Yelp for restaurants, home services, beauty and auto; TikTok and Twitch for younger audiences with video; Amazon Prime Video for consumer brands and Amazon sellers; geofencing for physical locations, events or competitor locations; streaming TV, YouTube, pre-roll and digital billboards when the goal is awareness or the budget is larger.
- "firstMonth", "watch", "headline" and "note" must only talk about the channels you recommend. Don't mention a channel you didn't include (for example no search keywords if search isn't in the plan, no cost per click for display).
- If they already run something, say whether to keep it, fix it or replace it. A Google Business Profile is free; mention keeping it complete if relevant, but it is not one of the channels.
- "share" is the percentage of THEIR monthly ad budget for each channel; whole numbers adding up to 100. Order channels from most to least important.

## Writing rules (never break these)
- Plain, friendly English for a busy owner. No jargon, no hype, no exclamation marks, no emojis.
- Never write dollar amounts, prices, fees, CPMs, cost per click or cost per lead; the budget split in dollars and the forecasts are added automatically. Never mention what Deep Thought charges.
- Never promise results (leads, sales, rankings, returns) and never give timeframes in days or weeks for results or launch.
- Never invent statistics, clients or case studies.
- Write the company as "Deep Thought" if you mention it at all.

## Output
Reply with ONLY a JSON object, no other text:
{"headline": "one sentence summing up the plan for this business",
 "channels": [{"id": "channel id", "share": 60, "why": "one or two sentences on why this fits them"}],
 "firstMonth": ["3 or 4 short, concrete steps for the first month"],
 "watch": ["3 numbers to watch, each with a few words on why"],
 "note": "one sentence: a caveat or tip specific to them"}`;
}

export function planUserMessage(i) {
  return `Business name: ${i.business}
What the business does: ${i.trade}
Town or ZIP: ${i.location}
How far they serve: ${i.radius}
Main goal: ${i.goal}
Monthly ad budget: ${money(i.budget)}
Running today: ${i.current.length ? i.current.join(", ") : "not given"}
Anything else: ${i.notes || "nothing"}`;
}

// Drop any sentence that carries a dollar figure; the model must never quote prices (the code adds the budget split).
const noDollars = (t) => s(t, 400).split(/(?<=[.!?])\s+/).filter((x) => !/\$\s?\d/.test(x)).join(" ").trim();
const sig3 = (n) => { if (n < 1000) return Math.round(n / 10) * 10; const p = Math.pow(10, Math.floor(Math.log10(n)) - 2); return Math.round(n / p) * p; };

/**
 * Turn the model's ranked picks into a real plan for `budget`: enforce minimums (drop the
 * lowest-ranked channel that falls short, re-split, repeat), dollars rounded to $10 adding up to
 * the budget, and forecasts from the private rates.
 */
export function allocate(picks, budget, price) {
  const min = (id) => (price[id] && price[id].min) || 0;
  let list = picks.slice();
  const low = budget < LOW_BUDGET;
  if (low) {
    const fit = list.find((c) => min(c.id) <= budget) ||
      CHANNELS.filter((c) => price[c.id] && min(c.id) <= budget).sort((a, b) => min(a.id) - min(b.id)).map((c) => ({ id: c.id, share: 100, why: "" }))[0];
    list = fit ? [{ ...fit, share: 100 }] : [];
  } else {
    for (;;) {
      const tot = list.reduce((a, c) => a + (c.share || 1), 0) || 1;
      const short = [...list].reverse().find((c) => (budget * (c.share || 1)) / tot < min(c.id));
      if (!short) break;
      list = list.filter((c) => c !== short);
      if (!list.length) break;
    }
    if (!list.length) {
      const fit = picks.find((c) => min(c.id) <= budget);
      if (fit) list = [{ ...fit, share: 100 }];
    }
  }
  const tot = list.reduce((a, c) => a + (c.share || 1), 0) || 1;
  const out = list.map((c) => ({ ...c, dollars: Math.round((budget * (c.share || 1)) / tot / 10) * 10 }));
  if (out.length) out[0].dollars += Math.round(budget) - out.reduce((a, c) => a + c.dollars, 0);
  for (const c of out) {
    const ch = CHANNELS.find((x) => x.id === c.id), p = price[c.id] || {};
    c.name = ch.name;
    c.share = Math.round((c.dollars / budget) * 100);
    c.min = p.min || 0;
    if (p.cpm) { c.kind = "cpm"; c.forecast = sig3((c.dollars / p.cpm) * 1000); c.unit = "impressions"; }
    else if (p.cpv) { c.kind = "cpv"; c.forecast = sig3(c.dollars / p.cpv); c.unit = "video views"; }
    else if (p.fee != null) { c.kind = "budget"; c.forecast = null; c.unit = ""; c.fee = p.fee; c.working = Math.round(c.dollars * (1 - p.fee)); }
    else { c.kind = "unknown"; c.forecast = null; }
    if (p.cpm) c.rate = p.cpm; if (p.cpv) c.rate = p.cpv;
  }
  return { channels: out, low, budget };
}

/** Parse and police Claude's JSON. Throws if nothing usable came back. */
export function parsePlan(raw, budget, price) {
  const m = String(raw).match(/\{[\s\S]*\}/);
  if (!m) throw new Error("no JSON");
  const j = JSON.parse(m[0]);
  const ids = new Set(CHANNELS.map((c) => c.id));
  const seen = new Set();
  const picks = (Array.isArray(j.channels) ? j.channels : []).map((c) => ({
    id: String(c && (c.id || c.product) || "").trim().toLowerCase(),
    share: Math.max(0, Number(c && c.share) || 0),
    why: noDollars(c && c.why),
  })).filter((c) => ids.has(c.id) && c.why && !seen.has(c.id) && seen.add(c.id)).slice(0, 5);
  if (!picks.length) throw new Error("no valid channels");
  const a = allocate(picks, budget, price);
  const list = (v, n) => (Array.isArray(v) ? v : []).map(noDollars).filter(Boolean).slice(0, n);
  let note = noDollars(j.note);
  if (a.low) note = `A budget under ${money(LOW_BUDGET)} a month is usually too small for steady results; we'd suggest at least ${money(LOW_BUDGET)}. ` + (a.channels.length ? "If you'd like to start smaller, this is the one channel that fits." : "At this budget there isn't a channel we'd recommend yet.");
  const finalIds = a.channels.map((c) => c.id).sort().join(",");
  const changed = finalIds !== picks.map((c) => c.id).sort().join(",");
  return {
    changed,
    headline: noDollars(j.headline) || "A starting media plan built around your goal and area.",
    budget, low: a.low,
    channels: a.channels.map((c) => ({ ...c, why: c.why || "The channel that fits your budget and goal best." })),
    firstMonth: list(j.firstMonth, 4),
    watch: list(j.watch, 3),
    note,
  };
}

/** What the visitor sees (page + email): no fees, rates or minimums. */
export function publicPlan(plan) {
  const { changed, ...rest } = plan;
  return { ...rest, channels: rest.channels.map(({ id, name, share, dollars, forecast, unit, why, kind }) => ({ id, name, share, dollars, forecast, unit, why, kind })) };
}

const esc = (v) => String(v ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const fmtN = (n) => Math.round(n).toLocaleString("en-US");
export function forecastText(c) {
  if (c.kind === "cpm" || c.kind === "cpv") return `About ${fmtN(c.forecast)} ${c.unit} a month`;
  if (c.kind === "budget") return "You pay for clicks or leads; we'll forecast those with you";
  return "";
}

export function planEmailHtml(plan, input, site, forOwner = false) {
  const rows = plan.channels.map((c) => `
    <tr><td style="padding:10px 0 2px;font-weight:700;color:#0A0F1E">${esc(c.name)}</td><td style="padding:10px 0 2px;text-align:right;font-weight:700;color:#0052CC;white-space:nowrap">${money(c.dollars)}/mo &middot; ${c.share}%</td></tr>
    <tr><td colspan="2"><div style="height:8px;border-radius:4px;background:#E6EEFF"><div style="height:8px;border-radius:4px;width:${c.share}%;background:linear-gradient(90deg,#0066FF,#00B4D8)"></div></div></td></tr>
    <tr><td colspan="2" style="padding:6px 0 2px;color:#0A0F1E;font-size:13.5px;font-weight:600">${esc(forecastText(c))}</td></tr>
    ${forOwner ? `<tr><td colspan="2" style="padding:0;color:#B45309;font-size:12.5px">Internal: ${c.kind === "budget" ? `fee ${Math.round(c.fee * 100)}%, working media ${money(c.working)}` : c.kind === "cpm" ? `CPM $${c.rate}` : c.kind === "cpv" ? `CPV $${c.rate}` : "no pricing"}; minimum ${money(c.min)}</td></tr>` : ""}
    <tr><td colspan="2" style="padding:4px 0 4px;color:#475569;font-size:14px;line-height:1.5">${esc(c.why)}</td></tr>`).join("");
  const li = (a) => a.map((x) => `<li style="margin:0 0 6px">${esc(x)}</li>`).join("");
  const facts = forOwner ? `
    <table style="font-size:14px;margin:0 0 18px;color:#334155">
      ${[["Name", input.name], ["Phone", input.phone], ["Email", input.email], ["Business", `${input.business} (${input.trade})`], ["Area", `${input.location}, ${input.radius}`],
        ["Goal", input.goal], ["Ad budget", `${money(input.budget)} a month`], ["Running today", input.current.join(", ") || "-"], ["Notes", input.notes || "-"]]
        .map(([k, v]) => `<tr><td style="color:#64748b;padding:2px 14px 2px 0">${k}</td><td>${esc(v)}</td></tr>`).join("")}
    </table>` : "";
  return `<div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:0 auto;color:#334155">
  <h2 style="color:#0A0F1E;margin:0 0 6px">${forOwner ? `New media plan request: ${esc(input.business)}` : `Your digital media plan, ${esc(input.name.split(" ")[0])}`}</h2>
  ${facts}
  <p style="font-size:16px;line-height:1.55;margin:0 0 14px">${esc(plan.headline)}</p>
  ${plan.channels.length ? `<p style="font-size:13px;color:#64748b;margin:0 0 4px">How to split your ${money(plan.budget)} monthly ad budget:</p>
  <table style="width:100%;border-collapse:collapse">${rows}</table>` : ""}
  ${plan.firstMonth.length ? `<h3 style="color:#0A0F1E;margin:22px 0 8px">Your first month</h3><ol style="padding-left:20px;line-height:1.55;margin:0">${li(plan.firstMonth)}</ol>` : ""}
  ${plan.watch.length ? `<h3 style="color:#0A0F1E;margin:22px 0 8px">Numbers to watch</h3><ul style="padding-left:20px;line-height:1.55;margin:0">${li(plan.watch)}</ul>` : ""}
  ${plan.note ? `<p style="background:#F0F4FF;border-radius:10px;padding:12px 14px;margin:20px 0 0;line-height:1.5">${esc(plan.note)}</p>` : ""}
  ${forOwner ? "" : `<p style="margin:26px 0 10px;line-height:1.55">Want us to run this for you? A real person will look at your plan and your current ads, and call you back within 24 hours with a straight answer. Or call us now at <a href="tel:+17702999583">770-299-9583</a>.</p>
  <p><a href="${site}/second-opinion.html" style="display:inline-block;background:#0066FF;color:#fff;text-decoration:none;font-weight:700;padding:12px 20px;border-radius:10px">Get a free Second Opinion</a></p>`}
  <p style="font-size:12px;color:#94a3b8;margin-top:24px">This plan is a starting suggestion based on what you told us, made with the help of AI. Forecasts are estimates, not guarantees, and this is not a quote or a promise of results.${forOwner ? "" : " Reply to this email with any questions."}</p></div>`;
}

export async function askClaude(env, key, price, input, extra = "") {
  const r = await fetch(env.ANTHROPIC_URL || "https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: env.MODEL, max_tokens: 1400, temperature: 0.4,
      system: buildPlanPrompt(price),
      messages: [{ role: "user", content: planUserMessage(input) + extra }, { role: "assistant", content: "{" }],
    }),
  });
  if (!r.ok) throw new Error(`anthropic ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const j = await r.json();
  return "{" + (j.content || []).map((b) => b.text || "").join("");
}

/**
 * When minimums or a low budget changed the line-up, the model's first write-up talks about the
 * wrong channels. Ask it to rewrite the text for the final channels only (2026-10-16).
 */
export function buildRewritePrompt() {
  return `You are Deep Thought Marketing's media planner. The channel mix below is FINAL; it was adjusted to fit the budget and each channel's minimum. Write the plan text for exactly these channels.

Rules: only talk about the channels listed; don't mention any other channel or tactic that belongs to another channel (no search keywords unless search is listed, no cost per click for impression-based channels). Plain, friendly English, no jargon, no exclamation marks, no emojis. Never write dollar amounts, prices, fees or rates, never promise results, never give timeframes in days or weeks, never invent statistics. Write the company as "Deep Thought" if you mention it.

Reply with ONLY a JSON object:
{"headline": "one sentence summing up the plan for this business",
 "channels": [{"id": "channel id", "why": "one or two sentences on why this fits them"}],
 "firstMonth": ["3 or 4 short, concrete steps for these channels"],
 "watch": ["3 numbers to watch for these channels, each with a few words on why"],
 "note": "one sentence: a caveat or tip specific to them"}`;
}

export async function rewritePlan(env, key, input, plan) {
  if (!plan.channels.length) return plan;
  const mix = plan.channels.map((c) => `- id "${c.id}": ${c.name}, ${c.share}% of the budget. ${(CHANNELS.find((x) => x.id === c.id) || {}).desc || ""}`).join("\n");
  const r = await fetch(env.ANTHROPIC_URL || "https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: env.MODEL, max_tokens: 1000, temperature: 0.3, system: buildRewritePrompt(),
      messages: [{ role: "user", content: `${planUserMessage(input)}\n\nFinal channels:\n${mix}` }, { role: "assistant", content: "{" }],
    }),
  });
  if (!r.ok) throw new Error(`anthropic ${r.status}`);
  const j0 = await r.json();
  const raw = "{" + (j0.content || []).map((b) => b.text || "").join("");
  const j = JSON.parse(raw.match(/\{[\s\S]*\}/)[0]);
  const why = new Map((Array.isArray(j.channels) ? j.channels : []).map((c) => [String(c && c.id || "").toLowerCase(), noDollars(c && c.why)]));
  const list = (v, n, old) => { const x = (Array.isArray(v) ? v : []).map(noDollars).filter(Boolean).slice(0, n); return x.length ? x : old; };
  return {
    ...plan,
    headline: noDollars(j.headline) || plan.headline,
    channels: plan.channels.map((c) => ({ ...c, why: why.get(c.id) || c.why })),
    firstMonth: list(j.firstMonth, 4, []),
    watch: list(j.watch, 3, []),
    note: plan.low ? plan.note : (noDollars(j.note) || ""),
  };
}

async function resend(env, msg) {
  if (!env.RESEND_API_KEY) return;
  const r = await fetch(env.RESEND_URL || "https://api.resend.com/emails", {
    method: "POST", headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify(msg),
  });
  if (!r.ok) console.error("plan email", r.status, (await r.text()).slice(0, 200));
}

/** The /plan route. `c` is the CORS result from worker.js, `key` the Anthropic key. */
export async function handlePlan(request, env, ctx, c, key) {
  const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { ...c.headers, "Content-Type": "application/json" } });
  if (!c.ok) return json({ error: "Forbidden" }, 403);
  if (limited(request.headers.get("CF-Connecting-IP") || "unknown"))
    return json({ error: "You've asked for a few plans already. Please try again in a few minutes, or call us at 770-299-9583." }, 429);
  let b; try { b = await request.json(); } catch { return json({ error: "Something went wrong. Please try again." }, 400); }
  const r = readInput(b);
  if (r.spam) return json({ ok: true, plan: null });
  if (r.error) return json({ error: r.error }, 400);
  const { input, meta } = r;

  let plan;
  const price = pricing(env);
  try {
    try { plan = parsePlan(await askClaude(env, key, price, input), input.budget, price); }
    catch (e) {
      console.error("plan retry", e.message);
      plan = parsePlan(await askClaude(env, key, price, input, "\n\n(Reply with valid JSON only, using exact channel ids from the list.)"), input.budget, price);
    }
  } catch (e) {
    console.error("plan", e.message);
    return json({ error: "We couldn't build your plan just now. Please call us at 770-299-9583, or try again in a minute." }, 502);
  }
  // The line-up changed (minimums or a low budget): rewrite the text so it matches the final channels.
  // If the rewrite fails, keep the per-channel reasons but drop steps that may name other channels.
  if (plan.changed) {
    try { plan = await rewritePlan(env, key, input, plan); }
    catch (e) { console.error("plan rewrite", e.message); plan = { ...plan, firstMonth: [], watch: [] }; }
  }

  const site = env.SITE || "https://deepthought.marketing";
  const mix = plan.channels.map((x) => `${x.name} ${money(x.dollars)}`).join(", ") || "none (budget too low)";
  const work = [];
  if (env.LEADS_ENDPOINT) {
    const body = new URLSearchParams({
      name: input.name, phone: input.phone, email: input.email,
      business: `${input.business} (${input.trade}; ${money(input.budget)}/mo plan: ${mix})`.slice(0, 290),
      page: meta.page || "/digital-media-plan-builder.html", place: "ad-plan", utm: meta.utm || "{}", referrer: meta.referrer || "",
      source: meta.source || "", first_source: meta.first_source || "", first_page: meta.first_page || "",
      first_seen: meta.first_seen || "", timezone: meta.timezone || "", language: meta.language || "",
    });
    work.push(fetch(env.LEADS_ENDPOINT, { method: "POST", body }).then((x) => console.log("plan lead", x.status)));
  }
  const from = env.PLAN_FROM || "Deep Thought Marketing <plans@deepthought.marketing>";
  const replyTo = env.PLAN_REPLY_TO || "shajan@deepthought.marketing";
  work.push(resend(env, { from, to: [input.email], reply_to: replyTo, subject: `Your digital media plan for ${input.business}`, html: planEmailHtml(publicPlan(plan), input, site) }));
  const notify = (env.PLAN_NOTIFY_TO || env.DIGEST_TO || "").split(",").map((x) => x.trim()).filter(Boolean);
  if (notify.length) work.push(resend(env, { from, to: notify, reply_to: input.email, subject: `New media plan: ${input.business} (${input.trade}, ${input.location})`, html: planEmailHtml(plan, input, site, true) }));
  if (env.CHAT_LOG) {
    const d = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date()).replace(/-/g, "");
    work.push(env.CHAT_LOG.put(`p:${d}-${Math.random().toString(36).slice(2, 12)}`, JSON.stringify({ at: new Date().toISOString(), input, meta, plan }), { expirationTtl: 90 * 24 * 3600 }));
  }
  ctx.waitUntil(Promise.all(work.map((p) => Promise.resolve(p).catch((e) => console.error("plan side", e.message)))));
  return json({ ok: true, plan: publicPlan(plan), emailed: !!env.RESEND_API_KEY });
}

/* ------------------------------------------------------------------------------------------
 * Chat mode for the ad plan page (2026-10-15). Instead of the form, the visitor chats; the AI
 * gathers the same answers. POST /plan-chat { messages, fields } -> { reply, fields, ready }.
 * The worker decides "ready" with readInput() (the same check /plan uses), not the model. When
 * ready, the page posts the fields to /plan exactly like the form does.
 * ---------------------------------------------------------------------------------------- */
const CHAT_RATE = { limit: 40, windowMs: 10 * 60 * 1000 };
const chatHits = new Map();
function chatLimited(ip) {
  const now = Date.now();
  const list = (chatHits.get(ip) || []).filter((t) => now - t < CHAT_RATE.windowMs);
  list.push(now); chatHits.set(ip, list);
  if (chatHits.size > 5000) chatHits.clear();
  return list.length > CHAT_RATE.limit;
}
const FIELD_KEYS = ["business", "trade", "location", "radius", "goal", "budget", "current", "notes", "name", "phone", "email"];

export function buildPlanChatPrompt() {
  const opt = (k) => OPTIONS[k].map((o) => `"${o}"`).join(", ");
  return `You are Deep Thought, Deep Thought Marketing's assistant on the digital media plan builder page of deepthought.marketing. Your only job here is to collect a few details in a short, natural chat so we can build the visitor a free starting digital media plan. Do NOT give the plan or recommend channels yourself; the plan is built automatically once you have everything.

## What you need (ask for one or two things at a time, in this order)
1. business: the business name
2. trade: what the business does (e.g. "Plumbing", "Dental practice")
3. location: the town or ZIP code they are based in
4. radius: how far they serve. One of: ${opt("radius")}
5. goal: their main goal. One of: ${opt("goal")}
6. budget: roughly how much they want to spend on ads each month, as a number of US dollars (e.g. 2000). If they're unsure, ask for their best guess.
7. current: what they run today, zero or more of: ${opt("current")}
8. notes: anything else worth knowing (optional; don't push for it)
9. name, phone (a US number with area code) and email: say these are so we can send them the plan.

## How to talk
- Short, warm, plain English. One or two sentences per reply, then the next question. No exclamation marks, no emojis.
- Map loose answers onto the options yourself ("about two grand" -> budget 2000; "around Atlanta" -> "My whole metro area" if that fits). If an answer is unclear, ask once more, briefly.
- If they ask a side question, answer in one sentence and come back to the next missing detail.
- Never quote Deep Thought's prices or fees, never promise results.
- If the phone number isn't a 10-digit US number, ask them to check it. If they don't want to give contact details, explain the plan is shown on the page and emailed, so we need an email and phone; they can also call 770-299-9583.
- When everything (1 to 7 and 9) is collected, reply only with a one-line thank-you saying you're building their plan now.

## Output
Reply with ONLY a JSON object:
{"reply": "what you say to the visitor", "fields": {every field you know so far, using the exact option text for radius, goal and each item of current (an array), and budget as a plain number}}`;
}

/** The /plan-chat route. */
export async function handlePlanChat(request, env, ctx, c, key) {
  const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { ...c.headers, "Content-Type": "application/json" } });
  if (!c.ok) return json({ error: "Forbidden" }, 403);
  if (chatLimited(request.headers.get("CF-Connecting-IP") || "unknown"))
    return json({ error: "That's a lot of messages in a short time. Please try again in a few minutes, or call us at 770-299-9583." }, 429);
  let b; try { b = await request.json(); } catch { return json({ error: "Something went wrong. Please try again." }, 400); }
  const messages = (Array.isArray(b.messages) ? b.messages : []).slice(-30)
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .map((m) => ({ role: m.role, content: m.content.slice(0, 600) }));
  if (!messages.length || messages[messages.length - 1].role !== "user") return json({ error: "Something went wrong. Please try again." }, 400);
  while (messages[0] && messages[0].role !== "user") messages.shift();
  const known = {};
  for (const k of FIELD_KEYS) if (b.fields && b.fields[k] != null && b.fields[k] !== "") known[k] = b.fields[k];

  let out;
  try {
    const r = await fetch(env.ANTHROPIC_URL || "https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({
        model: env.MODEL, max_tokens: 500, temperature: 0.3,
        system: buildPlanChatPrompt() + `\n\n## Collected so far\n${JSON.stringify(known)}`,
        messages: [...messages, { role: "assistant", content: "{" }],
      }),
    });
    if (!r.ok) throw new Error(`anthropic ${r.status}`);
    const j = await r.json();
    const raw = "{" + (j.content || []).map((x) => x.text || "").join("");
    out = JSON.parse(raw.match(/\{[\s\S]*\}/)[0]);
  } catch (e) {
    console.error("plan-chat", e.message);
    return json({ error: "Sorry, I couldn't answer just now. You can use the form instead, or call 770-299-9583." }, 502);
  }

  // Merge: keep what we had, take anything new the model found. Only known keys, only strings/arrays.
  const fields = { ...known };
  for (const k of FIELD_KEYS) {
    const v = out.fields && out.fields[k];
    if (k === "current") { if (Array.isArray(v) && v.length) fields.current = v.map(String).slice(0, 8); }
    else if (k === "budget") { if ((typeof v === "number" || typeof v === "string") && readBudget(v)) fields.budget = readBudget(v); }
    else if (typeof v === "string" && v.trim()) fields[k] = v.trim().slice(0, k === "notes" ? 400 : 120);
  }
  const check = readInput({ ...fields, current: fields.current || [] });
  const ready = !check.error && !check.spam;
  const reply = String(out.reply || "").slice(0, 600) ||
    (ready ? "Thanks, building your plan now." : "Could you tell me a bit more?");
  return json({ reply: ready ? "Thanks, that's everything. Building your plan now." : reply, fields, ready });
}
