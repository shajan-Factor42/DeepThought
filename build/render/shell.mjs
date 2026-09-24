/**
 * shell.mjs — the bits every renderer needs: the HTML document wrapper and the site partials.
 *
 * Kept in one place so the head, the schema block and the stylesheet set can't drift between
 * page types. Divergence between page types is how the site ended up with county pages that
 * never loaded responsive.css.
 */

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { templateFrom, helmetFrom, COMPONENT_CSS, esc } from "./dc.mjs";

const AEO = JSON.parse(await readFile(new URL("../aeo-data.json", import.meta.url), "utf8"));

/**
 * NAP and social blocks, rendered straight into the footer.
 *
 * nap-block.mjs and social-links.mjs used to inject these after the build, because the footer
 * was a client-rendered component and anything placed inside it was invisible to a crawler.
 * They also skipped 3,032 pages that had no footer at all. Both problems are gone: the footer
 * is real markup on every page, so the blocks are simply rendered with it and the two
 * post-processing steps retire.
 */
function napBlock() {
  const o = AEO.organization || {};
  const a = o.address || {};
  const lines = [];
  if (o.name) lines.push(`      <span>${esc(o.name)}</span>`);
  // hideAddressLine keeps the PostalAddress in schema for GBP corroboration while leaving the
  // street address off the visible block — the right shape for a service-area business.
  if (a.streetAddress && !o.hideAddressLine) {
    const cityState = [a.addressLocality, a.addressRegion].filter(Boolean).map(esc).join(", ");
    const region = [cityState, esc(a.postalCode || "")].filter(Boolean).join(" ");
    lines.push(`      <span>${[esc(a.streetAddress), region].filter(Boolean).join(", ")}</span>`);
  }
  if (o.telephone) {
    const href = String(o.telephone).replace(/[^\d+]/g, "");
    lines.push(`      <a href="tel:${esc(href)}" style="color:inherit; text-decoration:none">${esc(o.telephone)}</a>`);
  }
  if (!lines.length) return "";
  return `<address id="nap-block" style="max-width:1200px; margin:0 auto; padding:0 40px 8px; display:flex; flex-wrap:wrap; gap:8px 20px; justify-content:center; font-size:14px; font-style:normal; opacity:0.75">\n${lines.join("\n")}\n    </address>`;
}

const LABELS = [
  [/linkedin\./i, "LinkedIn"], [/facebook\./i, "Facebook"], [/instagram\./i, "Instagram"],
  [/(twitter|x)\.com/i, "X"], [/youtube\./i, "YouTube"], [/nextdoor\./i, "Nextdoor"],
  [/tiktok\./i, "TikTok"], [/threads\./i, "Threads"], [/pinterest\./i, "Pinterest"],
  [/google\.[^/]+\/maps|g\.page|maps\.app\.goo\.gl/i, "Google"],
];
function socialBlock() {
  const urls = (AEO.organization && AEO.organization.sameAs) || [];
  if (!urls.length) return "";
  const anchors = urls.map((u) => {
    const hit = LABELS.find(([re]) => re.test(u));
    const label = hit ? hit[1] : String(u).replace(/^https?:\/\/(www\.)?/, "").split("/")[0];
    return `<a href="${esc(u)}" rel="me noopener" target="_blank" style="color:inherit; text-decoration:none">${esc(label)}</a>`;
  }).join("\n      ");
  return `<nav id="social-profiles" aria-label="DeepThought on other platforms" style="max-width:1200px; margin:0 auto; padding:0 40px 24px; display:flex; flex-wrap:wrap; gap:20px; justify-content:center; font-size:14px; opacity:0.75">\n      ${anchors}\n    </nav>`;
}

const FOOTER_BLOCKS = [napBlock(), socialBlock()].filter(Boolean).join("\n  ");

export const SITE = "https://deepthought.marketing";

