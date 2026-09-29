/**
 * render-guides.mjs — pillar guides (long-form commercial pages that anchor a topic cluster).
 *
 * Authored as Markdown in content/guides/, like blog posts and legal pages, so a copy change is
 * a text edit and a push. Each file renders to <slug>.html inside the normal header and footer.
 *
 * Frontmatter: title, slug, description, dek, updated (YYYY-MM-DD), eyebrow (optional),
 * faq (optional list of {q, a}), ctaHeading and ctaText (optional), seoTitle (optional), crumb (optional).
 *
 * Body is the same Markdown the blog uses (##, ###, - lists, **bold**, [links](url)) plus
 * pipe tables:
 *
 *   | Option | Cost | Best for |
 *   |---|---|---|
 *   | DIY | Your time | ... |
 *
 * Tables are handled here rather than in content.mjs so blog and legal rendering is untouched.
 * The FAQ renders visibly on the page from the same array that builds the FAQPage schema, so
 * the two cannot disagree.
 *
 * Usage: node build/render/render-guides.mjs --src dist --out _site --content content/guides
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
const DIR = resolvePath(arg("content", "content/guides"));

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const longDate = (iso) => { const [y, m, d] = String(iso).split("-").map(Number); return `${MONTHS[m - 1]} ${d}, ${y}`; };

// Inline markdown for table cells: same rules as content.mjs inline().
const inline = (t) => esc(t)
  .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
  .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, x, h) => `<a href="${esc(h)}" style="color:var(--color-accent)">${x}</a>`);

const TH = "text-align:left; padding:12px 14px; font-size:14px; font-weight:700; color:var(--text-strong, #0a0f1e); background:var(--f42-slate-100, #f1f5f9); border-bottom:1px solid var(--border, #e2e8f0)";
const TD = "text-align:left; vertical-align:top; padding:12px 14px; font-size:15px; line-height:1.55; color:var(--text-body); border-bottom:1px solid var(--border, #e2e8f0)";

function tableHtml(chunk) {
  const rows = chunk.trim().split(/\r?\n/).map((l) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
  const [head, sep, ...body] = rows;
  if (!sep || !sep.every((c) => /^:?-{3,}:?$/.test(c))) throw new Error("guide table: second row must be |---|---|");
  const th = head.map((c) => `<th style="${TH}">${inline(c)}</th>`).join("");
  const tr = body.map((r) => `<tr>${r.map((c, i) => `<td style="${TD}${i === 0 ? "; font-weight:600" : ""}">${inline(c)}</td>`).join("")}</tr>`).join("");
  return `<div style="overflow-x:auto; margin:4px 0 18px"><table style="width:100%; border-collapse:collapse; min-width:560px"><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table></div>`;
}

/** parseBody, plus pipe tables. Tables are swapped for tokens, parsed, then swapped back. */
function parseGuideBody(md) {
  const tables = [];
  const tokenized = md.split(/\r?\n\r?\n+/).map((chunk) => {
    if (/^\s*\|/.test(chunk) && chunk.trim().split(/\r?\n/).every((l) => l.trim().startsWith("|"))) {
      tables.push(tableHtml(chunk));
      return `@@TABLE${tables.length - 1}@@`;
    }
    return chunk;
  }).join("\n\n");
  return parseBody(tokenized).map((s) => ({
    ...s,
    p: s.p.map((para) => { const m = /^@@TABLE(\d+)@@$/.exec(para.trim()); return m ? tables[Number(m[1])] : para; }),
  }));
}

const { helmet, partials } = await loadShell(SRC);

