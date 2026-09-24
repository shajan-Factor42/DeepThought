/**
 * render.mjs — build the whole site.
 *
 * Replaces the unzip-site.zip step. Every page is written out complete, which is what makes
 * prerender.mjs, faq-sync.mjs and brand-normalize.mjs unnecessary: they existed to repair
 * pages that arrived empty and assembled themselves in the browser.
 *
 * Order matters. Pages are rendered first, then declared copy rewrites are applied, then the
 * sitemap is generated from whatever actually landed on disk — so a page cannot ship without
 * being in the sitemap, which is how blog-01 ended up in none of the five.
 *
 * Usage: node build/render/render.mjs --src dist --content content --out _site
 */

import { readdir, mkdir, copyFile, stat, writeFile, readFile } from "node:fs/promises";
import { join, resolve as resolvePath, dirname, basename } from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const arg = (n, d) => { const i = args.indexOf("--" + n); return i === -1 ? d : args[i + 1]; };
const SRC = resolvePath(arg("src", "dist"));
const CONTENT = resolvePath(arg("content", "content"));
const OUT = resolvePath(arg("out", "_site"));
const SITE = "https://deepthought.marketing";

/**
 * Runtime files the rebuilt site no longer needs. The data modules become build-time inputs;
 * support.js and the design-system bundle were the React runtime that assembled pages in the
 * browser. Their stylesheets stay — only the bundle goes.
 */
const DROP_ASSETS = new Set([
  "support.js", "_ds_bundle.js",
  "counties.js", "county-copy.js", "county-index.js",
  "states.js", "state-copy.js", "blog-posts.js", "industries.js",
  "doc-page.js", "image-slot.js",
  // the five split sitemaps are replaced by one generated file
  "sitemap.xml", "sitemap-core.xml", "sitemap-blog.xml", "sitemap-states.xml", "sitemap-counties.xml",
]);

function run(script, extra = []) {
  return new Promise((resolve, reject) => {
    const p = spawn(process.execPath, [join(HERE, script), "--src", SRC, "--out", OUT, ...extra], { stdio: "inherit" });
    p.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${script} exited ${code}`))));
  });
}

/* ---------- 1. render ---------- */

await mkdir(OUT, { recursive: true });
await run("render-core.mjs");
await run("render-counties.mjs");
await run("render-states.mjs");
await run("render-industries.mjs");
await run("render-blog.mjs", ["--content", join(CONTENT, "blog")]);

/* ---------- 2. assets ---------- */

let copied = 0, skipped = 0;
async function copyTree(from, to) {
  for (const e of await readdir(from, { withFileTypes: true })) {
    const s = join(from, e.name), d = join(to, e.name);
    if (e.isDirectory()) { await mkdir(d, { recursive: true }); await copyTree(s, d); continue; }
    if (e.name.endsWith(".html")) continue;
    if (DROP_ASSETS.has(e.name)) { skipped++; continue; }
    await copyFile(s, d);
    copied++;
  }
}
await copyTree(SRC, OUT);
console.log(`assets: ${copied} copied, ${skipped} dropped (runtime no longer needed)`);

/* ---------- 3. declared copy rewrites ---------- */

await new Promise((resolve, reject) => {
  const p = spawn(process.execPath, [join(HERE, "..", "copy-rewrite.mjs"), "--dir", OUT], { stdio: "inherit" });
  p.on("exit", (c) => (c === 0 ? resolve() : reject(new Error("copy-rewrite failed"))));
});

/* ---------- 4. one sitemap, generated from what shipped ---------- */

const files = (await readdir(OUT)).filter((f) => f.endsWith(".html")).sort();
const entries = [];
for (const f of files) {
  const html = await readFile(join(OUT, f), "utf8");
  if (/content="[^"]*noindex/.test(html)) continue;
  const m = /<link rel="canonical" href="([^"]+)"/.exec(html);
  const loc = m ? m[1] : `${SITE}/${f}`;
  const st = await stat(join(OUT, f));
  entries.push({ loc, lastmod: st.mtime.toISOString().slice(0, 10) });
}
// home page first, then alphabetical
const isHome = (l) => l === `${SITE}/` || l === `${SITE}/index.html`;
entries.sort((a, b) => (isHome(a.loc) ? -1 : isHome(b.loc) ? 1 : a.loc.localeCompare(b.loc)));

await writeFile(join(OUT, "sitemap.xml"),
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  "<!-- Generated at build time from the pages that actually rendered. Do not hand-edit. -->\n" +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  entries.map((e) => `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n  </url>`).join("\n") +
  "\n</urlset>\n", "utf8");
console.log(`sitemap: ${entries.length} URLs (${files.length - entries.length} noindex page(s) excluded)`);

/* ---------- 5. gates ---------- */

await new Promise((resolve, reject) => {
  const p = spawn(process.execPath, [join(HERE, "verify.mjs"), "--dir", OUT], { stdio: "inherit" });
  p.on("exit", (c) => (c === 0 ? resolve() : reject(new Error("verify failed"))));
});
