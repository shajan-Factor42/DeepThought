/**
 * shell.mjs — the bits every renderer needs: the HTML document wrapper and the site partials.
 *
 * Kept in one place so the head, the schema block and the stylesheet set can't drift between
 * page types. Divergence between page types is how the site ended up with county pages that
 * never loaded responsive.css.
 */

import { MOBILE_BAR, LEAD_SCRIPT } from "./leads.mjs";
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
    slogan: o.slogan, knowsAbout: o.knowsAbout,
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
// CRO 2026-10-01: the main button is the Second Opinion form, not the app login. Cold visitors
// can't use the app; existing clients find it under "Log in". Booking a call is the third option.
const CTA_LABEL = "Free Second Opinion";
const LEAD_URL = "second-opinion.html";

const CTA_DESKTOP =
  `<a href="${LEAD_URL}" data-lead-cta="header" style="display:inline-flex; align-items:center; justify-content:center; ` +
  `box-sizing:border-box; height:40px; padding:0 20px; border-radius:var(--radius-button); ` +
  `background:var(--f42-gradient-button); color:var(--text-on-brand); font-family:var(--font-body); ` +
  `font-size:14.5px; font-weight:700; letter-spacing:-0.01em; text-decoration:none; white-space:nowrap; ` +
  `box-shadow:var(--shadow-button)">${CTA_LABEL}</a>`;

const CTA_DRAWER =
  `<a href="${LEAD_URL}" data-lead-cta="drawer" style="display:block; margin-top:14px; text-align:center; font-size:16px; ` +
  `font-weight:700; color:#fff; text-decoration:none; background:var(--f42-gradient-button); ` +
  `border-radius:12px; padding:15px 20px; box-shadow:0 10px 24px rgba(0,102,255,0.22)">${CTA_LABEL}</a>`;

const DEMO_ORANGE = "#C2410C";

// Secondary: phone and booking as quiet text links, app login quieter still.
const DEMO_DESKTOP =
  `<a href="${APP_URL}" style="font-size:14px; font-weight:500; color:var(--text-muted); text-decoration:none; white-space:nowrap">Log in</a>` +
  `<a href="tel:+17702999583" style="font-size:14.5px; font-weight:700; color:var(--text-heading); text-decoration:none; white-space:nowrap">770-299-9583</a>`;

