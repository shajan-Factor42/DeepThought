/**
 * Sign-up / sign-in for the Claude connector (OAuth 2.1 for MCP), added 2026-10-25.
 *
 * Shajan, 2026-10-25: the connector is for lead gen. People create a Deep Thought account (name, phone,
 * email, email code) when they add the connector in Claude. For now these are Deep Thought logins on this
 * relay; the plan is to move them to AdOps.rocks logins later.
 *
 * Flow (what Claude does when a user adds https://<worker>/mcp as a custom connector):
 *   1. POST /mcp without a token        -> 401 + WWW-Authenticate pointing at the metadata below
 *   2. GET  /.well-known/oauth-protected-resource[/mcp], /.well-known/oauth-authorization-server
 *   3. POST /register                   -> client_id (dynamic client registration)
 *   4. GET  /authorize                  -> our sign-in page: email -> 6-digit code by email -> (new users) name,
 *                                          phone, business -> redirect back to Claude with ?code=
 *   5. POST /token                      -> access token (30 days) + refresh token (180 days)
 *
 * Everything (client ids, the pending sign-in, auth codes, tokens) is a signed, self-contained value, so no
 * step depends on Cloudflare KV having copied a write to another data centre yet. Signing key: the
 * OAUTH_SECRET Worker secret if set, otherwise derived from ANTHROPIC_API_KEY (rotating that key signs
 * everyone out, which is harmless: Claude asks them to sign in again).
 * Accounts are also saved in CHAT_LOG under `ou:<email>` (no expiry) as a record; new sign-ups go to the
 * leads sheet (LEADS_ENDPOINT, place "claude-connector").
 */
import { usDigits, resend } from "./plan.js";

const ACCESS_TTL = 30 * 24 * 3600;
const REFRESH_TTL = 180 * 24 * 3600;
const CODE_TTL = 5 * 60;
const FLOW_TTL = 15 * 60;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const enc = new TextEncoder();
const s = (v, max = 120) => String(v ?? "").replace(/[\u0000-\u001f]+/g, " ").trim().slice(0, max);
const now = () => Math.floor(Date.now() / 1000);
const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

/* ---------- signing ---------- */
const b64u = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const b64uText = (t) => b64u(enc.encode(t));
const unb64uText = (t) => new TextDecoder().decode(Uint8Array.from(atob(t.replace(/-/g, "+").replace(/_/g, "/")), (ch) => ch.charCodeAt(0)));
const keys = new Map();
async function hmacKey(env) {
  const base = env.OAUTH_SECRET || `dt-connector-v1:${env.ANTHROPIC_API_KEY || ""}`;
  if (!keys.has(base)) keys.set(base, crypto.subtle.importKey("raw", enc.encode(base), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]));
  return keys.get(base);
}
async function mac(env, text) { return b64u(await crypto.subtle.sign("HMAC", await hmacKey(env), enc.encode(text))); }
/** Sign a payload of type `t`, valid for `ttl` seconds. */
export async function seal(env, t, payload, ttl) {
  const body = b64uText(JSON.stringify({ ...payload, t, x: now() + ttl }));
  return `${body}.${await mac(env, t + "." + body)}`;
}
/** Verify and open a sealed value of type `t`; null if forged, wrong type or expired. */
export async function open(env, t, token) {
  const [body, sig, extra] = String(token || "").split(".");
  if (!body || !sig || extra !== undefined) return null;
  const want = await mac(env, t + "." + body);
  if (want.length !== sig.length) return null;
  let diff = 0; for (let i = 0; i < want.length; i++) diff |= want.charCodeAt(i) ^ sig.charCodeAt(i);
  if (diff) return null;
  try { const p = JSON.parse(unb64uText(body)); return p.t === t && p.x > now() ? p : null; } catch { return null; }
}
async function sha256b64u(text) { return b64u(await crypto.subtle.digest("SHA-256", enc.encode(text))); }

/* ---------- small helpers ---------- */
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, content-type, mcp-protocol-version", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Expose-Headers": "WWW-Authenticate" };
const json = (o, status = 200, extra = {}) => new Response(JSON.stringify(o), { status, headers: { ...CORS, "Content-Type": "application/json", "Cache-Control": "no-store", ...extra } });
const oauthError = (error, description, status = 400) => json({ error, error_description: description }, status);
export const AUTH_PATHS = new Set(["/.well-known/oauth-protected-resource", "/.well-known/oauth-protected-resource/mcp", "/.well-known/oauth-authorization-server", "/register", "/authorize", "/token"]);
export const corsPreflight = () => new Response(null, { status: 204, headers: { ...CORS, "Access-Control-Max-Age": "86400" } });

