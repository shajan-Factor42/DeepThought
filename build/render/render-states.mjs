/**
 * render-states.mjs — state pages, the all-states index, and every county directory.
 *
 * Two things change beyond static rendering:
 *
 * 1. The state pages carried the same invented-testimonial generator as the county pages —
 *    a named person and quote per state, picked from fixed name pools by hashing the slug.
 *    Removed, as it was site-wide on 14 Sept.
 *
 * 2. The county directories fetched a ~1MB TopoJSON file from cdn.jsdelivr.net on every page
 *    view, purely to list county names, and printed "County list unavailable" whenever that
 *    request failed. The list is now generated at build time from COUNTY_SLUGS, so the page
 *    ships complete with no third-party dependency and no failure mode.
 *
 * Georgia and Florida keep their own richer directory templates, which group by region and
 * show county seats.
 *
 * Usage: node build/render/render-states.mjs --src dist --out _site
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, resolve as resolvePath } from "node:path";
import { pathToFileURL } from "node:url";
import { render, templateFrom } from "./dc.mjs";
import { loadShell, page, cutSection, SITE, BASE_SCOPE, esc } from "./shell.mjs";

const args = process.argv.slice(2);
const arg = (n, d) => { const i = args.indexOf("--" + n); return i === -1 ? d : args[i + 1]; };
const SRC = resolvePath(arg("src", "dist"));
const OUT = resolvePath(arg("out", "_site"));

const imp = (f) => import(pathToFileURL(join(SRC, f)).href);
const states = await imp("states.js");
const stateCopy = await imp("state-copy.js");
const counties = await imp("counties.js");
const countyIndex = await imp("county-index.js");

const { helmet, partials } = await loadShell(SRC);
const tpl = async (f) => templateFrom(await readFile(join(SRC, f), "utf8"));

let STATE_TPL = await tpl("state.html");
const DIR_TPL = await tpl("state-counties.html");
const GA_TPL = await tpl("georgia-counties.html");
const FL_TPL = await tpl("florida-counties.html");
const US_TPL = await tpl("us-states.html");

{
  const r = cutSection(STATE_TPL, "{{ tQuote }}", "state testimonial");
  STATE_TPL = r.html;
  console.log("render-states: testimonial block " + (r.cut ? "removed" : "not present"));
}
for (const hole of ["tQuote", "tName", "tRole", "tBusiness", "tInitials"]) {
  if (STATE_TPL.includes(`{{ ${hole} }}`)) throw new Error(`state template still references {{ ${hole} }}`);
}

const NAV = {
  homeHref: "index.html", demoHref: "book-a-demo.html", pricingHref: "pricing.html",
  contactHref: "contact.html", statesHref: "us-states.html", blogHref: "blog.html",
};

const stateHref = (st) => `digital-marketing-${st.slug}.html`;
const dirHref = (st) => states.COUNTY_PAGES[st.ab] || `digital-marketing-${st.slug}-counties.html`;

/** Every county slug belonging to a state, in alphabetical order. */
function countiesOf(st) {
  const suffix = "-" + st.ab.toLowerCase();
  return countyIndex.COUNTY_SLUGS
    .filter((s) => s.endsWith(suffix))
    .map((s) => ({ slug: s, name: countyIndex.parse(s).name, label: countyIndex.label(s), href: `digital-marketing-${s}.html` }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** A→Z jump links, with the anchor attached to the first entry under each letter. */
function letterIndex(list, prefix) {
  const seen = new Set();
  const items = list.map((c) => {
    const first = c.name[0].toUpperCase();
    const anchor = seen.has(first) ? "" : (seen.add(first), prefix + first);
    return { ...c, anchor };
  });
  const letters = [...seen].sort().map((l) => ({ label: l, href: "#" + prefix + l }));
  return { items, letters };
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

/* ---------- state pages ---------- */

for (const st of states.STATES) {
  const copy = stateCopy.copyFor(st);
  const nearby = states.STATES
    .filter((s) => s.region === st.region && s.slug !== st.slug)
    .concat(states.STATES.filter((s) => s.region !== st.region && s.slug !== st.slug))
    .slice(0, 8)
    .map((s) => ({ label: s.name, href: stateHref(s) }));

  const scope = {
    ...BASE_SCOPE, ...NAV,
    stateName: st.name, capital: st.capital, regionLabel: st.regionLabel,
    metros: st.metros, industries: st.industries, firstMetro: st.metros[0],
    countyLine: `${st.countyCount} ${st.countyNoun}`,
    hasCounties: true,
    countyHref: dirHref(st),
    countyLinkLabel: `Browse all ${st.countyCount} ${st.name} ${st.countyNoun} →`,
    lede: copy.lede, sections: copy.sections, faq: copy.faq, nearby,
  };

  const description = `Digital marketing in ${st.name}. Paid search, paid social, connected TV and display for local businesses — campaigns live in 60 seconds.`;
  // FAQPage as its own top-level block, not nested inside Service.
  const jsonld = [{
    "@context": "https://schema.org", "@type": "Service",
    serviceType: "Digital marketing", provider: { "@id": `${SITE}/#organization` },
    areaServed: { "@type": "State", name: st.name },
    name: `Digital Marketing in ${st.name}`, description, url: `${SITE}/${stateHref(st)}`,
  }];
  if ((copy.faq || []).length) {
    jsonld.push({
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: copy.faq.map((f) => ({
        "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  await emit(stateHref(st), {
    title: `Digital Marketing in ${st.name} | Digital Marketing Agency | DeepThought`,
    description,
    body: render(STATE_TPL, scope, partials),
    jsonld,
  });
}

/* ---------- county directories ---------- */

for (const st of states.STATES) {
  const file = dirHref(st);
  const list = countiesOf(st);
  const description = `Every ${st.name} county we cover — ${list.length} ${st.countyNoun} with a local digital marketing page.`;
  const jsonld = [{
    "@context": "https://schema.org", "@type": "CollectionPage",
    name: `Digital Marketing in Every ${st.name} County`, description, url: `${SITE}/${file}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: list.map((c, i) => ({
        "@type": "ListItem", position: i + 1, url: `${SITE}/${c.href}`, name: c.label,
      })),
    },
  }];

  if (st.ab === "GA" || st.ab === "FL") {
    const pool = st.ab === "GA" ? counties.COUNTIES : counties.FL_COUNTIES;
    const order = st.ab === "GA"
      ? ["metro","north","northeast","westcentral","middle","eastcentral","southwest","southcentral","southeast","coastal"]
      : [...new Set(pool.map((c) => c.region))];
    const seen = new Set();
    const regions = order.map((key) => {
      const cs = pool.filter((c) => c.region === key).map((c) => {
        const first = c.name[0].toUpperCase();
        const anchor = seen.has(first) ? "" : (seen.add(first), "letter-" + first);
        return {
          label: c.name + " County", seat: c.seat, anchor,
          href: `digital-marketing-${c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-county-${st.ab.toLowerCase()}.html`,
        };
      });
      return { key, label: (counties.REGIONS || {})[key] || key, count: cs.length, counties: cs };
    }).filter((r) => r.count > 0);
    const letters = [...seen].sort().map((l) => ({ label: l, href: "#letter-" + l }));

    await emit(file, {
      title: `Digital Marketing in Every ${st.name} County | DeepThought`,
      description,
      body: render(st.ab === "GA" ? GA_TPL : FL_TPL, { ...BASE_SCOPE, ...NAV, regions, letters }, partials),
      jsonld,
    });
    continue;
  }

  const { items, letters } = letterIndex(list, "c-");
  await emit(file, {
    title: `Digital Marketing in Every ${st.name} County | DeepThought`,
    description,
    body: render(DIR_TPL, {
      ...BASE_SCOPE, ...NAV,
      stateName: st.name, stateHref: stateHref(st),
      countyLine: `${st.countyCount} ${st.countyNoun}`,
      counties: items.map((c) => ({ label: c.label, href: c.href, anchor: c.anchor })),
      letters,
      statusLine: `${list.length} ${st.countyNoun} in ${st.name}. Each has its own page with local population, workforce and industry figures.`,
    }, partials),
    jsonld,
  });
}

/* ---------- all-states index ---------- */

{
  const order = ["southeast","midatlantic","northeast","midwest","plains","south","southwest","mountain","pacific","noncontiguous"];
  const seen = new Set();
  const regions = order.map((key) => {
    const list = states.STATES.filter((s) => s.region === key).map((s) => {
      const first = s.name[0].toUpperCase();
      const anchor = seen.has(first) ? "" : (seen.add(first), "state-" + first);
      return { label: s.name, note: `${s.countyCount} ${s.countyNoun}`, href: stateHref(s), anchor };
    });
    return { key, label: states.US_REGIONS[key], count: list.length, states: list };
  }).filter((r) => r.count > 0);
  const letters = [...seen].sort().map((l) => ({ label: l, href: "#state-" + l }));

  const description = "Digital marketing coverage across all 50 states — paid search, paid social, connected TV and display for local businesses.";
  await emit("us-states.html", {
    title: "Digital Marketing in All 50 States | DeepThought",
    description,
    body: render(US_TPL, { ...BASE_SCOPE, ...NAV, regions, letters }, partials),
    jsonld: [{
      "@context": "https://schema.org", "@type": "CollectionPage",
      name: "Digital Marketing in All 50 States", description, url: `${SITE}/us-states.html`,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: states.STATES.map((s, i) => ({
          "@type": "ListItem", position: i + 1, url: `${SITE}/${stateHref(s)}`, name: s.name,
        })),
      },
    }],
  });
}

console.log(`render-states: ${written} pages (${states.STATES.length} states, ${states.STATES.length} directories, 1 index)`);
if (holes) { console.error(`FAIL: ${holes} page(s) still contain {{ }} holes`); process.exit(1); }

export { rendered };
