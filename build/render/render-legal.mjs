/**
 * render-legal.mjs — Privacy Policy and Terms of Use.
 *
 * Authored as Markdown in content/legal/ (same frontmatter + body format as blog posts), so a
 * wording change is a text edit and a push — no template work. Each file renders to
 * <slug>.html inside the normal site header and footer.
 *
 * Frontmatter: title, slug, description, updated (YYYY-MM-DD).
 *
 * Usage: node build/render/render-legal.mjs --src dist --out _site --content content/legal
 */

import { readFile, writeFile, readdir, mkdir } from "node:fs/promises";
import { join, resolve as resolvePath } from "node:path";
import { render } from "./dc.mjs";
import { loadShell, page, SITE, BASE_SCOPE } from "./shell.mjs";
import { parseFrontmatter, parseBody, esc } from "./content.mjs";

const args = process.argv.slice(2);
const arg = (n, d) => { const i = args.indexOf("--" + n); return i === -1 ? d : args[i + 1]; };
const SRC = resolvePath(arg("src", "dist"));
const OUT = resolvePath(arg("out", "_site"));
const DIR = resolvePath(arg("content", "content/legal"));

const { helmet, partials } = await loadShell(SRC);

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const longDate = (iso) => {
  const [y, m, d] = String(iso).split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};

const TPL = `<dc-import name="SiteHeader" hint-size="100%,68px"></dc-import>

<section style="max-width:760px; margin:0 auto; padding:56px 40px 0">
  <div style="font-size:13.5px; color:var(--text-muted)"><a href="index.html">Home</a> · <span>{{ title }}</span></div>
  <h1 style="font-family:var(--font-display); font-size:44px; font-weight:800; letter-spacing:-0.035em; line-height:1.08; margin:18px 0 0">{{ title }}</h1>
  <p style="font-size:14.5px; color:var(--text-muted); margin:14px 0 0">Last updated {{ updatedLabel }}</p>
</section>

<section style="max-width:760px; margin:0 auto; padding:32px 40px 72px">
  <sc-for list="{{ body }}" as="s" hint-placeholder-count="6">
    <div style="margin-bottom:32px">
      <sc-if value="{{ s.h }}"><h2 style="font-family:var(--font-display); font-size:24px; font-weight:800; letter-spacing:-0.025em; line-height:1.25; margin:0 0 14px">{{ s.h }}</h2></sc-if>
      <sc-for list="{{ s.p }}" as="para" hint-placeholder-count="2">
        <div style="font-size:16.5px; line-height:1.7; color:var(--text-body); margin:0 0 14px">{{ para }}</div>
      </sc-for>
    </div>
  </sc-for>
</section>

<dc-import name="SiteFooter" hint-size="100%,320px"></dc-import>`;

await mkdir(OUT, { recursive: true });
let written = 0;
const files = (await readdir(DIR)).filter((f) => f.endsWith(".md")).sort();

for (const f of files) {
  const src = await readFile(join(DIR, f), "utf8");
  const { data, body: md } = parseFrontmatter(src, f);
  for (const k of ["title", "slug", "description", "updated"]) {
    if (!data[k]) throw new Error(`${f}: missing frontmatter "${k}"`);
  }
  const file = `${data.slug}.html`;
  const scope = { ...BASE_SCOPE, title: data.title, updatedLabel: longDate(data.updated), body: parseBody(md) };
  const html = render(TPL, scope, partials);
  if (html.includes("{{")) throw new Error(`${file}: template holes remain`);

  const canonical = `${SITE}/${file}`;
  const title = `${data.title} | DeepThought`;
  await writeFile(join(OUT, file), page({
    title, description: data.description, canonical, helmet, body: html,
    jsonld: {
      "@context": "https://schema.org", "@type": "WebPage",
      name: title, description: data.description, url: canonical,
      dateModified: data.updated, isPartOf: { "@id": `${SITE}/#website` },
      publisher: { "@id": `${SITE}/#organization` },
    },
  }), "utf8");
  written++;
}

console.log(`render-legal: ${written} pages (${files.map((f) => f.replace(/\.md$/, ".html")).join(", ")})`);
