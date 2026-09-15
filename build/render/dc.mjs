/**
 * dc.mjs — static renderer for the design-tool templates.
 *
 * The site currently ships page shells that assemble themselves in the visitor's browser:
 * React runtime, `<x-dc>` templates, `{{ }}` holes filled on mount. That single choice is the
 * reason prerender.mjs, faq-sync.mjs and brand-normalize.mjs exist — they are all repairs for
 * content that isn't in the HTML.
 *
 * This renders the same templates on the server, so the HTML that ships is the finished page.
 *
 * It implements exactly what the templates use, nothing more:
 *   {{ expr }}                                interpolation, dotted paths
 *   <sc-for list="{{ xs }}" as="x"> … </sc-for>   loops, nestable
 *   <sc-if value="{{ x }}"> … </sc-if>            conditionals
 *   <x-import component-from-global-scope="NS.Button" …>  the four DS components
 *   <dc-import name="SiteHeader">                  partials
 *
 * The four components are ports of components/core/*.jsx from the design-system bundle,
 * with the React hover/press state replaced by CSS so no JavaScript is needed.
 */

const esc = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* ---------- design-system components (ported from _ds_bundle.js) ---------- */

const styleStr = (o) =>
  Object.entries(o)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}:${typeof v === "number" && !UNITLESS.has(k) ? v + "px" : v}`)
    .join("; ");

const UNITLESS = new Set(["fontWeight", "lineHeight", "opacity", "zIndex", "flex", "order"]);

const BUTTON_SIZES = {
  sm: { padding: "8px 14px", fontSize: 14, height: 36 },
  md: { padding: "11px 20px", fontSize: 15, height: 44 },
  lg: { padding: "14px 26px", fontSize: 16, height: 52 },
};

const BUTTON_VARIANTS = {
  primary: { background: "var(--f42-gradient-button)", color: "var(--text-on-brand)", boxShadow: "var(--shadow-button)" },
  secondary: { background: "var(--f42-primary-blue)", color: "var(--text-on-brand)" },
  ghost: { background: "transparent", color: "var(--color-accent)", border: "1px solid var(--border-subtle)" },
  subtle: { background: "var(--f42-white)", color: "var(--text-heading)", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-sm)" },
};

function Button(attrs, children, props) {
  const size = attrs.size || "md";
  const variant = attrs.variant || "primary";
  const s = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    fontFamily: "var(--font-body)", fontWeight: 600, lineHeight: 1,
    borderRadius: "var(--radius-button)", border: "1px solid transparent",
    cursor: "pointer", transition: "var(--transition-base)", whiteSpace: "nowrap",
    ...BUTTON_SIZES[size], ...(BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.primary),
  };
  if (attrs.fullwidth === "1" || attrs.fullWidth === "1") s.width = "100%";
  Object.assign(s, (props && props.style) || {});
  // rendered as a span: every call site in the templates already wraps it in an <a>,
  // and a <button> inside an <a> is invalid HTML that crawlers handle badly.
  return `<span class="ds-btn" style="${styleStr(s)}">${children}</span>`;
}

const CARD_VARIANTS = {
  solid: { background: "var(--f42-white)", border: "1px solid var(--border-subtle)" },
  glass: { background: "var(--glass-bg)", WebkitBackdropFilter: "var(--glass-blur)", backdropFilter: "var(--glass-blur)", border: "var(--glass-border)" },
};

function Card(attrs, children, props) {
  const padding = attrs.padding === undefined ? 24 : attrs.padding;
  const s = {
    borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-md)",
    transition: "var(--transition-base)",
    padding: /^\d+$/.test(String(padding)) ? Number(padding) : padding,
    ...(CARD_VARIANTS[attrs.variant] || CARD_VARIANTS.solid),
  };
  Object.assign(s, (props && props.style) || {});
  const cls = attrs.interactive === "1" ? "ds-card ds-card--interactive" : "ds-card";
  return `<div class="${cls}" style="${styleStr(s)}">${children}</div>`;
}

const BADGE_VARIANTS = {
  blue: { background: "var(--f42-blue-a12)", color: "var(--f42-deep-blue)" },
  neutral: { background: "var(--f42-slate-200)", color: "var(--f42-slate-700)" },
  success: { background: "rgba(31,138,91,0.12)", color: "#1f8a5b" },
  warning: { background: "rgba(214,151,42,0.16)", color: "#b8791a" },
  danger: { background: "rgba(224,65,76,0.12)", color: "#c8313c" },
  gradient: { background: "var(--f42-gradient-blue)", color: "#fff" },
};

function Badge(attrs, children, props) {
  const s = {
    display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px",
    fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, lineHeight: 1.4,
    borderRadius: "var(--radius-pill)", letterSpacing: "0.01em",
    ...(BADGE_VARIANTS[attrs.variant] || BADGE_VARIANTS.blue),
  };
  Object.assign(s, (props && props.style) || {});
  return `<span style="${styleStr(s)}">${children}</span>`;
}

function Input(attrs, children, props) {
  const s = {
    width: "100%", boxSizing: "border-box", height: 44, padding: "0 14px",
    fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-heading)",
    background: "var(--f42-white)", borderRadius: "var(--radius-input)",
    border: "1px solid var(--border-subtle)", outline: "none",
  };
  Object.assign(s, (props && props.style) || {});
  const t = attrs.type || "text";
  const ph = attrs.placeholder ? ` placeholder="${esc(attrs.placeholder)}"` : "";
  const nm = attrs.name ? ` name="${esc(attrs.name)}"` : "";
  return `<div style="position:relative; display:flex; align-items:center; width:100%"><input type="${esc(t)}"${nm}${ph} style="${styleStr(s)}"></div>`;
}

const COMPONENTS = { Button, Card, Badge, Input };

/** CSS replacing the React hover/press handlers the components used. */
export const COMPONENT_CSS = `
/* The design system never set a base font anywhere — not in the token CSS, not in the bundle,
   not in support.js. Anything without its own font-family, the whole top nav included, fell
   through to the browser default serif. */
