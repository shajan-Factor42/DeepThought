/**
 * leads.mjs — the lead capture system (CRO, 2026-10-01).
 *
 * Decided with Shajan: every page offers three ways to reach us, with the short form first.
 *   1. Main:   "Free Second Opinion" form — name, phone, business. Three fields, phone-friendly.
 *   2. Second: tap to call 770-299-9583 (sticky bar on phones).
 *   3. Third:  book a call on the Google Calendar page (book-a-demo.html).
 *
 * Where submissions go: a Google Apps Script web app that adds a row to the "DeepThought
 * Leads" Google Sheet in Shajan's Drive and emails him. Its URL lives in aeo-data.json
 * "leads.endpoint". Until that is set, the form falls back to the Web3Forms key the contact
 * page already uses, so no lead is lost while the Sheet is being set up.
 *
 * Tracking: analytics.js already pushes a submit event for any form with data-form-name, and
 * thank-you.html?form=second_opinion fires form_conversion. This adds phone_click,
 * booking_click and lead_cta_click events. In GTM, add a GA4 event tag per event name and
 * mark form_conversion and phone_click as key events.
 */

const PHONE = "770-299-9583";
const TEL = "tel:+17702999583";
const W3F_KEY = "afa90fc4-141b-45da-a8cb-7c4adcd1951d"; // same key as the contact page form

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const INPUT = "width:100%; box-sizing:border-box; height:48px; padding:0 14px; font-family:var(--font-body); " +
  "font-size:16px; color:var(--text-heading); background:var(--f42-white); border-radius:var(--radius-input); " +
  "border:1px solid var(--border-subtle); outline:none; margin:0 0 14px";
const LABEL = "display:block; font-size:13.5px; font-weight:600; color:var(--text-body); margin-bottom:6px";

