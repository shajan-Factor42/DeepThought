/**
 * render-counties.mjs — emit all 3,141 county pages as finished HTML.
 *
 * Replaces the browser-side assembly: same template, same data modules, same markup, but the
 * text is in the file when it ships. No React runtime, no {{ }} holes reaching a crawler, and
 * no need for prerender.mjs to reopen each page in headless Chrome afterwards.
 *
 * The county object is built exactly as the template's componentDidMount built it, so the
 * generated pages match what a visitor sees today — with two deliberate exceptions, both
 * flagged below.
 *
 * Usage: node build/render/render-counties.mjs --src dist --out _site [--limit N]
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, resolve as resolvePath } from "node:path";
import { pathToFileURL } from "node:url";
import { render, templateFrom, esc } from "./dc.mjs";
import { loadShell, page, SITE, BASE_SCOPE } from "./shell.mjs";

const args = process.argv.slice(2);
const arg = (n, d) => { const i = args.indexOf("--" + n); return i === -1 ? d : args[i + 1]; };
const SRC = resolvePath(arg("src", "dist"));
const OUT = resolvePath(arg("out", "_site"));
const LIMIT = Number(arg("limit", 0));

// EXCEPTION 1: the testimonial block. Every county page generated a named customer quote from
// a pool of invented first names, surnames and business suffixes, seeded by the county slug.
// Removed site-wide on 2026-09-14; the rebuild does not reintroduce it.
const DROP_TESTIMONIAL = true;

// EXCEPTION 2: the stat strip. stats() derived statPopulation, statBusinesses, statSearches and
// statCpl from a hash of the county slug — invented numbers presented as facts about a real
// place. The strip is now rebuilt from build/data/county-facts.json: Census population
// estimates and BLS employment joined to each county on FIPS.
//
// Two of the four originals are gone for good. Local search volume is proprietary to keyword
// tools, not public data. Median cost per lead was labelled "across accounts we run here" —
// there are no accounts in 2,915 of these counties. Neither has an honest source, so neither
// is displayed. Every figure now shown carries the year and agency it came from.
const FACTS = JSON.parse(await readFile(new URL("../data/county-facts.json", import.meta.url), "utf8"));

const imp = async (f) => import(pathToFileURL(join(SRC, f)).href);
const counties = await imp("counties.js");
const countyCopy = await imp("county-copy.js");
const states = await imp("states.js");
const countyIndex = await imp("county-index.js");

/* ---------- templates ---------- */

const countyPage = await readFile(join(SRC, "digital-marketing-cobb-county-ga.html"), "utf8");
let TEMPLATE = templateFrom(countyPage);
const { helmet, partials } = await loadShell(SRC);

/** Cut a <section> by an anchor inside it, refusing to splice if another section opens within. */
function cutSection(html, anchor, label) {
  const at = html.indexOf(anchor);
  if (at === -1) return { html, cut: false };
  const start = html.lastIndexOf("<section", at);
  const close = html.indexOf("</section>", at);
  if (start === -1 || close === -1) throw new Error(`${label}: no enclosing section`);
  const inner = html.slice(start + 8, close);
  if (inner.includes("<section")) throw new Error(`${label}: nested section — refusing to splice`);
  return { html: html.slice(0, start) + html.slice(close + "</section>".length), cut: true };
}

if (DROP_TESTIMONIAL) {
  const r = cutSection(TEMPLATE, "{{ tQuote }}", "testimonial");
  TEMPLATE = r.html;
  console.log("render-counties: testimonial block " + (r.cut ? "removed" : "not present"));
}
{
  const r = cutSection(TEMPLATE, "{{ statPopulation }}", "stat strip");
  TEMPLATE = r.html;
  console.log("render-counties: hash-derived stat strip " + (r.cut ? "replaced" : "not present"));
}

for (const hole of ["tQuote", "tName", "tRole", "tBusiness", "tInitials", "statPopulation", "statBusinesses", "statSearches", "statCpl"]) {
  if (TEMPLATE.includes(`{{ ${hole} }}`)) throw new Error(`template still references {{ ${hole} }} after cuts`);
}

/* ---------- the county object, as the runtime built it ---------- */

function buildCounty(slug) {
  const known = counties.byslug ? counties.byslug(slug) : null;
  if (known && !slug.includes("-county-")) return known;

  const parsed = countyIndex.parse(slug);
  if (!parsed) return null;

  const gaFl = counties.ALL_COUNTIES.find(
    (c) => c.state === parsed.state && c.name.toLowerCase() === parsed.name.toLowerCase()
  );
  if (gaFl) return gaFl;

  const st = states.byab(parsed.state);
  if (!st) return null;
  return {
    slug: st.ab.toLowerCase() + "-" + parsed.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name: parsed.name, seat: "", state: st.ab, stateName: st.name,
    region: st.region, regionLabel: st.regionLabel,
    cities: st.metros.slice(0, 2), industries: st.industries,
    generated: true, stateSlug: st.slug,
  };
}

function nearbyFor(slug, county) {
  const f = FACTS[slug];
  const near = (f && f.nearby) || [];
  return near.map((n) => ({ label: labelFor(n, county.state), href: `digital-marketing-${n}.html` }));
}