const bursts = new Map();
function burst(key, limit, windowMs) {
  const t = Date.now();
  const list = (bursts.get(key) || []).filter((x) => t - x < windowMs);
  list.push(t); bursts.set(key, list);
  if (bursts.size > 5000) bursts.clear();
  return list.length > limit;
}
const okRedirect = (u) => { try { const x = new URL(u); return x.protocol === "https:" || (x.protocol === "http:" && /^(localhost|127\.0\.0\.1|\[::1\])$/.test(x.hostname)); } catch { return false; } };

/* ---------- /mcp guard ---------- */
/** The signed-in user for an /mcp request, or null. */
export async function userFromRequest(request, env) {
  const m = /^Bearer\s+(\S+)$/i.exec(request.headers.get("Authorization") || "");
  if (!m) return null;
  const p = await open(env, "at", m[1]);
  return p ? { email: p.e, name: p.n, phone: p.p, business: p.b } : null;
}
export function unauthorized(origin) {
  return new Response(JSON.stringify({ jsonrpc: "2.0", id: null, error: { code: -32001, message: "Please sign in to Deep Thought to use this connector." } }), {
    status: 401,
    headers: { ...CORS, "Content-Type": "application/json", "WWW-Authenticate": `Bearer resource_metadata="${origin}/.well-known/oauth-protected-resource/mcp"` },
  });
}

