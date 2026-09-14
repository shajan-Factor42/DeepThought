# deepthought.marketing — homepage outage: diagnosis and fix

Repo: `github.com/shajan-Factor42/DeepThought` · Branch: `main` · Host: GitHub Pages
Diagnosed 2026-09-13 against commit `ee31845`.
**Rebuilt and re-verified 2026-09-14.** `HEAD` is still `ee318455e1ab55b9b14181b4a8671561b5f29e20`
(Fri 11 Sep 16:51 EDT), so nothing has moved and the diagnosis below still holds exactly.

---

## 1. What broke

**Commit `ee31845` — Fri 2026-09-11 16:51:48 -0400 — "Add prerender step to deploy workflow."**

That commit added a step to `.github/workflows/deploy-zip.yml` called *Overlay repo-root
overrides*, which copies the repo-root `index.html` over the one unpacked from `site.zip`.

Those two files are different kinds of artifact:

| | repo-root `index.html` | `site.zip` → `dist/index.html` |
|---|---|---|
| What it is | design-tool **source** | build **output** |
| Page links | `Product.dc.html`, `Pricing.dc.html`, `Book a Demo.dc.html` | `product.html`, `pricing.html`, `book-a-demo.html` |
| Images | `assets/*.webp` | `assets/*.png` |
| Stylesheet | `ds-tokens.css` | (not referenced) |

`site.zip` contains **zero** `.webp` files and none of the `.dc.html` page names. So the
moment the overlay step went live, every link and image on the home page 404'd at once.

The `.dc.html` links have been in the repo-root `index.html` since at least 2026-08-31.
They were harmless until Sep 11, because nothing was copying that file into the deploy.

**Confirmed broken references (12):**

```
Book a Demo.dc.html          assets/atlanta.webp
Pricing.dc.html              assets/platform-3.webp
Product.dc.html              assets/platform-4.webp
ds-tokens.css                assets/platform-5.webp
assets/ai-agent.webp         assets/platform-6.webp
assets/ai-smart-channel.webp
assets/ai-summary.webp
```

## 2. What is NOT broken

The rest of the site deployed fine and is live. This is a home-page-only failure — a dead
end sitting in front of a working site.

- **3,381 HTML pages** are deployed, including `product.html`, `pricing.html`,
  `book-a-demo.html`, `about.html`, `contact.html`, `case-studies.html`, `faq.html`,
  the four `solutions-*.html` pages, `georgia-counties.html`, and ~3,000 county pages.
- **`digital-marketing-gwinnett-county-ga.html` exists and is live.**
- **`robots.txt`, `llms.txt`, `sitemap.xml`** all exist, plus split sitemaps for core,
  counties, states, and blog.
- **The real URL scheme is clean** — lowercase, hyphenated, no spaces. The ugly
  `.dc.html` names only ever existed in the stale source file.

---

## 3. The fix — seven files

### 3.1 `.github/workflows/deploy-zip.yml` (replace)

- **`index.html` removed from the overlay list.** This alone restores the home page.
- **New step: "Sync visible FAQ from aeo-data.json"** (see §3.3).
- **New gate: "Verify home page links resolve."** Every local `href`/`src` on the home
  page must point at a file that exists, or the build fails. Verified against both
  states: 0 missing on the zip's index, 12 missing on the current broken one. This is
  the step that would have caught this on Sep 11.
- **New gate: "Verify no hidden crawler-only text."** Fails if any page still carries a
  `clip:rect(0 0 0 0)` block. See §4.
- **New gate: "Verify visible FAQ matches FAQPage schema."** Counts `<details>` against
  `Question` nodes and fails if they disagree.

### 3.2 `build/prerender.mjs` (replace)

`staticBlock()` now emits a `<noscript>` fallback instead of a visually clipped `<div>`.
Added `LEGACY_STATIC`, which strips any old clipped block before writing the new one, so a
re-exported `site.zip` can't reintroduce hidden text.

Because `_site` is rebuilt from `site.zip` on every run, **this one change fixes all 3,381
pages on the next deploy.** Nothing needs migrating.

### 3.3 `build/faq-sync.mjs` (new)

Renders the visible home page FAQ from `build/aeo-data.json` — the same file that feeds the
FAQPage JSON-LD. Runs before `prerender.mjs`.

This is the answer to "the page shows 4, the schema declares 6." Fixing it by hand in
`index.html` would repeat the mistake in §1, so instead both outputs now read one source
and cannot diverge. Add or reword an FAQ in `aeo-data.json` and the page and the schema
both update on the next build.

It replaces the whole `<section id="faq">` body with native `<details>`/`<summary>`:

