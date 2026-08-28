# Push this site live on GitHub Pages

Everything in this folder is ready to upload. Two edits first, then three steps.

---

## Domain: deepthought.marketing

Already configured — canonical tags, Open Graph tags, `sitemap.xml` and `robots.txt` all
point at `https://deepthought.marketing`, and a `CNAME` file is included so GitHub Pages
picks up the custom domain automatically.

**DNS setup at your registrar** (do this once):

Apex domain `deepthought.marketing` → four A records:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Optional `www` → CNAME record pointing to `<username>.github.io`

---

## Step 1 — create the repo

1. github.com → **New repository**
2. Name it (e.g. `deepthought-site`), **Public**, no README, no .gitignore
3. Create repository

## Step 2 — upload

**Browser:** on the empty repo page click **uploading an existing file**, then drag in
*everything* in this folder — including the `_ds` and `assets` folders and the `.nojekyll`
file. Commit.

> If your OS hides dotfiles and `.nojekyll` won't drag: after uploading, click
> **Add file → Create new file**, name it `.nojekyll`, leave it empty, commit.

**Git:**

```
cd <this folder>
git init
git add .
git commit -m "DeepThought site v1"
git branch -M main
git remote add origin https://github.com/<username>/deepthought-site.git
git push -u origin main
```

## Step 3 — turn on Pages

Repo **Settings → Pages** → Source: **Deploy from a branch** → Branch `main`, folder
`/ (root)` → **Save**. Live in about a minute at
`https://<username>.github.io/deepthought-site/`.

### Custom domain

The included `CNAME` file sets `deepthought.marketing` automatically — you should see it
already filled in under Settings → Pages → Custom domain. Add the four A records above at
your registrar, then tick **Enforce HTTPS** once the certificate issues (a few minutes to
an hour after DNS propagates).

---

## What's in here

- `index.html` — home page (the landing page)
- `product.html`, `pricing.html`, `solutions.html`, `solutions-local-service.html`,
  `solutions-multi-location.html`, `solutions-agencies.html`,
  `serving-local-business.html`, `case-studies.html`, `blog.html`, `faq.html`,
  `about.html`, `book-a-demo.html`, `contact.html`
- `georgia-counties.html`, `florida-counties.html` — county directories
- **226 static county pages** — `digital-marketing-fulton-county-ga.html`,
  `digital-marketing-orange-county-fl.html`, … one file per county, each with its own
  title, meta description, canonical URL and Service schema (JSON-LD)
- `county.html` — the shared county template the 226 pages are built from
- `us-map.html` — clickable US map (embedded on `serving-local-business.html`)
- `sitemap.xml`, `robots.txt`, `.nojekyll`, `CNAME`
- `_ds/` — design system (tokens, styles, components). **Do not rename**; `.nojekyll`
  is what keeps GitHub from ignoring it
- `assets/` — images
- `support.js`, `counties.js`, `county-copy.js`, `image-slot.js` — runtime and content data
- `SiteHeader.dc.html`, `SiteFooter.dc.html` — shared header/footer, loaded by every page

## After it's live

1. **Google Search Console** — add the property, verify, submit `https://deepthought.marketing/sitemap.xml`
2. **Bing Webmaster Tools** — same
3. **Analytics** — paste your GA4 or Plausible snippet into each page's `<head>`
   (or ask me to add it everywhere in one pass)

## Still outstanding

- **Forms don't send.** `contact.html` and `book-a-demo.html` show a submitted state but
  post nothing. GitHub Pages can't process forms — use Formspree, Basin, or your CRM's
  endpoint.
- **County page text renders via JavaScript.** Google executes JS and will index it, but
  text present in the HTML source is stronger. The head tags, canonical and schema *are*
  in the source on all 226 pages.
- **Only 6 counties have unique copy** (Fulton, Cobb, Gwinnett, DeKalb, Chatham, Muscogee).
  The other 220 share a parameterized body — the duplicate-content risk on county pages.
- **Placeholder content:** case study metrics and names, blog posts, client logo wall,
  real customer photos. County testimonials and the county stats band are invented
  placeholders — replace before you rely on them.
- **Pricing shows wholesale rates.** Confirm those should be public.
