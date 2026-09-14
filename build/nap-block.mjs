#!/usr/bin/env node
/**
 * nap-block.mjs — write the visible name / address / phone into the served HTML
 *
 * Local corroboration works by matching: the name, address and phone on the site have to
 * agree with the Google Business Profile, character for character. A near-match corroborates
 * nothing. So both the visible block and the PostalAddress in the Organization schema are
 * rendered from one source — build/aeo-data.json — and cannot drift apart.
 *
 * It cannot go in the footer. SiteFooter is a <dc-import> component rendered client-side, so
 * anything placed inside it is invisible to a crawler that does not run JavaScript. This
 * injects real markup immediately above the component, on the pages that carry it.
 *
 * Runs before social-links.mjs, so the served order reads NAP, then profile links, then the
 * footer component.
 *
 * Idempotent: a page already carrying the block is reported and left alone.
 *
 * Usage:
 *   node build/nap-block.mjs --dir _site [--verbose]
 */

import { readFile, writeFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const args = process.argv.slice(2);
const arg = (name, dflt) => {
  const i = args.indexOf("--" + name);
  return i === -1 ? dflt : args[i + 1];
};
const DIR = arg("dir", "_site");
const VERBOSE = args.includes("--verbose");

const MARKER = 'id="nap-block"';
const FOOTER_RE = /<dc-import\b[^>]*name=["']SiteFooter["'][^>]*>(?:<\/dc-import>)?/i;

const data = JSON.parse(await readFile("build/aeo-data.json", "utf8"));
const o = data.organization || {};
const a = o.address;

if (!a && !o.telephone) {
  console.log("nap-block: no address or telephone in aeo-data.json — nothing to inject");
  process.exit(0);
}

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Digits only, E.164-ish, for the tel: href. The visible string stays exactly as written in
// aeo-data.json so it matches the GBP.
const telHref = o.telephone ? o.telephone.replace(/[^\d+]/g, "") : "";
// Schema carries E.164 (+1-770-...); the visible string has to match the Google Business
// Profile's own formatting, so it comes from telephoneDisplay when that is set.
const telText = o.telephoneDisplay || o.telephone || "";

const lines = [];
lines.push('      <span style="font-weight:600">' + esc(o.name) + "</span>");
if (a) {
  const street = esc(a.streetAddress || "");
  // "Dacula, GA 30019" — no comma before the ZIP, which is how the GBP renders it.
  const cityState = [a.addressLocality, a.addressRegion].filter(Boolean).map(esc).join(", ");
  const region = [cityState, esc(a.postalCode || "")].filter(Boolean).join(" ");
  lines.push("      <span>" + [street, region].filter(Boolean).join(", ") + "</span>");
}
if (telText) {
  lines.push(
    '      <a href="tel:' + esc(telHref) + '" style="color:inherit; text-decoration:none">' +
      esc(telText) +
      "</a>"
  );
}

const BLOCK =
  "<address " + MARKER + ' style="max-width:1200px; margin:0 auto; padding:0 40px 8px; ' +
  "display:flex; flex-wrap:wrap; gap:8px 20px; justify-content:center; font-size:14px; " +
  'font-style:normal; opacity:0.75">\n' +
  lines.join("\n") +
  "\n    </address>\n\n  ";

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
let injected = 0;
let already = 0;
let noFooter = 0;

for (const path of files) {
  const html = await readFile(path, "utf8");
  if (html.includes(MARKER)) {
    already++;
    continue;
  }
  if (!FOOTER_RE.test(html)) {
    noFooter++;
    continue;
  }
  await writeFile(path, html.replace(FOOTER_RE, (f) => BLOCK + f), "utf8");
  injected++;
  if (VERBOSE) console.log("  ok  " + path);
}

console.log("nap-block: " + o.name);
if (a) {
  const cs = [a.addressLocality, a.addressRegion].filter(Boolean).join(", ");
  console.log("  " + [a.streetAddress, [cs, a.postalCode].filter(Boolean).join(" ")].filter(Boolean).join(", "));
}
if (telText) console.log("  " + telText);
console.log("  injected        " + injected);
console.log("  already present " + already);
console.log("  no footer       " + noFooter);

if (injected === 0 && already === 0) {
  console.error("FAIL: nap-block: no page carried the SiteFooter component");
  process.exit(1);
}
