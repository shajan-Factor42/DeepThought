#!/usr/bin/env node
/**
 * copy-rewrite.mjs — replace configured phrases in the served HTML
 *
 * Companion to brand-scrub.mjs. That script removes phrases; this one replaces them.
 *
 * Same reasoning, same discipline: copy that lives inside site.zip is a design-tool export.
 * Editing it by hand and dropping the result into overrides/ is the pattern that took the
 * home page down on 2026-09-11 — a hand-maintained copy of a generated file drifts from its
 * source, silently, until something breaks. So the edits are declared as data in
 * build/aeo-data.json and reapplied on every build. Re-export site.zip as often as you like.
 *
 * This is a stopgap by design. The right fix for any rewrite listed here is to make the edit
 * in the tool that generates site.zip and then delete the entry. The list should shrink.
 *
 * Runs immediately after brand-scrub.mjs and before faq-sync / prerender, so prerender never
 * captures pre-rewrite copy into the <noscript> fallback.
 *
 * Declare rewrites as exact strings:
 *
 *   "rewrite": [
 *     { "from": "One engine. Every channel.", "to": "Meet Deep Thought.", "files": ["product.html"] }
 *   ]
 *
 * "files" is optional. Omit it to apply site-wide; supply an array of file names to limit the
 * rewrite to those pages. "min" is optional too — the number of replacements expected across
 * the whole site, default 1. The build fails if a declared rewrite matches nothing, which is
 * what catches a re-exported site.zip that changed the wording out from under an entry.
 *
 * Whole sections are removed with a "cut" rule instead of a giant "from" string:
 *
 *   "rewrite": [
 *     { "cut": "Rate detail by product", "files": ["pricing.html"], "replaceWith": "<section>...</section>" }
 *   ]
 *
 * "cut" is an anchor string inside the section. The rule walks back to the nearest enclosing
 * <section and forward to its </section>, and fails the build if another <section opens inside
 * that span — the same guard faq-sync.mjs uses, so a re-export that nests markup differently
 * cannot silently truncate the page. "replaceWith" is optional; omit it to delete outright.
 *
 * Usage:
 *   node build/copy-rewrite.mjs --dir _site [--check] [--verbose]
 *
 *   --check   report only, write nothing, exit 1 if any "from" string is still present.
 *             This is what the CI gate runs, after the rewrite pass.
 */

import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, basename } from "node:path";

const args = process.argv.slice(2);
const arg = (name, dflt) => {
  const i = args.indexOf("--" + name);
  return i === -1 ? dflt : args[i + 1];
};
const DIR = arg("dir", "_site");
const CHECK = args.includes("--check");
const VERBOSE = args.includes("--verbose");

const data = JSON.parse(await readFile("build/aeo-data.json", "utf8"));

const declared = data.rewrite || [];

const cuts = declared
  .filter((r) => r && typeof r.cut === "string" && r.cut.length)
  .map((r) => ({
    cut: r.cut,
    replaceWith: typeof r.replaceWith === "string" ? r.replaceWith : "",
    files: Array.isArray(r.files) && r.files.length ? new Set(r.files) : null,
    min: Number.isInteger(r.min) ? r.min : 1,
    note: r.note || "",
    hits: 0,
  }));

const rules = declared
  .filter((r) => r && typeof r.from === "string" && r.from.length && typeof r.to === "string")
  .map((r) => ({
    from: r.from,
    to: r.to,
    files: Array.isArray(r.files) && r.files.length ? new Set(r.files) : null,
    min: Number.isInteger(r.min) ? r.min : 1,
    note: r.note || "",
    hits: 0,
  }));

if (!rules.length && !cuts.length) {
  console.log("copy-rewrite: no rewrites declared — nothing to do");
  process.exit(0);
}

// Walk back to the enclosing <section and forward to its </section>.
function sectionSpan(html, anchorIndex, label) {
  const start = html.lastIndexOf("<section", anchorIndex);
  if (start === -1) throw new Error(`cut "${label}": no enclosing <section`);
  const close = html.indexOf("</section>", anchorIndex);
  if (close === -1) throw new Error(`cut "${label}": section is unterminated`);
  const end = close + "</section>".length;
  const inner = html.slice(start + "<section".length, close);
  if (inner.includes("<section")) {
    throw new Error(`cut "${label}": a nested <section> opens inside the span — refusing to splice`);
  }
  return [start, end];
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
let filesChanged = 0;

for (const path of files) {
  const name = basename(path);
  let html = await readFile(path, "utf8");
  const before = html;

  for (const c of cuts) {
    if (c.files && !c.files.has(name)) continue;
    let at = html.indexOf(c.cut);
    while (at !== -1) {
      const [s0, e0] = sectionSpan(html, at, c.cut);
      c.hits++;
      if (!CHECK) html = html.slice(0, s0) + c.replaceWith + html.slice(e0);
      if (VERBOSE) console.log(`  ${name}: cut section @${s0}-${e0}  ${JSON.stringify(c.cut.slice(0, 50))}`);
      if (CHECK) break;
      at = html.indexOf(c.cut);
    }
  }

  for (const r of rules) {
    if (r.files && !r.files.has(name)) continue;
    if (!html.includes(r.from)) continue;
    const n = html.split(r.from).length - 1;
    r.hits += n;
    if (!CHECK) html = html.split(r.from).join(r.to);
    if (VERBOSE) console.log(`  ${name}: ${n}x  ${JSON.stringify(r.from.slice(0, 60))}`);
  }

  if (!CHECK && html !== before) {
    await writeFile(path, html, "utf8");
    filesChanged++;
  }
}

const missed = [...rules, ...cuts].filter((r) => r.hits < r.min);

if (CHECK) {
  // After the rewrite pass, no "from" string should survive anywhere it was meant to apply.
  const survivors = [...rules, ...cuts].filter((r) => r.hits > 0);
  if (survivors.length) {
    console.error("FAIL: copy-rewrite --check found un-rewritten source phrases:");
    for (const r of survivors) console.error(`  ${r.hits}x  ${JSON.stringify((r.from || r.cut).slice(0, 80))}`);
    process.exit(1);
  }
  console.log(`copy-rewrite --check: clean across ${files.length} files`);
  process.exit(0);
}

console.log(`copy-rewrite: ${rules.length} rewrite(s) + ${cuts.length} cut(s), ${filesChanged} file(s) changed`);
for (const r of [...rules, ...cuts]) {
  console.log(`  ${String(r.hits).padStart(4)}x  ${JSON.stringify((r.from || r.cut).slice(0, 64))}`);
}

if (missed.length) {
  console.error("");
  console.error("FAIL: declared rewrite(s) matched nothing. site.zip probably changed the wording.");
  for (const r of missed) {
    console.error(`  expected >=${r.min}, got ${r.hits}: ${JSON.stringify((r.from || r.cut).slice(0, 80))}`);
    if (r.note) console.error(`    note: ${r.note}`);
  }
  process.exit(1);
}