/** "Anderson County" at home, "Anderson County, TX" when the neighbour is across a state line. */
function labelFor(slug, fromState) {
  const m = /^(.*)-(county|parish|borough|city|municipality|census-area)-([a-z]{2})$/.exec(slug);
  if (!m) return slug;
  const name = m[1].split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const kind = { county: "County", parish: "Parish", borough: "Borough", city: "City",
                 municipality: "Municipality", "census-area": "Census Area" }[m[2]];
  const st = m[3].toUpperCase();
  return st === fromState ? `${name} ${kind}` : `${name} ${kind}, ${st}`;
}

/** Florida slugs carry an "fl-" prefix in counties.js; the filenames do not. Derive from the name. */
function fileFor(c) {
  const name = c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `digital-marketing-${name}-county-${c.state.toLowerCase()}.html`;
}

function directoryFor(county) {
  const page = states.COUNTY_PAGES[county.state];
  if (page) return { directoryHref: page, directoryLabel: `All ${county.stateName} counties` };
  const st = states.byab(county.state);
  return {
    directoryHref: `digital-marketing-${st.slug}-counties.html`,
    directoryLabel: `All ${county.stateName} counties`,
  };
}

const nf = (n) => Number(n).toLocaleString("en-US");

/** The stat strip, rebuilt from real figures. Omitted entirely when a county has no match. */
function statStrip(slug) {
  const f = FACTS[slug];
  if (!f || !f.population) return "";
  const cells = [
    ["County population", nf(f.population), `US Census estimate, ${f.populationYear}`],
    f.employed ? ["Employed workforce", nf(f.employed), `Bureau of Labor Statistics, ${f.employedYear}`] : null,
    f.avgIncome ? ["Average income", "$" + nf(f.avgIncome), "US Census, per capita"] : null,
  ].filter(Boolean);
  const cell = ([label, value, note]) =>
    `<div><div style="font-size:11.5px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:var(--text-muted)">${esc(label)}</div>` +
    `<div style="font-family:var(--font-display); font-size:24px; font-weight:800; letter-spacing:-0.025em; margin-top:8px">${esc(value)}</div>` +
    `<div style="font-size:13px; color:var(--text-muted); margin-top:4px">${esc(note)}</div></div>`;
  return `<section style="background:rgba(255,255,255,0.66); border-top:1px solid var(--border-subtle); border-bottom:1px solid var(--border-subtle); padding:36px 0">` +
    `<div style="max-width:1100px; margin:0 auto; padding:0 40px; display:grid; grid-template-columns:repeat(${cells.length}, 1fr); gap:32px">` +
    cells.map(cell).join("") + `</div></section>`;
}

/* ---------- page shell ---------- */

/* ---------- run ---------- */

await mkdir(OUT, { recursive: true });

let slugs = countyIndex.COUNTY_SLUGS;
if (LIMIT) slugs = slugs.slice(0, LIMIT);

let written = 0, skipped = [], holes = 0;

for (const slug of slugs) {
  const county = buildCounty(slug);
  if (!county) { skipped.push(slug); continue; }

  const copy = countyCopy.copyFor(county);
  const scope = {
    ...BASE_SCOPE,
    county,
    countyName: county.name,
    stateName: county.stateName,
    regionLabel: county.regionLabel,
    seat: county.seat,
    lede: copy.lede,
    sections: copy.sections,
    faq: copy.faq,
    // Real per-county industry employment where we have it, rather than the state's list
    // standing in for all 254 of its counties.
    industries: (FACTS[slug] && FACTS[slug].topIndustries && FACTS[slug].topIndustries.length)
      ? FACTS[slug].topIndustries
      : county.industries,
    nearby: nearbyFor(slug, county),
    // Georgia and Florida use georgia-counties.html / florida-counties.html; every other
    // state has digital-marketing-<state>-counties.html. All 50 verified to exist.
    ...directoryFor(county),
  };

  let body = render(TEMPLATE, scope, partials);
  const strip = statStrip(slug);
  if (strip) {
    const anchor = body.indexOf("</section>");
    if (anchor !== -1) body = body.slice(0, anchor + 10) + strip + body.slice(anchor + 10);
  }
  if (body.includes("{{")) holes++;

  const file = `digital-marketing-${slug}.html`;
  const canonical = `${SITE}/${file}`;
  const title = `Digital Marketing in ${county.name} County, ${county.state} | Digital Marketing Agency | DeepThought`;
  const description = `Digital marketing in ${county.name} County, ${county.stateName}. Paid search, paid social, connected TV and display for local businesses — a digital marketing agency alternative with campaigns live in 60 seconds.`;

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Digital marketing",
    provider: { "@id": `${SITE}/#organization` },
    areaServed: { "@type": "AdministrativeArea", name: `${county.name} County, ${county.stateName}` },
    name: `Digital Marketing in ${county.name} County, ${county.stateName}`,
    description,
    url: canonical,
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: (copy.faq || []).map((f) => ({
        "@type": "Question", name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  };

  await writeFile(join(OUT, file), page({ title, description, canonical, jsonld, body, helmet }), "utf8");
  written++;
}

console.log(`render-counties: ${written} pages written`);
if (holes) console.error(`FAIL: ${holes} page(s) still contain {{ }} holes`);
if (skipped.length) console.error(`FAIL: ${skipped.length} slug(s) produced no county: ${skipped.slice(0, 5).join(", ")}`);
if (holes || skipped.length) process.exit(1);
