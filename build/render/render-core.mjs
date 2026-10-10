/**
 * render-core.mjs — the hand-authored pages: home, pricing, product, solutions, FAQ, contact
 * and the rest.
 *
 * Unlike counties, blog, states and industries, these pages already carry their copy inline —
 * they are not generated from data. So this renderer's job is narrower: resolve the header and
 * footer partials, render the design-system components, fill the handful of template holes,
 * and emit a finished document.
 *
 * Accordions are the one real problem. The home page and FAQ page hide their panels behind
 * `<sc-if value="{{ openN }}">` with a React click handler. Rendered statically, the condition
 * is false, so the panel markup is dropped entirely and the answers vanish from the page —
 * including for crawlers. So each panel is rewritten into a real element that ships with the
 * page and is toggled by the same few lines of JavaScript that open the mobile nav.
 *
 * Three pages are deliberately not emitted: county.html, state.html and state-counties.html.
 * They exist only to serve URLs like county.html?county=fl-alachua, and every county and state
 * now has its own rendered page. They were already noindex.
 *
 * Usage: node build/render/render-core.mjs --src dist --out _site
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, resolve as resolvePath } from "node:path";
import { pathToFileURL } from "node:url";
import { render, templateFrom, findBlock } from "./dc.mjs";
import { loadShell, page, SITE, BASE_SCOPE, esc } from "./shell.mjs";
import { leadSection, secondOpinionPage, afterHero, heroCta } from "./leads.mjs";
import { aboutPage, ourStoryPage, aboutJsonLd } from "./about.mjs";

const args = process.argv.slice(2);
const arg = (n, d) => { const i = args.indexOf("--" + n); return i === -1 ? d : args[i + 1]; };
const SRC = resolvePath(arg("src", "dist"));
const OUT = resolvePath(arg("out", "_site"));

const { helmet, partials } = await loadShell(SRC);
const states = await import(pathToFileURL(join(SRC, "states.js")).href);
const aeo = JSON.parse(await readFile(new URL("../aeo-data.json", import.meta.url), "utf8"));

/**
 * Turn a React accordion into one that ships open-able markup.
 *   <sc-if value="{{ open0 }}"> … </sc-if>   ->  <div data-acc-panel="0" hidden> … </div>
 *   onClick="{{ toggle0 }}"                  ->  data-acc="0" aria-expanded="false"
 */
function unfoldAccordions(tpl, keys) {
  let html = tpl;
  for (const key of keys) {
    html = html.replace(new RegExp(`onClick="\\{\\{ ${key.toggle} \\}\\}"`, "g"),
                        `data-acc="${key.id}" aria-expanded="false"`);
    for (;;) {
      const at = html.indexOf(`<sc-if value="{{ ${key.open} }}"`);
      if (at === -1) break;
      const blk = findBlock(html, "sc-if", at);
      if (!blk || blk.start !== at) break;
      html = html.slice(0, blk.start) +
             `<div data-acc-panel="${key.id}" hidden>` + blk.inner + `</div>` +
             html.slice(blk.end);
    }
  }
  return html;
}

const accKeys = (n, openPrefix, togglePrefix) =>
  Array.from({ length: n }, (_, i) => ({ id: String(i), open: openPrefix + i, toggle: togglePrefix + i }));

const signs = (n, prefix) => Object.fromEntries(Array.from({ length: n }, (_, i) => [prefix + i, "+"]));

/* ---------- page definitions ---------- */

const NAV = {
  homeHref: "index.html", demoHref: "book-a-demo.html", pricingHref: "pricing.html",
  contactHref: "contact.html", statesHref: "us-states.html", blogHref: "blog.html",
  hubHref: "industries.html", productHref: "product.html",
};

