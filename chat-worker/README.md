# Website chat relay

The chat bubble on deepthought.marketing (`build/static/chat.js`) sends the conversation here. This Cloudflare Worker adds the Anthropic API key and the bot's instructions, calls Claude (Haiku 4.5), and streams the reply back.

The bot's knowledge comes from `https://deepthought.marketing/chat-knowledge.json`, which the site build writes from `build/aeo-data.json` (FAQ, products, pricing wording, organization facts), `llms.txt` and the list of pages that rendered. Change the site, deploy, and the bot picks it up within 10 minutes. The rules it must follow (no prices, "as soon as possible", no invented testimonials and so on) are in `buildPrompt()` in `src/worker.js`.

## One-time setup

1. Create an Anthropic API key at console.anthropic.com, and **set a monthly spend limit** there.
2. Create a free Cloudflare account. Copy the Account ID (Workers & Pages, right side). Create an API token from the "Edit Cloudflare Workers" template.
3. In GitHub → repo Settings → Secrets and variables → Actions, add `ANTHROPIC_API_KEY`, `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
4. Run the "Deploy chat relay" workflow (Actions tab → Run workflow). Its log prints the Worker URL, `https://deepthought-chat.<subdomain>.workers.dev`.
5. Put `<that URL>/chat` in `build/aeo-data.json` → `chat.endpoint` and push. The bubble appears on every page.

To turn the chat off, empty `chat.endpoint` and push.

## Chat log and daily digest

- Each conversation is saved in the Workers KV namespace `deepthought-chat-log` for 90 days, then deleted automatically. The deploy workflow creates it on first run.
- Record: start time, page, whether the visitor clicked a booking link, and the full transcript. No IP address.
- Every day at 12:00 UTC the Worker emails yesterday's chats (New York time) to `DIGEST_TO`, booking clicks first. It needs the `RESEND_API_KEY` secret, and the `DIGEST_FROM` domain verified in Resend. No chats means no email.
- To read older chats: Cloudflare dashboard → Storage & Databases → KV → deepthought-chat-log.

## Guards

- Only accepts requests from deepthought.marketing (`ALLOWED_ORIGINS`).
- 20 messages per visitor per 10 minutes; 24 messages per conversation; 1,200 characters per message; 600 tokens per reply.
- Conversations are stored as above; otherwise only errors are logged in Cloudflare.

## Local test

`npx wrangler dev --var ANTHROPIC_URL:http://127.0.0.1:9000 --var SITE:http://127.0.0.1:8080 --var ALLOWED_ORIGINS:http://127.0.0.1:8080` with a mock API on :9000 and the built `_site` served on :8080.

## Claude connector (MCP), `/mcp`

Added 2026-10-25 (`src/mcp.js`, sign-in in `src/auth.js`). Lets Claude users get a Deep Thought media plan inside Claude. It's a lead-gen tool: people sign in with a free Deep Thought account.

- **Add it in Claude:** Settings → Connectors → Add custom connector → URL `https://deepthought-chat.shajan.workers.dev/mcp`. Claude then opens our sign-in page.
- **Sign-in (`auth.js`, OAuth 2.1 with PKCE + dynamic client registration):** email → 6-digit code by email (Resend, from `PLAN_FROM`) → new accounts also give name, phone, business and tick the consent box → back to Claude. Returning users only need the code. Access tokens last 30 days, refresh tokens 180 days. Everything is a signed value (no KV lookups needed to sign in); key = `OAUTH_SECRET` secret if set, else derived from `ANTHROPIC_API_KEY` (changing that key signs everyone out; they just sign in again).
- **Leads:** each new account goes to the leads sheet (`place` = `claude-connector`). Accounts are kept in `deepthought-chat-log` under `ou:<email>`.
- **Tools:** `build_media_plan` (same engine as the website's media plan builder; uses the account's business name; emails the plan to the user with a copy to `PLAN_NOTIFY_TO`; ends by asking "Would you like Deep Thought to set up this campaign?"), `list_channels` (the 22 channels with minimum budgets), `request_campaign_setup` (only after they say yes: sends a "WANTS CAMPAIGN SETUP" lead with their latest plan to the sheet (`place` = `claude-setup`) and emails you, then gives them the `ADOPS_SIGNUP_URL` link).
- **Logs:** each plan in `deepthought-chat-log` for 90 days (`m:` keys); each user's latest plan for 30 days (`ol:<email>`).
- **Cost guard:** `MCP_DAILY_LIMIT` (default 200 plans a day across all users), plus per-IP limits on plans, codes and sign-in tries.
- **Never:** touches ad accounts or money. Later: move sign-in to AdOps.rocks logins (Shajan, 2026-10-25).
- **Quick test after deploy:** `curl -s -i -X POST <worker>/mcp -H 'content-type: application/json' -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'` should return `401` with a `WWW-Authenticate: Bearer resource_metadata=...` header (sign-in required). Then add it in Claude and sign in.
