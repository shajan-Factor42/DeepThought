#!/usr/bin/env node
/**
 * brand-scrub.mjs — remove configured phrases from the served HTML
 *
 * Some copy lives inside site.zip, which is a design-tool export. Editing it by hand and
 * dropping the result into overrides/ is the pattern that took the home page down on
 * 2026-09-11: a hand-maintained copy of a generated file drifts from its source, silently,
 * until something breaks. So instead the phrases to remove are declared as data in
 * build/aeo-data.json and stripped on every build. Re-export site.zip as often as you like —
 * the scrub reapplies.
 *
 * This is a stopgap by design. The right fix for any phrase listed here is to remove it in
 * the tool that generates site.zip; the list should shrink over time, not grow.
 *
 * Runs before everything else that touches content, so prerender.mjs never captures a
 * scrubbed phrase into the <noscript> fallback.
 *
 * Declare phrases as exact strings:
 *
 *   "scrub": ["Rates are Factor42 wholesale rates. "]
 *
 * Include trailing spaces where removing one would otherwise leave a double space.
 *
 * Usage:
 *   node build/brand-scrub.mjs --dir _site [--check] [--verbose]
 *
 *   --check   report only, write nothing, exit 1 if any phrase is still present.
 *             This is what the CI gate runs.
 */

import { readFile, writeFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const args = process.argv.slice(2);
const arg = (name, dflt) => {
  const i = args.indexOf("--" + name);
  return i === -1 ? dflt : args[i + 1];
};
const DIR = arg("dir", "_site");
const CHECK = args.includes("--check");
const VERBOSE = args.includes("--verbose");

const data = JSON.parse(await readFile("build/aeo-data.json", "utf8"));
const phrases = (data.scrub || []).filter((p) => typeof p === "string" && p.length);

if (!phrases.length) {
  console.log("brand-scrub: no phrases declared — nothing to do");
  process.exit(0);
}

async function htmlFiles(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await htmlFiles(p)));
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

const files = await htmlFiles(DIR);
const counts = new Map(phrases.map((p) => [p, 0]));
const pagesFor = new Map(phrases.map((p) => [p, new Set()]));
let pagesTouched = 0;

for (const path of files) {
  const html = await readFile(path, "utf8");
  let next = html;
  for (const p of phrases) {
    if (!next.includes(p)) continue;
    const n = next.split(p).length - 1;
    counts.set(p, counts.get(p) + n);
    pagesFor.get(p).add(path);
    if (!CHECK) next = next.split(p).join("");
  }
  if (!CHECK && next !== html) {
    await writeFile(path, next, "utf8");
    pagesTouched++;
    if (VERBOSE) console.log("  ok  " + path);
  }
}

console.log("brand-scrub: " + (CHECK ? "check" : "scrub") + " over " + files.length + " pages");
let remaining = 0;
for (const p of phrases) {
  const n = counts.get(p);
  const pages = pagesFor.get(p).size;
  const label = JSON.stringify(p.length > 56 ? p.slice(0, 53) + "..." : p);
  console.log("  " + (CHECK ? "still present" : "removed") + " " + n + " on " + pages + " page(s): " + label);
  if (CHECK) remaining += n;
}
if (!CHECK) console.log("  pages rewritten " + pagesTouched);

if (CHECK && remaining > 0) {
  for (const p of phrases) {
    for (const f of [...pagesFor.get(p)].slice(0, 5)) console.error("    " + f);
  }
  console.error("FAIL: " + remaining + " occurrence(s) of a scrubbed phrase remain");
  process.exit(1);
}
if (CHECK) console.log("  all declared phrases absent");
