# LabGenie — Project Handover

A practical map of this repo so a fresh machine (and a fresh Claude Code session)
can pull, run, and keep building without ramp-up. Pair this with `PRODUCT.md`
(strategy/brand) and `DESIGN.md` (visual system).

---

## 1. What this is

The marketing site for **LabGenie**, the AI operating system for **F&B
manufacturers** (dairy, beverage, ingredients, flavors, specialty, and more),
built by **Datadivr**. Dark "Datadivr blue on ink" brand. Multi-page Next.js
site, iterated with the **`impeccable`** design skill.

**Stack:** Next.js 14 (App Router, JSX — not TypeScript) · Tailwind CSS 3 ·
Framer Motion · lucide-react · Google Vertex/Gemini (chat) · Slack webhook (leads).

---

## 2. Run it

```bash
npm install
cp .env.example .env.local   # then fill in keys (see §3)
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

Node 18+ recommended. The site **runs fine without any env vars** — the two
live features (chat, contact-to-Slack) just no-op gracefully until keys exist.

---

## 3. Environment variables

`.env.local` is **gitignored and NOT in the repo**. Recreate it from
`.env.example`:

| Var | Used by | Notes |
|---|---|---|
| `GEMINI_API_KEY` | "Ask LabGenie" chat in the Operations Dashboard (`/api/labgenie-route`) | Get one at aistudio.google.com/apikey. **Real keys start with `AIzaSy…`.** The key used during dev was an `AQ.Ab8…` token, which may not authenticate via this route — generate a proper API key. |
| `GEMINI_MODEL` | same | Optional. Defaults to `gemini-2.5-flash-lite`. |
| `SLACK_WEBHOOK_URL` | `/contact` form (`/api/contact`) | Posts each lead to Slack, server-side only. |

> **Rotate** any key/webhook that was shared in chat or pasted anywhere public.

---

## 4. Routes (`src/app`)

| Route | File | What it is |
|---|---|---|
| `/` | `page.jsx` | Home: Hero → Problem → ProductVision (+ station map) → **OperationsCanvas** → Differentiation → SocialProof → ClosingCTA |
| `/platform` | `platform/page.jsx` | The 6 stations broken out, alternating, each with a product mockup + status colour |
| `/manufacturers` | `manufacturers/page.jsx` | Buyer roles + customer logo ticker |
| `/integrations` | `integrations/page.jsx` | ERP / CRM logos + "how it connects" |
| `/security` | `security/page.jsx` | Compliance badges + data-handling (from the design-partner agreement) |
| `/about` | `about/page.jsx` | Datadivr story |
| `/careers` | `careers/page.jsx` | Team framing + 4 open roles |
| `/contact` | `contact/page.jsx` | Request a demo: design-partner perks + "2 of 5 seats" + form |
| `/api/labgenie-route` | `api/labgenie-route/route.js` | Gemini chat backend for the Operations Dashboard |
| `/api/contact` | `api/contact/route.js` | Contact form → Slack webhook (server-side) |

---

## 5. Key components (`src/components`)

- **Hero.jsx** — stacked hero: word-by-word animated headline + `AetherBackground` + `AppDashboard`.
- **AppDashboard.jsx** — the polished product-dashboard mockup that is the hero visual (browser chrome, sidebar, KPI sparklines, throughput chart, live-activity feed).
- **AetherBackground.jsx** — interactive particle field (hero only).
- **AmbientBackground.jsx** — site-wide animated aurora + light beams (mounted in `layout.jsx`).
- **Navbar.jsx** — tubelight pill nav. **Logo.jsx** — official mark + Manrope wordmark.
- **OperationsCanvas/** — the interactive node-graph "Operations Dashboard": ERP cylinder (logo tiles), fanned station nodes, the central LabGenie chat (wired to `/api/labgenie-route`). Driven by `src/lib/operations.js`. Has its own scoped CSS module.
- **StationMap.jsx** — clean architecture diagram (GTM / Factory / Innovation), status-coded (green live / amber build / grey roadmap).
- **stations/StationFeature.jsx** + **stations/mockups/** — the 6 per-station product mockups (QA = RFP-vs-PI-sheet, Sales, Procurement, Production, Formulation, Market Intel).
- **ChatMockup.jsx**, **ReconciliationPanel.jsx**, **ClientTicker.jsx** (right-to-left logo marquee), **IntegrationLogos.jsx**, **ComplianceBadge.jsx**, **ContactForm.jsx**, **FinalCTA.jsx** (contextual per page + gold "Become a design partner" button), **ScrollRevealText.jsx**, **sections/** (Problem, ProductVision, Differentiation, SocialProof, ClosingCTA).

---

## 6. Content & design system

- **`src/lib/content.js`** — the copy source of truth. Edit words here.
- **`src/lib/operations.js`** — stations + modules for the Operations Dashboard and the Gemini router (keep labels in sync across both; the chat returns module labels).
- **`PRODUCT.md`** — register/users/brand/principles. **`DESIGN.md`** + **`.impeccable/design.json`** — the visual system (tokens, rules, do/don'ts).
- **Brand:** primary `#0066FF`, ink `#0E141C`. Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (labels/data), Manrope (logo lockup only). All tokens live in `src/app/globals.css`.

## 7. Assets / logos

- `public/logos/clients/*` → customer ticker · `public/logos/erp/*` + `public/logos/crm/*` → Integrations grid · `public/erp/*.webp` → ERP cylinder in the Operations Dashboard.
- Raw source logos in `/logos`. Brand kit in `/labgenie-ai__logo-assets` and `Datadivr Brand Guide.pdf`.

---

## 8. Continuing with `impeccable`

The skill is committed at `.claude/skills/impeccable` (so `/impeccable …` works on
pull). To update it: `npx impeccable skills install`.

**Not yet done (your next steps):**
- `/impeccable audit` — a11y, contrast, performance, responsive.
- `/impeccable critique` — scored UX review.
- `/impeccable polish` — final pass.

---

## 9. Gotchas (read before editing)

- **Do not run `next build` while `npm run dev` is running.** It overwrites
  `.next` and the dev server starts returning 500s. Fix: stop dev, `rm -rf .next`,
  restart. (This bit us repeatedly.)
- **OperationsCanvas measures its canvas on mount.** After large edits, do a clean
  dev restart so the station nodes render (they're gated on a measured size).
- **Server → Client prop rule:** don't pass a function (e.g. a lucide icon
  component) as a prop from a server component into a client component — it 500s.
  Pass a rendered node, or keep the component server-side. (This is why
  `ComplianceBadge` is a server component.)
- **House style:** no em dashes; avoid "COA" and lab jargon (write "quality
  documents / certificates"); the economic buyer is a COO/procurement head, not a
  lab analyst. See `DESIGN.md` Do's & Don'ts.
- **AAA caveat:** brand blue as *small* text is ~3.8:1 (fine for large/graphical,
  below AAA for small text). The audit will flag it; bump to a lighter blue where
  it's small body text.
- **Compliance badges** on `/security` are **original designs, not official seals**
  (LabGenie is pre-certification). Swap in real seals once each audit completes.

---

## 10. Status snapshot

Built: full rebrand to Datadivr blue/ink, animated hero + product dashboard,
type-led structural sections, interactive Operations Dashboard with live Gemini
chat, `/platform` station breakout, integrations/security/about/careers/contact
pages, customer logo ticker, contact-to-Slack, design-partner perks + scarcity,
animated background. Pending: `audit` + `critique` + `polish`, and verifying the
Gemini key authenticates.