/* ---------- the routes ---------- */
export async function handleAuth(request, env, ctx) {
  const url = new URL(request.url);
  const origin = url.origin;
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const p = url.pathname;

  if (p.startsWith("/.well-known/oauth-protected-resource")) {
    return json({ resource: `${origin}/mcp`, authorization_servers: [origin], bearer_methods_supported: ["header"], scopes_supported: ["plans"], resource_name: "Deep Thought Marketing" });
  }
  if (p === "/.well-known/oauth-authorization-server") {
    return json({
      issuer: origin, authorization_endpoint: `${origin}/authorize`, token_endpoint: `${origin}/token`, registration_endpoint: `${origin}/register`,
      response_types_supported: ["code"], grant_types_supported: ["authorization_code", "refresh_token"],
      code_challenge_methods_supported: ["S256"], token_endpoint_auth_methods_supported: ["none", "client_secret_post"], scopes_supported: ["plans"],
      service_documentation: `${env.SITE || "https://deepthought.marketing"}/digital-media-plan-builder.html`,
    });
  }
  if (p === "/register") {
    if (request.method !== "POST") return oauthError("invalid_request", "Use POST.", 405);
    if (burst("reg:" + ip, 30, 10 * 60 * 1000)) return oauthError("slow_down", "Too many registrations. Try again later.", 429);
    let b; try { b = await request.json(); } catch { return oauthError("invalid_client_metadata", "Body must be JSON."); }
    const uris = Array.isArray(b.redirect_uris) ? b.redirect_uris.map((u) => s(u, 500)).filter(Boolean).slice(0, 5) : [];
    if (!uris.length || !uris.every(okRedirect)) return oauthError("invalid_redirect_uri", "redirect_uris must be https (or http on localhost).");
    const name = s(b.client_name, 80) || "Claude";
    const client_id = await seal(env, "ci", { r: uris, n: name }, 5 * 365 * 24 * 3600);
    return json({ client_id, client_id_issued_at: now(), client_name: name, redirect_uris: uris, grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"], token_endpoint_auth_method: "none" }, 201);
  }
  if (p === "/authorize") return authorize(request, env, ctx, url, ip);
  if (p === "/token") return token(request, env);
  return json({ error: "not_found" }, 404);
}

/* ---------- /authorize: the sign-in page ---------- */
async function authorize(request, env, ctx, url, ip) {
  if (request.method === "GET") {
    const q = url.searchParams;
    const client = await open(env, "ci", q.get("client_id"));
    const redirect = q.get("redirect_uri") || "";
    // Bad client or redirect: show an error, never redirect to an unchecked address.
    if (!client) return page(env, { error: "This sign-in link isn't valid. Please remove the Deep Thought connector in Claude and add it again." }, 400);
    const uri = redirect || (client.r.length === 1 ? client.r[0] : "");
    if (!client.r.includes(uri)) return page(env, { error: "This sign-in link isn't valid (unknown return address). Please add the connector again." }, 400);
    const back = (err, desc) => { const u = new URL(uri); u.searchParams.set("error", err); if (desc) u.searchParams.set("error_description", desc); if (q.get("state")) u.searchParams.set("state", q.get("state")); return Response.redirect(u.toString(), 302); };
    if (q.get("response_type") !== "code") return back("unsupported_response_type", "Only code is supported.");
    if (!q.get("code_challenge") || (q.get("code_challenge_method") || "S256") !== "S256") return back("invalid_request", "PKCE with S256 is required.");
    const req = { c: q.get("client_id"), r: uri, s: s(q.get("state"), 500), ch: s(q.get("code_challenge"), 128) };
    const flow = await seal(env, "fl", { req }, FLOW_TTL);
    return page(env, { step: "email", flow, client: client.n });
  }
  if (request.method !== "POST") return new Response(null, { status: 405, headers: { Allow: "GET, POST" } });

  let f; try { f = Object.fromEntries(await request.formData()); } catch { return page(env, { error: "Something went wrong. Please start again from Claude." }, 400); }
  // Step 1: email -> send a code.
  if (f.step === "email") {
    const fl = await open(env, "fl", f.flow);
    if (!fl) return page(env, { error: "This sign-in took too long or the link isn't valid. Please go back to Claude and try connecting again." }, 400);
    const email = s(f.email, 120).toLowerCase();
    if (!EMAIL_RE.test(email)) return page(env, { step: "email", flow: f.flow, email, error: "Please enter a valid email address." });
    if (burst("code:" + ip, 10, 60 * 60 * 1000) || burst("code:" + email, 5, 60 * 60 * 1000))
      return page(env, { step: "email", flow: f.flow, email, error: "Too many codes sent. Please wait a bit and try again, or call 770-299-9583." });
    const code = String(crypto.getRandomValues(new Uint32Array(1))[0] % 1000000).padStart(6, "0");
    const rec = env.CHAT_LOG ? await env.CHAT_LOG.get(`ou:${email}`, "json").catch(() => null) : null;
    const existing = rec && rec.name && usDigits(rec.phone) ? rec : null; // only skip the details form if we have them
    const sent = await sendCode(env, email, code);
    if (!sent) return page(env, { step: "email", flow: f.flow, email, error: "We couldn't send the code just now. Please try again in a minute, or call 770-299-9583." });
    const vf = await seal(env, "vf", { req: fl.req, e: email, h: await mac(env, "code:" + email + ":" + code), known: !!existing, name: existing?.name || "", phone: existing?.phone || "", business: existing?.business || "" }, FLOW_TTL);
    return page(env, { step: "code", flow: vf, email, known: !!existing });
  }

  // Step 2: code (+ details for new accounts) -> account -> back to Claude.
  if (f.step === "code") {
    const vf = await open(env, "vf", f.flow);
    if (!vf) return page(env, { error: "This sign-in took too long. Please go back to Claude and try connecting again." }, 400);
    const keep = { step: "code", flow: f.flow, email: vf.e, known: vf.known, name: f.name, phone: f.phone, business: f.business };
    if (burst("try:" + vf.e, 8, FLOW_TTL * 1000)) return page(env, { error: "Too many tries. Please go back to Claude and start again." }, 429);
    const code = s(f.code, 12).replace(/\D/g, "");
    if (code.length !== 6 || (await mac(env, "code:" + vf.e + ":" + code)) !== vf.h) return page(env, { ...keep, error: "That code doesn't match. Check the email we sent and try again." });
    const name = s(f.name, 80) || vf.name, business = s(f.business, 100) || vf.business;
    const d = usDigits(f.phone) || usDigits(vf.phone);
    if (!name) return page(env, { ...keep, error: "Please enter your name." });
    if (!d) return page(env, { ...keep, error: "Please enter a US phone number with area code, like (404) 555-0142." });
    if (f.agree !== "yes" && !vf.known) return page(env, { ...keep, error: "Please tick the box to agree to the terms." });
    const phone = `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
    const user = { email: vf.e, name, phone, business, updated: new Date().toISOString() };
    const isNew = !vf.known;
    const work = [];
    if (env.CHAT_LOG) work.push((async () => {
      const prev = (await env.CHAT_LOG.get(`ou:${vf.e}`, "json").catch(() => null)) || {};
      await env.CHAT_LOG.put(`ou:${vf.e}`, JSON.stringify({ ...prev, ...user, created: prev.created || user.updated, via: "claude-connector" }));
    })());
    if (isNew && env.LEADS_ENDPOINT) {
      const body = new URLSearchParams({ name, phone, email: vf.e, business: `${business || "(no business name)"} (signed up for the Claude connector)`.slice(0, 290),
        page: "/mcp", place: "claude-connector", utm: "{}", referrer: "", source: "Claude connector", first_source: "Claude connector", first_page: "/mcp",
        first_seen: user.updated, timezone: "", language: "" });
      work.push(fetch(env.LEADS_ENDPOINT, { method: "POST", body }).then((x) => console.log("connector signup lead", x.status)));
    }
    ctx.waitUntil(Promise.all(work.map((x) => Promise.resolve(x).catch((e) => console.error("signup side", e.message)))));
    const authCode = await seal(env, "ac", { e: vf.e, n: name, p: phone, b: business, c: await sha256b64u(vf.req.c), r: vf.req.r, ch: vf.req.ch }, CODE_TTL);
    const u = new URL(vf.req.r);
    u.searchParams.set("code", authCode);
    if (vf.req.s) u.searchParams.set("state", vf.req.s);
    return Response.redirect(u.toString(), 302);
  }
  return page(env, { error: "Something went wrong. Please start again from Claude." }, 400);
}

async function sendCode(env, email, code) {
  if (!env.RESEND_API_KEY) { console.error("connector: RESEND_API_KEY missing, can't send sign-in code"); return false; }
  const from = env.PLAN_FROM || "Deep Thought Marketing <plans@deepthought.marketing>";
  try {
    const r = await fetch(env.RESEND_URL || "https://api.resend.com/emails", {
      method: "POST", headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [email], subject: `Your Deep Thought sign-in code: ${code}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;color:#0f172a"><h2 style="color:#0b5fff">Deep Thought Marketing</h2><p>Your sign-in code for the Deep Thought connector in Claude is:</p><p style="font-size:32px;font-weight:bold;letter-spacing:6px">${code}</p><p style="color:#64748b;font-size:13px">It works for 15 minutes. If you didn't ask for this, you can ignore this email.</p></div>`,
        text: `Your Deep Thought sign-in code is ${code}. It works for 15 minutes.` }),
    });
    if (!r.ok) { console.error("sign-in code email", r.status, (await r.text()).slice(0, 200)); return false; }
    return true;
  } catch (e) { console.error("sign-in code email", e.message); return false; }
}

