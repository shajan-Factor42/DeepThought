/**
 * Ad plan recommender (added 2026-10-15). POST /plan from deepthought.marketing/ad-plan.html.
 *
 * The visitor answers a few questions (contact details plus business, area, goal, ad budget and
 * what they run today). Claude picks a starting mix from the 22 products in chat-knowledge.json
 * and returns structured JSON. This file then:
 *   - checks every channel is one of our real products and the shares add up to 100,
 *   - strips anything that looks like a dollar figure from the wording (no prices, ever),
 *   - sends the lead to the same Apps Script as the Second Opinion form (sheet row + email),
 *   - emails the plan to the visitor and a copy to Shajan through Resend,
 *   - logs it in CHAT_LOG for 90 days (key p:<YYYYMMDD>-<random>).
 *
 * Vars (wrangler.toml): SITE, MODEL, LEADS_ENDPOINT, PLAN_FROM, PLAN_REPLY_TO, PLAN_NOTIFY_TO.
 * Secrets: ANTHROPIC_API_KEY, RESEND_API_KEY.
 */

export const OPTIONS = {
  radius: ["Just my town", "About 10 miles", "About 25 miles", "My whole metro area", "My whole state", "Nationwide or online"],
  goal: ["More phone calls", "More booked appointments", "More quote requests or leads", "More store or showroom visits",
    "More online sales", "Get known in my area"],
  budget: ["Under $1,000", "$1,000 to $2,500", "$2,500 to $5,000", "$5,000 to $10,000", "Over $10,000", "Not sure yet"],
  current: ["Google Search ads", "Google Business Profile", "Facebook or Instagram ads", "Local Services Ads", "Nextdoor",
    "Email marketing", "An agency runs my ads", "Nothing yet"],
};

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
    budget: pick(b.budget, OPTIONS.budget),
    current: (Array.isArray(b.current) ? b.current : []).map((x) => pick(x, OPTIONS.current)).filter(Boolean).slice(0, 8),
    notes: s(b.notes, 400),
    phone: d ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : "",
  };
  if (!input.name || !input.business || !input.trade) return { error: "Please add your name, your business and what it does." };
  if (!d) return { error: "Please enter a US phone number with area code, like (404) 555-0142." };
  if (!EMAIL_RE.test(input.email)) return { error: "Please enter an email address so we can send you the plan." };
  if (!input.location) return { error: "Please tell us the town or ZIP code you serve." };
  if (!input.goal || !input.budget || !input.radius) return { error: "Please answer the questions about your goal, area and budget." };
  const meta = {};
  for (const k of ["page", "source", "first_source", "first_page", "first_seen", "timezone", "language", "utm", "referrer"]) meta[k] = s(b[k], 300);
  return { input, meta };
}

/** All 22 product names, flat, from chat-knowledge.json's grouped list. */
export const productList = (k) => Object.values(k.products || {}).flat();

export function buildPlanPrompt(k) {
  const groups = Object.entries(k.products || {}).map(([g, list]) => `- ${g}: ${list.join(", ")}`).join("\n");
  return `You are Deep Thought Marketing's ad planner. A small or local business owner has answered a short questionnaire on deepthought.marketing. Recommend a sensible STARTING mix of advertising products for them, explained in plain English.

## Products you may recommend (use these exact names, nothing else)
${groups}

## How to choose
- Number of products by monthly ad budget: Under $1,000 -> 1 or 2. $1,000 to $2,500 -> 2 or 3. $2,500 to $5,000 -> 3 or 4. $5,000 and up -> 3 to 5. "Not sure yet" -> plan as if $1,000 to $2,500 and say so in the note.
- Catch demand before creating it. For service businesses whose customers search when they need help (home services, legal, medical, dental, auto repair, etc.), lead with Google Search ads, and Google Local Services Ads where the trade is eligible (home services, legal, many professional services).
- Facebook and Instagram ads suit almost every local consumer business for staying in front of people before they need you; Nextdoor ads suit neighbourhood services (home services, pets, childcare, fitness, restaurants).
- Retargeting only alongside a channel that sends website traffic.
- Geofencing for businesses with a physical location, events, or nearby competitor locations.
- Connected TV, YouTube, online video, streaming audio, podcast ads and postal direct mail only at $2,500 a month or more, or when the goal is "Get known in my area".
- Performance Max and Shopping ads and Amazon ads only for businesses that sell products online (Amazon ads only if they sell on Amazon). LinkedIn ads only for businesses that sell to other businesses. Yelp ads for restaurants, home services, beauty and auto. Microsoft (Bing) Ads only as an add-on to Google Search at $2,500 and up.
- If they already run something, say whether to keep it, fix it or replace it. A Google Business Profile is free; mention keeping it complete if relevant, but it is not one of the products.
- "share" is the percentage of THEIR OWN monthly ad budget for each product. Shares are whole numbers, multiples of 5, and add up to 100. Put most of a small budget in the first product.

## Writing rules (never break these)
- Plain, friendly English for a busy owner. No jargon, no hype, no exclamation marks, no emojis.
- Never write a dollar amount, price, fee, cost per click, cost per lead or any number with a $ sign. Never mention what Deep Thought charges.
- Never promise results (leads, sales, rankings, returns) and never give timeframes in days or weeks for results or launch.
- Never invent statistics, clients or case studies.
- Write the company as "Deep Thought" if you mention it at all.

## Output
Reply with ONLY a JSON object, no other text:
{"headline": "one sentence summing up the plan for this business",
 "channels": [{"product": "exact product name", "share": 50, "why": "one or two sentences on why this fits them"}],
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
Monthly ad budget: ${i.budget}
Running today: ${i.current.length ? i.current.join(", ") : "not given"}
Anything else: ${i.notes || "nothing"}`;
}

