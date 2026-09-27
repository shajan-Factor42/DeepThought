#!/usr/bin/env node
/**
 * IndexNow for deepthought.marketing.
 *
 * Tells Bing (and Yandex, Seznam, Naver — every IndexNow engine shares one feed) which pages
 * changed, the moment a deploy lands. Bing's index also feeds ChatGPT search and Copilot, so
 * this is the fastest route into AI answers. Google does not use IndexNow; it still reads the
 * sitemap, which this script also makes honest.
 *
 * Two modes, both run by .github/workflows/deploy-static.yml:
 *
 *   prepare  (before verify, before deploy)
 *     1. Hashes every page listed in _site/sitemap.xml.
 *     2. Fetches the manifest the PREVIOUS deploy published at /indexnow-manifest.json.
 *     3. A page whose bytes are unchanged keeps its old <lastmod>; a new or changed page gets
 *        today. Before this, every build stamped all 3,400 pages with the build date, which
 *        teaches Google to ignore lastmod entirely.
 *     4. Writes the new manifest into _site, and the list of changed + removed URLs to --list.
 *     No previous manifest (first run, or the fetch fails) means every URL is submitted once.
 *
 *   submit   (after deploy-pages has finished, so the pages and key file are live)
 *     POSTs the --list to api.indexnow.org. Never fails the workflow: a missed ping costs a
 *     little speed, not correctness, and the next deploy re-diffs against what is live.
 *
 * The key is not a secret — IndexNow proves ownership by fetching it from the site root.
 * It is served from overrides/<KEY>.txt by the workflow's overlay step.
 *
 * Written in the SEO chat, 2026-09-27; pushed from the website chat.
 *
 * Local testing:
 *   node build/indexnow.mjs prepare --dir _site --list urls.txt --prev path/to/old-manifest.json
 *   node build/indexnow.mjs submit  --list urls.txt --dry-run
 */
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const SITE = "https://deepthought.marketing";
const HOST = "deepthought.marketing";
const KEY = "d3aaee3367361ae6df61ad33d1b319b5";
const KEY_LOCATION = `${SITE}/${KEY}.txt`;
const MANIFEST = "indexnow-manifest.json";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const BATCH = 10000; // IndexNow's per-request limit

const argv = process.argv.slice(2);
const mode = argv[0];
const opt = (name, dflt) => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? dflt : argv[i + 1];
};
const flag = (name) => argv.includes(`--${name}`);

const sha = (buf) => createHash("sha256").update(buf).digest("hex");
const today = () => new Date().toISOString().slice(0, 10);

async function loadPrev(src) {
  try {
    if (/^https?:/.test(src)) {
      const res = await fetch(`${src}?t=${Date.now()}`, { signal: AbortSignal.timeout(20000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    }
    return JSON.parse(await readFile(src, "utf8"));
  } catch (e) {
    console.log(`indexnow: no previous manifest (${e.message}) — every URL counts as changed.`);
    return null;
  }
}

function fileFor(dir, loc) {
  let path = loc.slice(SITE.length).replace(/^\//, "");
  if (path === "" || path.endsWith("/")) path += "index.html";
  return join(dir, path);
}

async function prepare() {
  const dir = opt("dir", "_site");
  const list = opt("list", "indexnow-urls.txt");
  const prevSrc = opt("prev", `${SITE}/${MANIFEST}`);

  try {
    const served = (await readFile(join(dir, `${KEY}.txt`), "utf8")).trim();
    if (served !== KEY) throw new Error("contents do not match the key");
  } catch (e) {
    console.log(`indexnow: FAIL — ${KEY}.txt is missing from ${dir} or wrong (${e.message}).`);
    console.log(`          Add overrides/${KEY}.txt containing only the key.`);
    process.exit(1);
  }

  const sitemapPath = join(dir, "sitemap.xml");
  let sitemap = await readFile(sitemapPath, "utf8");
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (locs.length === 0) {
    console.log("indexnow: FAIL — sitemap.xml has no <loc> entries.");
    process.exit(1);
  }

  const prev = await loadPrev(prevSrc);
  const prevPages = prev?.pages ?? {};
  const stamp = today();
  const pages = {};
  const changed = [];

  for (const loc of locs) {
    const hash = sha(await readFile(fileFor(dir, loc)));
    const old = prevPages[loc];
    if (old && old.hash === hash) {
      pages[loc] = { hash, lastmod: old.lastmod };
    } else {
      pages[loc] = { hash, lastmod: stamp };
      changed.push(loc);
    }
  }
  // Pages that were live last deploy and are gone now: telling engines lets them drop the 404.
  const removed = Object.keys(prevPages).filter((loc) => !(loc in pages));

  // Rewrite each <url> block's lastmod from the manifest.
  let fixed = 0;
  sitemap = sitemap.replace(
    /<loc>([^<]+)<\/loc>(\s*)<lastmod>[^<]*<\/lastmod>/g,
    (_, loc, ws) => {
      fixed++;
      return `<loc>${loc}</loc>${ws}<lastmod>${pages[loc].lastmod}</lastmod>`;
    }
  );
  if (fixed !== locs.length) {
    console.log(`indexnow: FAIL — rewrote ${fixed} lastmod values for ${locs.length} URLs.`);
    process.exit(1);
  }
  await writeFile(sitemapPath, sitemap);

  await writeFile(
    join(dir, MANIFEST),
    JSON.stringify({ generated: new Date().toISOString(), count: locs.length, pages }) + "\n"
  );
  await writeFile(list, [...changed, ...removed].join("\n") + (changed.length + removed.length ? "\n" : ""));

  console.log(
    `indexnow: ${locs.length} URLs — ${changed.length} new/changed, ${removed.length} removed, ` +
      `${locs.length - changed.length} unchanged (kept their lastmod). List: ${list}`
  );
}

async function submit() {
  const list = opt("list", "indexnow-urls.txt");
  const dry = flag("dry-run");
  let urls;
  try {
    urls = (await readFile(list, "utf8")).split("\n").filter(Boolean);
  } catch {
    console.log(`indexnow: no list at ${list} — nothing to submit.`);
    return;
  }
  if (urls.length === 0) {
    console.log("indexnow: nothing changed this deploy — nothing to submit.");
    return;
  }

  for (let i = 0; i < urls.length; i += BATCH) {
    const urlList = urls.slice(i, i + BATCH);
    const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };
    if (dry) {
      console.log(`indexnow (dry run): would POST ${urlList.length} URLs, e.g. ${urlList.slice(0, 3).join(", ")}`);
      continue;
    }
    // The key file went live seconds ago; a 403 usually means the CDN has not caught up.
    for (let attempt = 1; attempt <= 4; attempt++) {
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(30000),
        });
        console.log(`indexnow: submitted ${urlList.length} URLs — HTTP ${res.status}`);
        if (res.status === 200 || res.status === 202) break;
        if (res.status === 403 && attempt < 4) {
          console.log("          key not verified yet — retrying in 60s");
          await new Promise((r) => setTimeout(r, 60000));
          continue;
        }
        console.log(`          ${(await res.text()).slice(0, 300)}`);
        break;
      } catch (e) {
        console.log(`indexnow: request failed (${e.message})${attempt < 4 ? " — retrying in 30s" : ""}`);
        if (attempt < 4) await new Promise((r) => setTimeout(r, 30000));
      }
    }
  }
}

if (mode === "prepare") await prepare();
else if (mode === "submit") await submit();
else {
  console.log("usage: node build/indexnow.mjs prepare|submit [--dir _site] [--list file] [--prev src] [--dry-run]");
  process.exit(2);
}
