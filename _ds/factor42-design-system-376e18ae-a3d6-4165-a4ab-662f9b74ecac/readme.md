# Factor42 — Design System

**Factor42 Media** is an ad-operations company. Its product promise is summed up by the
tagline **“AD OPS AT SCALE.”** The brand reads as a modern, technical B2B / ad-tech
platform: confident, blue, precise, and engineered. The visual language is built on a
cool blue-to-cyan gradient, crisp geometric type, and clean glass-on-grid surfaces.

This repository is the canonical design system: brand assets, design tokens, foundation
specimens, reusable React UI primitives, and a product UI kit.

---

## Sources

The system was authored from the **Factor42 brand guidelines** supplied directly by the
team, plus two brand images:

- `uploads/Marrón Tipográfico Café Logo (3).png` → `assets/factor42-wordmark.png` — full “Factor42” wordmark.
- `uploads/1.png` → `assets/factor42-f42-mark.png` — the “F42” mark.

No codebase or Figma file was provided. The token values, gradients, UI patterns, and logo
specs below are transcribed verbatim from the written guidelines. SVG logo variants
(`logo.svg`, `logo-white.svg`, `logo-icon.svg`) were reconstructed from those specs.

> **Font note:** Plus Jakarta Sans and Inter are loaded from **Google Fonts** (the brand’s
> stated source) via `@import` in `tokens/fonts.css`. No local font binaries are bundled —
> this is intentional, not a substitution. If you need self-hosted `.woff2` files, ask and
> they can be added.

---

## CONTENT FUNDAMENTALS — how Factor42 writes

- **Voice:** confident, technical, outcome-oriented. Speaks to ad-ops professionals who
  value precision and scale. Never cutesy or jokey.
- **Person:** addresses the customer as **“you”** (“Scale your ad ops”), refers to the
  product/company as **“we / Factor42.”**
- **Casing:** Headlines use sentence case or Title Case; the **tagline and eyebrows are
  ALL-CAPS and letter-tracked** (e.g. `AD OPS AT SCALE`). Buttons are sentence case
  (“Get started”, “Book a demo”).
- **Length:** short, declarative. Headlines are 3–7 words. Body sits at 1–2 tight
  sentences. Favor verbs and concrete nouns (campaigns, inventory, yield, throughput).
- **Numbers:** lean into metrics — “42% faster”, “10M impressions/day”. The “42” is a
  brand motif; numerals are welcome and rendered in the gradient when used as accents.
- **Emoji:** **none.** This is a technical B2B brand — no emoji, no exclamation-heavy copy.
- **Vibe:** “the operations layer that just works.” Calm authority, engineered reliability.

Example copy:
> **Ad ops at scale.** Run, optimize, and reconcile every campaign from one operations
> layer. — *Book a demo →*

---

## VISUAL FOUNDATIONS

- **Color:** A cool blue system. Primary Blue `#0066FF` for interactive elements; Deep Blue
  `#0052CC` for logo / dark accents / gradient start; Cyan `#00B4D8` for highlights and
  gradient end. Text is Dark Navy `#0A0F1E`; secondary text uses the slate ramp
  (`#334155 / #64748b / #94a3b8`). The page sits on a light blue-white `#F0F4FF`.
- **Gradients** are core to the brand and always run **135°, deep-blue → primary → cyan**.
  The “42”, the icon mark, and primary buttons all carry a gradient. Never use purple or
  warm gradients.
- **Type:** **Plus Jakarta Sans** (500/700/800) for display & headings — geometric, tight
  tracking on large sizes. **Inter** (300–800) for body & UI. Headings hug their text
  (`letter-spacing: -0.02em`); eyebrows/taglines are tracked `+0.18em` uppercase.
- **Backgrounds:** light, never photographic by default. The signature texture is a
  **40px grid** drawn in `rgba(0,102,255,0.06)` lines over the `#F0F4FF` page. Gradients
  appear in hero panels, the logo, and accents — not as full-page washes.
- **Surfaces / cards:** **glass cards** — `rgba(255,255,255,0.88)` + `backdrop-filter:
  blur(12px)` + `1px` border `rgba(0,102,255,0.12)`. Corner radius **20–24px** for cards,
  **12px** buttons, **10px** inputs, **9999px** pills. Shadows are soft and low
  (`0 12px 32px rgba(10,15,30,0.10)`); the brand **glow** is `0 0 30px rgba(0,102,255,0.20)`.
- **Borders:** hairline blue at rest `rgba(0,102,255,0.12)` → strengthen to
  `rgba(0,102,255,0.30)` on hover. This rest→hover border shift is the dominant interaction.
- **Hover:** borders brighten, glow appears, buttons lift slightly. **Press:** subtle
  darken + small scale-down (~0.98). **Transitions:** ~220ms on a smooth ease-out
  (`cubic-bezier(0.16,1,0.3,1)`). Fades and gentle lifts — **no bounces, no big springs.**
- **Transparency & blur:** reserved for glass cards, sticky headers, and overlays — used
  to layer over the grid texture, not decoratively everywhere.
- **Imagery vibe:** when imagery is used it skews cool / blue, clean and product-forward
  (dashboards, charts), not warm or grainy.
- **Layout:** centered max-width container (~1200px), generous vertical rhythm, sticky
  glass header. Fixed elements: header and (in-app) sidebar.

---

## ICONOGRAPHY

- Factor42’s guidelines do not ship a proprietary icon font or SVG set. The system
  standardizes on **[Lucide](https://lucide.dev)** — a clean, geometric, **outline** set at
  **1.75–2px stroke** that matches the engineered, technical feel. Lucide is linked from CDN
  in the UI kit and component cards (`https://unpkg.com/lucide@latest`).
  - *This is a documented substitution* — swap for an in-house set if one exists.
- **Style rules:** outline (not filled), rounded line caps/joins, 24×24 grid, stroke
  `currentColor` so icons inherit text color. Accent icons may use Primary Blue; on dark
  panels they go white/cyan.
- **No emoji** anywhere in the UI. No decorative unicode glyphs as icons. The lone
  exception is the **`→` arrow** used in CTAs (“Book a demo →”), which is on-brand.
- **Logo / brand marks** live in `assets/`: `logo.svg` (color, dark wordmark),
  `logo-white.svg` (dark backgrounds), `logo-icon.svg` (80×80 rounded-square gradient F),
  plus the original PNGs.

---

## INDEX

**Root**
- `styles.css` — global entry point (consumers link this); `@import`s all tokens + fonts.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `fonts.css`.
- `assets/` — `logo.svg`, `logo-white.svg`, `logo-icon.svg`, `factor42-wordmark.png`, `factor42-f42-mark.png`.
- `SKILL.md` — Agent-Skill manifest for using this system in Claude Code.

**Foundation cards** (Design System tab) — `guidelines/*.card.html` covering Colors, Type, Spacing, Brand.

**Components** (`components/core/`) — reusable React primitives:
- `Button`, `IconButton`, `Input`, `Badge`, `Card`, `Tag`, `Switch`, `Avatar`, `Tabs`, `StatCard`.

**UI kit** (`ui_kits/platform/`) — Factor42 ad-ops platform: marketing landing + in-app dashboard screens.