const DEMO_DRAWER =
  `<a href="tel:+17702999583" style="display:block; margin-top:10px; text-align:center; font-size:16px; ` +
  `font-weight:700; color:var(--f42-primary-blue); text-decoration:none; background:#fff; border:1.5px solid var(--f42-primary-blue); ` +
  `border-radius:12px; padding:14px 20px">Call 770-299-9583</a>` +
  `\n        <a href="book-a-demo.html" style="display:block; margin-top:10px; text-align:center; font-size:15px; font-weight:600; color:var(--f42-primary-blue); text-decoration:none; padding:8px">Book a call</a>` +
  `\n        <a href="${APP_URL}" style="display:block; margin-top:2px; text-align:center; font-size:14px; color:var(--text-muted); text-decoration:none; padding:6px">Log in</a>`;

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
  // Pillar guide for the 'digital marketing for small business' cluster (2026-09-29, SEO chat).
  // Linked from every page so it carries site-wide weight; cluster posts link to it as they publish.
  const allSolutions = '<a href="solutions.html" style="font-size:14px; color:var(--text-muted); text-decoration:none">All solutions</a>';
  if (!html.includes(allSolutions)) throw new Error("SiteFooter: All solutions link not found — site.zip changed");
  html = html.replace(allSolutions, allSolutions + '\n      <a href="digital-marketing-for-small-business.html" style="font-size:14px; color:var(--text-muted); text-decoration:none">Digital marketing for small business</a>'
    // HVAC landing page (2026-10-02, SEO chat): first trade page, linked sitewide like the pillar.
    + '\n      <a href="hvac-marketing-atlanta.html" style="font-size:14px; color:var(--text-muted); text-decoration:none">HVAC marketing</a>');

  const copy = "© 2026 DeepThought Marketing. All rights reserved.";
  if (!html.includes(copy)) throw new Error("SiteFooter: copyright line not found — site.zip changed");
  html = html.replace(copy, `© ${new Date().getFullYear()} ${esc((AEO.organization || {}).name || "DeepThought")}. All rights reserved.`);

  // Terms and Privacy pointed at "#" until 2026-09-26. They now go to the pages that
  // render-legal.mjs builds from content/legal/.
  for (const [label, href] of [["Terms", "terms.html"], ["Privacy", "privacy.html"]]) {
    const dead = `<a href="#" style="color:var(--text-muted); text-decoration:none">${label}</a>`;
    if (!html.includes(dead)) throw new Error(`SiteFooter: ${label} link not found — site.zip changed`);
    html = html.replace(dead, `<a href="${href}" style="color:var(--text-muted); text-decoration:none">${label}</a>`);
  }
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
export function page({ title, description, canonical, jsonld, body, helmet, noindex = false, image = null, imageAlt = null, ogType = "website" }) {
  if (FOOTER_BLOCKS) {
    const at = body.lastIndexOf("<footer");
    body = at === -1
      ? body + "\n  " + FOOTER_BLOCKS
      : body.slice(0, at) + FOOTER_BLOCKS + "\n  " + body.slice(at);
  }
  canonical = canonicalUrl(canonical);
  // Length safety net (2026-10-02, SEO chat). Google shows ~60 characters of a title and ~160
  // of a description. A title over 60 drops its "| DeepThought" suffix (the brand is already in
  // the URL and the result's site name). A description over 160 is cut at the last sentence or
  // word boundary that fits. Pages that set their own short copy are untouched.
  if (title && title.length > 60 && / \| DeepThought$/.test(title)) title = title.replace(/ \| DeepThought$/, "");
  if (description && description.length > 160) {
    const cut = description.slice(0, 160);
    const end = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "));
    description = end > 90 ? cut.slice(0, end + 1) : cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:—–-]+$/, "") + "…";
  }
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
<meta name="facebook-domain-verification" content="tvqcov6zwybriz40h11vvolpgs5s3x">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
<link rel="icon" type="image/png" href="/favicon-192x192.png" sizes="192x192">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="${ogType}">
<meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="DeepThought">
<meta property="og:image" content="${image ? `${SITE}/${image}` : `${SITE}/og-image.png`}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(imageAlt || "DeepThought: Better ads. Fraction of the cost.")}">
<meta name="twitter:card" content="summary_large_image">
<meta name="robots" content="${noindex ? "noindex,follow" : "index,follow"}">
${ld}
${ANALYTICS}${CHAT}
${helmet}
<style>${COMPONENT_CSS}
[data-hdr-drawer]{display:none}
html[data-nav-open] [data-hdr-drawer]{display:block}
/* 2026-10-02: the header (logo, 7 links, Log in, phone, Second Opinion button) needs ~1,260px.
   Between 1025 and 1279px the button was cut off, so those widths use the menu drawer too. */
@media (min-width:1025px) and (max-width:1279px){
  [data-hdr-bar]{padding-left:20px!important;padding-right:20px!important;gap:16px!important}
  [data-hdr-nav],[data-hdr-actions]{display:none!important}
  [data-hdr-toggle]{display:flex!important}
  html[data-nav-open] [data-hdr-drawer]{display:block!important}
}</style>
</head>
<body>
${body}
${NAV_SCRIPT}
${MOBILE_BAR}
${LEAD_SCRIPT}
</body>
</html>
`;
}

/**
 * Google Tag Manager (GTM-KFDRCF2X, which carries GA4 G-GTDGM2MZT8) plus form-submit and
 * thank-you conversion events. analytics.js comes from site.zip and is copied with the assets.
 *
 * The browser-assembled pages loaded it; the static rebuild on 2026-09-15 dropped the tag, and
 * the site ran with no analytics until 2026-09-26. verify.mjs now fails the build if any
 * page is missing it.
 */
const ANALYTICS = `<script src="analytics.js" async></script>`;

/**
 * Website chat bubble (build/static/chat.js), added 2026-10-01. Off until aeo-data.json
 * "chat.endpoint" holds the chat relay's URL (chat-worker/, deployed to Cloudflare). The
 * script waits for page load + 1.5s before drawing anything, so it doesn't touch page speed.
 */
const CHAT = AEO.chat?.endpoint ? `\n<script src="chat.js" data-endpoint="${esc(AEO.chat.endpoint)}" defer></script>` : "";

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
