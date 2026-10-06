# DeepThought website decisions

Every design, content and technical decision for deepthought.marketing: what, why, and when.
Every change is checked against this file before it's built. If a request conflicts with an entry
here, stop and raise it with Shajan; don't pick one. Newest decisions win over older ones;
superseded entries stay, marked as such, so the history is clear.

Owner: website chat (technical lead, final check before anything goes live).
SEO and CRO chats recommend; changes reach `main` only through the website chat, with Shajan's OK.

---

## Brand and voice

| Date | Decision | Why |
|---|---|---|
| 2026-09-29 | Brand is written **DeepThought** (one word) everywhere. Only the legal name "Deep Thought Digital Marketing" and the schema `alternateName` list keep two words. Enforced by a verify gate. | One consistent name for people, search engines and AI. |
| 2026-09-26 | Legal entity on Terms and Privacy: **Deep Thought Digital Marketing**. | Registered name. |
| 2026-09-14 | Factor42 is not mentioned on the site, in copy or schema. The white-label relationship is not cited publicly. | The two brands read as unconnected. |
| 2026-09-26 | Hero headline: **"Better ads. Fraction of the cost."** Slogan is the same. | Supersedes "Half the agency bill" (2026-09-25). |
| 2026-10-01 | Two core messages: **"All your digital marketing in one place"** and **"Same results, much lower cost"** (cutting out middlemen). | Matches the two buyer types: overwhelmed owners and current agency clients. |
| 2026-09-26 | Positioning: DeepThought **runs the media for clients** (done-for-you). "We run the media. You approve; we run it." Not self-serve software. | Accurate to the service. |
| 2026-09-25 | AI angle: our AI recommends channels, budget and audiences, drafts ad creative, and writes plain-English reports. | Confirmed product capabilities. |
| 2026-09-17 | **No prompt-to-campaign claims** ("describe the promotion", "prompt to live", "you direct; DeepThought executes"). Enforced by a verify gate. | The app can't build campaigns from a typed prompt. |
| 2026-09-21 | Timing wording: **"as soon as possible."** Never "60 seconds", "under a minute" or a day count. Enforced by a verify gate. | Supersedes "live as soon as tomorrow". |
| 2026-09-24 | Product lineup: **22 advertising products in 8 groups** (list in `build/aeo-data.json` → `products`). Never "30+ channels". | Confirmed lineup. |
| 2026-09-14 | **No testimonials, client logos or fabricated social proof.** County figures come from real sourced data only. Enforced by a verify gate. | Earlier quotes were placeholders. |
| — | Tone: plain, simple language for busy, non-technical owners. | Audience. |

## Pricing

| Date | Decision | Why |
|---|---|---|
| 2026-09-27 | Wording is **"a fraction of the cost"** of a comparable agency retainer, everywhere. Never "about half", "~50%". Enforced by a verify gate. | Supersedes the "about half" wording (2026-09-14). |
| 2026-10-02 | **"Less than half"** is approved as a variation of "a fraction of the cost" (used in the video ads). Site copy keeps "a fraction of the cost". | Shajan: same idea, different wording. |
| 2026-09-14 | **No published prices or rate card.** The number comes from a short call. $350 / $750 retired. Enforced by a verify gate. | Pricing varies by products run. |
| 2026-09-14 | Billing: media is covered inside the price, not billed on top. Month to month, no long-term contract. | Standard billing model. |
| 2026-09-26 | "Media is covered inside the price" appears **only** on the pricing page, pricing FAQs, the Gwinnett cost post, and the working media ratio post (added 2026-09-29). | Keep it where it answers a pricing question. |
| 2026-09-25 | Don't emphasize "runs in your own ad accounts" as a selling point. Ownership content stays neutral advice. | Messaging focus. |

## Contact and location

