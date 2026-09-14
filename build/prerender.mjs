#!/usr/bin/env node
/**
 * prerender.mjs — AEO build step for deepthought.marketing
 *
 * Every page on this site renders client-side through support.js (Design Components).
 * A crawler without a JS engine sees unresolved {{ }} template holes instead of content.
 * Google renders JS; several AI crawlers do not.
 *
 * This script loads every HTML file in a headless browser, waits for the component
 * runtime to paint, and writes two things back into the SOURCE file:
 *
 *   1. JSON-LD  — shared Organization + WebSite graph on every page, plus
 *                 SoftwareApplication + FAQPage on the home page and Service on
 *                 county/state pages (county pages already carry their own Service
 *                 schema, which is left alone).
 *   2. A <noscript> fallback — the painted page's headings and paragraphs as real
 *                 prose, shown only to clients that do not run JavaScript, so a non-JS
 *                 crawler has text to extract. This replaced an earlier version that
 *                 wrote a clip:rect(0 0 0 0) duplicate of the page text into every page.
 *                 That is the hidden-text pattern Google's spam policy describes: it
 *                 served content to crawlers and withheld it from visitors. <noscript>
 *                 does the same job legitimately — nothing is concealed from anyone who
 *                 can see the page. Any legacy clipped block found in a re-exported
 *                 site.zip is stripped before the new one is written.
 *
 * The original <x-dc> template is never modified, so the runtime still hydrates and
 * the page stays fully interactive. Pages that already contain #aeo-static or an
 * #organization node are skipped, so this is safe to run repeatedly and safe to run
 * over index.html, which was patched by hand.
 *
 * Usage:
 *   node build/prerender.mjs --dir _site [--limit 50] [--concurrency 8] [--verbose]
 */

import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, basename } from "node:path";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer";

const args = process.argv.slice(2);
const arg = (name, dflt) => {
  const i = args.indexOf("--" + name);
  return i === -1 ? dflt : args[i + 1];
};
const DIR = arg("dir", "_site");
const LIMIT = parseInt(arg("limit", "0"), 10) || 0;
const CONCURRENCY = parseInt(arg("concurrency", "8"), 10);
const VERBOSE = args.includes("--verbose");
const RENDER_TIMEOUT = 15000;

const data = JSON.parse(await readFile("build/aeo-data.json", "utf8"));
const SITE = data.site.replace(/\/$/, "");

/* ---------- schema builders ---------- */

const orgNode = () => {
  const o = data.organization;
  const node = {
    "@type": "Organization",
    "@id": SITE + "/#organization",
    name: o.name,
    legalName: o.legalName,
    alternateName: o.alternateName,
    url: SITE + "/",
    email: o.email,
    description: o.description,
    parentOrganization: { "@type": "Organization", name: o.parentOrganization },
    areaServed: { "@type": "Country", name: o.areaServed },
    contactPoint: [
      { "@type": "ContactPoint", contactType: "customer support", email: o.email, availableLanguage: "en" },
      { "@type": "ContactPoint", contactType: "sales", email: o.email, url: SITE + "/book-a-demo.html", availableLanguage: "en" }
    ]
  };
  if (o.logo) node.logo = { "@type": "ImageObject", url: o.logo };
  if (o.sameAs && o.sameAs.length) node.sameAs = o.sameAs;
  return node;
};

const siteNode = () => ({
  "@type": "WebSite",
  "@id": SITE + "/#website",
  url: SITE + "/",
  name: data.organization.name,
  publisher: { "@id": SITE + "/#organization" },
  inLanguage: "en-US"
});

const softwareNode = () => {
  const p = data.pricing;
  return {
    "@type": "SoftwareApplication",
    "@id": SITE + "/#software",
    name: data.organization.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Advertising Campaign Management",
    operatingSystem: "Web",
    url: SITE + "/",
    publisher: { "@id": SITE + "/#organization" },
    description: data.organization.description,
    featureList: data.featureList,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: p.currency,
      lowPrice: p.lowPrice,
      highPrice: p.highPrice,
      offerCount: String(p.tiers.length),
      url: p.url,
      availability: "https://schema.org/InStock",
      description: p.summary,
      offers: p.tiers.map(t => {
        const offer = {
          "@type": "Offer",
          name: t.name,
          priceCurrency: p.currency,
          url: p.url,
          description: t.description,
          availability: "https://schema.org/InStock"
        };
        if (t.price) {
          offer.price = t.price;
          offer.priceSpecification = {
            "@type": "UnitPriceSpecification",
            price: t.price,
            priceCurrency: p.currency,
            unitText: "month",
            billingDuration: 1,
            billingIncrement: 1
          };
        }
        return offer;
      })
    }
  };
};

