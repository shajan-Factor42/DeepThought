#!/usr/bin/env node
/**
 * faq-sync.mjs — render the visible home page FAQ from build/aeo-data.json
 *
 * The problem this solves: the home page accordion showed 4 questions while the FAQPage
 * JSON-LD declared 6. Two answers (pricing, and "is it an agency") existed only in schema.
 * A search or answer engine comparing the two sees a page claiming content it does not show.
 *
 * Fixing that by hand-editing index.html is exactly the mistake that caused the Sep 11
 * outage — a hand-maintained copy of a generated file drifts from it. So instead both the
 * visible FAQ and the JSON-LD now read from one source: build/aeo-data.json. Add or reword
 * an entry there and the page and the schema both update on the next build.
 *
 * The replacement markup uses native <details>/<summary> rather than the design-system
 * accordion. That removes 16 unresolved {{ }} template holes from served HTML, works with
 * JavaScript disabled, is keyboard accessible by default, and puts every answer in the raw
 * HTML where answer engines read it.
 *
 * Runs before prerender.mjs, so the prerendered static block picks up the full FAQ text.
 * Idempotent: it replaces the whole <section id="faq"> every time.
 *
 * Usage:
 *   node build/faq-sync.mjs --dir _site [--file index.html]
 */

import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const args = process.argv.slice(2);
const arg = (name, dflt) => {
  const i = args.indexOf("--" + name);
  return i === -1 ? dflt : args[i + 1];
};
const DIR = arg("dir", "_site");
const FILE = arg("file", "index.html");

const fail = (msg) => {
  console.error("FAIL: faq-sync: " + msg);
  process.exit(1);
};

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const data = JSON.parse(await readFile("build/aeo-data.json", "utf8"));
const faq = data.faq || [];
if (!faq.length) fail("build/aeo-data.json has no faq entries");

const path = join(DIR, FILE);
let html = await readFile(path, "utf8");

/* ---------- locate <section id="faq"> and its matching close ---------- */

const openRe = /<section\b[^>]*\bid=["']faq["'][^>]*>/i;
const openMatch = html.match(openRe);
if (!openMatch) fail('no <section id="faq"> found in ' + path);

const start = openMatch.index;
const openTag = openMatch[0];

// Scan forward counting <section> depth so a nested section cannot make the splice
// truncate the rest of the page.
const tagRe = /<section\b[^>]*>|<\/section\s*>/gi;
tagRe.lastIndex = start;
let depth = 0;
let end = -1;
let nested = 0;
let m;
while ((m = tagRe.exec(html)) !== null) {
  if (m[0][1] === "/") {
    depth--;
    if (depth === 0) {
      end = m.index + m[0].length;
      break;
    }
  } else {
    depth++;
    if (depth > 1) nested++;
  }
}
if (end === -1) fail('<section id="faq"> is never closed — refusing to splice');
if (nested > 0) {
  fail(
    'found ' + nested + ' nested <section> inside #faq. The replacement would discard ' +
    'them. Inspect the page before re-running.'
  );
}

const oldSection = html.slice(start, end);
const holesBefore = (oldSection.match(/\{\{[^}]*\}\}/g) || []).length;

/* ---------- build the replacement ---------- */

// Styling mirrors the original cards: white ground, subtle border, 16px radius,
// 22px/26px padding, blue +/- indicator, border colour change on hover.
const STYLE = `    <style>
      #faq .faq-card{background:var(--f42-white); border:1px solid var(--border-subtle); border-radius:16px; padding:22px 26px}
      #faq .faq-card:hover{border-color:var(--border-hover)}
      #faq .faq-card summary{display:flex; align-items:center; justify-content:space-between; gap:20px; cursor:pointer; list-style:none; font-family:var(--font-display); font-size:17px; font-weight:700; letter-spacing:-0.015em}
      #faq .faq-card summary::-webkit-details-marker{display:none}
      #faq .faq-card summary::marker{content:""}
      #faq .faq-sign{color:var(--f42-primary-blue); font-size:20px; line-height:1; flex:0 0 auto}
      #faq .faq-sign::after{content:"+"}
      #faq .faq-card[open] .faq-sign::after{content:"\\2212"}
      #faq .faq-a{font-size:15.5px; line-height:1.65; color:var(--text-body); margin:14px 0 0; max-width:680px}
    </style>`;

const heading =
  '    <h2 style="font-family:var(--font-display); font-size:40px; font-weight:800; ' +
  'letter-spacing:-0.03em; margin:0 0 36px; text-align:center">Frequently asked questions</h2>';

const cards = faq
  .map(
    (f) =>
      '      <details class="faq-card">\n' +
      "        <summary>\n" +
      "          <span>" + esc(f.q) + "</span>\n" +
      '          <span class="faq-sign" aria-hidden="true"></span>\n' +
      "        </summary>\n" +
      '        <p class="faq-a">' + esc(f.a) + "</p>\n" +
      "      </details>"
  )
  .join("\n");

const newSection =
  openTag +
  "\n" +
  STYLE +
  "\n" +
  heading +
  "\n" +
  '    <div style="display:flex; flex-direction:column; gap:12px">\n' +
  cards +
  "\n    </div>\n  </section>";

html = html.slice(0, start) + newSection + html.slice(end);
await writeFile(path, html, "utf8");

/* ---------- report ---------- */

const holesAfter = (newSection.match(/\{\{[^}]*\}\}/g) || []).length;
console.log("faq-sync: " + faq.length + " entries written to " + FILE);
console.log("  template holes removed: " + (holesBefore - holesAfter));
console.log("  <details> elements:     " + (newSection.match(/<details\b/g) || []).length);

if (holesAfter > 0) fail("replacement markup still contains {{ }} holes");
