/**
 * adplan.mjs — the free ad plan page, ad-plan.html (2026-10-15).
 *
 * A visitor answers a few questions (business, area, goal, ad budget, what they run today, and
 * where to send the plan). The chat relay's /plan route (chat-worker/src/plan.js) asks Claude
 * for a starting mix from our 22 products, checks it, sends the lead to the lead sheet, and
 * emails the plan. The report renders on this page.
 *
 * Built from the contact page template for the header, footer and styles; everything between
 * the header and the footer is replaced. Decisions: DECISIONS.md, 2026-10-15.
 */

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Keep these lists identical to OPTIONS in chat-worker/src/plan.js (the worker rejects anything else).
export const PLAN_OPTIONS = {
  radius: ["Just my town", "About 10 miles", "About 25 miles", "My whole metro area", "My whole state", "Nationwide or online"],
  goal: ["More phone calls", "More booked appointments", "More quote requests or leads", "More store or showroom visits",
    "More online sales", "Get known in my area"],
  budget: ["Under $1,000", "$1,000 to $2,500", "$2,500 to $5,000", "$5,000 to $10,000", "Over $10,000", "Not sure yet"],
  current: ["Google Search ads", "Google Business Profile", "Facebook or Instagram ads", "Local Services Ads", "Nextdoor",
    "Email marketing", "An agency runs my ads", "Nothing yet"],
};
const TRADES = ["HVAC", "Plumbing", "Roofing", "Electrical", "Landscaping", "Pest control", "House cleaning", "Remodeling or contracting",
  "Dental practice", "Medical practice", "Law firm", "Accounting", "Real estate", "Auto repair", "Restaurant", "Salon or spa",
  "Fitness studio", "Retail store", "Online store", "Pet services", "Childcare", "Insurance agency"];

const INPUT = "width:100%; box-sizing:border-box; height:48px; padding:0 14px; font-family:var(--font-body); font-size:16px; " +
  "color:var(--text-heading); background:var(--f42-white); border-radius:var(--radius-input, 10px); border:1px solid var(--border-subtle); outline:none";
const LABEL = "display:block; font-size:13.5px; font-weight:600; color:var(--text-body); margin:0 0 6px";
const field = (label, html, extra = "") => `<div class="ap-f"${extra}><label style="${LABEL}">${label}</label>${html}</div>`;
const select = (name, list, id) => `<select id="${id}" name="${name}" required style="${INPUT}; appearance:auto"><option value="">Choose one</option>${list.map((o) => `<option>${esc(o)}</option>`).join("")}</select>`;

function formHtml(endpoint) {
  const chips = PLAN_OPTIONS.current.map((o, i) =>
    `<label class="ap-chip"><input type="checkbox" name="current" value="${esc(o)}" id="ap-c${i}"><span>${esc(o)}</span></label>`).join("");
  return `<form id="ap-form" class="ap-card" data-endpoint="${esc(endpoint)}" novalidate>
  <h2 class="ap-h2">About your business</h2>
  <div class="ap-grid">
    ${field('Business name', `<input name="business" autocomplete="organization" required placeholder="e.g. Reyes Plumbing" style="${INPUT}">`)}
    ${field('What does it do?', `<input name="trade" list="ap-trades" required placeholder="e.g. Plumbing" style="${INPUT}"><datalist id="ap-trades">${TRADES.map((t) => `<option value="${esc(t)}">`).join("")}</datalist>`)}
    ${field('Town or ZIP code', `<input name="location" autocomplete="address-level2" required placeholder="e.g. Lawrenceville, GA" style="${INPUT}">`)}
    ${field('How far do you serve?', select("radius", PLAN_OPTIONS.radius, "ap-radius"))}
    ${field('Main goal', select("goal", PLAN_OPTIONS.goal, "ap-goal"))}
    ${field('Monthly ad budget', select("budget", PLAN_OPTIONS.budget, "ap-budget"))}
  </div>
  <fieldset class="ap-fs"><legend style="${LABEL}">What do you run today? <span style="font-weight:500; color:var(--text-muted)">(pick any)</span></legend><div class="ap-chips">${chips}</div></fieldset>
  ${field('Anything else we should know? <span style="font-weight:500; color:var(--text-muted)">(optional)</span>', `<textarea name="notes" maxlength="400" rows="3" placeholder="e.g. Busy in winter, want more water heater jobs" style="${INPUT}; height:auto; padding:12px 14px; resize:vertical"></textarea>`)}
  <h2 class="ap-h2" style="margin-top:26px">Where should we send it?</h2>
  <div class="ap-grid">
    ${field('Your name', `<input name="name" autocomplete="name" required placeholder="Jordan Reyes" style="${INPUT}">`)}
    ${field('Phone <span style="font-weight:500; color:var(--text-muted)">(US)</span>', `<input name="phone" type="tel" inputmode="tel" autocomplete="tel" required placeholder="(404) 555-0142" style="${INPUT}">`)}
    ${field('Email', `<input name="email" type="email" inputmode="email" autocomplete="email" required placeholder="you@yourbusiness.com" style="${INPUT}">`, ' style="grid-column:1/-1"')}
  </div>
  <input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute; left:-9999px; width:1px; height:1px; opacity:0">
  <button type="submit" class="ap-btn">Build my free ad plan</button>
  <p class="ap-status" role="status" aria-live="polite"></p>
  <p style="font-size:13px; line-height:1.5; color:var(--text-muted); margin:10px 0 0">We'll email you the plan, and someone from our team may call to see if you have questions. No spam, and we never share your details. <a href="privacy.html" style="color:inherit">Privacy</a>.</p>
</form>`;
}