const faqNode = () => ({
  "@type": "FAQPage",
  "@id": SITE + "/#faq",
  isPartOf: { "@id": SITE + "/#website" },
  mainEntity: data.faq.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a }
  }))
});

const webPageNode = (file, title, description) => ({
  "@type": "WebPage",
  "@id": SITE + "/" + file + "#webpage",
  url: SITE + "/" + (file === "index.html" ? "" : file),
  name: title,
  description: description || undefined,
  isPartOf: { "@id": SITE + "/#website" },
  about: { "@id": SITE + "/#software" },
  publisher: { "@id": SITE + "/#organization" },
  inLanguage: "en-US",
  dateModified: new Date().toISOString().slice(0, 10)
});

function graphFor(file, title, description) {
  const nodes = [orgNode(), siteNode(), webPageNode(file, title, description)];
  if (file === "index.html") {
    nodes.push(softwareNode(), faqNode());
  } else {
    nodes.push({ "@type": "SoftwareApplication", "@id": SITE + "/#software", name: data.organization.name, url: SITE + "/" });
    if (/^(pricing|faq)\.html$/.test(file)) nodes.push(faqNode());
    if (file === "pricing.html") nodes.push(softwareNode());
  }
  return { "@context": "https://schema.org", "@graph": nodes };
}

/* ---------- painted-DOM extraction (runs in the browser) ---------- */

const EXTRACT = () => {
  const strip = s => (s || "").replace(/\s+/g, " ").trim();
  const out = [];
  const seen = new Set();
  const nodes = document.querySelectorAll("h1, h2, h3, p, li");
  for (const el of nodes) {
    if (el.closest("#aeo-static")) continue;
    const text = strip(el.textContent);
    if (!text || text.length < 3) continue;
    if (text.includes("{{")) continue;
    const key = el.tagName + "|" + text;
    if (seen.has(key)) continue;
    seen.add(key);
    const tag = el.tagName.toLowerCase();
    out.push({ tag: tag === "li" ? "p" : tag, text });
    if (out.length > 260) break;
  }
  return {
    blocks: out,
    title: strip(document.title),
    description: (document.querySelector('meta[name="description"]') || {}).content || "",
    holes: document.body.innerHTML.includes("{{")
  };
};

