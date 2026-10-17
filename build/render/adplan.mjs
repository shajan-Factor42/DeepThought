/**
 * adplan.mjs — the digital media plan builder, digital-media-plan-builder.html (2026-10-15).
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
  return `<form id="ap-form" class="ap-card" data-endpoint="${esc(endpoint)}" role="tabpanel" aria-labelledby="ap-tab-form" novalidate hidden>
  <h2 class="ap-h2">About your business</h2>
  <div class="ap-grid">
    ${field('Business name', `<input name="business" autocomplete="organization" required placeholder="e.g. Reyes Plumbing" style="${INPUT}">`)}
    ${field('What does it do?', `<input name="trade" list="ap-trades" required placeholder="e.g. Plumbing" style="${INPUT}"><datalist id="ap-trades">${TRADES.map((t) => `<option value="${esc(t)}">`).join("")}</datalist>`)}
    ${field('Town or ZIP code', `<input name="location" autocomplete="address-level2" required placeholder="e.g. Lawrenceville, GA" style="${INPUT}">`)}
    ${field('How far do you serve?', select("radius", PLAN_OPTIONS.radius, "ap-radius"))}
    ${field('Main goal', select("goal", PLAN_OPTIONS.goal, "ap-goal"))}
    ${field('Monthly ad budget', `<div style="position:relative"><span aria-hidden="true" style="position:absolute; left:14px; top:13px; font-size:16px; color:var(--text-muted)">$</span><input name="budget" type="text" inputmode="numeric" required placeholder="e.g. 2,000" aria-label="Monthly ad budget in dollars" style="${INPUT}; padding-left:28px"></div>`)}
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
  <button type="submit" class="ap-btn">Build my free media plan</button>
  <p class="ap-status" role="status" aria-live="polite"></p>
  <p style="font-size:13px; line-height:1.5; color:var(--text-muted); margin:10px 0 0">We'll email you the plan, and someone from our team may call to see if you have questions. No spam, and we never share your details. <a href="privacy.html" style="color:inherit">Privacy</a>.</p>
</form>`;
}

function chatHtml(endpoint) {
  return `<div id="ap-chat" class="ap-card" data-endpoint="${esc(endpoint)}" role="tabpanel" aria-labelledby="ap-tab-chat">
  <div id="ap-log" class="ap-log" aria-live="polite"></div>
  <p id="ap-got" class="ap-got"></p>
  <form id="ap-chat-form" class="ap-chat-form"><textarea id="ap-in" rows="1" maxlength="600" placeholder="Type your answer…" aria-label="Your answer"></textarea><button type="submit" id="ap-send">Send</button></form>
  <p style="font-size:12.5px; line-height:1.5; color:var(--text-muted); margin:10px 0 0">AI assistant. We'll email you the plan, and someone from our team may call to see if you have questions. <a href="privacy.html" style="color:inherit">Privacy</a>.</p>
</div>`;
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
.ap-ch .hd{display:flex; justify-content:space-between; align-items:baseline; gap:4px 12px; flex-wrap:wrap}
.ap-ch em{font-style:normal; font-weight:800; color:var(--f42-primary-blue, #0066FF); white-space:nowrap}
.ap-ch p{margin:0; font-size:15px; line-height:1.55; color:var(--text-body)}
.ap-rep h3{font-family:var(--font-display); font-size:20px; font-weight:800; color:var(--text-heading); margin:28px 0 10px}
.ap-rep ol,.ap-rep ul{padding-left:22px; line-height:1.6; color:var(--text-body); margin:0}
.ap-rep li{margin:0 0 6px}
.ap-tabs{display:inline-flex; gap:4px; padding:4px; margin:0 0 16px; border-radius:12px; background:var(--f42-bg, #F0F4FF); border:1px solid var(--border-subtle)}
.ap-tabs button{border:0; background:transparent; padding:10px 16px; border-radius:9px; font-family:var(--font-body); font-size:15px; font-weight:600; color:var(--text-body); cursor:pointer}
.ap-tabs button[aria-selected=true]{background:var(--f42-white); color:var(--f42-primary-blue, #0066FF); box-shadow:0 2px 8px rgba(15,40,90,0.08)}
.ap-tabs button:focus-visible{outline:2px solid #00B4D8}
.ap-log{display:flex; flex-direction:column; gap:10px; min-height:220px; max-height:440px; overflow-y:auto; padding:4px 2px 8px}
.ap-m{max-width:85%; padding:11px 14px; border-radius:14px; font-size:15.5px; line-height:1.55; white-space:pre-wrap; word-wrap:break-word}
.ap-a{align-self:flex-start; background:var(--f42-bg, #F0F4FF); color:var(--text-body); border-bottom-left-radius:4px}
.ap-u{align-self:flex-end; background:var(--f42-primary-blue, #0066FF); color:#fff; border-bottom-right-radius:4px}
.ap-got{font-size:13px; color:var(--text-muted); margin:8px 0 0; min-height:1px}
.ap-chat-form{display:flex; gap:8px; margin-top:12px}
.ap-chat-form textarea{flex:1; min-width:0; border:1px solid var(--border-subtle); border-radius:12px; padding:12px 14px; font-family:var(--font-body); font-size:16px; resize:none; max-height:120px; color:var(--text-heading)}
.ap-chat-form textarea:focus{outline:2px solid rgba(0,102,255,.35); border-color:#0066FF}
.ap-chat-form button{border:0; border-radius:12px; padding:0 18px; background:var(--f42-gradient-button); color:#fff; font-weight:700; font-family:var(--font-body); font-size:15px; cursor:pointer}
.ap-chat-form button:disabled{opacity:.6; cursor:default}
.ap-dots{display:inline-flex; gap:4px}.ap-dots i{width:6px; height:6px; border-radius:50%; background:#94a3b8; animation:apb 1s infinite}
.ap-dots i:nth-child(2){animation-delay:.15s}.ap-dots i:nth-child(3){animation-delay:.3s}
@keyframes apb{0%,80%,100%{opacity:.3}40%{opacity:1}}
html[data-ap-chat] #dtc-btn,html[data-ap-chat] #dtc-tip,html[data-ap-chat] #dtc-panel{display:none !important}
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
  function money(n){return "$"+Math.round(n).toLocaleString("en-US")}
  function num(v){var t=String(v||"").toLowerCase().replace(/,/g,""),m=t.match(/(\\d+(?:\\.\\d+)?)\\s*(k|thousand|grand)?/);return m?Math.round(parseFloat(m[1])*(m[2]?1000:1)):0}
  function fc(c){return c.kind==="cpm"||c.kind==="cpv"?"About "+Math.round(c.forecast).toLocaleString("en-US")+" "+c.unit+" a month":c.kind==="budget"?"You pay for clicks or leads; we\u2019ll forecast those with you":""}
  function e(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
  function usPhone(raw){var d=raw.replace(/\\D/g,"");if(d.length===11&&d[0]==="1")d=d.slice(1);return /^[2-9]\\d{2}[2-9]\\d{6}$/.test(d)?d:""}
  var started=false;f.addEventListener("input",function(){if(!started){started=true;dl({event:"ad_plan_start"})}});
  f.addEventListener("submit",function(ev){
    ev.preventDefault();
    var v=function(n){return(f.elements[n]&&f.elements[n].value||"").trim()};
    if(v("website"))return;
    var miss=["business","trade","location","radius","goal","budget","name"].filter(function(n){return !v(n)});
    if(!miss.length&&!num(v("budget"))){st.textContent="Please enter your monthly ad budget as a number, like 2000.";f.elements.budget.focus();return}
    if(miss.length){st.textContent="Please fill in every question above (only the last box is optional).";f.elements[miss[0]].focus();return}
    if(!usPhone(v("phone"))){st.textContent="Please enter a US phone number with area code, like (404) 555-0142.";f.elements.phone.focus();return}
    if(!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(v("email"))){st.textContent="Please enter an email address so we can send you the plan.";f.elements.email.focus();return}
    var d={};["business","trade","location","radius","goal","budget","notes","name","phone","email","website"].forEach(function(n){d[n]=v(n)});
    d.current=[].slice.call(f.querySelectorAll('input[name=current]:checked')).map(function(x){return x.value});
    st.textContent="";b.disabled=true;b.innerHTML='<span class="ap-spin" aria-hidden="true"></span>Building your plan\u2026 about 15 seconds';
    build(d,"form",function(msg){b.disabled=false;b.textContent="Build my free media plan";st.textContent=msg});
  });
  // Both modes end here: post the answers to /plan, then show the report.
  function build(d,mode,fail){
    var info=window.dtLeadInfo?window.dtLeadInfo():{};for(var k in info)d[k]=info[k];
    d.page=location.pathname;
    fetch(f.getAttribute("data-endpoint"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)})
      .then(function(r){return r.json().then(function(j){if(!r.ok||!j.plan)throw new Error(j.error||"");return j})})
      .then(function(j){show(j,d);dl({event:"form_conversion",form:"ad_plan"});dl({event:"ad_plan_generated",ad_budget:num(d.budget),goal:d.goal,mode:mode})})
      .catch(function(x){fail((x&&x.message)||"That didn't go through. Please call us at 770-299-9583.")});
  }

  // Tabs: chat ("Ask Deep Thought", the default) or the form. #form opens the form.
  var tf=document.getElementById("ap-tab-form"),tc=document.getElementById("ap-tab-chat"),cp=document.getElementById("ap-chat");
  function tab(chat){if(chat)document.documentElement.setAttribute("data-ap-chat","");else document.documentElement.removeAttribute("data-ap-chat");tf.setAttribute("aria-selected",!chat);tc.setAttribute("aria-selected",chat);f.hidden=chat;cp.hidden=!chat;
    if(chat)startChat()}
  tf.onclick=function(){tab(false);dl({event:"ad_plan_form_open"})};tc.onclick=function(){tab(true);setTimeout(function(){inp.focus({preventScroll:true})},50)};

  // Chat mode: the AI asks for the same answers; the worker says when everything is in.
  var log=document.getElementById("ap-log"),inp=document.getElementById("ap-in"),send=document.getElementById("ap-send"),
      got=document.getElementById("ap-got"),cf=document.getElementById("ap-chat-form");
  var msgs=[],fields={},busy=false,begun=false;
  var HELLO="Hi, I'm Deep Thought. I'll ask a few quick questions and then build your free digital media plan. To start, what's your business called, and what does it do?";
  function bubble(role,t){var m=document.createElement("div");m.className="ap-m "+(role==="user"?"ap-u":"ap-a");m.textContent=t;log.appendChild(m);log.scrollTop=log.scrollHeight;return m}
  function startChat(){if(begun)return;begun=true;bubble("assistant",HELLO);msgs.push({role:"assistant",content:HELLO})}
  var LABELS={business:"Business",trade:"Does",location:"Area",radius:"Serves",goal:"Goal",budget:"Ad budget",name:"Name",phone:"Phone",email:"Email"};
  function showGot(){var a=[];for(var k in LABELS)if(fields[k])a.push(LABELS[k]+": "+(k==="budget"?money(fields[k])+"/mo":fields[k]));got.textContent=a.length?"Got so far \u2014 "+a.join(" \u00b7 "):""}
  inp.addEventListener("keydown",function(ev){if(ev.key==="Enter"&&!ev.shiftKey){ev.preventDefault();cf.requestSubmit?cf.requestSubmit():cf.onsubmit(ev)}});
  inp.addEventListener("input",function(){inp.style.height="auto";inp.style.height=Math.min(inp.scrollHeight,120)+"px"});
  cf.onsubmit=function(ev){ev.preventDefault();var t=inp.value.trim();if(!t||busy)return;
    if(!started){started=true;dl({event:"ad_plan_start",mode:"chat"})}
    busy=true;send.disabled=true;inp.value="";inp.style.height="auto";bubble("user",t);msgs.push({role:"user",content:t});
    var w=bubble("assistant","");w.innerHTML='<span class="ap-dots" aria-label="Typing"><i></i><i></i><i></i></span>';
    fetch(cp.getAttribute("data-endpoint"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:msgs,fields:fields})})
      .then(function(r){return r.json().then(function(j){if(!r.ok||!j.reply)throw new Error(j.error||"");return j})})
      .then(function(j){fields=j.fields||fields;w.textContent=j.reply;msgs.push({role:"assistant",content:j.reply});showGot();
        if(j.ready){w.innerHTML=e(j.reply)+' <span class="ap-dots" aria-hidden="true"><i></i><i></i><i></i></span>';
          var d={};for(var k in fields)d[k]=fields[k];d.current=fields.current||[];
          build(d,"chat",function(msg){w.textContent=j.reply;bubble("assistant",msg+" You can correct it here.");msgs.push({role:"assistant",content:msg});busy=false;send.disabled=false})}
        else{busy=false;send.disabled=false;inp.focus({preventScroll:true})}})
      .catch(function(x){w.textContent=(x&&x.message)||"Sorry, that didn't go through. You can use the form instead, or call 770-299-9583.";msgs.pop();busy=false;send.disabled=false});
  };
  tab(location.hash!=="#form");

  function show(j,d){
    var p=j.plan,h='<p style="font-size:13px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:var(--color-accent, #0066FF); margin:0 0 10px">Your free digital media plan</p>'+
      '<h2 style="font-family:var(--font-display); font-size:30px; font-weight:800; letter-spacing:-0.02em; line-height:1.15; color:var(--text-heading); margin:0 0 12px">'+e(d.business)+'</h2>'+
      '<p style="font-size:17px; line-height:1.6; color:var(--text-body); margin:0 0 22px">'+e(p.headline)+'</p>'+
      (p.low&&p.note?'<p style="background:#FFF7ED; border:1px solid #FED7AA; border-radius:12px; padding:14px 16px; margin:0 0 18px; line-height:1.55; color:#9A3412">'+e(p.note)+'</p>':'')+
      (p.channels.length?'<h3 style="margin-top:0">How to split your '+money(p.budget)+' monthly ad budget</h3>'+
      p.channels.map(function(c){return '<div class="ap-ch"><div class="hd"><b>'+e(c.name)+'</b><em>'+money(c.dollars)+'/mo <span style="font-weight:600; color:var(--text-muted)">\u00b7 '+c.share+'%</span></em></div><div class="ap-bar"><i style="width:'+c.share+'%"></i></div>'+(fc(c)?'<p style="font-weight:600; color:var(--text-heading); margin:0 0 4px">'+e(fc(c))+'</p>':'')+'<p>'+e(c.why)+'</p></div>'}).join(""):'')+
      (p.firstMonth.length?'<h3>Your first month</h3><ol>'+p.firstMonth.map(function(x){return'<li>'+e(x)+'</li>'}).join("")+'</ol>':'')+
      (p.watch.length?'<h3>Numbers to watch</h3><ul>'+p.watch.map(function(x){return'<li>'+e(x)+'</li>'}).join("")+'</ul>':'')+
      (p.note&&!p.low?'<p style="background:var(--f42-bg, #F0F4FF); border-radius:12px; padding:14px 16px; margin:24px 0 0; line-height:1.55; color:var(--text-body)">'+e(p.note)+'</p>':'')+
      '<div style="margin:28px 0 0; padding:22px; border-radius:16px; border:1px solid var(--border-subtle); background:var(--f42-white)">'+
      '<p style="font-family:var(--font-display); font-size:19px; font-weight:800; color:var(--text-heading); margin:0 0 6px">Want us to run this for you?</p>'+
      '<p style="margin:0 0 14px; line-height:1.55; color:var(--text-body)">A real person will look at your plan and what you run today, and call you back within 24 hours with a straight answer.</p>'+
      '<div style="display:flex; flex-wrap:wrap; gap:10px"><a href="second-opinion.html" data-lead-cta="ad-plan" style="display:inline-flex; align-items:center; height:48px; padding:0 20px; border-radius:12px; background:var(--f42-gradient-button); color:#fff; font-weight:700; text-decoration:none">Get a free Second Opinion</a>'+
      '<a href="tel:+17702999583" style="display:inline-flex; align-items:center; height:48px; padding:0 20px; border-radius:12px; border:1.5px solid var(--f42-primary-blue, #0066FF); color:var(--f42-primary-blue, #0066FF); font-weight:700; text-decoration:none">Call 770-299-9583</a></div></div>'+
      '<p style="font-size:13px; line-height:1.5; color:var(--text-muted); margin:18px 0 0">'+(j.emailed?'We also emailed this plan to '+e(d.email)+'. ':'')+'This is a starting suggestion based on what you told us, made with the help of AI. Forecasts are estimates, not guarantees, and this is not a quote or a promise of results.</p>';
    out.innerHTML=h;f.style.display="none";cp.hidden=true;document.querySelector(".ap-tabs").style.display="none";out.style.display="block";
    var top=out.getBoundingClientRect().top+window.pageYOffset-90;window.scrollTo({top:top,behavior:"smooth"});out.focus({preventScroll:true});
  }
})();
</script>`;


/** Questions shown on the page and sent as FAQPage schema (render-core.mjs), from this one list so
 *  the visible text and the schema can't disagree. Added by the SEO chat, 2026-10-17. */