const TPL = `<dc-import name="SiteHeader" hint-size="100%,68px"></dc-import>

<section style="max-width:820px; margin:0 auto; padding:56px 40px 0">
  <div style="font-size:13.5px; color:var(--text-muted)"><a href="index.html">Home</a> · <a href="serving-local-business.html">Serving local business</a> · <span>{{ crumb }}</span></div>
  <div style="font-size:13px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:var(--color-accent); margin:26px 0 0">{{ eyebrow }}</div>
  <h1 style="font-family:var(--font-display); font-size:46px; font-weight:800; letter-spacing:-0.035em; line-height:1.08; margin:12px 0 0">{{ title }}</h1>
  <p style="font-size:19px; line-height:1.55; color:var(--text-body); margin:18px 0 0">{{ dek }}</p>
  <p style="font-size:14px; color:var(--text-muted); margin:14px 0 0">By the DeepThought team · Updated {{ updatedLabel }}</p>
</section>

<section style="max-width:820px; margin:0 auto; padding:36px 40px 16px">
  <sc-for list="{{ body }}" as="s" hint-placeholder-count="8">
    <div style="margin-bottom:34px">
      <sc-if value="{{ s.h }}"><h2 style="font-family:var(--font-display); font-size:27px; font-weight:800; letter-spacing:-0.025em; line-height:1.25; margin:0 0 14px">{{ s.h }}</h2></sc-if>
      <sc-for list="{{ s.p }}" as="para" hint-placeholder-count="3">
        <div style="font-size:17px; line-height:1.72; color:var(--text-body); margin:0 0 14px">{{ para }}</div>
      </sc-for>
    </div>
  </sc-for>
</section>

<sc-if value="{{ hasFaq }}">
<section style="max-width:820px; margin:0 auto; padding:0 40px 24px">
  <h2 style="font-family:var(--font-display); font-size:27px; font-weight:800; letter-spacing:-0.025em; margin:0 0 18px">Frequently asked questions</h2>
  <sc-for list="{{ faq }}" as="f" hint-placeholder-count="5">
    <div style="border-top:1px solid var(--border, #e2e8f0); padding:18px 0">
      <h3 style="font-size:18px; font-weight:700; margin:0 0 8px">{{ f.q }}</h3>
      <div style="font-size:16.5px; line-height:1.7; color:var(--text-body)">{{ f.a }}</div>
    </div>
  </sc-for>
</section>
</sc-if>

<section style="max-width:820px; margin:0 auto; padding:24px 40px 80px">
  <div style="border-radius:18px; padding:36px; background:linear-gradient(135deg,#0066ff 0%,#00b2d8 100%); color:#fff">
    <h2 style="font-family:var(--font-display); font-size:28px; font-weight:800; letter-spacing:-0.02em; margin:0; color:#fff">{{ ctaHeading }}</h2>
    <p style="font-size:17px; line-height:1.6; margin:12px 0 22px; color:#eaf4ff">{{ ctaText }}</p>
    <a href="book-a-demo.html" style="display:inline-block; background:#fff; color:#0a2a66; font-weight:700; padding:13px 22px; border-radius:999px; text-decoration:none">Book a demo</a>
  </div>
</section>

<dc-import name="SiteFooter" hint-size="100%,320px"></dc-import>`;

await mkdir(OUT, { recursive: true });
let written = 0;
let files = [];
try { files = (await readdir(DIR)).filter((f) => f.endsWith(".md")).sort(); } catch { /* no guides yet */ }

for (const f of files) {
  const src = await readFile(join(DIR, f), "utf8");
  const { data, body: md } = parseFrontmatter(src, f);
  for (const k of ["title", "slug", "description", "dek", "updated"]) {
    if (!data[k]) throw new Error(`${f}: missing frontmatter "${k}"`);
  }
  const faq = (Array.isArray(data.faq) ? data.faq : [])
    .map((x) => ({ q: String(x.q || "").trim(), a: String(x.a || "").trim() })).filter((x) => x.q && x.a);
  const file = `${data.slug}.html`;
  const canonical = `${SITE}/${file}`;
  const crumb = String(data.crumb || data.title);

  const scope = {
    ...BASE_SCOPE, title: data.title, dek: data.dek, crumb,
    eyebrow: data.eyebrow || "Guide", updatedLabel: longDate(data.updated),
    body: parseGuideBody(md), faq: faq.map((x) => ({ q: x.q, a: inline(x.a) })), hasFaq: faq.length > 0,
    ctaHeading: data.ctaHeading || "See what your budget would buy", ctaText: data.ctaText || "Tell us what you run today. We'll show you the plan and the price in one short call.",
  };
  const html = render(TPL, scope, partials);
  if (html.includes("{{")) throw new Error(`${file}: template holes remain`);

  const title = `${data.seoTitle || data.title} | DeepThought`;
  const jsonld = [
    {
      "@context": "https://schema.org", "@type": "Article",
      headline: data.title, description: data.description, url: canonical, mainEntityOfPage: canonical,
      dateModified: data.updated, datePublished: data.published || data.updated,
      author: { "@id": `${SITE}/#organization` }, publisher: { "@id": `${SITE}/#organization` },
      image: `${SITE}/og-image.png`, isPartOf: { "@id": `${SITE}/#website` },
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Serving local business", item: `${SITE}/serving-local-business.html` },
        { "@type": "ListItem", position: 3, name: crumb, item: canonical },
      ],
    },
  ];
  if (faq.length) jsonld.push({
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faq.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })),
  });

  await writeFile(join(OUT, file), page({ title, description: data.description, canonical, helmet, body: html, jsonld }), "utf8");
  written++;
}

console.log(`render-guides: ${written} page(s)${files.length ? " (" + files.map((f) => f.replace(/\.md$/, ".html")).join(", ") + ")" : ""}`);