/**
 * The site's own entity graph, emitted on every page.
 *
 * Every Service, WebPage and BlogPosting points at `#organization` and `#website`. Until
 * 2026-09-23 nothing defined either node: prerender.mjs used to inject them, and when the
 * static rebuild retired it nothing took its place — 3,203 pages referenced a business that
 * did not exist in their schema. Both nodes now come from aeo-data.json, the same source as
 * the footer NAP and social links, so schema and visible text cannot disagree. verify.mjs
 * fails the build if any page references an @id it does not define.
 *
 * The PostalAddress stays in schema (it corroborates the Google Business Profile) even though
 * hideAddressLine keeps the street off the visible footer.
 */
function siteGraph() {
  const o = AEO.organization || {};
  const a = o.address || {};
  const served = [].concat(o.areaServed || []).map((n) =>
    /^united states$/i.test(n)
      ? { "@type": "Country", name: "United States" }
      : { "@type": "AdministrativeArea", name: n });
  const org = {
    "@type": "ProfessionalService",
    "@id": `${SITE}/#organization`,
    name: o.name, legalName: o.legalName, alternateName: o.alternateName,
    url: `${SITE}/`, description: o.description,
    logo: o.logo, image: o.logo,
    email: o.email, telephone: o.telephone,
    address: a.streetAddress ? { "@type": "PostalAddress", ...a } : undefined,
    areaServed: served.length ? served : undefined,
    sameAs: o.sameAs && o.sameAs.length ? o.sameAs : undefined,
  };
  const website = {
    "@type": "WebSite", "@id": `${SITE}/#website`,
    url: `${SITE}/`, name: o.name, publisher: { "@id": `${SITE}/#organization` },
    inLanguage: "en-US",
  };
  return JSON.parse(JSON.stringify({ "@context": "https://schema.org", "@graph": [org, website] }));
}
const SITE_GRAPH = siteGraph();

/** The home page is canonical at the root, not at /index.html. */
export const canonicalUrl = (u) => (u === `${SITE}/index.html` ? `${SITE}/` : u);

/**
 * Scope every page needs. `open` controls the header's mobile drawer, which sits behind an
 * <sc-if>. Rendering it false would drop the drawer markup entirely and leave the hamburger
 * button opening nothing — the nav would be unreachable on a phone. So the drawer is always
 * rendered and CSS hides it until the toggle sets data-nav-open.
 */
export const BASE_SCOPE = {
  open: true,
  toggle: "",
  // Style overrides the templates pass to Button via dc-props. Defined identically in every
  // page's renderVals in the original, so they live here once.
  whiteBtn: { style: { background: "#fff", color: "var(--f42-deep-blue)" } },
  ghostBtn: { style: { color: "#fff", border: "1px solid rgba(255,255,255,0.28)", background: "rgba(255,255,255,0.06)" } },
};

/** Load SiteHeader / SiteFooter as render-ready partials, plus the shared <head> fragment. */
/**
 * Header CTA.
 *
 * The header's "Sign in" was a plain text link pointing at contact.html — it neither signed
 * anyone in nor stood out. It becomes a filled call to action pointing at the app.
 *
 * "Book a demo" is a filled button too, in orange rather than blue. Orange is the complement
 * of blue, so the two read as two distinct actions rather than two versions of the same one.
 *
 * The specific value matters: orange only becomes legible once it is quite dark. #F97316 and
 * #EA580C — the oranges most people picture — sit at 2.8:1 and 3.5:1 against a white header
 * and fail as text. #C2410C is the brightest orange that works, and here it carries white at
 * 5.2:1, which clears AA. Going lighter for more vividness would break legibility.
 *
 * Reading order is kept as it was: the text link sits left of the button, so the eye lands on
 * the filled CTA last and rightmost.
 *
 * The desktop actions bar is hidden below 1024px, so the same CTA is added to the mobile
 * drawer — otherwise phone visitors would never see it.
 */
const APP_URL = "https://deepthought.adops.rocks/";
const CTA_LABEL = "Launch your Campaigns";

const CTA_DESKTOP =
  `<a href="${APP_URL}" style="display:inline-flex; align-items:center; justify-content:center; ` +
  `box-sizing:border-box; height:40px; padding:0 20px; border-radius:var(--radius-button); ` +
  `background:var(--f42-gradient-button); color:var(--text-on-brand); font-family:var(--font-body); ` +
  `font-size:14.5px; font-weight:700; letter-spacing:-0.01em; text-decoration:none; white-space:nowrap; ` +
  `box-shadow:var(--shadow-button)">${CTA_LABEL}</a>`;