/** The form card. `place` is recorded with the lead so we know which page converts. */
export function leadForm(endpoint, place, { heading = "Get your free Second Opinion", intro, bare = false } = {}) {
  const id = `lf-${place.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
  intro = intro || "Tell us a little about your business. We'll look at what you're running now, or what you're planning, and call you back with a straight answer on what it should cost. Free, no obligation.";
  return `<form class="dt-lead${bare ? "" : " dt-card"}" data-form-name="second_opinion" data-endpoint="${esc(endpoint || "")}" data-w3f="${W3F_KEY}" data-place="${esc(place)}" novalidate style="${bare ? "" : "background:var(--f42-white); border:1px solid var(--border-subtle); border-radius:20px; padding:28px; box-shadow:0 18px 50px rgba(15,40,90,0.08); "}max-width:520px; width:100%; box-sizing:border-box">
  <h2 style="font-family:var(--font-display); font-size:26px; font-weight:800; letter-spacing:-0.02em; line-height:1.15; margin:0 0 10px; color:var(--text-heading)">${esc(heading)}</h2>
  <p style="font-size:15px; line-height:1.55; color:var(--text-body); margin:0 0 20px">${esc(intro)}</p>
  <label for="${id}-name" style="${LABEL}">Your name</label>
  <input id="${id}-name" type="text" name="name" autocomplete="name" required placeholder="Jordan Reyes" style="${INPUT}">
  <label for="${id}-phone" style="${LABEL}">Phone <span style="font-weight:500; color:var(--text-muted)">(US)</span></label>
  <input id="${id}-phone" type="tel" name="phone" autocomplete="tel" inputmode="tel" required placeholder="(404) 555-0142" style="${INPUT}">
  <label for="${id}-biz" style="${LABEL}">Business or trade</label>
  <input id="${id}-biz" type="text" name="business" autocomplete="organization" required placeholder="e.g. Reyes Plumbing, Lawrenceville" style="${INPUT}">
  <label for="${id}-email" style="${LABEL}">Email <span style="font-weight:500; color:var(--text-muted)">(optional)</span></label>
  <input id="${id}-email" type="email" name="email" autocomplete="email" inputmode="email" placeholder="you@yourbusiness.com" style="${INPUT}">
  <input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute; left:-9999px; width:1px; height:1px; opacity:0">
  <button type="submit" style="width:100%; height:52px; border:0; border-radius:12px; background:var(--f42-gradient-button); color:#fff; font-family:var(--font-body); font-size:16.5px; font-weight:700; cursor:pointer; box-shadow:0 10px 24px rgba(0,102,255,0.22)">Send it. It's free</button>
  <p class="dt-lead-status" role="status" aria-live="polite" style="font-size:14px; color:#B42318; margin:10px 0 0; min-height:1px"></p>
  <p style="font-size:13.5px; line-height:1.55; color:var(--text-muted); margin:12px 0 0">We reply within one business day. Rather talk now? Call <a href="${TEL}" style="color:var(--color-accent); font-weight:600">${PHONE}</a> or <a href="book-a-demo.html" style="color:var(--color-accent)">pick a time</a>.</p>
</form>`;
}

/** A full-width band holding the form, for the home and pricing pages. */
export function leadSection(endpoint, place) {
  return `<section id="second-opinion" style="max-width:1100px; margin:0 auto; padding:72px 40px; display:flex; flex-wrap:wrap; gap:48px; align-items:center; justify-content:center">
  <div style="flex:1 1 320px; max-width:460px">
    <div style="font-size:13px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--color-accent)">Free Second Opinion</div>
    <h2 style="font-family:var(--font-display); font-size:36px; font-weight:800; letter-spacing:-0.03em; line-height:1.1; margin:12px 0 16px; color:var(--text-heading)">Not sure where your ad money is going?</h2>
    <p style="font-size:17px; line-height:1.6; color:var(--text-body); margin:0 0 18px">Already running ads, or thinking about it? We'll look at it and tell you, in plain English, what's working, what's wasting money, and what it should cost.</p>
    <ul style="list-style:none; padding:0; margin:0; font-size:16px; line-height:1.5; color:var(--text-body)">
      <li style="margin:0 0 10px">&#10003;&nbsp; A real person reviews it, not a robot</li>
      <li style="margin:0 0 10px">&#10003;&nbsp; No contract, no hard sell</li>
      <li style="margin:0 0 10px">&#10003;&nbsp; Based in Gwinnett County, GA</li>
    </ul>
  </div>
  ${leadForm(endpoint, place)}
</section>`;
}

/** Sticky call + form bar on phones. Hidden from 768px up, where the header shows both. */
export const MOBILE_BAR = `<style>
.dt-mbar{display:none}
.dt-lead.dt-card{padding:28px !important}
/* responsive.css zeroes side padding on anything with max-width inside a section; win it back */
@media (max-width:767px){section[style] form.dt-lead.dt-card[style]{padding:22px 18px !important}}
@media (max-width:767px){
  .dt-mbar{display:flex; gap:10px; position:fixed; left:0; right:0; bottom:0; z-index:60; padding:10px 12px calc(10px + env(safe-area-inset-bottom,0px)); background:rgba(255,255,255,0.97); border-top:1px solid var(--border-subtle); box-shadow:0 -6px 20px rgba(15,40,90,0.08)}
  .dt-mbar a{flex:1; display:flex; align-items:center; justify-content:center; height:48px; border-radius:12px; font-family:var(--font-body); font-size:15px; font-weight:700; text-decoration:none; white-space:nowrap}
  .dt-mbar a:first-child{flex:0 0 38%}
  body{padding-bottom:76px}
}
</style>
<nav class="dt-mbar" aria-label="Contact DeepThought">
  <a href="${TEL}" style="color:var(--f42-primary-blue); border:1.5px solid var(--f42-primary-blue); background:#fff">Call now</a>
  <a href="second-opinion.html" data-lead-cta="mobile-bar" style="color:#fff; background:var(--f42-gradient-button)">Free Second Opinion</a>
</nav>`;

/** Submits the form and records the three contact actions. No framework, ~40 lines. */
export const LEAD_SCRIPT = `<script>
(function(){
  function dl(o){window.dataLayer=window.dataLayer||[];window.dataLayer.push(o)}
  var LS={get:function(k){try{return JSON.parse(localStorage.getItem(k)||"null")}catch(x){return null}},
          set:function(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(x){}}};
  // Where did this visitor come from? Kept for 90 days: the first visit, and the latest visit that carried an ad tag.
  function tags(){var q={};try{new URLSearchParams(location.search).forEach(function(val,k){if(/^utm_|^gclid$|^gbraid$|^wbraid$|^fbclid$|^msclkid$|^ttclid$|^li_fat_id$/.test(k))q[k]=val.slice(0,100)})}catch(x){}return q}
  function extRef(){var r=document.referrer||"";try{return r&&new URL(r).hostname!==location.hostname?r:""}catch(x){return ""}}
  var now=Date.now(),t=tags(),hasTags=Object.keys(t).length>0,ref=extRef();
  var ft=LS.get("dt_ft");if(!ft||now-ft.ts>7776e6){ft={ts:now,page:location.pathname,ref:ref,tags:t};LS.set("dt_ft",ft)}
  if(hasTags||ref){LS.set("dt_lt",{ts:now,page:location.pathname,ref:ref,tags:t})}
  function label(x){if(!x)return "Unknown";var g=x.tags||{},s=(g.utm_source||"").toLowerCase(),m=(g.utm_medium||"").toLowerCase();
    if(g.gclid||g.gbraid||g.wbraid)return "Google Ads";if(g.msclkid)return "Microsoft Ads";if(g.ttclid)return "TikTok ad";if(g.li_fat_id)return "LinkedIn ad";
    if(s)return s+(m?" / "+m:"")+(g.utm_campaign?" ("+g.utm_campaign+")":"");
    if(g.fbclid)return "Facebook / Instagram";
    var h="";try{h=x.ref?new URL(x.ref).hostname.replace(/^www\\./,""):""}catch(e){}
    if(!h)return "Direct (typed, bookmark or app)";
    var map=[[/google\\./,"Google search"],[/bing\\./,"Bing search"],[/duckduckgo/,"DuckDuckGo"],[/yahoo\\./,"Yahoo search"],
      [/chatgpt|openai/,"ChatGPT"],[/perplexity/,"Perplexity"],[/claude\\.ai/,"Claude"],[/gemini\\.google|copilot/,"AI assistant"],
      [/facebook|fb\\.|messenger/,"Facebook"],[/instagram/,"Instagram"],[/linkedin|lnkd/,"LinkedIn"],[/t\\.co$|twitter|x\\.com/,"X"],
      [/tiktok/,"TikTok"],[/youtube|youtu\\.be/,"YouTube"],[/nextdoor/,"Nextdoor"],[/reddit/,"Reddit"]];
    for(var i=0;i<map.length;i++)if(map[i][0].test(h))return map[i][1];return h}
  function usPhone(raw){var d=raw.replace(/\\D/g,"");if(d.length===11&&d[0]==="1")d=d.slice(1);return /^[2-9]\\d{2}[2-9]\\d{6}$/.test(d)?d:""}
  document.addEventListener("click",function(e){
    var a=e.target.closest&&e.target.closest("a");if(!a)return;
    var h=a.getAttribute("href")||"";
    if(h.indexOf("tel:")===0)dl({event:"phone_click",page_path:location.pathname});
    else if(/book-a-demo\\.html|calendar\\.app\\.google|calendar\\.google/.test(h))dl({event:"booking_click",page_path:location.pathname});
    else if(a.hasAttribute("data-lead-cta"))dl({event:"lead_cta_click",cta:a.getAttribute("data-lead-cta"),page_path:location.pathname});
  });
  document.addEventListener("submit",function(e){
    var f=e.target;if(!f.classList||!f.classList.contains("dt-lead"))return;
    e.preventDefault();
    var st=f.querySelector(".dt-lead-status"),b=f.querySelector("button");
    var v=function(n){return(f.elements[n]&&f.elements[n].value||"").trim()};
    if(v("website"))return;
    if(!v("name")||!v("business")){st.textContent="Please add your name and your business or trade.";return}
    var ph=usPhone(v("phone"));
    if(!ph){st.textContent="Please enter a US phone number with area code, like (404) 555-0142.";f.elements.phone.focus();return}
    var em=v("email");if(em&&!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(em)){st.textContent="That email doesn't look right. Fix it or leave it blank.";f.elements.email.focus();return}
    b.disabled=true;b.textContent="Sending\\u2026";st.textContent="";
    var lt=LS.get("dt_lt")||ft,tz="";try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||""}catch(x){}
    var d={name:v("name"),phone:"("+ph.slice(0,3)+") "+ph.slice(3,6)+"-"+ph.slice(6),email:em,business:v("business"),
      page:location.pathname,place:f.getAttribute("data-place"),referrer:document.referrer,utm:JSON.stringify(t),
      source:label(lt),first_source:label(ft),first_page:ft.page,first_seen:new Date(ft.ts).toISOString().slice(0,10),
      timezone:tz,language:navigator.language||""};
    var ep=f.getAttribute("data-endpoint"),p;
    if(ep){p=fetch(ep,{method:"POST",mode:"no-cors",body:new URLSearchParams(d)})}
    else{var fd=new FormData();fd.append("access_key",f.getAttribute("data-w3f"));fd.append("subject","New Second Opinion request: "+d.business);fd.append("from_name","DeepThought website");
      Object.keys(d).forEach(function(k){fd.append(k,d[k])});p=fetch("https://api.web3forms.com/submit",{method:"POST",body:fd})}
    p.then(function(){location.href="thank-you.html?form=second_opinion"})
     .catch(function(){b.disabled=false;b.textContent="Send it. It's free";st.textContent="That didn't send. Please call us at ${PHONE}."});
  });
})();
</script>`;

/**
 * second-opinion.html, built from the contact page template: its intro becomes the Second
 * Opinion pitch and its form becomes the lead form. This is also where Ad 5's "Get a free
 * Second Opinion" CTA should land.
 */
export function secondOpinionPage(html, endpoint) {
  const swap = (a, b, label) => {
    if (!html.includes(a)) throw new Error(`second-opinion: ${label} not found — site.zip changed`);
    html = html.replace(a, b);
  };
  swap(">Tell us what you're running and we'll tell you what it should cost</h1>",
    ">Get a free Second Opinion on your marketing</h1>", "headline");
  const i0 = html.indexOf("We work with businesses nationwide.");
  const i1 = i0 === -1 ? -1 : html.indexOf("<", i0);
  if (i0 === -1 || i1 === -1) throw new Error("second-opinion: intro not found — site.zip changed");
  html = html.slice(0, i0) +
    "Already running ads, or about to? Send us three details. A real person looks at it and calls you back with a plain-English answer: what's working, what's wasting money, and what it should cost. Free, no contract, no hard sell." +
    html.slice(i1);
  const f0 = html.indexOf("<form"), f1 = html.indexOf("</form>");
  if (f0 === -1 || f1 === -1) throw new Error("second-opinion: form not found — site.zip changed");
  html = html.slice(0, f0) + leadForm(endpoint, "second-opinion-page", { heading: "Three quick details", intro: "Takes about 30 seconds. We'll call you back.", bare: true }) + html.slice(f1 + "</form>".length);
  swap('text-transform:uppercase; color:var(--text-muted)">Contact</div>',
    'text-transform:uppercase; color:var(--color-accent)">Free Second Opinion</div>', "eyebrow");
  return html;
}

/** Home hero: the main button becomes the Second Opinion (the form), not "Book a free demo". */
export function heroCta(html) {
  // The label is set later by the copy rewrite in aeo-data.json (">Try DeepThought now</span>" ->
  // ">Get a free Second Opinion</span>"); here we only point the button at the form.
  const t = html.indexOf(">Try DeepThought now<");
  const a = t === -1 ? -1 : Math.max(html.lastIndexOf('<a href="book-a-demo.html"', t), -1);
  if (t === -1 || a === -1 || t - a > 1500) throw new Error("index: hero demo button not found — site.zip changed");
  html = html.slice(0, a) + '<a href="#second-opinion" data-lead-cta="hero"' + html.slice(a + '<a href="book-a-demo.html"'.length);
  return html;
}

/** Insert the lead band after the first section (the hero) of a page body. */
export function afterHero(html, section, label) {
  const at = html.indexOf("</section>");
  if (at === -1) throw new Error(`${label}: no section to place the lead form after`);
  return html.slice(0, at + 10) + "\n" + section + html.slice(at + 10);
}