export const AD_PLAN_FAQ = [
  { q: "What is a digital media plan?",
    a: "A digital media plan says where your advertising should run and how much to spend on each channel. It covers which channels fit your business, such as Google search ads, Facebook and Instagram, streaming TV or display ads, how to split your monthly budget between them, who to reach, and which numbers to watch so you know it is working." },
  { q: "Is the media plan builder really free?",
    a: "Yes. The plan is free, with no obligation and no credit card. You see it on this page and we email you a copy. Someone from our team may follow up to see if you want help running it, and you can simply say no." },
  { q: "How does the builder choose my ad channels?",
    a: "It looks at what you tell us: your type of business, the area you serve, your goal, your monthly ad budget and what you run today. It then picks the channels that fit from the 22 advertising products we run and gives a plain reason for each. The plan is built with the help of AI and checked against our rules, so it only suggests channels we actually run and the budget split always adds up." },
  { q: "How is my ad budget split between channels?",
    a: "The plan shows your monthly budget in dollars for each channel, with a forecast of impressions or video views where that applies. Some channels need a minimum spend to work well, so a smaller budget gets fewer channels done properly rather than many channels spread thin." },
  { q: "Does the plan guarantee results?",
    a: "No. The plan is a starting suggestion based on what you told us, and the forecasts are estimates, not promises. Results depend on your offer, your area, your website and how the campaigns are run and improved over time." },
  { q: "What should I do with my plan?",
    a: "Use it however helps you: run it yourself, share it with your current agency, or ask us to run it for you. If you would like a person to look at your current ads before you decide, ask for a free Second Opinion." },
];