const CTA_DRAWER =
  `<a href="${APP_URL}" style="display:block; margin-top:14px; text-align:center; font-size:16px; ` +
  `font-weight:700; color:#fff; text-decoration:none; background:var(--f42-gradient-button); ` +
  `border-radius:12px; padding:15px 20px; box-shadow:0 10px 24px rgba(0,102,255,0.22)">${CTA_LABEL}</a>`;

const DEMO_ORANGE = "#C2410C";

const DEMO_DESKTOP =
  `<a href="book-a-demo.html" style="display:inline-flex; align-items:center; justify-content:center; ` +
  `box-sizing:border-box; height:40px; padding:0 20px; border-radius:var(--radius-button); ` +
  `background:${DEMO_ORANGE}; color:#ffffff; font-family:var(--font-body); font-size:14.5px; ` +
  `font-weight:700; letter-spacing:-0.01em; text-decoration:none; white-space:nowrap; ` +
  `box-shadow:0 6px 20px rgba(194,65,12,0.28)">Book a demo</a>`;

const DEMO_DRAWER =
  `<a href="book-a-demo.html" style="display:block; margin-top:10px; text-align:center; font-size:16px; ` +
  `font-weight:700; color:#ffffff; text-decoration:none; background:${DEMO_ORANGE}; ` +
  `border-radius:12px; padding:15px 20px; box-shadow:0 10px 24px rgba(194,65,12,0.24)">Book a demo</a>`;

function applyHeaderCta(tpl) {
  let html = tpl;

  const signIn = '<a href="contact.html" style="font-size:14.5px; font-weight:600; color:var(--f42-primary-blue); text-decoration:none; white-space:nowrap">Sign in</a>';
  if (!html.includes(signIn)) throw new Error("SiteHeader: Sign in link not found — site.zip changed");
  html = html.replace(signIn, DEMO_DESKTOP);

  const demoWrap = '<a href="book-a-demo.html" style="text-decoration:none">\n        <x-import component-from-global-scope="Factor42DesignSystem_376e18.Button" variant="primary" size="sm" hint-size="120px,36px">Book a demo</x-import>\n      </a>';
  if (!html.includes(demoWrap)) throw new Error("SiteHeader: desktop demo button not found — site.zip changed");
  html = html.replace(demoWrap, CTA_DESKTOP);

  const drawerDemo = '<a href="book-a-demo.html" style="display:block; margin-top:14px; text-align:center; font-size:16px; font-weight:600; color:#fff; text-decoration:none; background:var(--f42-gradient-blue); border-radius:12px; padding:15px 20px; box-shadow:0 10px 24px rgba(0,102,255,0.22)">Book a demo</a>';
  if (!html.includes(drawerDemo)) throw new Error("SiteHeader: drawer demo button not found — site.zip changed");
  html = html.replace(drawerDemo, CTA_DRAWER + "\n        " + DEMO_DRAWER);

  return html;
}

/**
 * Footer.
 *
 * Gwinnett is the home market (the Google Business Profile is in Dacula), so it gets a direct
 * link from every page instead of sitting three clicks deep behind Georgia counties.
 * The copyright line used "DeepThought Marketing", one of the retired name variants; it now
 * uses the canonical name from aeo-data.json.
 */
function applyFooter(tpl) {
  let html = tpl;
  const ga = '<a href="georgia-counties.html" style="font-size:14px; color:var(--text-muted); text-decoration:none">Georgia counties</a>';
  if (!html.includes(ga)) throw new Error("SiteFooter: Georgia counties link not found — site.zip changed");
  html = html.replace(ga, ga + '\n      <a href="digital-marketing-gwinnett-county-ga.html" style="font-size:14px; color:var(--text-muted); text-decoration:none">Gwinnett County, GA</a>');

  const copy = "© 2026 DeepThought Marketing. All rights reserved.";
  if (!html.includes(copy)) throw new Error("SiteFooter: copyright line not found — site.zip changed");
  html = html.replace(copy, `© ${new Date().getFullYear()} ${esc((AEO.organization || {}).name || "DeepThought")}. All rights reserved.`);
  return html;
}