const SERVING_STATES = ["GA", "FL"].map((ab) => {
  const st = states.byab(ab);
  return {
    name: st.name, heading: `${st.name} local business marketing`,
    marketLabel: st.metros.slice(0, 3).join(" · "),
    countyCount: st.countyCount,
    countyHref: states.COUNTY_PAGES[ab] || `digital-marketing-${st.slug}-counties.html`,
    countyLabel: `All ${st.countyCount} ${st.name} counties`,
    blurb: `Campaigns built county by county across ${st.name}, with local population, workforce and industry figures behind every market page.`,
  };
});

const LEADS_EP = (aeo.leads && aeo.leads.endpoint) || "";

const PAGES = [
  { file: "index.html", title: "Deep Thought Marketing | AI Ad Management for Small Business",
    description: "AI-powered ad management for local businesses. Google, Facebook, streaming TV and more, run for a fraction of the cost of an agency.",
    acc: { count: 4, open: "open", toggle: "toggle", sign: "sign" },
    scope: { showLogos: false, heroHasMedia: true, gridColumns: "repeat(3, 1fr)",
             heroGhostStyle: BASE_SCOPE.ghostBtn, ctaWhiteStyle: BASE_SCOPE.whiteBtn } },

  { file: "pricing.html", title: "Pricing | DeepThought",
    description: "Per-product pricing at a fraction of a comparable agency retainer, month to month, with no annual contract.",
    scope: { fullWidth: { style: { width: "100%" } },
             featuredCard: { style: { borderColor: "var(--border-hover)", boxShadow: "0 0 30px rgba(0,102,255,0.20)" } } } },

  { file: "faq.html", title: "Frequently Asked Questions | DeepThought",
    description: "How DeepThought works, what it costs, and what happens if you leave.",
    acc: { count: 11, open: "o", toggle: "t", sign: "s" } },

  { file: "product.html", title: "Product | DeepThought",
    description: "AI that recommends your channels, budget and audiences, drafts your ads and reports in plain English — across search, social, streaming TV, display and audio." },

  { file: "serving-local-business.html", title: "Local Business Marketing | DeepThought",
    description: "Digital marketing for local businesses, built county by county.",
    scope: { states: SERVING_STATES } },

  { file: "solutions.html", title: "Solutions | DeepThought", description: "Built for local service businesses, multi-location brands and agencies." },
  { file: "solutions-local-service.html", title: "For Local Service Businesses | DeepThought",
    description: "Paid media for home services, dental, legal and other local service businesses." },
  { file: "solutions-multi-location.html", title: "For Multi-Location Brands | DeepThought",
    description: "Brand control, per-store reporting and roll-up dashboards across every location." },
  { file: "solutions-agencies.html", title: "For Agencies | DeepThought",
    description: "White-label campaign fulfilment across every channel, in your clients' own ad accounts." },

  { file: "about.html", title: "About | DeepThought", description: "Why DeepThought exists: professional advertising for local businesses, run for you, at a fraction of the cost of an agency.",
    transform: aboutPage },
  // Our story (2026-10-04): founder story + photo, linked from About. Noindex by Shajan's request.
  { file: "our-story.html", src: "about.html", title: "Our Story | DeepThought", description: "How DeepThought started: founder Shajan Thomas built a done-for-you advertising service so local businesses get professional ads at a fraction of the cost.",
    transform: ourStoryPage, noindex: true },
  { file: "case-studies.html", title: "Case Studies | DeepThought", description: "How local businesses run campaigns with Deep Thought." },
  { file: "media-kit.html", title: "Media Kit | DeepThought", description: "Brand assets, logos and product screenshots." },
  { file: "contact.html", title: "Contact | DeepThought", description: "Talk to Deep Thought about your market and your budget." },
  { file: "book-a-demo.html", title: "Book a Demo | DeepThought", description: "Book a free 15-minute call. See how DeepThought would run your ads, and what it would cost for your business.",
    transform: bookingPage },
  // Lead capture (CRO, 2026-10-01): Second Opinion form after the hero on home and pricing,
  // and its own page built from the contact template. Endpoint: aeo-data.json leads.endpoint.
  { file: "second-opinion.html", src: "contact.html", title: "Free Second Opinion on Your Marketing | DeepThought",
    description: "Send three details and a real person reviews your ads and calls you back with a plain-English answer on what's working and what it should cost. Free, no contract.",
    transform: (b) => secondOpinionPage(b, LEADS_EP) },
  { file: "thank-you.html", title: "Thank You | DeepThought", description: "We'll be in touch shortly.", noindex: true },
];

