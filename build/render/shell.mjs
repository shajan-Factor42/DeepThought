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
 * anyone in nor stood out. It becomes the primary call to action, pointing at the app, and
 * "Book a demo" steps down to the outline treatment so there is one obvious thing to click
 * rather than two buttons competing.
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

function applyHeaderCta(tpl) {
  let html = tpl;

  const signIn = '<a href="contact.html" style="font-size:14.5px; font-weight:600; color:var(--f42-primary-blue); text-decoration:none; white-space:nowrap">Sign in</a>';
  if (!html.includes(signIn)) throw new Error("SiteHeader: Sign in link not found — site.zip changed");
  html = html.replace(signIn, CTA_DESKTOP);

  const demoBtn = '<x-import component-from-global-scope="Factor42DesignSystem_376e18.Button" variant="primary" size="sm" hint-size="120px,36px">Book a demo</x-import>';
  if (!html.includes(demoBtn)) throw new Error("SiteHeader: desktop demo button not found — site.zip changed");
  html = html.replace(demoBtn, demoBtn.replace('variant="primary"', 'variant="subtle"'));

  const drawerDemo = '<a href="book-a-demo.html" style="display:block; margin-top:14px; text-align:center; font-size:16px; font-weight:600; color:#fff; text-decoration:none; background:var(--f42-gradient-blue); border-radius:12px; padding:15px 20px; box-shadow:0 10px 24px rgba(0,102,255,0.22)">Book a demo</a>';
  if (!html.includes(drawerDemo)) throw new Error("SiteHeader: drawer demo button not found — site.zip changed");
  const drawerDemoSubtle = drawerDemo
    .replace("color:#fff", "color:var(--text-heading)")
    .replace("background:var(--f42-gradient-blue)", "background:var(--f42-white); border:1px solid var(--border-subtle)")
    .replace("box-shadow:0 10px 24px rgba(0,102,255,0.22)", "box-shadow:var(--shadow-sm)")
    .replace("margin-top:14px", "margin-top:10px");
  html = html.replace(drawerDemo, CTA_DRAWER + "\n        " + drawerDemoSubtle);

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
    partials: { SiteHeader: applyHeaderCta(templateFrom(headerSrc)), SiteFooter: templateFrom(footerSrc) },
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
  const blocks = (Array.isArray(jsonld) ? jsonld : [jsonld]).filter(Boolean);
  const ld = blocks
    .map((b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`)
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
