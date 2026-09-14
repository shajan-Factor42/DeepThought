#!/usr/bin/env node
/**
 * social-links.mjs — write crawlable links to every profile in organization.sameAs
 *
 * organization.sameAs claims "these profiles are DeepThought." An entity graph corroborates
 * that claim in both directions or not at all, and before this step the site linked to none
 * of them — there was not one outbound social link in the served HTML anywhere.
 *
 * The links could not simply go in the footer. SiteFooter is a <dc-import> component
 * rendered client-side, so anchors placed inside it look correct in a browser and are
 * invisible to any crawler that does not execute JavaScript. This injects real anchors into
 * the served HTML immediately above the component, carrying rel="me" — the identity
 * relation, the visible counterpart of the sameAs claim.
 *
 * Only pages carrying the footer component are touched. The generated county stubs have no
 * footer and are skipped.
 *
 * Idempotent: a page that already carries the block is reported as already present and left
 * alone, so re-running changes nothing.
 *
 * Usage:
 *   node build/social-links.mjs --dir _site [--verbose]
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

const MARKER = 'id="social-profiles"';
const FOOTER_RE = /<dc-import\b[^>]*name=["']SiteFooter["'][^>]*>(?:<\/dc-import>)?/i;

const data = JSON.parse(await readFile("build/aeo-data.json", "utf8"));
const profiles = (data.organization && data.organization.sameAs) || [];

if (!profiles.length) {
  console.log("social-links: organization.sameAs is empty — nothing to inject");
  process.exit(0);
}

/* ---------- label each profile from its host ---------- */

const LABELS = [
  [/(^|\.)facebook\.com$/i, "Facebook"],
  [/(^|\.)instagram\.com$/i, "Instagram"],
  [/(^|\.)nextdoor\.com$/i, "Nextdoor"],
  [/(^|\.)linkedin\.com$/i, "LinkedIn"],
  [/(^|\.)youtube\.com$/i, "YouTube"],
  [/(^|\.)crunchbase\.com$/i, "Crunchbase"],
  [/(^|\.)clutch\.co$/i, "Clutch"],
  [/(^|\.)g2\.com$/i, "G2"],
  [/(^|\.)yelp\.com$/i, "Yelp"]
];

function labelFor(url) {
  let host;
  try {
    host = new URL(url).hostname.replace(/^www\./i, "");
  } catch {
    return url;
  }
  if (/google\./i.test(host)) return "Google Business Profile";
  for (const [re, label] of LABELS) if (re.test(host)) return label;
  return host;
}

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const anchors = profiles
  .map(
    (u) =>
      '<a href="' + esc(u) + '" rel="me noopener" target="_blank" ' +
      'style="color:inherit; text-decoration:none">' + esc(labelFor(u)) + "</a>"
  )
  .join("\n      ");

const BLOCK =
  '<nav ' + MARKER + ' aria-label="DeepThought on other platforms" ' +
  'style="max-width:1200px; margin:0 auto; padding:0 40px 24px; display:flex; flex-wrap:wrap; ' +
  'gap:20px; justify-content:center; font-size:14px; opacity:0.75">\n      ' +
  anchors +
  "\n    </nav>\n\n  ";

/* ---------- walk the tree ---------- */

async function htmlFiles(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
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

  const next = html.replace(FOOTER_RE, (footer) => BLOCK + footer);
  await writeFile(path, next, "utf8");
  injected++;
  if (VERBOSE) console.log("  ok  " + path);
}

console.log("social-links: " + profiles.length + " profile(s)");
for (const u of profiles) console.log("  " + labelFor(u) + "  " + u);
console.log("  injected        " + injected);
console.log("  already present " + already);
console.log("  no footer       " + noFooter);
console.log("  scanned         " + files.length);

if (injected === 0 && already === 0) {
  console.error("FAIL: social-links: no page carried the SiteFooter component");
  process.exit(1);
}