/**
 * Book a Demo: the Web3Forms form becomes a Google Calendar booking page (decided 2026-09-26),
 * so visitors pick a time instead of waiting for an email. The page copy moves to the free
 * 15-minute call, and the "Dana Lindsey" testimonial goes — it was invented, and the 14 Sept
 * decision removed all testimonials.
 *
 * Every swap asserts its anchor, so a re-exported site.zip that changes this page fails the
 * build instead of shipping a half-edited page.
 */
const BOOKING_URL = "https://calendar.app.google/Bw7NXyTw6HX7V8bG8";
const BOOKING_EMBED = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1eU851T4twxrt8zMAc_4ecUPvZpyRuSnplTYItbVm7rnAGBMkBPzkl6y7B_FO77cHU7Xj4Lvmg?gv=true";

function bookingPage(html) {
  const swap = (from, to, label) => {
    if (!html.includes(from)) throw new Error(`book-a-demo: ${label} not found — site.zip changed`);
    html = html.replace(from, to);
  };
  swap(">Bring one promotion. We'll build it on the call.</h1>", ">Pick a time. Get a straight answer.</h1>", "headline");
  swap("Twenty minutes, no slides. Tell us the offer and the market and you'll watch Deep Thought produce the campaign live — creative, targeting, channel mix, and budget.",
       "Fifteen minutes, no slides. Tell us your business, your area and your budget, and we'll show you how Deep Thought would run your ads — and what it would cost.", "lede");
  swap(">A live build</div>", ">A look at the platform</div>", "step 2 title");
  swap("Your real promotion, built in the product while you watch.",
       "How the AI would plan your channels, audiences and ads, shown in the product.", "step 2 text");

  // the invented testimonial card: from its opening <div class="ds-card"> to the matching </div>
  const quote = html.indexOf("Dana Lindsey");
  if (quote === -1) throw new Error("book-a-demo: testimonial not found — site.zip changed");
  const cardStart = html.lastIndexOf('<div class="ds-card"', quote);
  let depth = 0, k = cardStart, cardEnd = -1;
  const tag = /<div\b|<\/div>/g;
  tag.lastIndex = cardStart;
  for (let m; (m = tag.exec(html)); ) {
    depth += m[0] === "</div>" ? -1 : 1;
    if (depth === 0) { cardEnd = m.index + m[0].length; break; }
  }
  if (cardStart === -1 || cardEnd < quote) throw new Error("book-a-demo: testimonial card bounds not found");
  html = html.slice(0, cardStart) + html.slice(cardEnd);

  // the form -> the calendar
  const f0 = html.indexOf("<form"), f1 = html.indexOf("</form>");
  if (f0 === -1 || f1 === -1) throw new Error("book-a-demo: form not found — site.zip changed");
  html = html.slice(0, f0) + `<h2 style="font-family:var(--font-display); font-size:24px; font-weight:800; letter-spacing:-0.02em; margin:0 0 6px">Pick a time</h2>
      <p style="font-size:14.5px; line-height:1.55; color:var(--text-body); margin:0 0 16px">Free 15-minute call. Choose a slot and you'll get a calendar invite right away.</p>
      <style>@media (max-width:640px){.ds-card:has(.dt-booking){padding:24px 12px!important}.ds-card:has(.dt-booking)>h2,.ds-card:has(.dt-booking)>p{padding:0 8px}.dt-booking{height:760px!important}}</style>
      <iframe class="dt-booking" src="${BOOKING_EMBED}" title="Book a free 15-minute call with DeepThought" loading="lazy" style="border:0; width:100%; height:640px; border-radius:12px; background:#fff" frameborder="0"></iframe>
      <p style="font-size:13.5px; line-height:1.55; color:var(--text-muted); margin:14px 0 0">Calendar not loading? <a href="${BOOKING_URL}" target="_blank" rel="noopener" onclick="window.dataLayer&amp;&amp;dataLayer.push({event:'demo_booking_link_click'})" style="color:var(--color-accent)">Open the booking page</a> or call <a href="tel:+17702999583" style="color:var(--color-accent)">770-299-9583</a>.</p>` + html.slice(f1 + "</form>".length);
  return html;
}