const BODY = (endpoint) => `${CSS}
<section style="max-width:1180px; margin:0 auto; padding:72px 40px 0">
  <div style="font-size:12.5px; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; color:var(--color-accent)">Digital media plan builder</div>
  <h1 style="font-family:var(--font-display); font-size:52px; font-weight:800; letter-spacing:-0.035em; line-height:1.05; color:var(--text-heading); margin:16px 0 0; max-width:820px; text-wrap:pretty">Get a free digital media plan for your business</h1>
  <p style="font-size:19px; line-height:1.6; color:var(--text-body); max-width:720px; margin:20px 0 0">Tell Deep Thought about your business in a quick chat, or fill in a short form. You'll get a starting plan on this page: which ad channels fit your business, how to split your ad budget, and what to do in the first month. We'll email you a copy too.</p>
</section>
<section class="ap-wrap" style="max-width:1180px; margin:0 auto">
  <div class="ap-cols">
    <div>
      <div class="ap-tabs" role="tablist" aria-label="How would you like to answer?">
        <button type="button" role="tab" id="ap-tab-chat" aria-selected="true" aria-controls="ap-chat">Ask Deep Thought</button>
        <button type="button" role="tab" id="ap-tab-form" aria-selected="false" aria-controls="ap-form">Fill in a form</button>
      </div>
      ${chatHtml(endpoint.replace(/\/plan$/, "/plan-chat"))}
      ${formHtml(endpoint)}<div id="ap-report" class="ap-card ap-rep" tabindex="-1" style="display:none; outline:none"></div></div>
    <aside class="ap-side ap-card" style="box-shadow:none">
      <h3>What you'll get</h3>
      <ul>
        <li>The ad channels that fit your business and area, picked from the 22 we run, with a plain reason for each</li>
        <li>How to split your monthly ad budget across channels, in dollars</li>
        <li>A forecast of impressions or video views for each channel</li>
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
<section style="max-width:1180px; margin:0 auto; padding:56px 40px 80px">
  <h2 style="font-family:var(--font-display); font-size:32px; font-weight:800; letter-spacing:-0.02em; color:var(--text-heading); margin:0">Digital media plan questions</h2>
  <div style="max-width:820px; margin-top:20px">
    ${AD_PLAN_FAQ.map((f) => `<h3 style="font-family:var(--font-display); font-size:19px; font-weight:700; color:var(--text-heading); margin:24px 0 6px">${esc(f.q)}</h3>
    <p style="font-size:16px; line-height:1.65; color:var(--text-body); margin:0">${esc(f.a).replace("free Second Opinion", '<a href="second-opinion.html" style="color:var(--color-accent); font-weight:600">free Second Opinion</a>')}</p>`).join("\n    ")}
  </div>
</section>
${SCRIPT}`;

/** digital-media-plan-builder.html from the contact template: keep header and footer, replace everything between. */
export function adPlanPage(html, endpoint) {
  const s0 = html.indexOf("<section");
  const foot = html.lastIndexOf("<footer");
  const s1 = foot === -1 ? -1 : html.lastIndexOf("</section>", foot);
  if (s0 === -1 || s1 === -1 || s1 < s0) throw new Error("ad-plan: contact page sections not found — site.zip changed");
  return html.slice(0, s0) + BODY(endpoint) + html.slice(s1 + "</section>".length);
}