export async function loadShell(SRC) {

  const headerSrc = await readFile(join(SRC, "SiteHeader.dc.html"), "utf8");
  const footerSrc = await readFile(join(SRC, "SiteFooter.dc.html"), "utf8");

  // The helmet carries the design-system stylesheets, which we keep, and the React runtime,
  // which a statically rendered page has no use for.
  const helmet = helmetFrom(headerSrc)
    .replace(/<script\b[^>]*_ds_bundle\.js[^>]*>\s*<\/script>/gi, "")
    .replace(/<script\b[^>]*support\.js[^>]*>\s*<\/script>/gi, "")
    .trim();

  return {
    helmet,
    partials: { SiteHeader: applyHeaderCta(templateFrom(headerSrc)), SiteFooter: applyFooter(templateFrom(footerSrc)) },
  };
}

/**
 * Wrap rendered body markup in a complete document.
 * `jsonld` may be a single object or an array of blocks.
 */
export function page({ title, description, canonical, jsonld, body, helmet, noindex = false }) {
  if (FOOTER_BLOCKS) {
    const at = body.lastIndexOf("<footer");
    body = at === -1
      ? body + "\n  " + FOOTER_BLOCKS
      : body.slice(0, at) + FOOTER_BLOCKS + "\n  " + body.slice(at);
  }
  canonical = canonicalUrl(canonical);
  const home = JSON.stringify(`${SITE}/index.html`);
  const blocks = [SITE_GRAPH, ...(Array.isArray(jsonld) ? jsonld : [jsonld])].filter(Boolean);
  const ld = blocks
    // any JSON-LD url pointing at /index.html follows the canonical to the root
    .map((b) => `<script type="application/ld+json">${JSON.stringify(b).split(home).join(JSON.stringify(`${SITE}/`))}</script>`)
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${canonical}">
<meta name="robots" content="${noindex ? "noindex,follow" : "index,follow"}">
${ld}
${helmet}
<style>${COMPONENT_CSS}
[data-hdr-drawer]{display:none}
html[data-nav-open] [data-hdr-drawer]{display:block}</style>
</head>
<body>
${body}
${NAV_SCRIPT}
</body>
</html>
`;
}

/**
 * The only JavaScript the rebuilt site ships. Opening the mobile nav is genuine interactivity,
 * not page assembly, so it stays — as five lines rather than a framework.
 */
const NAV_SCRIPT = `<script>
document.addEventListener("click",function(e){
  var t=e.target;if(!t.closest)return;
  var b=t.closest("[data-hdr-toggle]");
  if(b){var d=document.documentElement,o=d.hasAttribute("data-nav-open");
    if(o){d.removeAttribute("data-nav-open")}else{d.setAttribute("data-nav-open","")}
    b.setAttribute("aria-expanded",String(!o));return;}
  var a=t.closest("[data-acc]");
  if(a){var p=document.querySelector('[data-acc-panel="'+a.getAttribute("data-acc")+'"]');
    if(!p)return;var open=!p.hasAttribute("hidden");
    if(open){p.setAttribute("hidden","")}else{p.removeAttribute("hidden")}
    a.setAttribute("aria-expanded",String(!open));
    var s=a.querySelector("span:last-child");if(s)s.textContent=open?"+":"\u2212";}
});
</script>`;

/** Cut a <section> by an anchor inside it, refusing to splice if another section opens within. */
export function cutSection(html, anchor, label) {
  const at = html.indexOf(anchor);
  if (at === -1) return { html, cut: false };
  const start = html.lastIndexOf("<section", at);
  const close = html.indexOf("</section>", at);
  if (start === -1 || close === -1) throw new Error(`${label}: no enclosing section`);
  if (html.slice(start + 8, close).includes("<section")) {
    throw new Error(`${label}: nested section — refusing to splice`);
  }
  return { html: html.slice(0, start) + html.slice(close + "</section>".length), cut: true };
}

export { esc };