const CSS = `<style>
.ap-wrap{max-width:1180px; margin:0 auto; padding:72px 40px 96px}
.ap-cols{display:grid; grid-template-columns:minmax(0,1.6fr) minmax(0,1fr); gap:32px; align-items:start}
.ap-card{position:relative; background:var(--f42-white); border:1px solid var(--border-subtle); border-radius:20px; padding:32px; box-shadow:0 18px 50px rgba(15,40,90,0.08); box-sizing:border-box}
.ap-h2{font-family:var(--font-display); font-size:22px; font-weight:800; letter-spacing:-0.02em; color:var(--text-heading); margin:0 0 16px}
.ap-grid{display:grid; grid-template-columns:1fr 1fr; gap:14px 16px; margin:0 0 16px}
.ap-fs{border:0; padding:0; margin:0 0 16px; min-width:0}
.ap-chips{display:flex; flex-wrap:wrap; gap:8px}
.ap-chip{cursor:pointer}.ap-chip input{position:absolute; opacity:0; width:1px; height:1px}
.ap-chip span{display:inline-block; padding:9px 14px; border-radius:999px; border:1px solid var(--border-subtle); background:var(--f42-white); font-size:14px; color:var(--text-body)}
.ap-chip input:checked+span{background:rgba(0,102,255,0.08); border-color:var(--f42-primary-blue, #0066FF); color:var(--f42-primary-blue, #0066FF); font-weight:600}
.ap-chip input:focus-visible+span{outline:2px solid #00B4D8; outline-offset:2px}
.ap-btn{width:100%; height:54px; margin-top:20px; border:0; border-radius:12px; background:var(--f42-gradient-button); color:#fff; font-family:var(--font-body); font-size:17px; font-weight:700; cursor:pointer; box-shadow:0 10px 24px rgba(0,102,255,0.22)}
.ap-btn:disabled{opacity:.7; cursor:default}
.ap-status{font-size:14.5px; color:#B42318; margin:12px 0 0; min-height:1px}
.ap-side h3{font-family:var(--font-display); font-size:18px; font-weight:800; color:var(--text-heading); margin:0 0 12px}
.ap-side ul{margin:0; padding-left:20px; line-height:1.6; color:var(--text-body)}
.ap-bar{height:10px; border-radius:6px; background:#E6EEFF; overflow:hidden; margin:6px 0 8px}
.ap-bar i{display:block; height:100%; border-radius:6px; background:linear-gradient(90deg,#0066FF,#00B4D8)}
.ap-ch{padding:14px 0; border-top:1px solid var(--border-subtle)}
.ap-ch:first-child{border-top:0}
.ap-ch b{font-family:var(--font-display); font-size:17px; color:var(--text-heading)}
.ap-ch em{font-style:normal; float:right; font-weight:800; color:var(--f42-primary-blue, #0066FF)}
.ap-ch p{margin:0; font-size:15px; line-height:1.55; color:var(--text-body)}
.ap-rep h3{font-family:var(--font-display); font-size:20px; font-weight:800; color:var(--text-heading); margin:28px 0 10px}
.ap-rep ol,.ap-rep ul{padding-left:22px; line-height:1.6; color:var(--text-body); margin:0}
.ap-rep li{margin:0 0 6px}
.ap-spin{display:inline-block; width:16px; height:16px; border:2px solid rgba(255,255,255,.5); border-top-color:#fff; border-radius:50%; animation:apspin .8s linear infinite; vertical-align:-3px; margin-right:8px}
@keyframes apspin{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion:reduce){.ap-spin{animation:none}}
@media (max-width:900px){.ap-wrap{padding:48px 0 72px !important}.ap-cols{grid-template-columns:minmax(0,1fr)}}
@media (max-width:620px){.ap-grid{grid-template-columns:minmax(0,1fr)}.ap-card{padding:22px 18px}}
</style>`;