| Date | Decision | Why |
|---|---|---|
| 2026-09-24 | Phone: **770-299-9583**. 770-654-2216 is retired. Enforced by a verify gate. | New business line. |
| 2026-09-26 | **No street address shown.** Trust line: "Based in Gwinnett County, GA" (not Buford or Dacula). Schema keeps the address but hides the street line. | Home-based business. |
| 2026-10-01 | Audience: **starting with Gwinnett County and the I-85 corridor** (early focus: home services in metro Atlanta), **expanding quickly**. The service is nationwide. | Local start, national reach. |
| 2026-09-14 | **Keep all 3,141 county pages live** and indexed. Don't prune or noindex. | Local search coverage for expansion. |

## Design

| Date | Decision | Why |
|---|---|---|
| 2026-10-01 | **Keep the look and feel consistent** across the whole site: the current blue-to-cyan-on-white system (Plus Jakarta Sans for headings, Inter for body). No site-wide restyle. | Consistency; a restyle touches ~3,400 pages. |
| 2026-10-01 | Clean, light design: **no dark backgrounds.** Exceptions: the homepage hero's dark navy panel and the chat assistant's navy header stay as they are (decided 2026-10-01). | Brand direction; the hero is the existing signature look. |
| 2026-10-01 | meetlofi.com is **inspiration** for the feel of new work inside the current system: modeled on, never copied. | Brand direction. |
| 2026-09-14 | Visual separation from Factor42's design system (tokens, component names) is **parked**. | Not worth the risk yet. |
| — | Mobile first: most visitors are owners on phones. | Audience. |

## Pages and conversion