- no `{{ toggle0 }}` / `{{ sign0 }}` template holes reaching served HTML (16 removed)
- no component runtime needed, so it works with JavaScript disabled
- keyboard accessible by default
- every answer sits in the raw HTML where answer engines read it
- styling matched to the original cards, including the `+` / `−` indicator and hover border

Guards: it fails the build if `#faq` is missing, unterminated, or ever gains a nested
`<section>` that would make the splice truncate the page.

### 3.4 `build/social-links.mjs` (new)

Writes visible, crawlable links to every profile in `organization.sameAs` into the served
HTML, on all 349 pages that carry the footer component. (The ~3,000 generated county stubs
have no footer and are skipped.)

`sameAs` claims "these profiles are me." That claim is corroborated in both directions or
not at all, and before this the site linked to none of them — not one outbound social link
in the served HTML anywhere.

It could not go in the footer. `SiteFooter` is a `<dc-import>` component rendered
client-side, so links placed inside it look right in a browser and are invisible to any
crawler that doesn't run JS. This injects real anchors immediately above the component,
carrying `rel="me"` — the identity relation, the visible counterpart of the `sameAs` claim.

Idempotent: re-running reports `already present` and changes nothing.

### 3.5 `overrides/assets/logo.png` (new)

`organization.logo` publishes `https://deepthought.marketing/assets/logo.png`, and that file
did not exist anywhere — not in `site.zip`, not in the repo. Google uses this field for the
knowledge panel and silently discards a 404, so the Organization schema has been carrying a
dead reference.

The file cannot go in `site.zip` (design-tool export) or in repo-root `assets/` (never
deployed). It goes in `overrides/assets/`, which the existing overlay step already copies
into `_site`. Supplied: the brand lockup at 1568×420, well over Google's 112px minimum.

A new gate, "Verify Organization logo resolves," reads `organization.logo` and fails the
build if the file isn't there.

### 3.6 `build/brand-normalize.mjs` (new)

Collapses every brand-name variant in page schema onto one entity. Runs after
`prerender.mjs`.

An audit of the deployed pages found **five** strings naming the same company:

| String | Where |
|---|---|
| `DeepThought` | home page schema, site copy, the wordmark |
| `Deep Thought` | hero copy ("Deep Thought executes") |
| `DeepThought Marketing` | 3,239 county and state pages (`provider.name`) |
| `Deep Thought Marketing` | 111 further nodes, and the Google Business Profile |
| `Deep Thought Digital Marketing` | the Facebook page |

The county pages each declared their own inline `Organization` inside `provider` — 3,350
loose organizations that happen to share a URL, rather than one organization referenced
3,350 times. Every one is now a reference:

```json
"provider": { "@id": "https://deepthought.marketing/#organization" }
```

The name is stated once, in `aeo-data.json`, and every page resolves to the same entity.
Matching is done on a squashed form (lowercase, alphanumerics only), so spacing and case
variants all collapse together. Nodes whose name is *not* a declared variant are left
untouched — a provider that is genuinely a different company must never be silently renamed.

A gate, "Verify one brand entity," fails the build if any page reintroduces an inline
organization under a variant spelling.

**Result (2026-09-14 run):** 3,449 nodes rewritten across 3,350 pages; 0 inline brand-name
nodes remaining. Some pages carried more than one foldable node, which is why the node count
runs ahead of the page count. Five declared variants squash to three distinct match keys, so
all five collapse together.

A page that does not carry the canonical `#organization` definition is skipped rather than
folded, so this can never leave a page holding a reference to an entity it never defines.

### 3.7 `build/aeo-data.json` (replace)

Two changes, both to the FAQ answers only — everything else is byte-identical.

The file was written ASCII-only, which was fine when it only fed JSON-LD. Now it renders
on the page, so the five answers containing `-` separators, `350 USD`, `750 USD`, and
`10 to 20 percent` were rewritten as em dashes, `$350`, `$750`, and `10–20%`.

`pricing.summary` still uses the ASCII forms. That string is schema-only and never renders,
so it was left alone — but worth aligning if you touch the file.

---

## 4. The hidden-text problem

`prerender.mjs` was writing this into every page:

```html
<div id="aeo-static" style="position:absolute; width:1px; height:1px;
  overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; border:0">
```

That is the screen-reader-only clip pattern used to serve a full duplicate of the page's
text — including an extra `<h1>` — to crawlers while withholding it from visitors. That is
what Google's spam policy on hidden text describes, and it was applied site-wide.

The `<noscript>` version does the same job legitimately: non-JS clients (including GPTBot,
ClaudeBot, PerplexityBot) get readable prose, JS clients never render it, and nothing is
concealed from anyone who can see the page.

