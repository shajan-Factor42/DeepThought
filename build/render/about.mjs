/**
 * about.mjs — the About page (2026-10-04).
 *
 * Replaces the site.zip About copy, which still said "Pricing should be published" and
 * advertised open roles. The new page tells how DeepThought started and introduces the
 * founder, Shajan Thomas, with his photo. Noindex by Shajan's request.
 *
 * The photo lives at build/static/founder-shajan-thomas.jpg. Until that file exists the page
 * shows his initials instead, so the build never ships a broken image.
 */
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const PHOTO = "founder-shajan-thomas.jpg";
const HAS_PHOTO = existsSync(fileURLToPath(new URL(`../static/${PHOTO}`, import.meta.url)));

const FOUNDER = { name: "Shajan Thomas", title: "Founder & CEO" };

const photo = HAS_PHOTO
  ? `<img src="${PHOTO}" alt="${FOUNDER.name}, ${FOUNDER.title} of DeepThought" width="320" height="320" loading="eager" style="display:block; width:100%; height:auto; aspect-ratio:1/1; object-fit:cover; border-radius:20px">`
  : `<div aria-hidden="true" style="width:100%; aspect-ratio:1/1; border-radius:20px; background:var(--f42-gradient-brand); display:flex; align-items:center; justify-content:center; color:#fff; font-family:var(--font-display); font-size:72px; font-weight:800">ST</div>`;

const BODY = `<section style="max-width:900px; margin:0 auto; padding:88px 40px 32px">
  <div style="font-size:12.5px; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; color:var(--text-muted)">About us</div>
  <h1 style="font-family:var(--font-display); font-size:52px; font-weight:800; letter-spacing:-0.035em; line-height:1.05; margin:18px 0 0; text-wrap:pretty">Professional advertising for local businesses, without the agency bill</h1>
</section>

<section style="max-width:900px; margin:0 auto; padding:24px 40px 56px">
  <div style="font-size:17px; line-height:1.7; color:var(--text-body)">
    <h2 style="font-family:var(--font-display); font-size:30px; font-weight:800; letter-spacing:-0.02em; margin:0 0 20px; color:var(--text-heading)">How DeepThought started</h2>
    <figure class="dt-founder" style="float:left; width:220px; margin:6px 28px 12px 0">
      ${photo}
      <figcaption style="margin-top:12px; line-height:1.4">
        <div style="font-family:var(--font-display); font-size:18px; font-weight:800; color:var(--text-heading)">${FOUNDER.name}</div>
        <div style="font-size:14px; color:var(--text-muted); margin-top:2px">${FOUNDER.title}, DeepThought</div>
      </figcaption>
    </figure>
    <p style="margin:0 0 16px">DeepThought started with a simple frustration. Shajan spent years behind the scenes in digital advertising, running campaigns for agencies and media companies. He saw the same thing again and again: small businesses paying agency retainers, with too little of their budget reaching actual customers.</p>
    <p style="margin:0 0 16px">So he built DeepThought to give local businesses the same professional advertising, all in one place, at a fraction of the cost. Our AI recommends the channels, budget and audiences and drafts the ads. Our team runs the media. You approve; we run it.</p>
    <p style="margin:0">DeepThought is based in Gwinnett County, Georgia, and serves businesses across the US.</p>
    <div style="clear:both"></div>
  </div>
  <style>@media (max-width:620px){.dt-founder{width:140px !important; margin:4px 18px 8px 0 !important}}</style>
</section>

<section style="max-width:900px; margin:0 auto; padding:8px 40px 56px">
  <h2 style="font-family:var(--font-display); font-size:30px; font-weight:800; letter-spacing:-0.02em; margin:0 0 20px; color:var(--text-heading)">How we work</h2>
  <div style="display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:20px">
    <div style="background:var(--f42-white); border:1px solid var(--border-subtle); border-radius:16px; padding:22px">
      <div style="font-family:var(--font-display); font-size:18px; font-weight:700; color:var(--text-heading)">We run the media</div>
      <p style="font-size:15px; line-height:1.6; margin:8px 0 0">Search, social, streaming TV and more across 22 ad products, planned, bought and managed by our team.</p>
    </div>
    <div style="background:var(--f42-white); border:1px solid var(--border-subtle); border-radius:16px; padding:22px">
      <div style="font-family:var(--font-display); font-size:18px; font-weight:700; color:var(--text-heading)">A fraction of the cost</div>
      <p style="font-size:15px; line-height:1.6; margin:8px 0 0">A fraction of a comparable agency retainer, month to month, with no long-term contract.</p>
    </div>
    <div style="background:var(--f42-white); border:1px solid var(--border-subtle); border-radius:16px; padding:22px">
      <div style="font-family:var(--font-display); font-size:18px; font-weight:700; color:var(--text-heading)">Plain-English reports</div>
      <p style="font-size:15px; line-height:1.6; margin:8px 0 0">You see what you spent and what came back, without the jargon. A named marketing expert on every account.</p>
    </div>
  </div>
</section>

<section style="max-width:900px; margin:0 auto; padding:0 40px 88px">
  <div style="background:var(--f42-bg); border:1px solid var(--border-subtle); border-radius:20px; padding:32px; display:flex; flex-wrap:wrap; gap:20px; align-items:center; justify-content:space-between">
    <div style="flex:1 1 320px">
      <div style="font-family:var(--font-display); font-size:24px; font-weight:800; color:var(--text-heading)">Want a straight answer on your marketing?</div>
      <p style="font-size:16px; line-height:1.6; margin:8px 0 0">Send three details and we'll call you back. Or call <a href="tel:+17702999583" style="color:var(--color-accent); font-weight:600">770-299-9583</a>.</p>
    </div>
    <a href="second-opinion.html" data-lead-cta="about" style="display:inline-flex; align-items:center; height:48px; padding:0 24px; border-radius:12px; background:var(--f42-gradient-button); color:#fff; font-weight:700; text-decoration:none; white-space:nowrap">Get a free Second Opinion</a>
  </div>
</section>`;

/** Swap the site.zip About sections (hero through the hiring block) for the new page. */
export function aboutPage(html) {
  const start = html.indexOf('<section style="max-width:900px; margin:0 auto; padding:88px 40px 56px">');
  const roles = html.indexOf("See open roles");
  const end = roles === -1 ? -1 : html.indexOf("</section>", roles);
  if (start === -1 || end === -1) throw new Error("about: page sections not found — site.zip changed");
  return html.slice(0, start) + BODY + html.slice(end + "</section>".length);
}

export function aboutJsonLd(site) {
  return {
    "@context": "https://schema.org", "@type": "AboutPage", url: `${site}/about.html`,
    mainEntity: { "@id": `${site}/#organization` },
    about: {
      "@type": "Person", name: FOUNDER.name, jobTitle: FOUNDER.title,
      worksFor: { "@id": `${site}/#organization` },
      ...(HAS_PHOTO ? { image: `${site}/${PHOTO}` } : {}),
    },
  };
}