body{font-family:var(--font-body)}

/* Form controls are the exception: browsers give <input>, <select>, <textarea> and <button>
   their own UA font rather than inheriting from body, so the booking and contact forms
   rendered in the system default while everything around them was Inter. */
input,select,textarea,button{font-family:inherit}

/* Button was a <button> in the original, which browsers give box-sizing:border-box via the UA
   stylesheet. It renders as a <span> here, because a <button> inside an <a> is invalid HTML —
   so without this the declared height and the padding add up instead of the padding sitting
   inside the height, and the button reads too tall and off-centre. */
.ds-btn{box-sizing:border-box}
.ds-btn{user-select:none}
a:hover .ds-btn{filter:brightness(1.04)}
a:active .ds-btn{transform:scale(0.98)}
.ds-card--interactive{transition:box-shadow .18s ease, transform .18s ease, border-color .18s ease}
.ds-card--interactive:hover{box-shadow:var(--shadow-lg); transform:translateY(-2px); border-color:var(--border-hover)}
`.trim();

/* ---------- expression resolution ---------- */

function resolve(expr, scope) {
  expr = expr.trim();
  if (expr === "true") return true;
  if (expr === "false") return false;
  if (/^-?\d+(\.\d+)?$/.test(expr)) return Number(expr);
  let cur = scope;
  for (const part of expr.split(".")) {
    if (cur == null) return undefined;
    cur = cur[part];
  }
  return cur;
}

/* ---------- balanced tag matching ---------- */

export function findBlock(html, tag, from = 0) {
  const open = new RegExp(`<${tag}\\b[^>]*>`, "g");
  open.lastIndex = from;
  const m = open.exec(html);
  if (!m) return null;
  const openTag = m[0];
  const start = m.index;
  let depth = 1;
  let i = start + openTag.length;
  const scan = new RegExp(`<${tag}\\b[^>]*>|</${tag}>`, "g");
  scan.lastIndex = i;
  let t;
  while ((t = scan.exec(html))) {
    depth += t[0].startsWith("</") ? -1 : 1;
    if (depth === 0) {
      return { start, openTag, inner: html.slice(start + openTag.length, t.index), end: t.index + t[0].length };
    }
  }
  throw new Error(`unterminated <${tag}>`);
}

const attrsOf = (tag) => {
  const out = {};
  for (const m of tag.matchAll(/([a-zA-Z0-9_:-]+)\s*=\s*"([^"]*)"/g)) {
    if (m[1].startsWith("hint-")) continue;
    out[m[1]] = m[2];
  }
  return out;
};

/* ---------- the renderer ---------- */

export function render(tpl, scope, partials = {}) {
  let html = tpl;

  // partials first, so their own loops and components render in this pass
  for (;;) {
    const b = html.match(/<dc-import\b[^>]*name="([^"]+)"[^>]*>\s*<\/dc-import>|<dc-import\b[^>]*name="([^"]+)"[^>]*\/?>/);
    if (!b) break;
    const name = b[1] || b[2];
    const partial = partials[name];
    if (partial === undefined) throw new Error(`unknown partial: ${name}`);
    html = html.slice(0, b.index) + partial + html.slice(b.index + b[0].length);
  }

  // loops — outermost first, recursing into the body per item
  for (;;) {
    const blk = findBlock(html, "sc-for");
    if (!blk) break;
    const a = attrsOf(blk.openTag);
    const listExpr = (a.list || "").replace(/^\{\{|\}\}$/g, "").trim();
    const as = a.as || "item";
    const list = resolve(listExpr, scope);
    const items = Array.isArray(list) ? list : [];
    let out = "";
    for (const item of items) out += render(blk.inner, { ...scope, [as]: item }, partials);
    html = html.slice(0, blk.start) + out + html.slice(blk.end);
  }

  // conditionals
  for (;;) {
    const blk = findBlock(html, "sc-if");
    if (!blk) break;
    const a = attrsOf(blk.openTag);
    const expr = (a.value || "").replace(/^\{\{|\}\}$/g, "").trim();
    const keep = Boolean(resolve(expr, scope));
    html = html.slice(0, blk.start) + (keep ? render(blk.inner, scope, partials) : "") + html.slice(blk.end);
  }

  // components
  for (;;) {
    const blk = findBlock(html, "x-import");
    if (!blk) break;
    const a = attrsOf(blk.openTag);
    const ref = a["component-from-global-scope"] || "";
    const name = ref.split(".").pop();
    const fn = COMPONENTS[name];
    if (!fn) throw new Error(`unknown component: ${ref}`);
    // dc-props carries a style override object from the page's scope (whiteBtn, ghostBtn…).
    // Ignoring it silently reverts buttons to their default variant on dark sections.
    const propExpr = (a["dc-props"] || "").replace(/^\{\{|\}\}$/g, "").trim();
    const props = propExpr ? resolve(propExpr, scope) : null;
    const inner = render(blk.inner, scope, partials);
    html = html.slice(0, blk.start) + fn(a, inner, props) + html.slice(blk.end);
  }

  // interpolation last
  html = html.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (m, expr) => {
    const v = resolve(expr, scope);
    if (v === undefined || v === null) return "";
    return typeof v === "string" ? v : esc(v);
  });

  return html;
}

/** Pull the <x-dc> body out of a .dc.html component file and drop the design-tool chrome. */
export function templateFrom(src) {
  const open = /<x-dc(?:\s[^>]*)?>/.exec(src);
  if (!open) {
    // A few pages are plain static markup with no design-tool wrapper. Use the body as-is.
    const b = /<body[^>]*>([\s\S]*?)<\/body>/i.exec(src);
    if (!b) throw new Error("no <x-dc> and no <body> in source");
    return b[1].replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").trim();
  }
  const close = src.lastIndexOf("</x-dc>");
  let body = src.slice(open.index + open[0].length, close);
  body = body.replace(/<helmet\b[^>]*>[\s\S]*?<\/helmet>/gi, "");
  return body.trim();
}

/** Everything inside <helmet>, which is where the templates keep their CSS links and <style>. */
export function helmetFrom(src) {
  const m = /<helmet\b[^>]*>([\s\S]*?)<\/helmet>/i.exec(src);
  return m ? m[1].trim() : "";
}

export { esc };