**Better long-term option:** true prerendering — write the painted `<body>` back to disk
and let the component runtime hydrate over it. The current script deliberately avoids this
to keep `<x-dc>` interactive. `<noscript>` is a safe stopgap, not the strongest signal.

---

## 5. `organization.sameAs`

**Populated and canonicalised 2026-09-13.** Four confirmed profiles:

```json
"sameAs": [
  "https://www.facebook.com/DeepThoughtDigitalMarketing/",
  "https://www.instagram.com/deepthoughtmarketing/",
  "https://nextdoor.com/page/deepthoughtmarketing-dacula-ga",
  "https://www.google.com/maps/place/?q=place_id:ChIJjz4zyebr9YgR6fb9SILesk4"
]
```

The Nextdoor Business Page is geo-bound to Dacula, so it corroborates the Gwinnett claim and
not merely the brand — the only entry besides the GBP that does.

The Google entry was supplied as a `share.google` shortener and then as a full Maps URL with
session tracking parameters (`entry=ttu&g_ep=...`). Both resolve; neither is stable. It is
now in the canonical `place_id` form, which is what the entity graph keys on. For reference
the CID is `5670839531964593897` (from `0x4eb2de8248fdf6e9` in the original URL) — the
equivalent `https://maps.google.com/?cid=` form works too.

Verified end to end: the emitted Organization node carries all four on every page, and
`social-links.mjs` renders the same four as visible `rel="me"` anchors.

**Still to add as they come online:** LinkedIn company page, a Factor42 page naming
DeepThought, Clutch or G2, Crunchbase, YouTube. Only add profiles that resolve and link back.

### Name consolidation

Settled 2026-09-13. Both of the names you named are kept, in the two schema fields that
exist for exactly this:

```json
"name":          "DeepThought",
"legalName":     "Deep Thought Digital Marketing",
"alternateName": [
  "Deep Thought",
  "Deep Thought Digital Marketing",
  "Deep Thought Marketing",
  "DeepThought Marketing"
]
```

**`name` is "DeepThought"** — one word, matching the wordmark and the domain. It is the most
distinctive of the five strings, and distinctiveness is the whole job here. "Deep Thought
Marketing" is an exact match for deepthoughtmarketing.com; "Deep Thought Digital Marketing"
*contains* that collision as a substring. "DeepThought" contains neither.

**`legalName` is "Deep Thought Digital Marketing"** — the long form, matching the Facebook
page and available for business listings and directories.

**`alternateName` carries the rest** so that historical references and third-party citations
under any spelling still resolve to this entity rather than a competitor's.

`prerender.mjs` now emits `legalName` alongside `name` and `alternateName`, on every page.

To change the canonical name later, edit `organization.name` in `aeo-data.json` and rebuild.
Nothing else needs touching — that is the point of the normalizer.

### The Google Business Profile

Looked up against the place ID you supplied:

- **Listed name: "Deep Thought Marketing"**
- **Address: 1531 Grove Arbor Ct, Dacula, GA 30019**
- **Phone: 770-654-2216**
- No reviews or rating yet; hours set to open 24 hours

**Dacula is in Gwinnett County.** The GBP already anchors the brand to the exact market this
whole effort targets — the strongest local signal available, and it is live.

**The listed name is the one collision you most want to avoid.** Renaming it to "DeepThought"
would align it with the site and the schema. Two things to weigh first:

1. Google's naming policy requires the listing to use the real-world business name as it
   appears on signage, the site, and stationery. "DeepThought" is defensible — it is the
   wordmark and the domain. A name with added keywords that is not the actual business name
   can be corrected or suspended by Google, so whichever you choose should be a name you
   actually trade under.
2. The listing has no reviews yet. That makes now the cheapest possible moment to rename —
   there is nothing to protect, and the change gets harder once citations accumulate.

## 5b. Service area — counties

**Nothing to build. This already works, and it is already right.**

`organization.areaServed` stays `Country: United States`, as you asked. Sub-areas are not
declared there — they are declared per page, which is the correct architecture:

- **3,141 county pages** each carry a `Service` node with its own
  `areaServed: { "@type": "AdministrativeArea", "name": "<County>, <State>" }`
- Spot-checked across the set: Addison County, Vermont · Calhoun County, Texas ·
  Buena Vista County, Virginia · Fauquier County, Virginia · Gwinnett County, Georgia

That is one county per page, each on the URL that targets it — exactly the shape a search
engine or an answer engine wants to read.