const SCRIPT = `<script>
(function(){
  var f=document.getElementById("ap-form");if(!f)return;
  var out=document.getElementById("ap-report"),st=f.querySelector(".ap-status"),b=f.querySelector(".ap-btn");
  function dl(o){window.dataLayer=window.dataLayer||[];window.dataLayer.push(o)}
  function e(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
  function usPhone(raw){var d=raw.replace(/\\D/g,"");if(d.length===11&&d[0]==="1")d=d.slice(1);return /^[2-9]\\d{2}[2-9]\\d{6}$/.test(d)?d:""}
  var started=false;f.addEventListener("input",function(){if(!started){started=true;dl({event:"ad_plan_start"})}});
  f.addEventListener("submit",function(ev){
    ev.preventDefault();
    var v=function(n){return(f.elements[n]&&f.elements[n].value||"").trim()};
    if(v("website"))return;
    var miss=["business","trade","location","radius","goal","budget","name"].filter(function(n){return !v(n)});
    if(miss.length){st.textContent="Please fill in every question above (only the last box is optional).";f.elements[miss[0]].focus();return}
    if(!usPhone(v("phone"))){st.textContent="Please enter a US phone number with area code, like (404) 555-0142.";f.elements.phone.focus();return}
    if(!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(v("email"))){st.textContent="Please enter an email address so we can send you the plan.";f.elements.email.focus();return}
    var d={};["business","trade","location","radius","goal","budget","notes","name","phone","email","website"].forEach(function(n){d[n]=v(n)});
    d.current=[].slice.call(f.querySelectorAll('input[name=current]:checked')).map(function(x){return x.value});
    var info=window.dtLeadInfo?window.dtLeadInfo():{};for(var k in info)d[k]=info[k];
    d.page=location.pathname;
    st.textContent="";b.disabled=true;b.innerHTML='<span class="ap-spin" aria-hidden="true"></span>Building your plan\\u2026 about 15 seconds';
    fetch(f.getAttribute("data-endpoint"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)})
      .then(function(r){return r.json().then(function(j){if(!r.ok||!j.plan)throw new Error(j.error||"");return j})})
      .then(function(j){show(j,d);dl({event:"form_conversion",form:"ad_plan"});dl({event:"ad_plan_generated",ad_budget:d.budget,goal:d.goal})})
      .catch(function(x){b.disabled=false;b.textContent="Build my free ad plan";st.textContent=(x&&x.message)||"That didn't go through. Please call us at 770-299-9583."});
  });
  function show(j,d){
    var p=j.plan,h='<p style="font-size:13px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:var(--color-accent, #0066FF); margin:0 0 10px">Your free ad plan</p>'+
      '<h2 style="font-family:var(--font-display); font-size:30px; font-weight:800; letter-spacing:-0.02em; line-height:1.15; color:var(--text-heading); margin:0 0 12px">'+e(d.business)+'</h2>'+
      '<p style="font-size:17px; line-height:1.6; color:var(--text-body); margin:0 0 22px">'+e(p.headline)+'</p>'+
      '<h3 style="margin-top:0">How to split your monthly ad budget</h3><p style="font-size:14px; color:var(--text-muted); margin:-4px 0 8px">'+e(d.budget)+' a month, your own ad spend</p>'+
      p.channels.map(function(c){return '<div class="ap-ch"><b>'+e(c.product)+'</b><em>'+c.share+'%</em><div class="ap-bar"><i style="width:'+c.share+'%"></i></div><p>'+e(c.why)+'</p></div>'}).join("")+
      (p.firstMonth.length?'<h3>Your first month</h3><ol>'+p.firstMonth.map(function(x){return'<li>'+e(x)+'</li>'}).join("")+'</ol>':'')+
      (p.watch.length?'<h3>Numbers to watch</h3><ul>'+p.watch.map(function(x){return'<li>'+e(x)+'</li>'}).join("")+'</ul>':'')+
      (p.note?'<p style="background:var(--f42-bg, #F0F4FF); border-radius:12px; padding:14px 16px; margin:24px 0 0; line-height:1.55; color:var(--text-body)">'+e(p.note)+'</p>':'')+
      '<div style="margin:28px 0 0; padding:22px; border-radius:16px; border:1px solid var(--border-subtle); background:var(--f42-white)">'+
      '<p style="font-family:var(--font-display); font-size:19px; font-weight:800; color:var(--text-heading); margin:0 0 6px">Want us to run this for you?</p>'+
      '<p style="margin:0 0 14px; line-height:1.55; color:var(--text-body)">A real person will look at your plan and what you run today, and call you back within 24 hours with a straight answer.</p>'+
      '<div style="display:flex; flex-wrap:wrap; gap:10px"><a href="second-opinion.html" data-lead-cta="ad-plan" style="display:inline-flex; align-items:center; height:48px; padding:0 20px; border-radius:12px; background:var(--f42-gradient-button); color:#fff; font-weight:700; text-decoration:none">Get a free Second Opinion</a>'+
      '<a href="tel:+17702999583" style="display:inline-flex; align-items:center; height:48px; padding:0 20px; border-radius:12px; border:1.5px solid var(--f42-primary-blue, #0066FF); color:var(--f42-primary-blue, #0066FF); font-weight:700; text-decoration:none">Call 770-299-9583</a></div></div>'+
      '<p style="font-size:13px; line-height:1.5; color:var(--text-muted); margin:18px 0 0">'+(j.emailed?'We also emailed this plan to '+e(d.email)+'. ':'')+'This is a starting suggestion based on what you told us, made with the help of AI. It is not a quote or a promise of results.</p>';
    out.innerHTML=h;f.style.display="none";out.style.display="block";
    var top=out.getBoundingClientRect().top+window.pageYOffset-90;window.scrollTo({top:top,behavior:"smooth"});out.focus({preventScroll:true});
  }
})();
</script>`;

