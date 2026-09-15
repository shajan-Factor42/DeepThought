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

const PAGES = [
  { file: "index.html", title: "DeepThought — One Engine, Every Channel, Live in 60 Seconds",
    description: "Deep Thought is an AI engine that consolidates all your digital marketing platforms in one place and manages it for you. Paid search, social, streaming TV and display for local businesses.",
    acc: { count: 4, open: "open", toggle: "toggle", sign: "sign" },
    scope: { showLogos: false, heroHasMedia: true, gridColumns: "repeat(3, 1fr)",
             heroGhostStyle: BASE_SCOPE.ghostBtn, ctaWhiteStyle: BASE_SCOPE.whiteBtn } },

  { file: "pricing.html", title: "Pricing | DeepThought",
    description: "Per-product pricing at about half a comparable agency retainer, month to month, with your media covered inside the price.",
    scope: { fullWidth: { style: { width: "100%" } },
             featuredCard: { style: { borderColor: "var(--border-hover)", boxShadow: "0 0 30px rgba(0,102,255,0.20)" } } } },

  { file: "faq.html", title: "Frequently Asked Questions | DeepThought",
    description: "How DeepThought works, what it costs, who owns the ad accounts, and what happens if you leave.",
    acc: { count: 11, open: "o", toggle: "t", sign: "s" } },

  { file: "product.html", title: "Product | DeepThought",
    description: "One engine across paid search, paid social, connected TV, display and audio — briefed in plain language, live in 60 seconds." },

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

  { file: "about.html", title: "About | DeepThought", description: "Who builds Deep Thought and why." },
  { file: "case-studies.html", title: "Case Studies | DeepThought", description: "How local businesses run campaigns with Deep Thought." },
  { file: "media-kit.html", title: "Media Kit | DeepThought", description: "Brand assets, logos and product screenshots." },
  { file: "contact.html", title: "Contact | DeepThought", description: "Talk to Deep Thought about your market and your budget." },
  { file: "book-a-demo.html", title: "Book a Demo | DeepThought", description: "See a campaign built and launched in 60 seconds." },
  { file: "thank-you.html", title: "Thank You | DeepThought", description: "We'll be in touch shortly.", noindex: true },
];

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
  try { src = await readFile(join(SRC, def.file), "utf8"); }
  catch { console.error(`  skip (not in source): ${def.file}`); continue; }

  let tpl = templateFrom(src);
  let scope = { ...BASE_SCOPE, ...NAV, ...(def.scope || {}) };

  if (def.acc) {
    tpl = unfoldAccordions(tpl, accKeys(def.acc.count, def.acc.open, def.acc.toggle));
    scope = { ...scope, ...signs(def.acc.count, def.acc.sign) };
  }

  const body = render(tpl, scope, partials);
  if (body.includes("{{")) holes.push(def.file);

  const canonical = `${SITE}/${def.file}`;
  const jsonld = [{
    "@context": "https://schema.org", "@type": "WebPage",
    name: def.title, description: def.description, url: canonical,
    isPartOf: { "@id": `${SITE}/#website` },
  }];

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
