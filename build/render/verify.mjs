/**
 * verify.mjs — gates for the built site.
 *
 * Run twice: once by render.mjs on what it produced, and again at the end of the workflow on
 * what actually deploys, after the overrides overlay and the NAP/social injection have had
 * their turn. The second run is the one that matters — it checks the bytes going to Pages.
 *
 * The old gates checked the home page for a `#aeo-static` block and counted <details> against
 * FAQPage Question nodes, because browser assembly could leave a page empty or let the visible
 * FAQ drift from its schema. Neither failure is possible now: pages ship rendered, and the FAQ
 * renders from the same aeo-data.json array that builds the schema. These gates check the
 * things that can still go wrong.
 *
 * Usage: node build/render/verify.mjs --dir _site [--min-pages 3000]
 */

import { readdir, readFile, stat } from "node:fs/promises";
import { join, resolve as resolvePath } from "node:path";

const args = process.argv.slice(2);
const arg = (n, d) => { const i = args.indexOf("--" + n); return i === -1 ? d : args[i + 1]; };
const DIR = resolvePath(arg("dir", "_site"));
const MIN_PAGES = Number(arg("min-pages", 3000));

const files = (await readdir(DIR)).filter((f) => f.endsWith(".html")).sort();
const pages = new Set(files);

let holes = [], brokenLinks = 0, brokenAssets = 0, noCanonical = [], badLd = [], emptyish = [];
let noNap = [], noSocial = [];
const missing = new Map();
const note = (t) => missing.set(t, (missing.get(t) || 0) + 1);

for (const f of files) {
  const html = await readFile(join(DIR, f), "utf8");

  if (html.includes("{{")) holes.push(f);
  // Both used to be injected post-build and skipped any page without a rendered footer,
  // which was 3,032 of them. They render with the footer now, so every page should carry them.
  if (!html.includes('id="nap-block"')) noNap.push(f);
  if (!html.includes('id="social-profiles"')) noSocial.push(f);
  if (!/<link rel="canonical"/.test(html)) noCanonical.push(f);

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { badLd.push(f); }
  }

  // A page that renders but has almost no text means a renderer silently produced a shell.
  const text = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ");
  if (text.split(/\s+/).filter(Boolean).length < 120) emptyish.push(f);

  for (const h of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const t = h[1].split("#")[0].split("?")[0];
    if (!t || /^(https?:|mailto:|tel:)/.test(t)) continue;
    if (!pages.has(t)) { brokenLinks++; note(t); }
  }
  for (const a of html.matchAll(/<(?:link|script)\b[^>]*(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|data:)/.test(a[1])) continue;
    try { await stat(join(DIR, a[1])); } catch { brokenAssets++; note(a[1]); }
  }
}

// The sitemap must cover every indexable page. A page that ships without being listed is the
// failure that left all 99 blog posts out of the sitemap for months.
let sitemapMissing = [];
try {
  const sm = await readFile(join(DIR, "sitemap.xml"), "utf8");
  const listed = new Set([...sm.matchAll(/<loc>[^<]*?\/([^/<]+)<\/loc>/g)].map((m) => m[1]));
  for (const f of files) {
    const html = await readFile(join(DIR, f), "utf8");
    if (/content="[^"]*noindex/.test(html)) continue;
    if (!listed.has(f)) sitemapMissing.push(f);
  }
} catch { sitemapMissing = ["(sitemap.xml missing)"]; }

const extraSitemaps = (await readdir(DIR)).filter((f) => /^sitemap.*\.xml$/.test(f) && f !== "sitemap.xml");

const rows = [
  ["pages", files.length, files.length >= MIN_PAGES],
  ["template holes", holes.length, holes.length === 0],
  ["broken <a> links", brokenLinks, brokenLinks === 0],
  ["broken asset refs", brokenAssets, brokenAssets === 0],
  ["missing canonical", noCanonical.length, noCanonical.length === 0],
  ["invalid JSON-LD", badLd.length, badLd.length === 0],
  ["near-empty pages", emptyish.length, emptyish.length === 0],
  ["missing NAP block", noNap.length, noNap.length === 0],
  ["missing social links", noSocial.length, noSocial.length === 0],
  ["not in sitemap", sitemapMissing.length, sitemapMissing.length === 0],
  ["extra sitemap files", extraSitemaps.length, extraSitemaps.length === 0],
];

console.log(`verify: ${DIR}`);
for (const [label, value, ok] of rows) {
  console.log(`  ${ok ? "ok  " : "FAIL"}  ${String(label).padEnd(20)} ${value}`);
}

const failed = rows.filter((r) => !r[2]);
if (failed.length) {
  console.error("");
  if (holes.length) console.error("  holes: " + holes.slice(0, 5).join(", "));
  if (noCanonical.length) console.error("  no canonical: " + noCanonical.slice(0, 5).join(", "));
  if (badLd.length) console.error("  bad JSON-LD: " + badLd.slice(0, 5).join(", "));
  if (emptyish.length) console.error("  near-empty: " + emptyish.slice(0, 5).join(", "));
  if (noNap.length) console.error("  no NAP: " + noNap.slice(0, 5).join(", "));
  if (noSocial.length) console.error("  no social links: " + noSocial.slice(0, 5).join(", "));
  if (sitemapMissing.length) console.error("  not in sitemap: " + sitemapMissing.slice(0, 5).join(", "));
  if (extraSitemaps.length) console.error("  extra sitemaps: " + extraSitemaps.join(", "));
  for (const [t, n] of [...missing].slice(0, 10)) console.error(`  ${n}x missing target: ${t}`);
  process.exit(1);
}
console.log("all gates passed");