const BODY = (endpoint) => `${CSS}
<section style="max-width:1180px; margin:0 auto; padding:72px 40px 0">
  <div style="font-size:12.5px; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; color:var(--color-accent)">Free ad plan</div>
  <h1 style="font-family:var(--font-display); font-size:52px; font-weight:800; letter-spacing:-0.035em; line-height:1.05; color:var(--text-heading); margin:16px 0 0; max-width:820px; text-wrap:pretty">Get a free ad plan for your business</h1>
  <p style="font-size:19px; line-height:1.6; color:var(--text-body); max-width:720px; margin:20px 0 0">Answer a few quick questions. You'll get a starting plan on this page: which ad channels fit your business, how to split your ad budget, and what to do in the first month. We'll email you a copy too.</p>
</section>
<section class="ap-wrap" style="max-width:1180px; margin:0 auto">
  <div class="ap-cols">
    <div>${formHtml(endpoint)}<div id="ap-report" class="ap-card ap-rep" tabindex="-1" style="display:none; outline:none"></div></div>
    <aside class="ap-side ap-card" style="box-shadow:none">
      <h3>What you'll get</h3>
      <ul>
        <li>The ad channels that fit your business and area, picked from the 22 we run, with a plain reason for each</li>
        <li>How to split your own monthly ad budget, in percentages</li>
        <li>What to do in your first month</li>
        <li>The few numbers worth watching</li>
      </ul>
      <h3 style="margin-top:24px">Good to know</h3>
      <ul>
        <li>Free, with no obligation</li>
        <li>Built with the help of AI, from what you tell us</li>
        <li>Want a person to look at it? Ask for a <a href="second-opinion.html" style="color:var(--color-accent); font-weight:600">free Second Opinion</a> or call <a href="tel:+17702999583" style="color:var(--color-accent); font-weight:600">770-299-9583</a></li>
      </ul>
    </aside>
  </div>
</section>
${SCRIPT}`;

/** ad-plan.html from the contact template: keep header and footer, replace everything between. */
export function adPlanPage(html, endpoint) {
  const s0 = html.indexOf("<section");
  const foot = html.lastIndexOf("<footer");
  const s1 = foot === -1 ? -1 : html.lastIndexOf("</section>", foot);
  if (s0 === -1 || s1 === -1 || s1 < s0) throw new Error("ad-plan: contact page sections not found — site.zip changed");
  return html.slice(0, s0) + BODY(endpoint) + html.slice(s1 + "</section>".length);
}
