#!/usr/bin/env node
/**
 * brand-normalize.mjs — collapse every brand-name variant in page schema onto one entity
 *
 * An audit of the deployed pages found five strings naming the same company:
 *
 *   DeepThought                     home page schema, site copy, the wordmark
 *   Deep Thought                    hero copy
 *   DeepThought Marketing           county and state pages (provider.name)
 *   Deep Thought Marketing          further nodes, and the Google Business Profile
 *   Deep Thought Digital Marketing  the Facebook page
 *
 * Each county page declared its own inline Organization inside `provider` — thousands of
 * loose organizations that happen to share a URL, rather than one organization referenced
 * thousands of times. To a knowledge graph those are separate, weakly-attested entities.
 *
 * This rewrites every one of them to a reference:
 *
 *   "provider": { "@id": "https://deepthought.marketing/#organization" }
 *
 * The name is then stated once, in aeo-data.json, and every page resolves to the same
 * entity. To change the canonical name later, edit organization.name there and rebuild.
 *
 * Matching is done on a squashed form — lowercased, alphanumerics only — so spacing and
 * case variants collapse together. A node whose name is NOT a declared variant is left
 * untouched: a provider that is genuinely a different company must never be silently
 * renamed.
 *
 * Runs after prerender.mjs, which is what puts the canonical definition on every page. A
 * page that does not carry that definition is skipped rather than stripped, so folding can
 * never leave a page holding a reference to an entity it never defines.
 *
 * Usage:
 *   node build/brand-normalize.mjs --dir _site [--check] [--verbose]
 *
 *   --check   report only, write nothing, exit 1 if any inline variant node remains.
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
const SITE = data.site.replace(/\/$/, "");
const ORG_ID = SITE + "/#organization";

const squash = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");

const o = data.organization;
const VARIANTS = new Set(
  [o.name, o.legalName, ...(Array.isArray(o.alternateName) ? o.alternateName : [o.alternateName])]
    .filter(Boolean)
    .map(squash)
);

const typeOf = (node) => {
  const t = node["@type"];
  return Array.isArray(t) ? t : [t];
};

const isFoldable = (node) =>
  node &&
  typeof node === "object" &&
  !Array.isArray(node) &&
  typeOf(node).includes("Organization") &&
  typeof node.name === "string" &&
  VARIANTS.has(squash(node.name)) &&
  node["@id"] !== ORG_ID;

/** Walk any JSON-LD value, folding foldable Organization nodes. Returns [value, count]. */
function fold(value) {
  let count = 0;
  if (Array.isArray(value)) {
    const out = value.map((v) => {
      const [nv, n] = fold(v);
      count += n;
      return nv;
    });
    return [out, count];
  }
  if (value && typeof value === "object") {
    if (isFoldable(value)) {
      return [{ "@id": ORG_ID }, 1];
    }
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      const [nv, n] = fold(v);
      count += n;
      out[k] = nv;
    }
    return [out, count];
  }
  return [value, count];
}

const SCRIPT_RE = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

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

let pagesRewritten = 0;
let nodesRewritten = 0;
let remaining = 0;
const remainingFiles = [];
let unparsable = 0;
let noDefinition = 0;

for (const path of files) {
  const html = await readFile(path, "utf8");
  if (!html.includes("ld+json")) continue;

  // Folding a page that never defines the canonical entity would leave a dangling
  // reference. prerender.mjs writes that definition; if it is absent, leave the page alone.
  const defines = html.includes(ORG_ID);

  let pageNodes = 0;
  let changed = false;

  const next = html.replace(SCRIPT_RE, (whole, body) => {
    let parsed;
    try {
      parsed = JSON.parse(body);
    } catch {
      unparsable++;
      return whole;
    }
    const [folded, n] = fold(parsed);
    if (n === 0) return whole;

    if (!defines) {
      noDefinition++;
      remaining += n;
      if (!remainingFiles.includes(path)) remainingFiles.push(path);
      return whole;
    }
    if (CHECK) {
      remaining += n;
      if (!remainingFiles.includes(path)) remainingFiles.push(path);
      return whole;
    }

    pageNodes += n;
    changed = true;
    const json = JSON.stringify(folded, null, 2).replace(/<\/script/gi, "<\\/script");
    return whole.replace(body, "\n" + json + "\n");
  });

  if (changed && !CHECK) {
    await writeFile(path, next, "utf8");
    pagesRewritten++;
    nodesRewritten += pageNodes;
    if (VERBOSE) console.log("  ok  " + path + "  (" + pageNodes + ")");
  }
}

console.log("brand-normalize: " + (CHECK ? "check" : "rewrite") + " over " + files.length + " pages");
console.log("  canonical @id            " + ORG_ID);
console.log("  name variants matched    " + VARIANTS.size);
if (!CHECK) {
  console.log("  pages rewritten          " + pagesRewritten);
  console.log("  nodes rewritten          " + nodesRewritten);
}
console.log("  inline brand-name nodes remaining: " + remaining);
if (unparsable) console.log("  unparsable ld+json blocks " + unparsable);
if (noDefinition) {
  console.log("  WARNING: " + noDefinition + " block(s) skipped — page has no " + ORG_ID + " definition");
}
if (remainingFiles.length) {
  console.log("  first offenders:");
  remainingFiles.slice(0, 10).forEach((f) => console.log("    " + f));
}

if (remaining > 0) {
  console.error(
    "FAIL: " + remaining + " inline organization node(s) still carry a brand-name variant"
  );
  process.exit(1);
}
