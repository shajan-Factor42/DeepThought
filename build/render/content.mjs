/**
 * content.mjs — read a blog post from a Markdown file.
 *
 * Adding a post used to mean appending a ~4,500-line object to a 320KB JavaScript file, then
 * hand-writing a matching HTML page, then remembering the sitemap. Now it means dropping a
 * .md file into content/blog/ and pushing. The renderer finds it, the index picks it up, and
 * the sitemap is generated from whatever rendered.
 *
 * Deliberately dependency-free. The build's only npm dependency was puppeteer, and the static
 * rebuild removes the need for that — so `npm install` disappears from CI entirely rather than
 * being kept alive for a Markdown library. The supported subset is what the posts actually use.
 *
 * Frontmatter (a small YAML subset — quoted or bare scalars, lists, and q/a maps):
 *
 *   ---
 *   title: "How Much Does X Cost?"
 *   slug: how-much-does-x-cost          # optional; defaults to the filename
 *   category: "Cost & Pricing"
 *   date: 2026-09-15
 *   read: "6 min"
 *   stat: "30-40%"
 *   statLabel: "What agencies charge on top of your media"
 *   dek: "One or two sentences that appear under the title and in the index."
 *   author: "Deep Thought Research"
 *   authorRole: "Research Team"
 *   takeaways:
 *     - "A short line."
 *   faq:
 *     - q: "A question?"
 *       a: "Its answer."
 *   ---
 *
 * Body: `## ` starts a section, `### ` a subheading, blank-line-separated paragraphs, `- `
 * bullets. Inline `**bold**`, `*italic*`, `` `code` `` and `[text](href)` are supported.
 *
 * FAQ entries render as question-shaped H2 sections *and* emit FAQPage schema from the same
 * source, so the visible text and the structured data cannot drift apart. That drift is what
 * put a 6-versus-4 mismatch on the home page.
 */

import { readFile, readdir } from "node:fs/promises";
import { join, basename } from "node:path";

const esc = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* ---------- frontmatter ---------- */

function scalar(raw) {
  const v = raw.trim();
  if (v === "") return "";
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    try { return JSON.parse(v.replace(/^'|'$/g, '"')); } catch { return v.slice(1, -1); }
  }
  return v;
}

export function parseFrontmatter(src, file) {
  if (!src.startsWith("---")) throw new Error(`${file}: missing frontmatter`);
  const end = src.indexOf("\n---", 3);
  if (end === -1) throw new Error(`${file}: unterminated frontmatter`);
  const head = src.slice(3, end).replace(/^\r?\n/, "");
  const body = src.slice(end + 4).replace(/^\r?\n/, "");

  const data = {};
  let key = null;
  for (const line of head.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;

    const top = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line);
    if (top && !line.startsWith(" ")) {
      key = top[1];
      data[key] = top[2].trim() === "" ? [] : scalar(top[2]);
      continue;
    }
    const item = /^\s+-\s*(.*)$/.exec(line);
    if (item && key) {
      if (!Array.isArray(data[key])) data[key] = [];
      const kv = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(item[1]);
      if (kv) data[key].push({ [kv[1]]: scalar(kv[2]) });
      else data[key].push(scalar(item[1]));
      continue;
    }
    const cont = /^\s+([A-Za-z0-9_]+):\s*(.*)$/.exec(line);
    if (cont && key && Array.isArray(data[key]) && data[key].length) {
      data[key][data[key].length - 1][cont[1]] = scalar(cont[2]);
    }
  }
  return { data, body };
}

/* ---------- markdown ---------- */

function inline(text) {
  return esc(text)
    .replace(/`([^`]+)`/g, '<code style="font-size:0.92em; background:var(--f42-slate-100); padding:1px 5px; border-radius:4px">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, t, h) => `<a href="${esc(h)}" style="color:var(--color-accent)">${t}</a>`);
}

/** Markdown body -> the [{h, p:[...]}] shape the Blog Post template loops over. */
export function parseBody(md) {
  const sections = [];
  let current = null;
  const chunks = md.split(/\r?\n\r?\n+/);

  for (const raw of chunks) {
    const chunk = raw.trim();
    if (!chunk) continue;

    const h2 = /^##\s+(?!#)(.*)$/.exec(chunk);
    if (h2) { current = { h: h2[1].trim(), p: [] }; sections.push(current); continue; }

    if (!current) { current = { h: "", p: [] }; sections.push(current); }

    const h3 = /^###\s+(.*)$/.exec(chunk);
    if (h3) { current.p.push(`<strong>${inline(h3[1].trim())}</strong>`); continue; }

    if (/^[-*]\s+/.test(chunk)) {
      const items = chunk.split(/\r?\n/).filter((l) => /^[-*]\s+/.test(l))
        .map((l) => `<li style="margin:0 0 8px">${inline(l.replace(/^[-*]\s+/, ""))}</li>`).join("");
      current.p.push(`<ul style="margin:0 0 16px; padding-left:22px">${items}</ul>`);
      continue;
    }

    current.p.push(inline(chunk.replace(/\r?\n/g, " ")));
  }
  return sections.filter((s) => s.h || s.p.length);
}

/* ---------- posts ---------- */

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function displayDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso));
  if (!m) return String(iso);
  return `${MONTHS[Number(m[2]) - 1]} ${Number(m[3])}, ${m[1]}`;
}

function initials(name) {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "DT";
  return (parts[0][0] + (parts[1] ? parts[1][0] : "")).toUpperCase();
}

export function postFrom(src, file) {
  const { data, body } = parseFrontmatter(src, file);
  const slug = data.slug || basename(file).replace(/\.md$/, "");
  for (const required of ["title", "category", "date", "dek"]) {
    if (!data[required]) throw new Error(`${file}: frontmatter is missing "${required}"`);
  }

  const faq = (Array.isArray(data.faq) ? data.faq : [])
    .map((f) => ({ q: String(f.q || "").trim(), a: String(f.a || "").trim() }))
    .filter((f) => f.q && f.a);

  // FAQ entries render as ordinary sections so the answers are visible on the page; the same
  // array is what builds the FAQPage schema, so the two can never disagree.
  const sections = parseBody(body).concat(faq.map((f) => ({ h: f.q, p: [inline(f.a)] })));

  return {
    slug,
    title: String(data.title),
    dek: String(data.dek),
    cat: String(data.category),
    iso: String(data.date),
    date: displayDate(data.date),
    read: String(data.read || "5 min"),
    stat: String(data.stat || ""),
    statLabel: String(data.statLabel || ""),
    author: String(data.author || "Deep Thought Research"),
    authorRole: String(data.authorRole || "Research Team"),
    authorInitials: initials(data.author || "Deep Thought"),
    body: sections,
    takeaways: (Array.isArray(data.takeaways) ? data.takeaways : []).map(String),
    faq,
  };
}

/** Load every post in a directory, newest first. */
export async function loadPosts(dir) {
  const files = (await readdir(dir)).filter((f) => f.endsWith(".md")).sort();
  const posts = [];
  for (const f of files) posts.push(postFrom(await readFile(join(dir, f), "utf8"), f));
  posts.sort((a, b) => (a.iso < b.iso ? 1 : a.iso > b.iso ? -1 : a.slug.localeCompare(b.slug)));
  const seen = new Set();
  for (const p of posts) {
    if (seen.has(p.slug)) throw new Error(`duplicate slug: ${p.slug}`);
    seen.add(p.slug);
  }
  return posts;
}

export { esc };