**Enumerating all 3,141 counties on the Organization node would be a mistake**, and worth
being explicit about since it is the intuitive move. It would add roughly a quarter of a
megabyte of JSON-LD to *every page on the site*, including pages that have nothing to do with
local service. It buys no ranking benefit — exhaustive `areaServed` lists are not a signal —
and a national company claiming every county in one node reads as boilerplate rather than as
a service footprint. The per-page version makes a specific, checkable claim on a page with
matching content behind it. That is what gets cited.

What the county pages were missing was not the area — it was the identity. Every one of them
named a slightly different company as the provider. That is what §3.6 fixes.

## 6. Deploy checklist

1. Replace `.github/workflows/deploy-zip.yml`
2. Replace `build/prerender.mjs`
3. Add `build/faq-sync.mjs`
4. Add `build/social-links.mjs`
5. Add `overrides/assets/logo.png`
6. Add `build/brand-normalize.mjs`
7. Replace `build/aeo-data.json`
8. Commit and push to `main` — the workflow runs on push
9. Watch the Actions log for:
   - `faq-sync: 6 entries written` / `template holes removed: 16`
   - `social-links: 4 profile(s)` / `injected 349`
   - `organization.logo resolves: assets/logo.png`
   - `brand-normalize: ... nodes rewritten 3449` (pages rewritten 3350)
   - `inline brand-name nodes remaining: 0`
   - `all home page references resolve`
   - `no clipped crawler-only blocks`
   - `visible FAQ entries: 6 / schema Question nodes: 6`
   - `legacy blocks removed <n>`
10. Verify live: home page renders with images, `/product.html`, `/pricing.html`,
   `/book-a-demo.html` reachable from it, six FAQ entries visible and expandable,
   social links present above the footer
11. Re-submit `sitemap.xml` in Search Console and Bing Webmaster Tools
12. Run the Rich Results Test on the home page to confirm FAQPage and Organization validate

**Optional cleanup:** delete the repo-root `index.html`. It is now dead weight that looks
authoritative and caused this outage. If you keep it, the workflow prints a note that it
exists and is not deployed.

**Verified locally on 2026-09-14** by running the full pipeline against the real `site.zip`:
unzip → overlay → faq-sync → social-links → simulated JSON-LD → brand-normalize → all six
gates, over all 3,381 pages.

| Check | Result |
|---|---|
| `faq-sync` | 6 entries written, 16 template holes removed, 6 `<details>` |
| `social-links` | 4 profiles, injected on 349 pages, 3,032 skipped (no footer) |
| `brand-normalize` | 3,350 pages rewritten, 3,449 nodes, 0 remaining |
| Home page links resolve | 22 local references checked, 0 missing |
| Hidden crawler-only text | 0 pages |
| Visible FAQ vs schema | 6 = 6 |
| Organization logo | `assets/logo.png` resolves |
| Idempotency | second `social-links` run injected 0, reported 349 already present |

**Negative test.** The link gate was then run against a `_site` with the repo-root
`index.html` overlaid — the exact `ee31845` state. It failed with all 12 broken references,
naming them individually: the three `.dc.html` pages, `ds-tokens.css`, and eight `assets/*.webp`
files. This gate would have caught the outage on the commit that caused it.

Two limits on the local run. `prerender.mjs` is syntax-checked and its schema builders were
executed verbatim, but Puppeteer itself was not run — that needs Chromium. And because the
simulation reads unpainted HTML, only the 350 pages with server-side text produced a
`<noscript>` block locally; in the real build every page paints first, so all of them will.
The logo file was opened and inspected before shipping: it is the real 1568×420 wordmark, not
one of the blank placeholder PNGs found in the same asset batch.

---

## 7. Still open

- **Renaming the Google Business Profile** is an open decision — see §5.
- **NAP is not published anywhere on the site.** The GBP carries a verified name, address,
  and phone. Matching NAP on the site is standard local-SEO corroboration — but the address
  is residential. If the GBP is set up as a service-area business with the address hidden,
  publish the phone and service area and leave the street address off. Needs a decision
  before anything is added to schema.
- **The GBP has no reviews.** For a local service entity, review volume is a large part of
  what makes a listing citable. Worth a deliberate push.
- **Unverified social proof on the home page** — the Marcus Whitfield / Whitfield Plumbing
  testimonial with a 31% figure, and six named client logos. If these are placeholders they
  need to come out before any push for visibility. Testimonials with performance claims fall
  under FTC endorsement rules.
- **`{{ }}` holes on other pages.** faq-sync only touches the home page FAQ. Other templates
  still leak; the `<noscript>` fallback carries the content, but the literal braces remain in
  served markup. Worth an audit pass.