/* ---------- /token ---------- */
async function token(request, env) {
  if (request.method !== "POST") return oauthError("invalid_request", "Use POST.", 405);
  let f;
  try {
    const ct = request.headers.get("content-type") || "";
    f = ct.includes("application/json") ? await request.json() : Object.fromEntries(await request.formData());
  } catch { return oauthError("invalid_request", "Couldn't read the request."); }
  const issue = async (u, clientHash) => ({
    access_token: await seal(env, "at", { e: u.e, n: u.n, p: u.p, b: u.b, c: clientHash }, ACCESS_TTL),
    token_type: "Bearer", expires_in: ACCESS_TTL, scope: "plans",
    refresh_token: await seal(env, "rt", { e: u.e, n: u.n, p: u.p, b: u.b, c: clientHash }, REFRESH_TTL),
  });
  if (f.grant_type === "authorization_code") {
    const ac = await open(env, "ac", f.code);
    if (!ac) return oauthError("invalid_grant", "The code is invalid or expired.");
    if (!f.client_id || (await sha256b64u(f.client_id)) !== ac.c) return oauthError("invalid_grant", "client_id doesn't match.");
    if (f.redirect_uri && f.redirect_uri !== ac.r) return oauthError("invalid_grant", "redirect_uri doesn't match.");
    if (!f.code_verifier || (await sha256b64u(f.code_verifier)) !== ac.ch) return oauthError("invalid_grant", "PKCE check failed.");
    return json(await issue(ac, ac.c));
  }
  if (f.grant_type === "refresh_token") {
    const rt = await open(env, "rt", f.refresh_token);
    if (!rt) return oauthError("invalid_grant", "The refresh token is invalid or expired.");
    if (f.client_id && (await sha256b64u(f.client_id)) !== rt.c) return oauthError("invalid_grant", "client_id doesn't match.");
    return json(await issue(rt, rt.c));
  }
  return oauthError("unsupported_grant_type", "Use authorization_code or refresh_token.");
}

