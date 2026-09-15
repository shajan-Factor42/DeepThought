/**
 * render-industries.mjs — the twelve industry pages and their index.
 *
 * Usage: node build/render/render-industries.mjs --src dist --out _site
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, resolve as resolvePath } from "node:path";
import { pathToFileURL } from "node:url";
import { render, templateFrom } from "./dc.mjs";
import { loadShell, page, SITE, BASE_SCOPE } from "./shell.mjs";

const args = process.argv.slice(2);
const arg = (n, d) => { const i = args.indexOf("--" + n); return i === -1 ? d : args[i + 1]; };
const SRC = resolvePath(arg("src", "dist"));
const OUT = resolvePath(arg("out", "_site"));

const imp = (f) => import(pathToFileURL(join(SRC, f)).href);
const { INDUSTRIES, others } = await imp("industries.js");
const countyIndex = await imp("county-index.js");

const { helmet, partials } = await loadShell(SRC);
const IND_TPL = templateFrom(await readFile(join(SRC, "Industry.dc.html"), "utf8"));
const HUB_TPL = templateFrom(await readFile(join(SRC, "Industries.dc.html"), "utf8"));

const NAV = {
  homeHref: "index.html", hubHref: "industries.html", demoHref: "book-a-demo.html",
  pricingHref: "pricing.html", contactHref: "contact.html", productHref: "product.html",
  statesHref: "us-states.html", blogHref: "blog.html",
};

const CHANNELS = ["Paid search", "Local service ads", "Paid social", "Connected TV",
                  "Programmatic display", "Streaming audio", "Retargeting", "Digital out-of-home"];

const href = (i) => `digital-marketing-for-${i.slug}.html`;

/** Eight county links, one per state, deterministic from the slug. */
function countiesFor(slug) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  const pool = countyIndex.COUNTY_SLUGS;
  const picks = [], seenSlug = new Set(), seenState = new Set();
  let guard = 0;
  while (picks.length < 8 && guard++ < 400) {
    h = (h * 1103515245 + 12345) >>> 0;
    const s = pool[h % pool.length];
    if (!s || seenSlug.has(s)) continue;
    const info = countyIndex.parse(s);
    if (!info || seenState.has(info.state)) continue;
    seenSlug.add(s); seenState.add(info.state);
    picks.push({ label: countyIndex.label(s), href: `digital-marketing-${s}.html` });
  }
  return picks;
}

await mkdir(OUT, { recursive: true });
let written = 0, holes = 0;
const rendered = [];

async function emit(file, { title, description, body, jsonld }) {
  if (body.includes("{{")) holes++;
  await writeFile(join(OUT, file),
    page({ title, description, canonical: `${SITE}/${file}`, jsonld, body, helmet }), "utf8");
  rendered.push(file); written++;
}

for (const ind of INDUSTRIES) {
  const scope = {
    ...BASE_SCOPE, ...NAV,
    name: ind.name, eyebrow: ind.eyebrow, lede: ind.lede,
    stats: ind.stats, sections: ind.sections, trades: ind.trades, faq: ind.faq,
    channels: CHANNELS,
    others: others(ind.slug).map((o) => ({ name: o.name, short: o.short, href: href(o) })),
    counties: countiesFor(ind.slug),
  };
  const description = `${ind.name} marketing — ${ind.short}. Paid search, paid social, connected TV and display, with campaigns live in 60 seconds.`;
  await emit(href(ind), {
    title: `Digital Marketing for ${ind.name} | DeepThought`,
    description,
    body: render(IND_TPL, scope, partials),
    jsonld: [{
      "@context": "https://schema.org", "@type": "Service",
      serviceType: `Digital marketing for ${ind.name.toLowerCase()}`,
      provider: { "@id": `${SITE}/#organization` },
      name: `Digital Marketing for ${ind.name}`, description, url: `${SITE}/${href(ind)}`,
      mainEntity: {
        "@type": "FAQPage",
        mainEntity: (ind.faq || []).map((f) => ({
          "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    }],
  });
}

/* ---------- index ---------- */

const excerpt = (s) => (s.length > 150 ? s.slice(0, 147).replace(/[\s,;:]+$/, "") + "…" : s);
const description = "Digital marketing built for the way each industry actually buys — home services, dental, legal, restaurants, retail and more.";

await emit("industries.html", {
  title: "Industries We Work With | DeepThought",
  description,
  body: render(HUB_TPL, {
    ...BASE_SCOPE, ...NAV,
    industries: INDUSTRIES.map((i) => ({
      name: i.name, short: i.short, href: href(i), excerpt: excerpt(i.lede),
      stat: (i.stats && i.stats[0] && i.stats[0].value) || "",
      statLabel: (i.stats && i.stats[0] && i.stats[0].label) || "",
    })),
  }, partials),
  jsonld: [{
    "@context": "https://schema.org", "@type": "CollectionPage",
    name: "Industries We Work With", description, url: `${SITE}/industries.html`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: INDUSTRIES.map((i, n) => ({
        "@type": "ListItem", position: n + 1, url: `${SITE}/${href(i)}`, name: i.name,
      })),
    },
  }],
});

console.log(`render-industries: ${written} pages (${INDUSTRIES.length} industries, 1 index)`);
if (holes) { console.error(`FAIL: ${holes} page(s) still contain {{ }} holes`); process.exit(1); }

export { rendered };