// Drop any sentence that carries a dollar figure; the plan must never quote prices.
const noDollars = (t) => s(t, 400).split(/(?<=[.!?])\s+/).filter((x) => !/\$\s?\d/.test(x)).join(" ").trim();

/** Parse and police Claude's JSON. Throws if nothing usable came back. */
export function parsePlan(raw, products) {
  const m = String(raw).match(/\{[\s\S]*\}/);
  if (!m) throw new Error("no JSON");
  const j = JSON.parse(m[0]);
  const canon = new Map(products.map((p) => [p.toLowerCase(), p]));
  const seen = new Set();
  let channels = (Array.isArray(j.channels) ? j.channels : []).map((c) => ({
    product: canon.get(String(c && c.product || "").toLowerCase().trim()),
    share: Math.max(0, Number(c && c.share) || 0),
    why: noDollars(c && c.why),
  })).filter((c) => c.product && c.why && !seen.has(c.product) && seen.add(c.product)).slice(0, 5);
  if (!channels.length) throw new Error("no valid channels");
  // Shares: normalise to 100 in steps of 5, every product at least 5.
  const total = channels.reduce((a, c) => a + c.share, 0) || channels.length;
  channels.forEach((c) => { c.share = Math.max(5, Math.round(((c.share || 1) / total) * 20) * 5); });
  let diff = 100 - channels.reduce((a, c) => a + c.share, 0);
  channels.sort((a, b) => b.share - a.share);
  while (diff !== 0) {
    const c = diff > 0 ? channels[0] : channels.find((x) => x.share > 5) || channels[0];
    c.share += diff > 0 ? 5 : -5; diff += diff > 0 ? -5 : 5;
  }
  const list = (v, n) => (Array.isArray(v) ? v : []).map(noDollars).filter(Boolean).slice(0, n);
  return {
    headline: noDollars(j.headline) || "A starting ad plan built around your goal and area.",
    channels,
    firstMonth: list(j.firstMonth, 4),
    watch: list(j.watch, 3),
    note: noDollars(j.note),
  };
}

