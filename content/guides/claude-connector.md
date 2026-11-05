---
title: "Deep Thought for Claude: Plan and Manage Your Ad Campaigns in Claude"
seoTitle: "Deep Thought Connector for Claude: Setup and Help"
crumb: "Deep Thought for Claude"
slug: claude-connector
eyebrow: "Connector"
updated: 2026-11-05
published: 2026-11-03
description: "How to add the Deep Thought connector to Claude, what it can do, how campaign review and payment work, and how to fix common sign-in problems."
dek: "Ask Claude for a media plan, turn it into a campaign, and check on your ads, all in plain English. Here's how to set it up and what each part does."
ctaHeading: "Want help setting it up?"
ctaText: "Call us at 770-299-9583 or email Support@deepthought.marketing. Prefer the web? Our free media plan builder works without Claude or an account."
faq:
  - q: "What is the Deep Thought connector for Claude?"
    a: "It connects Claude to your Deep Thought account. You can ask Claude for a digital media plan, submit it as a campaign, save a payment card, check your campaigns and results, request changes, and pause ads, all from a conversation."
  - q: "Do I need a Deep Thought account?"
    a: "Yes. You sign in with your Deep Thought business account when you add the connector. If you don't have one, call 770-299-9583 or email Support@deepthought.marketing. You can also get a free plan without an account from our online media plan builder."
  - q: "Can Claude launch ads or charge my card on its own?"
    a: "No. A person on the Deep Thought team reviews every new campaign and every change before anything goes live, usually within 1 business day. Claude shows you a summary and only sends a request after you say yes. Your card is charged only after the team approves a campaign. The one exception is pausing: when you confirm a pause, your ads stop right away, because pausing stops spending."
  - q: "How do I pay?"
    a: "Claude gives you a link to Stripe's secure page, where you save a card. Your card number never goes through Claude or our team. Saving a card doesn't charge it."
  - q: "Are the plans a quote or a promise of results?"
    a: "No. Plans are starting suggestions and estimates based on what you tell Claude. Your final campaign and price are confirmed when the team reviews your order."
  - q: "How do I disconnect?"
    a: "In Claude, open Settings, then Connectors, and remove Deep Thought. Your campaigns keep running as they are; to change or stop them, contact us or reconnect."
---
## What the connector does

The Deep Thought connector lets you run your advertising from a conversation with Claude, Anthropic's AI assistant. Ask in plain English, and Claude works with your Deep Thought account to:

- **Build a media plan.** Tell Claude what your business does, where you serve customers, your goal and your monthly budget. You get a channel-by-channel plan across the 22 channels we run, with a dollar split, first-month steps and the numbers to watch. A copy is emailed to you.
- **Submit it as a campaign.** Claude shows you a summary first and sends it to our team only after you say yes.
- **Save a payment card** on Stripe's secure page. Nothing is charged until a campaign is approved.
- **Check your campaigns** and their status, plus results by channel: spend, impressions, clicks, and calls or leads where tracking is set up.
- **Request changes**, such as a new budget, different channels, new ads or restarting a paused campaign.
- **Pause ads** right away if you need to stop spending.

## How to add it to Claude

1. In Claude, open **Settings**, then **Connectors**.
2. Choose **Add custom connector**. Name it **Deep Thought** and enter this address: `https://mcp.deepthought.marketing/mcp`
3. Leave any OAuth client ID and secret fields blank, then select **Add** and **Connect**.
4. Sign in with your **Deep Thought business account** and allow access.
5. Start a new conversation and ask for a plan.

Once Deep Thought is listed in Claude's connector directory, you'll be able to add it from there instead of typing the address.

Using ChatGPT, Gemini or another AI tool? See [Deep Thought for AI assistants](ai-assistants.html).

## Things to ask Claude

- "Build a media plan for my HVAC company in Lawrenceville, GA. $1,500 a month, I want more phone calls."
- "Submit that plan as a campaign. I'd like to start as soon as possible."
- "What are my campaigns, and where do they stand?"
- "How did my campaign do over the last 30 days?"
- "Raise my Google search budget to $1,000 a month."
- "Pause my Facebook and Instagram ads."

## How review, changes and payment work

| What you ask for | What happens |
|---|---|
| A media plan | Claude builds it right away and emails you a copy. Nothing is ordered. |
| Submit a campaign | Claude shows a summary. After you say yes, it goes to our team for review, usually within 1 business day. |
| Save a card | You save it on Stripe's secure page. It's charged only after the team approves a campaign. |
| A change | Claude shows a summary. After you say yes, our team reviews it before anything changes. |
| Pause ads | Claude asks you to confirm. Once you do, the ads stop right away. Restarting goes through review. |

## Your data

When you sign in, your Deep Thought account shares your name, email address, business name and account ID with the connector so it can work on your business's behalf. What you tell Claude about your business is used to build your plans and campaigns. Read our [Privacy Policy](privacy.html) for what we collect, how long we keep it and who we share it with. What you type into Claude itself is covered by Anthropic's privacy policy.

## Fixing common problems

- **"Deep Thought is set up as not requiring sign-in" (status 401).** This happens if you added the connector before sign-in was required. Remove Deep Thought in **Settings, Connectors** (don't just disconnect), then add it again with the address above.
- **"You are signed in with a Deep Thought team account."** The connector works with business accounts. Sign out of Deep Thought, or use a private browser window, and sign in with your business account.
- **"Your Deep Thought account isn't connected anymore."** In **Settings, Connectors**, disconnect Deep Thought and connect it again.
- **No card saved after Stripe.** Ask Claude to "add a payment card" for a fresh secure link, then say "done" when you've saved it so Claude can check.
- **Added Deep Thought before November 5, 2026?** The old address (`https://deepthought-chat.shajan.workers.dev/mcp`) still works. You don't need to change anything.

## Help and contact

Email [Support@deepthought.marketing](mailto:Support@deepthought.marketing) or call [770-299-9583](tel:+17702999583). No Claude account? Build a free plan on the web with our [media plan builder](digital-media-plan-builder.html).