| Date | Decision | Why |
|---|---|---|
| 2026-09-26 | Homepage title: **"AI Paid Media Platform for Small Business \| DeepThought"** (SEO chat's pick over CRO chat's). | Search intent. |
| 2026-09-26 | County page titles: `Digital Marketing in {Place}, {State} \| DeepThought`. | Shorter, clearer. |
| 2026-09-26 | Book a demo uses a **Google Calendar booking link and embed**, not a form. "Pick a time. Get a straight answer." | Fewer steps to a call. |
| — | ~~Header CTA "Launch your Campaigns" points to the app at https://deepthought.adops.rocks/.~~ Superseded 2026-10-01 (below). | Primary product link. |
| 2026-10-01 | **Three ways to reach us on every page, form first (CRO, Shajan's pick "D").** 1) Main: "Free Second Opinion" short form (name, phone, business) on the home page and pricing page after the hero, and on its own page `second-opinion.html`. 2) Tap to call 770-299-9583, with a sticky Call / Second Opinion bar on phones. 3) "Book a call" (the Google Calendar page). Header: "Free Second Opinion" button; the app moves to a quiet "Log in" link. Home hero primary button now opens the form. Promise shown: reply within one business day. | Zero demos booked; the main button sent cold visitors to an app login. Three short fields beat a meeting booking for busy owners on phones. Gives Ad 5's "Get a free Second Opinion" a matching landing page. |
| 2026-10-01 | **Leads go to email plus a Google Sheet** ("DeepThought Leads" in Shajan's Drive) via a Google Apps Script web app (`build/leads/apps-script.gs`). URL in `aeo-data.json` → `leads.endpoint`. Live 2026-10-02. If it is ever emptied, the form falls back to the Web3Forms key the contact page uses. | Free, no new accounts, every lead lands in one place. |
| 2026-10-01 | Lead tracking events: `form_conversion` (thank-you page, `form=second_opinion`), `phone_click`, `booking_click`, `lead_cta_click`. Each needs a GA4 event tag in GTM; mark `form_conversion` and `phone_click` as key events. | GA4 couldn't see a single lead action. |
| 2026-10-02 | **HVAC landing page** `hvac-marketing-atlanta.html` (SEO chat): first trade page, Atlanta + Gwinnett, Service schema with 7 Gwinnett cities. Linked from the footer on every page, the Gwinnett county page and the home services post. | Best trade by search volume, click value and year-round demand. |
| 2026-10-02 | Guide pages' call-to-action button is "Get a free Second Opinion" (was "Book a demo"). | Matches the form-first decision. |
| 2026-10-02 | Copy kept as is: "Same results, much lower cost" and "A real person reviews it, not a robot". | Shajan's call. |
| 2026-10-05 | Blog posts support pipe tables (same look as guide tables). | The in-house vs agency post's comparison table was rendering as raw text. |
| 2026-10-04 | **About page stays indexed** with the site.zip copy. "Pricing should be published" reworded to "Pricing should be simple"; the "We're hiring" box became a **"Here's our story"** link to `our-story.html`. | Retired pricing claim; no open roles. |
| 2026-10-04 | **`our-story.html`**: how DeepThought started + founder **Shajan Thomas, Founder & CEO**, with photo inline in the story. **Noindex** (Shajan's request), linked only from About. No Factor42 mention. | Founder story without putting it in search results. |
| 2026-10-02 | Header uses the menu drawer below **1280px** (was 1024px). | With the Second Opinion button, phone and Log in, the header needs ~1,260px; the button was cut off on smaller laptops. |
| 2026-10-02 | On phones the chat bubble sits above the sticky Call / Second Opinion bar. | They overlapped. |
| 2026-10-06 | **Lead form quality (CRO).** Phone must be a 10-digit US number (area code can't start with 0 or 1; a leading +1 is fine); the form shows "Please enter a US phone number with area code". New optional Email field. Every lead now records how the visitor found us (this visit and their first visit, read from ad tags or the referring site: Google search, Facebook, Direct, ChatGPT…), the first page they saw, and their device time zone. Kept in the visitor's browser for 90 days; no cookies, no third party. The sheet gets six new columns after Notes; leads with a non-US phone or a non-US time zone arrive as "Check" with a [Check] email subject. | A 6 Oct lead left a foreign number (05… format, UAE/Saudi) with no email and no source, so it couldn't be followed up or judged. Required fields stay at three. |
| 2026-10-01 | CRO chat never pushes to GitHub. It prepares changes and hands them to the website chat, which reviews and pushes. | Shajan's rule. |
| 2026-09-29 | Pillar page: `digital-marketing-for-small-business.html`. Blog posts link to it. | Topic cluster for SEO. |
| 2026-10-01 | **Website chat assistant**: custom Claude-powered bot (Haiku 4.5) via a Cloudflare Worker relay, not Tidio/Crisp/Intercom. Knowledge rebuilt from `aeo-data.json` and `llms.txt` on every deploy. Off until `chat.endpoint` is set. | Cheapest to run, follows approved wording. |
| 2026-10-01 | **Chat conversations are logged** for 90 days (Cloudflare KV, no IP address) and a **daily digest email** of yesterday's chats goes out via Resend, booking clicks first. Privacy policy and chat footer say so. Digest goes to shajan@deepthought.marketing. | Learn what visitors ask; catch wrong answers. |

## Technical

| Date | Decision | Why |
|---|---|---|
| 2026-09-14 | Site is **server-rendered static HTML** built from `site.zip` + `content/` by `build/render/`, hosted on GitHub Pages. | Pages were assembling in the browser and invisible to crawlers. |
| 2026-09-14 | **One generated sitemap.** No hand-edited or split sitemaps. | Accuracy. |
| 2026-09-26 | **Analytics on every page**: GTM-KFDRCF2X carrying GA4. Enforced by a verify gate. | Was missing for 11 days after the rebuild. |
| 2026-09-26 | Retired claims are listed in `build/aeo-data.json` → `bannedClaims`; the build fails if any reappears. | Old copy survived for weeks unnoticed. |
| 2026-09-27 | IndexNow pings Bing and others on every deploy (key file in `overrides/`). | Faster indexing and AI search. |
| 2026-09-28 | Favicons and share image live in `build/static/`. Blog posts can set their own header and share image. | — |
| 2026-10-01 | All pushes to `main` go through the website chat with a pre-launch check and Shajan's OK. | One final check. |
| 2026-10-01 | Exception: updates to DECISIONS.md alone may be pushed without asking first. | They don't change what visitors see. |

## Open items

- Chat assistant: waiting on the three GitHub secrets (`ANTHROPIC_API_KEY`, `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`).