/** Pages that exist only to serve query-string URLs; every target now has its own page. */
// us-map.html rendered an interactive SVG map from JavaScript. Without it the page is 19
// words and no links; us-states.html already lists all 50 states with links to each.
const DROP = new Set(["county.html", "state.html", "state-counties.html", "us-map.html"]);

await mkdir(OUT, { recursive: true });
let written = 0, holes = [];
const rendered = [];

for (const def of PAGES) {
  if (def.skip || DROP.has(def.file)) continue;
  let src;
  try { src = await readFile(join(SRC, def.src || def.file), "utf8"); }
  catch { console.error(`  skip (not in source): ${def.file}`); continue; }

  let tpl = templateFrom(src);
  let scope = { ...BASE_SCOPE, ...NAV, ...(def.scope || {}) };

  if (def.acc) {
    tpl = unfoldAccordions(tpl, accKeys(def.acc.count, def.acc.open, def.acc.toggle));
    scope = { ...scope, ...signs(def.acc.count, def.acc.sign) };
  }

  let body = render(tpl, scope, partials);
  if (def.transform) body = def.transform(body);
  if (def.file === "index.html" || def.file === "pricing.html")
    body = afterHero(def.file === "index.html" ? heroCta(body) : body, leadSection(LEADS_EP, def.file.replace(".html", "")), def.file);
  if (body.includes("{{")) holes.push(def.file);

  const canonical = `${SITE}/${def.file}`;
  const jsonld = [{
    "@context": "https://schema.org", "@type": "WebPage",
    name: def.title, description: def.description, url: canonical,
    isPartOf: { "@id": `${SITE}/#website` },
  }];

  // The home page also names the service and the 22 products it covers (from aeo-data.json
  // "products"). Only here, not in the per-page company node, so 3,400 pages don't carry it.
  if (def.file === "index.html" && aeo.products) {
    jsonld.push({
      "@context": "https://schema.org", "@type": "Service", "@id": `${SITE}/#service`,
      name: "Done-for-you digital advertising management", serviceType: "Paid media management",
      provider: { "@id": `${SITE}/#organization` },
      areaServed: { "@type": "Country", name: "United States" },
      audience: { "@type": "BusinessAudience", name: "Small and medium businesses" },
      description: "We plan the media, buy and place it, build the ads, launch and manage the campaigns, and report results in plain English. Month to month, no long-term contract.",
      hasOfferCatalog: {
        "@type": "OfferCatalog", name: "Advertising products DeepThought runs",
        itemListElement: Object.entries(aeo.products).map(([group, items]) => ({
          "@type": "OfferCatalog", name: group,
          itemListElement: items.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
        })),
      },
    });
  }

  if (def.file === "our-story.html") jsonld.push(aboutJsonLd(SITE));

  // The home page and FAQ page carry the canonical question set, from one source, so the
  // visible text and the schema cannot disagree — the mismatch faq-sync.mjs existed to police.
  if (def.file === "index.html" || def.file === "faq.html") {
    jsonld.push({
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: aeo.faq.map((f) => ({
        "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  await writeFile(join(OUT, def.file),
    page({ title: def.title, description: def.description, canonical, jsonld, body, helmet, noindex: def.noindex }),
    "utf8");
  rendered.push(def.file); written++;
}

console.log(`render-core: ${written} pages (dropped ${[...DROP].join(", ")})`);
if (holes.length) { console.error(`FAIL: template holes remain in: ${holes.join(", ")}`); process.exit(1); }

export { rendered };