const esc = (v) => String(v ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

export function planEmailHtml(plan, input, site, forOwner = false) {
  const bars = plan.channels.map((c) => `
    <tr><td style="padding:10px 0 2px;font-weight:700;color:#0A0F1E">${esc(c.product)}</td><td style="padding:10px 0 2px;text-align:right;font-weight:700;color:#0052CC">${c.share}%</td></tr>
    <tr><td colspan="2"><div style="height:8px;border-radius:4px;background:#E6EEFF"><div style="height:8px;border-radius:4px;width:${c.share}%;background:linear-gradient(90deg,#0066FF,#00B4D8)"></div></div></td></tr>
    <tr><td colspan="2" style="padding:6px 0 4px;color:#475569;font-size:14px;line-height:1.5">${esc(c.why)}</td></tr>`).join("");
  const li = (a) => a.map((x) => `<li style="margin:0 0 6px">${esc(x)}</li>`).join("");
  const facts = forOwner ? `
    <table style="font-size:14px;margin:0 0 18px;color:#334155">
      ${[["Name", input.name], ["Phone", input.phone], ["Email", input.email], ["Business", `${input.business} (${input.trade})`], ["Area", `${input.location}, ${input.radius}`],
        ["Goal", input.goal], ["Ad budget", input.budget], ["Running today", input.current.join(", ") || "-"], ["Notes", input.notes || "-"]]
        .map(([k, v]) => `<tr><td style="color:#64748b;padding:2px 14px 2px 0">${k}</td><td>${esc(v)}</td></tr>`).join("")}
    </table>` : "";
  return `<div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:0 auto;color:#334155">
  <h2 style="color:#0A0F1E;margin:0 0 6px">${forOwner ? `New ad plan request: ${esc(input.business)}` : `Your starting ad plan, ${esc(input.name.split(" ")[0])}`}</h2>
  ${facts}
  <p style="font-size:16px;line-height:1.55;margin:0 0 14px">${esc(plan.headline)}</p>
  <p style="font-size:13px;color:#64748b;margin:0 0 4px">How to split your monthly ad budget (${esc(input.budget)}):</p>
  <table style="width:100%;border-collapse:collapse">${bars}</table>
  <h3 style="color:#0A0F1E;margin:22px 0 8px">Your first month</h3><ol style="padding-left:20px;line-height:1.55;margin:0">${li(plan.firstMonth)}</ol>
  <h3 style="color:#0A0F1E;margin:22px 0 8px">Numbers to watch</h3><ul style="padding-left:20px;line-height:1.55;margin:0">${li(plan.watch)}</ul>
  ${plan.note ? `<p style="background:#F0F4FF;border-radius:10px;padding:12px 14px;margin:20px 0 0;line-height:1.5">${esc(plan.note)}</p>` : ""}
  ${forOwner ? "" : `<p style="margin:26px 0 10px;line-height:1.55">Want us to run this for you? A real person will look at your plan and your current ads, and call you back within 24 hours with a straight answer. Or call us now at <a href="tel:+17702999583">770-299-9583</a>.</p>
  <p><a href="${site}/second-opinion.html" style="display:inline-block;background:#0066FF;color:#fff;text-decoration:none;font-weight:700;padding:12px 20px;border-radius:10px">Get a free Second Opinion</a></p>`}
  <p style="font-size:12px;color:#94a3b8;margin-top:24px">This plan is a starting suggestion based on what you told us, made with the help of AI. It is not a quote or a promise of results.${forOwner ? "" : " Reply to this email with any questions."}</p></div>`;
}

async function knowledge(env) {
  const res = await fetch(`${env.SITE}/chat-knowledge.json`, { cf: { cacheTtl: 600 } });
  if (!res.ok) throw new Error(`knowledge ${res.status}`);
  return res.json();
}

async function askClaude(env, key, k, input, extra = "") {
  const r = await fetch(env.ANTHROPIC_URL || "https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: env.MODEL, max_tokens: 1400, temperature: 0.4,
      system: buildPlanPrompt(k),
      messages: [{ role: "user", content: planUserMessage(input) + extra }, { role: "assistant", content: "{" }],
    }),
  });
  if (!r.ok) throw new Error(`anthropic ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const j = await r.json();
  return "{" + (j.content || []).map((b) => b.text || "").join("");
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
  try {
    const k = await knowledge(env);
    const products = productList(k);
    try { plan = parsePlan(await askClaude(env, key, k, input), products); }
    catch (e) {
      console.error("plan retry", e.message);
      plan = parsePlan(await askClaude(env, key, k, input, "\n\n(Reply with valid JSON only, using exact product names from the list.)"), products);
    }
  } catch (e) {
    console.error("plan", e.message);
    return json({ error: "We couldn't build your plan just now. Please call us at 770-299-9583, or try again in a minute." }, 502);
  }

  const site = env.SITE || "https://deepthought.marketing";
  const mix = plan.channels.map((x) => `${x.product} ${x.share}%`).join(", ");
  const work = [];
  if (env.LEADS_ENDPOINT) {
    const body = new URLSearchParams({
      name: input.name, phone: input.phone, email: input.email,
      business: `${input.business} (${input.trade}; ad plan: ${mix})`.slice(0, 290),
      page: meta.page || "/ad-plan.html", place: "ad-plan", utm: meta.utm || "{}", referrer: meta.referrer || "",
      source: meta.source || "", first_source: meta.first_source || "", first_page: meta.first_page || "",
      first_seen: meta.first_seen || "", timezone: meta.timezone || "", language: meta.language || "",
    });
    work.push(fetch(env.LEADS_ENDPOINT, { method: "POST", body }).then((x) => console.log("plan lead", x.status)));
  }
  const from = env.PLAN_FROM || "Deep Thought Marketing <plans@deepthought.marketing>";
  const replyTo = env.PLAN_REPLY_TO || "shajan@deepthought.marketing";
  work.push(resend(env, { from, to: [input.email], reply_to: replyTo, subject: `Your ad plan for ${input.business}`, html: planEmailHtml(plan, input, site) }));
  const notify = (env.PLAN_NOTIFY_TO || env.DIGEST_TO || "").split(",").map((x) => x.trim()).filter(Boolean);
  if (notify.length) work.push(resend(env, { from, to: notify, reply_to: input.email, subject: `New ad plan: ${input.business} (${input.trade}, ${input.location})`, html: planEmailHtml(plan, input, site, true) }));
  if (env.CHAT_LOG) {
    const d = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date()).replace(/-/g, "");
    work.push(env.CHAT_LOG.put(`p:${d}-${Math.random().toString(36).slice(2, 12)}`, JSON.stringify({ at: new Date().toISOString(), input, meta, plan }), { expirationTtl: 90 * 24 * 3600 }));
  }
  ctx.waitUntil(Promise.all(work.map((p) => Promise.resolve(p).catch((e) => console.error("plan side", e.message)))));
  return json({ ok: true, plan, emailed: !!env.RESEND_API_KEY });
}
