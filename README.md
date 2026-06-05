# LabGenie — Landing Page

The AI operating system for F&B ingredient manufacturers. A multi-page,
dark "deep-tech & luminous" marketing site built with **Next.js 14 (App
Router)**, **Tailwind CSS**, and **Framer Motion**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

> Telemetry is disabled in the npm scripts via `cross-env NEXT_TELEMETRY_DISABLED=1`.

## Pages

| Route | File |
|---|---|
| Home | `src/app/page.jsx` |
| Platform | `src/app/platform/page.jsx` |
| For Manufacturers | `src/app/manufacturers/page.jsx` |
| Integrations | `src/app/integrations/page.jsx` |
| Data Security | `src/app/security/page.jsx` |
| About | `src/app/about/page.jsx` |
| Careers | `src/app/careers/page.jsx` |
| Request a Demo | `src/app/contact/page.jsx` |

## Editing content

All copy lives in **`src/lib/content.js`** — a single source of truth.
Edit headlines, modules, stats, client names, roles, etc. there. Components
read from it, so you rarely need to touch JSX to change words.

## Brand: colors, fonts, logo

**Colors** — defined as CSS variables in `src/app/globals.css` under `:root`.
Colors are stored as space-separated RGB channels (e.g. `--accent-rgb: 60 231 192;`)
so Tailwind opacity modifiers like `text-accent/30` work. To rebrand, change
the `*-rgb` triplets to match the official brand guideline. Everything updates
globally.

| Token | Meaning |
|---|---|
| `--accent-rgb` | Spectral mint — primary accent / CTAs |
| `--accent-2-rgb` | Electric blue — depth / gradients |
| `--accent-warm-rgb` | Amber — value highlight (days → minutes / flags) |
| `--bg-rgb`, `--surface-rgb` | Background and panel surfaces |
| `--text-rgb`, `--text-muted-rgb`, `--text-dim-rgb` | Text hierarchy |

**Fonts** — Space Grotesk (display), Inter (body), JetBrains Mono (labels/data),
loaded via `next/font/google` in `src/app/layout.jsx`.

**Logo** — placeholder wordmark + mark in `src/components/Logo.jsx` and
`src/app/icon.svg` (favicon). Drop the official SVG into `public/` and replace
the mark in `Logo.jsx`.

## Signature animations

- **`ReconciliationPanel.jsx`** — the hero visual: three spec streams
  (raw-material, internal, customer) reconciled row by row with a scan line.
- **`OrchestrationStory.jsx`** — the chat that consults Quality → Inventory →
  Procurement and returns one answer.
- **`ClientTicker.jsx`** — infinite client marquee (pauses on hover).
- **`StatCounter.jsx`** — count-up stats on scroll.

All animations use GPU-friendly `transform`/`opacity` and are globally gated by
`prefers-reduced-motion` (via `MotionProvider` + a CSS fallback in `globals.css`).

## Wiring the contact form

`src/components/ContactForm.jsx` currently simulates submission. To go live,
replace the `onSubmit` handler with a real endpoint (a Next.js API route,
Formspree, HubSpot, etc.). Look for the `TODO` comment.

## TODO before launch

- [ ] Swap placeholder brand colors with the official guideline (`globals.css`).
- [ ] Replace the placeholder logo (`Logo.jsx`, `icon.svg`, `public/`).
- [ ] Replace placeholder client names in `content.js` with real client logos.
- [ ] Finalize the Data Security page copy with your security team.
- [ ] Wire the contact form to a real backend/CRM.
- [ ] Add real product screenshots where desired.
- [ ] Set the correct production domain in `layout.jsx`, `robots.js`, `sitemap.js`.