const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Matches the pre-2026-09 clipped block so a re-exported site.zip cannot reintroduce
// hidden text. Kept deliberately loose on the inline style, which varied slightly.
const LEGACY_STATIC = /<div id="aeo-static"[^>]*clip:\s*rect\([^>]*>[\s\S]*?<\/div>\s*/gi;

function staticBlock(blocks) {
  const body = blocks.map(b => "  <" + b.tag + ">" + esc(b.text) + "</" + b.tag + ">").join("\n");
  return [
    '<noscript id="aeo-static">',
    body,
    "</noscript>"
  ].join("\n");
}

/* ---------- per-file processing ---------- */

async function processFile(page, dir, file, stats) {
  const path = join(dir, file);
  let html = await readFile(path, "utf8");

  if (/name=["']robots["'][^>]*noindex/i.test(html)) { stats.skippedNoindex++; return; }

  // Remove any legacy clipped block first, so a page carrying one is rebuilt rather than
  // skipped as already done.
  const legacy = html.match(LEGACY_STATIC);
  if (legacy) {
    html = html.replace(LEGACY_STATIC, "");
    stats.legacyRemoved += legacy.length;
    await writeFile(path, html, "utf8");
  }

  const hasStatic = html.includes('id="aeo-static"');
  const hasOrg = html.includes("/#organization");
  if (hasStatic && hasOrg) { stats.skippedDone++; return; }

  let painted;
  try {
    await page.goto(pathToFileURL(path).href, { waitUntil: "networkidle2", timeout: RENDER_TIMEOUT });
    await page.waitForFunction(
      () => !document.body.innerHTML.includes("{{") || document.body.innerText.length > 400,
      { timeout: RENDER_TIMEOUT, polling: 250 }
    ).catch(() => {});
    painted = await page.evaluate(EXTRACT);
  } catch (err) {
    stats.failed.push(file + " :: " + err.message);
    return;
  }

  if (!painted.blocks.length) { stats.empty.push(file); return; }

  if (!hasOrg) {
    const graph = graphFor(file, painted.title, painted.description);
    const tag = '<script type="application/ld+json">\n' + JSON.stringify(graph, null, 2) + "\n</script>\n";
    html = html.replace("</head>", tag + "</head>");
  }
  if (!hasStatic) {
    html = html.replace(/<body([^>]*)>/, (m) => m + "\n" + staticBlock(painted.blocks));
  }

  await writeFile(path, html, "utf8");
  stats.written++;
  if (painted.holes) stats.stillHoles.push(file);
  if (VERBOSE) console.log("  ok  " + file + "  (" + painted.blocks.length + " blocks)");
}

/* ---------- main ---------- */

const all = (await readdir(DIR)).filter(f => f.endsWith(".html"));
const skip = new Set(data.skip || []);
let files = all.filter(f => !skip.has(basename(f)));
// home page first so a failure there is obvious immediately
files.sort((a, b) => (a === "index.html" ? -1 : b === "index.html" ? 1 : a.localeCompare(b)));
if (LIMIT) files = files.slice(0, LIMIT);

console.log("prerender: " + files.length + " pages in " + DIR + " (concurrency " + CONCURRENCY + ")");

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--allow-file-access-from-files"]
});

const stats = { written: 0, skippedDone: 0, skippedNoindex: 0, legacyRemoved: 0, failed: [], empty: [], stillHoles: [] };
const queue = files.slice();
const t0 = Date.now();

async function worker(n) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  page.setDefaultTimeout(RENDER_TIMEOUT);
  // block remote fonts/analytics: nothing here affects painted text, and 3k pages x
  // remote requests is the difference between a 6-minute and a 40-minute build
  await page.setRequestInterception(true);
  page.on("request", req => {
    const url = req.url();
    const remote = url.startsWith("http");
    const heavy = ["image", "font", "media", "stylesheet"].includes(req.resourceType());
    if (remote && (heavy || /analytics|googletagmanager|fonts\.googleapis/.test(url))) req.abort();
    else req.continue();
  });
  while (queue.length) {
    const file = queue.shift();
    const done = files.length - queue.length;
    if (!VERBOSE && done % 250 === 0) {
      console.log("  " + done + "/" + files.length + "  (" + Math.round((Date.now() - t0) / 1000) + "s)");
    }
    await processFile(page, DIR, file, stats);
  }
  await page.close();
}

await Promise.all(Array.from({ length: CONCURRENCY }, (_, i) => worker(i)));
await browser.close();

console.log("");
console.log("prerender complete in " + Math.round((Date.now() - t0) / 1000) + "s");
console.log("  written           " + stats.written);
console.log("  already done      " + stats.skippedDone);
console.log("  skipped (noindex) " + stats.skippedNoindex);
console.log("  legacy blocks removed " + stats.legacyRemoved);
console.log("  no text extracted " + stats.empty.length);
console.log("  failed            " + stats.failed.length);
if (stats.stillHoles.length) {
  console.log("  WARNING: unresolved {{ }} after render on " + stats.stillHoles.length + " page(s)");
  stats.stillHoles.slice(0, 10).forEach(f => console.log("    " + f));
}
if (stats.empty.length) {
  console.log("  pages with no extractable text (first 10):");
  stats.empty.slice(0, 10).forEach(f => console.log("    " + f));
}
if (stats.failed.length) {
  console.log("  failures (first 10):");
  stats.failed.slice(0, 10).forEach(f => console.log("    " + f));
}

// A handful of failures on a 3,000-page build is noise; a systemic break is not.
const failRate = stats.failed.length / Math.max(files.length, 1);
if (failRate > 0.05) {
  console.error("FAIL: " + Math.round(failRate * 100) + "% of pages failed to render");
  process.exit(1);
}
