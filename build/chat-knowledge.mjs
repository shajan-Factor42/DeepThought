/**
 * chat-knowledge.mjs — writes _site/chat-knowledge.json, the only thing the website chat bot
 * knows about DeepThought.
 *
 * The chat relay (chat-worker/) fetches this file from the live site and builds its
 * instructions from it, so the bot's answers come from the same source as the pages: the
 * FAQ, products, pricing wording and organization facts in build/aeo-data.json, llms.txt,
 * and the list of pages that actually rendered. Change a fact there, deploy, and the bot
 * says the new thing within ~10 minutes. No redeploy of the relay needed.
 *
 * Run by render.mjs after the sitemap step. Added 2026-10-01.
 *
 * Usage: node build/chat-knowledge.mjs --out _site --content content
 */
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const args = process.argv.slice(2);
const arg = (n, d) => { const i = args.indexOf("--" + n); return i === -1 ? d : args[i + 1]; };
const OUT = arg("out", "_site");
const CONTENT = arg("content", "content");
const SITE = "https://deepthought.marketing";

const AEO = JSON.parse(await readFile(new URL("./aeo-data.json", import.meta.url), "utf8"));
const brand = (s) => String(s).replace(/Deep\s+Thought(?! Digital Marketing)/g, "DeepThought");

let llms = "";
try { llms = await readFile(new URL("../llms.txt", import.meta.url), "utf8"); } catch { /* optional */ }

// Pages the bot may link to: core pages plus every blog post and guide that rendered.
const front = async (dir) => {
  const out = [];
  let files = [];
  try { files = (await readdir(dir)).filter((f) => f.endsWith(".md")); } catch { return out; }
  for (const f of files) {
    const s = await readFile(join(dir, f), "utf8");
    const title = /^title:\s*"?(.*?)"?\s*$/m.exec(s)?.[1];
    const slug = /^slug:\s*"?(.*?)"?\s*$/m.exec(s)?.[1] || f.replace(/\.md$/, "");
    if (title) out.push({ title: brand(title), slug });
  }
  return out;
};
const rendered = new Set((await readdir(OUT)).filter((f) => f.endsWith(".html")));
const pages = [
  ["Home", ""], ["How it works (product)", "product.html"], ["Pricing", "pricing.html"],
  ["Solutions by business type", "solutions.html"], ["Industries", "industries.html"],
  ["FAQ", "faq.html"], ["About", "about.html"], ["Blog", "blog.html"],
  ["Book a demo (pick a time on the calendar)", "book-a-demo.html"],
  ["Local market pages by state and county", "serving-local-business.html"],
  ["Privacy policy", "privacy.html"], ["Terms", "terms.html"],
].filter(([, f]) => f === "" || rendered.has(f)).map(([title, f]) => ({ title, url: `${SITE}/${f}` }));
for (const g of await front(join(CONTENT, "guides"))) {
  if (rendered.has(`${g.slug}.html`)) pages.push({ title: `Guide: ${g.title}`, url: `${SITE}/${g.slug}.html` });
}
for (const p of await front(join(CONTENT, "blog"))) {
  if (rendered.has(`blog-${p.slug}.html`)) pages.push({ title: `Blog: ${p.title}`, url: `${SITE}/blog-${p.slug}.html` });
}

const o = AEO.organization;
const knowledge = {
  generated: new Date().toISOString(),
  organization: {
    name: o.name,
    legalName: o.legalName,
    slogan: o.slogan,
    description: brand(o.description),
    phone: "770-299-9583",
    email: "support@deepthought.marketing",
    location: "Based in Gwinnett County, Georgia. Serves businesses across the United States. Do not give a street address.",
    bookingPage: `${SITE}/book-a-demo.html`,
  },
  pricing: {
    summary: brand(AEO.pricing.summary),
    packages: AEO.pricing.tiers.map((t) => ({ name: t.name, includes: brand(t.description) })),
  },
  products: AEO.products,
  features: AEO.featureList.map(brand),
  faq: AEO.faq.map((f) => ({ q: brand(f.q), a: brand(f.a) })),
  // The reasons behind retired claims, so the bot knows what not to say and why.
  retiredClaims: AEO.bannedClaims.map((b) => brand(b.why)),
  llmsTxt: brand(llms),
  pages,
};

await writeFile(join(OUT, "chat-knowledge.json"), JSON.stringify(knowledge) + "\n", "utf8");
console.log(`chat-knowledge: ${knowledge.faq.length} FAQs, ${pages.length} linkable pages`);