/* ---------- the page ---------- */
function page(env, o, status = 200) {
  const site = env.SITE || "https://deepthought.marketing";
  const field = (name, label, type, val, extra = "") => `<label>${label}<input name="${name}" type="${type}" value="${esc(val)}" ${extra}></label>`;
  let body;
  if (!o.step) body = `<p class="err">${esc(o.error)}</p><p>Questions? Call <a href="tel:7702999583">770-299-9583</a>.</p>`;
  else if (o.step === "email") body = `
    <p>Sign in or create a free account to get your digital media plan in Claude.</p>
    ${o.error ? `<p class="err">${esc(o.error)}</p>` : ""}
    <form method="post"><input type="hidden" name="flow" value="${esc(o.flow)}"><input type="hidden" name="step" value="email">
      ${field("email", "Email", "email", o.email, 'required autocomplete="email" autofocus')}
      <button>Send me a code</button></form>
    <p class="small">We'll email you a 6-digit code. No password needed.</p>`;
  else body = `
    <p>We sent a 6-digit code to <b>${esc(o.email)}</b>.${o.known ? " Welcome back." : " Enter it below to create your account."}</p>
    ${o.error ? `<p class="err">${esc(o.error)}</p>` : ""}
    <form method="post"><input type="hidden" name="flow" value="${esc(o.flow)}"><input type="hidden" name="step" value="code">
      ${field("code", "Code from the email", "text", "", 'required inputmode="numeric" autocomplete="one-time-code" maxlength="6" autofocus')}
      ${o.known ? "" : `
      ${field("name", "Your name", "text", o.name, 'required autocomplete="name"')}
      ${field("phone", "Phone", "tel", o.phone, 'required autocomplete="tel" placeholder="(404) 555-0142"')}
      ${field("business", "Business name (optional)", "text", o.business, 'autocomplete="organization"')}
      <label class="check"><input type="checkbox" name="agree" value="yes" required><span>I agree that Deep Thought may call, text or email me about my plan and its services, and to the <a href="${site}/terms.html" target="_blank">Terms</a> and <a href="${site}/privacy.html" target="_blank">Privacy Policy</a>.</span></label>`}
      <button>${o.known ? "Sign in" : "Create my account"}</button></form>
    <p class="small">Didn't get it? Check spam, or close this window and connect again to get a new code.</p>`;
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">
<title>Sign in | Deep Thought Marketing</title><style>
body{margin:0;background:#f5f9ff;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#0f172a}
main{max-width:420px;margin:40px auto;background:#fff;border-radius:16px;padding:28px 24px;box-shadow:0 8px 30px rgba(11,95,255,.08)}
h1{font-size:22px;margin:0 0 4px;background:linear-gradient(90deg,#0b5fff,#06b6d4);-webkit-background-clip:text;background-clip:text;color:transparent}
.sub{color:#475569;margin:0 0 18px;font-size:14px} p{line-height:1.5} label{display:block;margin:12px 0;font-size:14px;font-weight:600}
input[type=email],input[type=text],input[type=tel]{display:block;width:100%;box-sizing:border-box;margin-top:6px;padding:12px;border:1px solid #cbd5e1;border-radius:10px;font-size:16px}
.check{font-weight:400;font-size:13px;color:#334155;display:flex;gap:8px;align-items:flex-start}.check input{margin-top:3px}
button{width:100%;margin-top:10px;padding:14px;border:0;border-radius:10px;background:#0b5fff;color:#fff;font-size:16px;font-weight:700;cursor:pointer}
.err{color:#b91c1c;background:#fef2f2;padding:10px 12px;border-radius:8px}.small{font-size:13px;color:#64748b}a{color:#0b5fff}
@media(max-width:480px){main{margin:16px;padding:22px 16px}}</style></head>
<body><main><h1>Deep Thought Marketing</h1><p class="sub">Free digital media plans in Claude</p>${body}</main></body></html>`;
  return new Response(html, { status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Frame-Options": "DENY", "Referrer-Policy": "no-referrer" } });
}
