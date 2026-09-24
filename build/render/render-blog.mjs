/**
 * render-blog.mjs — blog posts, the index, and one page per category.
 *
 * Source of truth is content/blog/*.md. Adding a post is adding a file.
 *
 * The index's category chips were <button onClick> handlers that filtered client-side, which
 * meant the filtered views did not exist as URLs and nothing without JavaScript could reach
 * them. Each category is now a real page and the chips are links.
 *
 * Usage: node build/render/render-blog.mjs --src dist --content content/blog --out _site
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, resolve as resolvePath } from "node:path";
import { render, templateFrom } from "./dc.mjs";
import { loadShell, page, SITE, BASE_SCOPE, esc } from "./shell.mjs";
import { loadPosts } from "./content.mjs";

const args = process.argv.slice(2);
const arg = (n, d) => { const i = args.indexOf("--" + n); return i === -1 ? d : args[i + 1]; };
const SRC = resolvePath(arg("src", "dist"));
const CONTENT = resolvePath(arg("content", "content/blog"));
const OUT = resolvePath(arg("out", "_site"));

const { helmet, partials } = await loadShell(SRC);
const countyIndex = await import(join(SRC, "county-index.js").replace(/^/, "file://"));

const POST_TPL = templateFrom(await readFile(join(SRC, "Blog Post.dc.html"), "utf8"));

// The chips were buttons wired to a client-side filter. Make them links to the category pages.
let INDEX_TPL = templateFrom(await readFile(join(SRC, "Blog.dc.html"), "utf8"))
  .replace(/<button type="button" onClick="\{\{ c\.pick \}\}"/g, '<a href="{{ c.href }}"')
  .replace(/<\/button>/g, "</a>");
if (INDEX_TPL.includes("c.pick")) throw new Error("blog index: a c.pick handler survived the rewrite");

const posts = await loadPosts(CONTENT);
const catSlug = (c) => c.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const postHref = (p) => `blog-${p.slug}.html`;
const catHref = (c) => `blog-category-${catSlug(c)}.html`;
const categories = [...new Set(posts.map((p) => p.cat))];

/* ---------- per-post link blocks ---------- */

/** Eight county links, one per state, chosen deterministically from the slug — as before. */
function countiesFor(slug) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  const pool = countyIndex.COUNTY_SLUGS;
  const picks = [], seenSlug = new Set(), seenState = new Set();
  let guard = 0;
  while (picks.length < 8 && guard++ < 400) {
    h = (h * 1103515245 + 12345) >>> 0;
    const s = pool[h % pool.length];
    if (!s || seenSlug.has(s)) continue;
    const info = countyIndex.parse(s);
    if (!info || seenState.has(info.state)) continue;
    seenSlug.add(s); seenState.add(info.state);
    picks.push({ label: countyIndex.label(s), href: `digital-marketing-${s}.html` });
  }
  return picks;
}

/** Three related posts: same category first, then the most recent others. */
function relatedFor(post) {
  const same = posts.filter((p) => p.slug !== post.slug && p.cat === post.cat);
  const other = posts.filter((p) => p.slug !== post.slug && p.cat !== post.cat);
  return same.concat(other).slice(0, 3)
    .map((r) => ({ title: r.title, cat: r.cat, read: r.read, href: postHref(r) }));
}

const NAV = {
  blogHref: "blog.html", homeHref: "index.html", demoHref: "book-a-demo.html",
  pricingHref: "pricing.html", statesHref: "us-states.html", contactHref: "contact.html",
};

// The stock CTA read "published pricing", which the 14 Sept pricing decision retired. It sits
// on every post, so it would have carried the old claim across the whole blog.
const CTA = {
  ctaHeading: "Want this run for you instead of read about?",
  ctaBody: "Deep Thought runs search, social, streaming TV, and display for local businesses — media covered inside the price, campaigns live in 60 seconds.",
  ctaLabel: "See pricing",
  ctaHref: "pricing.html",
};

await mkdir(OUT, { recursive: true });
let written = 0, holes = 0;
const rendered = [];

/* ---------- posts ---------- */

for (const post of posts) {
  const scope = { ...BASE_SCOPE, ...post, ...NAV, ...CTA, related: relatedFor(post), counties: countiesFor(post.slug) };
  const body = render(POST_TPL, scope, partials);
  if (body.includes("{{")) holes++;

  const file = postHref(post);
  const canonical = `${SITE}/${file}`;
  const jsonld = [{
    "@context": "https://schema.org", "@type": "BlogPosting",
    headline: post.title, description: post.dek,
    datePublished: post.iso, articleSection: post.cat,
    author: { "@type": "Organization", name: "DeepThought" },
    publisher: { "@id": `${SITE}/#organization` },
    mainEntityOfPage: canonical, inLanguage: "en-US",
  }];
  if (post.faq.length) {
    jsonld.push({
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: post.faq.map((f) => ({
        "@type": "Question", name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  await writeFile(join(OUT, file),
    page({ title: `${post.title} | Deep Thought`, description: post.dek, canonical, jsonld, body, helmet }),
    "utf8");
  rendered.push(file); written++;
}

/* ---------- index and category pages ---------- */

const excerpt = (p) => (p.dek.length > 128 ? p.dek.slice(0, 125).replace(/[\s,;:]+$/, "") + "…" : p.dek);
const card = (p) => ({
  title: p.title, cat: p.cat, read: p.read, date: p.date,
  stat: p.stat, statLabel: p.statLabel, excerpt: excerpt(p), href: postHref(p),
});

async function writeIndex({ file, selected, list, title, description }) {
  const feat = list[0] || posts[0];
  const chips = ["All", ...categories].map((c) => {
    const on = c === selected;
    return {
      label: c, href: c === "All" ? "blog.html" : catHref(c),
      bg: on ? "var(--f42-gradient-blue)" : "rgba(255,255,255,0.7)",
      color: on ? "#fff" : "var(--text-body)",
      border: on ? "transparent" : "var(--border-subtle)",
    };
  });
  const rest = list.slice(1);
  const scope = { ...BASE_SCOPE, ...NAV, cats: chips, feat: card(feat), posts: rest.map(card), empty: rest.length === 0 };
  const body = render(INDEX_TPL, scope, partials);
  if (body.includes("{{")) holes++;

  const canonical = `${SITE}/${file}`;
  const jsonld = {
    "@context": "https://schema.org", "@type": "CollectionPage",
    name: title, description, url: canonical,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: list.slice(0, 40).map((p, i) => ({
        "@type": "ListItem", position: i + 1, url: `${SITE}/${postHref(p)}`, name: p.title,
      })),
    },
  };
  await writeFile(join(OUT, file), page({ title, description, canonical, jsonld, body, helmet }), "utf8");
  rendered.push(file); written++;
}

await writeIndex({
  file: "blog.html", selected: "All", list: posts,
  title: "Blog | Deep Thought",
  description: "Benchmarks, pricing teardowns and operating playbooks from the team that runs campaigns across every channel.",
});

for (const c of categories) {
  const list = posts.filter((p) => p.cat === c);
  await writeIndex({
    file: catHref(c), selected: c, list,
    title: `${c} | Deep Thought Blog`,
    description: `${list.length} article${list.length === 1 ? "" : "s"} on ${c.toLowerCase()} from Deep Thought.`,
  });
}

console.log(`render-blog: ${written} pages (${posts.length} posts, 1 index, ${categories.length} category pages)`);
if (holes) { console.error(`FAIL: ${holes} page(s) still contain {{ }} holes`); process.exit(1); }

export { rendered };
