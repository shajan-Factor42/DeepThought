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
| 2026-10-09 | Brand is **Deep Thought Marketing**; short form **Deep Thought** (two words) in running copy. Full name in the home title, schema `name`, `og:site_name`, logo text and copyright. One-word "DeepThought" survives only in URLs, handles and the schema `alternateName` list. Enforced by the build's brand pass and a verify gate. | Shajan: match what people search ("deep thought marketing") and the domain. Supersedes 2026-09-29. |
| 2026-10-09 | Logo wordmark carries the real name as hidden text ("Deep Thought Marketing"); the "deepth" + ring + "ught" pieces are hidden from screen readers and crawlers. | It read as "deepth ught". |
| 2026-09-29 | ~~Brand is written **DeepThought** (one word) everywhere. Only the legal name "Deep Thought Digital Marketing" and the schema `alternateName` list keep two words. Enforced by a verify gate.~~ Superseded 2026-10-09. | One consistent name for people, search engines and AI. |
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
| 2026-10-09 | Homepage title: **"Deep Thought Marketing \| AI Ad Management for Small Business"** (brand first). Page title suffix is now " \| Deep Thought". | Brand search. Supersedes 2026-09-26. |
| 2026-09-26 | ~~Homepage title: **"AI Paid Media Platform for Small Business \| DeepThought"**~~ Superseded 2026-10-09. (SEO chat's pick over CRO chat's). | Search intent. |
| 2026-10-08 | **Title and description length limits (SEO chat).** Titles max 60 characters (the " \| DeepThought" suffix drops if longer); descriptions max 160 (trimmed at a sentence or word). County and state templates shortened; 13 blog posts got a shorter `seoTitle`. About lede now says plainly who we are and where. "Rewrites the actual ads" retired (our team refreshes the ads) and added to bannedClaims. TikTok added to `sameAs`. | Google cuts titles at ~60 and descriptions at ~160; 3,100+ pages were over. Clear entity definition for Google and AI answers. |
| 2026-09-26 | County page titles: `Digital Marketing in {Place}, {State} \| DeepThought`. | Shorter, clearer. |
| 2026-09-26 | Book a demo uses a **Google Calendar booking link and embed**, not a form. "Pick a time. Get a straight answer." | Fewer steps to a call. |
| — | ~~Header CTA "Launch your Campaigns" points to the app at https://deepthought.adops.rocks/.~~ Superseded 2026-10-01 (below). | Primary product link. |
| 2026-10-01 | **Three ways to reach us on every page, form first (CRO, Shajan's pick "D").** 1) Main: "Free Second Opinion" short form (name, phone, business) on the home page and pricing page after the hero, and on its own page `second-opinion.html`. 2) Tap to call 770-299-9583, with a sticky Call / Second Opinion bar on phones. 3) "Book a call" (the Google Calendar page). Header: "Free Second Opinion" button; the app moves to a quiet "Log in" link. Home hero primary button now opens the form. Promise shown: reply within one business day (superseded 2026-10-06: within 24 hours). | Zero demos booked; the main button sent cold visitors to an app login. Three short fields beat a meeting booking for busy owners on phones. Gives Ad 5's "Get a free Second Opinion" a matching landing page. |
| 2026-10-01 | **Leads go to email plus a Google Sheet** ("DeepThought Leads" in Shajan's Drive) via a Google Apps Script web app (`build/leads/apps-script.gs`). URL in `aeo-data.json` → `leads.endpoint`. Live 2026-10-02. If it is ever emptied, the form falls back to the Web3Forms key the contact page uses. | Free, no new accounts, every lead lands in one place. |
| 2026-10-01 | Lead tracking events: `form_conversion` (thank-you page, `form=second_opinion`), `phone_click`, `booking_click`, `lead_cta_click`. Each needs a GA4 event tag in GTM; mark `form_conversion` and `phone_click` as key events. | GA4 couldn't see a single lead action. |
| 2026-10-02 | **HVAC landing page** `hvac-marketing-atlanta.html` (SEO chat): first trade page, Atlanta + Gwinnett, Service schema with 7 Gwinnett cities. Linked from the footer on every page, the Gwinnett county page and the home services post. | Best trade by search volume, click value and year-round demand. |
| 2026-10-02 | Guide pages' call-to-action button is "Get a free Second Opinion" (was "Book a demo"). | Matches the form-first decision. |
| 2026-10-02 | Copy kept as is: "Same results, much lower cost" and "A real person reviews it, not a robot". | Shajan's call. |
| 2026-10-05 | Blog posts support pipe tables (same look as guide tables). | The in-house vs agency post's comparison table was rendering as raw text. |
| 2026-10-04 | **About page stays indexed** with the site.zip copy. "Pricing should be published" reworded to "Pricing should be simple"; the "We're hiring" box became a **"Here's our story"** link to `our-story.html`. | Retired pricing claim; no open roles. |
| 2026-10-04 | **`our-story.html`**: how DeepThought started + founder **Shajan Thomas, Founder & CEO**, with photo inline in the story. **Noindex** (Shajan's request), linked only from About. No Factor42 mention. | Founder story without putting it in search results. |
| 2026-10-02 | Header uses the menu drawer below **1280px** (was 1024px). | With the Second Opinion button, phone and Log in, the header needs ~1,260px; the button was cut off on smaller laptops. |
| 2026-10-06 | Home hero on phones/tablets: text gets 22px (phones) / 28px (tablets) side padding inside the navy panel; the two hero buttons go full width on phones. Fix lives in `leads.mjs` mobile CSS. | `responsive.css` zeroed the side padding, so text touched the panel edge. |
| 2026-10-02 | On phones the chat bubble sits above the sticky Call / Second Opinion bar. | They overlapped. |
| 2026-10-06 | **Lead form quality (CRO).** Phone must be a 10-digit US number (area code can't start with 0 or 1; a leading +1 is fine); the form shows "Please enter a US phone number with area code". New optional Email field. Every lead now records how the visitor found us (this visit and their first visit, read from ad tags or the referring site: Google search, Facebook, Direct, ChatGPT…), the first page they saw, and their device time zone. Kept in the visitor's browser for 90 days; no cookies, no third party. The sheet gets six new columns after Notes; leads with a non-US phone or a non-US time zone arrive as "Check" with a [Check] email subject. | A 6 Oct lead left a foreign number (05… format, UAE/Saudi) with no email and no source, so it couldn't be followed up or judged. Required fields stay at three. |
| 2026-10-01 | CRO chat never pushes to GitHub. It prepares changes and hands them to the website chat, which reviews and pushes. | Shajan's rule. |
| 2026-09-29 | Pillar page: `digital-marketing-for-small-business.html`. Blog posts link to it. | Topic cluster for SEO. |
| 2026-10-01 | **Website chat assistant**: custom Claude-powered bot (Haiku 4.5) via a Cloudflare Worker relay, not Tidio/Crisp/Intercom. Knowledge rebuilt from `aeo-data.json` and `llms.txt` on every deploy. Off until `chat.endpoint` is set. | Cheapest to run, follows approved wording. |
| 2026-10-06 | **Call-back promise is "within 24 hours"** everywhere (form, contact, thank-you, FAQ, chat, lead email). Supersedes "within one business day" (2026-10-01). Applied by copy rewrites in `aeo-data.json` for site.zip pages. | Shajan's call; matches what the team does. |
| 2026-10-06 | **Chat nudge after 5 seconds, once per visit.** Desktop: the chat opens in the corner (without grabbing the cursor). Phones: only a small "Questions? Ask me here" bubble beside the chat button; the full-screen chat opens on tap. Not on `second-opinion.html` or `thank-you.html`, not while someone is typing in a field. Events: `chat_auto_open`, `chat_teaser_shown`. | Shajan wants the chat seen; a full-screen pop-up on phones would cover the form and risks Google's intrusive-pop-up penalty. |
| 2026-10-17 | **Media plan builder SEO (SEO chat).** Six-question FAQ section on `digital-media-plan-builder.html` with matching FAQPage schema from one list (`AD_PLAN_FAQ`); in-text links to the builder from the small-business pillar guide, the Gwinnett cost post and the agency vs in-house post; builder listed in `llms.txt`. | Help the page rank and get cited for "digital media plan" questions. |
| 2026-10-20 | **Blog: "Digital marketing for contractors" (SEO chat).** New post `/blog-digital-marketing-for-contractors.html` with channel and trade-by-trade tables, FAQPage schema and header image; links out to the pillar guide, HVAC page, Gwinnett post, creative fatigue post, ad ownership checklist and media plan builder; one in-text link in from the Gwinnett home services post. | Target "digital marketing for contractors" / "contractors advertising" (about 970 searches a month combined) and feed contractor readers to the plan builder. |
| 2026-10-22 | **Blog: "Digital marketing for roofing contractors" (SEO chat), plus list fix in the blog renderer.** New post `/blog-digital-marketing-for-roofing-contractors.html` (storm season, service radius, which leads are worth paying for, Georgia storm-advertising rules) with FAQPage schema and header image; linked in from the contractors post and the Gwinnett home services post. `content.mjs` now renders numbered lists as real `<ol>` lists, and bullet and numbered lists use the paragraph text size and colour. | Target "digital marketing for roofing contractors". The list fix also repairs numbered lists that ran together on the contractors post, the HVAC Atlanta page and the small-business guide. |
| 2026-10-25 | **Claude connector (MCP) v1 is recommendations only (growth chat).** New `/mcp` route on the chat relay (`chat-worker/src/mcp.js`) with three read-only tools: `build_media_plan` (same engine as the website plan builder), `list_channels`, `get_free_second_opinion`. No logins, no ad accounts, no money, no AdOps.rocks. Open to any origin. | Let Claude users get a Deep Thought media plan inside Claude, ending with the free Second Opinion link and phone, without any risk to accounts or spend. |
| 2026-10-25 | **Claude connector collects no contact details.** It never asks for or stores name, phone or email. Each plan is logged anonymously in `CHAT_LOG` for 90 days (`m:` keys). | Privacy and simplicity; we still see what people ask for. Leads come through the Second Opinion link. |
| 2026-10-25 | **Claude connector cost guard: 200 plans a day** across all users (`MCP_DAILY_LIMIT` in `wrangler.toml`), plus a per-IP burst limit. | Each plan is one or two Haiku calls; caps the worst-case daily spend if the connector is abused. |
| 2026-10-25 | **Claude connector is now lead gen: sign-in required.** Supersedes the same-day "recommendations only, no logins" and "collects no contact details" rows. Users create a free Deep Thought account when adding the connector (email + 6-digit code; new accounts give name, phone, optional business and tick a call/text/email consent box). New accounts go to the leads sheet; plans are emailed to the user with a copy to Shajan. Still never touches ad accounts or money. | Shajan wants the connector to generate leads with name, phone and email. |
| 2026-10-25 | **Connector accounts are Deep Thought logins on the chat relay for now; move to AdOps.rocks logins later.** Built as OAuth 2.1 on the Worker (`auth.js`). | AdOps.rocks code isn't in this repo, so its login can't be wired up here yet. Shajan wants AdOps.rocks logins eventually. |
| 2026-10-25 | **Connector plans end by asking "Would you like Deep Thought to set up this campaign?"** instead of the Second Opinion call-out. A yes calls `request_campaign_setup`: lead + latest plan to the sheet and Shajan's inbox, and the user gets the AdOps.rocks sign-up link (`ADOPS_SIGNUP_URL`, currently https://deepthought.adops.rocks/). | Turn plans into campaign setups directly. |
| 2026-10-16 | **Plan write-up always matches the final channels.** The AI is told to describe only the channels it recommends; when minimums or a low budget change the line-up, a second AI pass rewrites the headline, reasons, first-month steps and numbers to watch for the final channels. If that pass fails, the steps and numbers are left out rather than shown for the wrong channel. | Shajan: a $200 plan recommended display but the first month talked about search campaigns. |
| 2026-10-16 | **Media plan builder uses Shajan's pricing sheet.** 22 channels (`chat-worker/src/catalog.js`): the 19 in DeepThought_Pricing.xlsx plus Google Local Services Ads, Yelp ads and ChatGPT ads (budget-based, 20% fee; $500 minimum assumed). Visitors give an exact monthly ad budget. The code, not the AI, splits it in dollars, drops any channel below its minimum, and forecasts impressions (CPM) or video views (CPV) at retail price; budget-based channels show no forecast. Under $500 total: advice to go to $500+ plus the one channel that fits (none under the smallest minimum). Visitors see dollars per channel and forecasts, never our fees, rates or minimums; Shajan's copy shows them. Prices, fees and minimums live in `PRICING` in `chat-worker/src/catalog.js` (Shajan, 2026-10-16: no need to keep them secret; he plans to make the repo private). An optional `PLANNER_PRICING` secret overrides them. They are still never shown on the site or in chat-knowledge.json, and visitors never see fees, rates or minimums. | Shajan: recommendations and forecasts should use real pricing and minimums. |
| 2026-10-15 | **Home hero main (blue) button is "Get a FREE media plan"** → `digital-media-plan-builder.html`; the dark second button is **"Get a free Second Opinion"** (→ the form below the hero). Supersedes the 2026-10-01 rule that the hero's main button opens the Second Opinion form, and the earlier 2026-10-15 cyan-outline second button. The sticky phone bar and the header button stay Second Opinion. | Shajan: lead with the media plan builder. |
| 2026-10-15 | ~~**Home hero second button is "Get a FREE media plan"** → `digital-media-plan-builder.html`, with a light cyan outline so it stands out on the navy panel. Replaces "See how it works" (→ product.html). "Get a free Second Opinion" stays the main hero button. Set by the hero rewrite rules in `aeo-data.json`; style in `leads.mjs`.~~ Superseded the same day (above). | Shajan: put the media plan prominently on the home page. |
| 2026-10-15 | **Renamed: Digital media plan builder** at `digital-media-plan-builder.html` (replaces `ad-plan.html`, which was live for a few hours and is retired with no redirect, Shajan's call). The chat is the main option, labelled **"Ask Deep Thought"**, and opens by default; "Fill in a form" is second (`#form` opens it). Wording is "digital media plan" on the page and in emails; footer link "Media plan builder"; the site chat links here. | Shajan: chat first, branded as Deep Thought, keyword-rich URL. |
| 2026-10-15 | **Ad plan page: "Chat instead" option.** Tabs on `ad-plan.html`: "Answer questions" (the form) or "Chat instead". In chat, the AI (`/plan-chat`, Haiku) asks for the same details one or two at a time and maps loose answers onto the options; it never gives the plan itself. The worker decides when everything is in, using the same checks as the form, then the page builds the plan through `/plan` (same report, email, lead sheet row and guards). `ad-plan.html#chat` opens straight into chat; the site chat links there. The site chat bubble hides while the on-page chat is open. 40 chat messages per visitor per 10 minutes. Event `ad_plan_generated` carries mode form/chat. | Shajan: let people just tell the AI instead of filling in a form. |
| 2026-10-15 | **Free ad plan page** `ad-plan.html`. Visitor gives business, what it does, town/ZIP, how far they serve, goal, monthly ad budget (range), what they run today, plus name, US phone and email. The chat relay's `/plan` route (`chat-worker/src/plan.js`, Haiku) picks 1 to 5 of our 22 products with a reason each and a split of **their own** ad budget in percentages, a first-month list and numbers to watch. Shown on the page and emailed (Resend, from plans@deepthought.marketing, replies to Shajan); Shajan gets a copy; the lead goes to the lead sheet as place "ad-plan". Guards: products must be on our list, shares sum to 100, any sentence with a dollar figure is dropped, no result promises, 4 plans per visitor per 10 minutes. Product knowledge comes from the site's product list for now; AdOps.rocks' proposal builder later. Linked from the footer and offered by the chat; chat nudge skips this page. Events: `ad_plan_start`, `ad_plan_generated`, `form_conversion` (form=ad_plan). | Shajan: a live recommender visitors can use on their own, collecting contact details with the questions. |
| 2026-10-06 | **Chat takes call-back details.** When a visitor wants to talk, the bot offers to call now (770-299-9583) or takes name, US phone, business (email optional) and asks "How soon would you like someone to call you? The humans at DeepThought usually call back within 24 hours." The timing is added to the business field as "(call: …)". Sends them to the same lead sheet + email as the Second Opinion form, marked "chat" / "Website chat". One lead per conversation; non-US numbers are refused. The daily digest lists these chats first. | Shajan: interested visitors shouldn't have to leave the chat to be called back. |
| 2026-10-10 | **The chat relay also serves factor42media.com.** The visitor's site (request Origin) picks the knowledge file (`factor42media.com/chat-knowledge.json`, built by the Factor42 repo), the instructions (`buildF42Prompt`: agencies and broadcasters, no prices, only the figures on the site, no client names) and the contact wording. Factor42 follow-up details (name, work email, company, optional phone, topic) are emailed via Resend to `F42_LEADS_TO`, not the Deep Thought lead sheet. One shared chat log and one daily digest; each chat is labelled DEEP THOUGHT or FACTOR42. Deep Thought's prompt and behaviour are unchanged. | Shajan: same chat on Factor42, OK with sharing one log, each site must answer as itself. |
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

- Chat assistant: **live 2026-10-06** (relay `https://deepthought-chat.shajan.workers.dev`; setup check at `/health?check=1`). Anthropic key must be workspace-scoped.
