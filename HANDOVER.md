# LabGenie — Engineering Handover

A complete map of this repo so a fresh machine (and a fresh AI coding assistant)
can pull, run, and keep building without ramp-up. Pair this with `README.md`
(friendlier overview), `PRODUCT.md` (strategy/brand/users), and `DESIGN.md`
(visual system + tokens).

---

## 1. What this is

The marketing site for **LabGenie**, the AI operating system for **F&B
manufacturers** (flavors, spices, oleoresins, specialty ingredients), built by
**Datadivr**. Dark "Datadivr blue on ink" brand. Multi-page Next.js site,
iterated heavily with the **`impeccable`** design skill (see §13).

**Stack:** Next.js 14 (App Router, **JSX, not TypeScript**) · React 18 · Tailwind
CSS 3 · Framer Motion · Lenis (smooth scroll) · lucide-react · Google
Gemini (chat) · Slack webhook (leads) · sharp / Pillow (one-off image
processing, see §0 + §10).

---

## 0. Recent build cycle (latest changes — read this first)

This cycle reworked large parts of the site. Where this section and the older
sections below disagree, **this section wins.**

- **Fonts swapped** to clear the "$10K" bar (neither Inter nor Roboto):
  **Bricolage Grotesque** (display) + **Archivo** (body), via `layout.jsx`
  `next/font`. JetBrains Mono + Manrope unchanged. See `DESIGN.md` §3.
- **Homepage hero mockup is now `AppDashboard`** (`components/AppDashboard.jsx`),
  rebuilt as a self-contained **interactive operations console**: a workspace
  rail that auto-tours (hover/click pauses; clicking pins) through an **Overview
  command center** (KPI tiles + rotating, station-tagged insights) and per-station
  views (Quality match gauge, Sales RFP queue, Procurement self-drawing price
  chart + buy-window callout, Inventory shelf-life, Production OEE gauge,
  Formulation composition) — plus a **live `LiveMessages` feed** and `CountUp`s.
- **`OperationsCanvas` moved off the homepage to `/platform`, where it is now the
  hero** ("One agent. Every station." — its `.title` is the page `h1`). The old
  "Every station. One operating layer." hero section was removed.
- **`StationMap` moved to the homepage `ProductVision` section** (full, not
  compact) with a **staged entrance** (LabGenie node → connectors branch out →
  station boxes appear one by one → status colors glow in). Removed from `/platform`.
- **Proof merged** into `components/sections/ProofShowcase.jsx` (Synthite + Mane
  Kancor); the old `SocialProof` is no longer mounted. Copy aligned to the VC deck
  (**1.5 days → 5 min** RFP spine, customers **Synthite / AVT McCormick / Mane
  Kancor** named, value-based pricing kept).
- **Security page rebuilt** (`/security`): honest **Live / In progress / Planned**
  status badges; the AI provider is **not named publicly** ("compliance-grade AI",
  EU AI Act "Limited Risk"). Nothing is claimed as certified (pre-certification).
- **About page** (`/about`): added a **leadership team section** (5 people) and two
  **dark-graded factory photos**; see §10 for the image pipeline.
- **Manufacturers page**: the Synthite quote (`DesignPartner`) was replaced by a
  **"why manufacturers love us"** traits grid. `DesignPartner.jsx` is now **unused**.
- **New components this cycle:** `AppDashboard` (rewritten), `CountUp`,
  `SeatMeter` (contact founding-partner meter), `ProofShowcase`. Possibly-orphaned:
  `DesignPartner`, `BlendProof`, `SocialProof`, `OperationsStory` — confirm before
  reusing.

---

## 2. Run it

```bash
npm install
cp .env.example .env.local   # then fill keys (optional, see §3)
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

Node 18+. The site **runs fine with no env vars** — the two live features (chat,
contact-to-Slack) degrade gracefully (see §3).

### ⚠️ Critical dev gotchas (read before debugging)
- **The `.next` dev cache corrupts under rapid edits.** Symptoms: spurious `404`
  on `/`, `ENOENT … *.pack.gz`, "Could not find module … in the React Client
  Manifest", or the dev server going unresponsive. **Fix: stop the dev server,
  `rm -rf .next`, restart.** This happened repeatedly during development; it is
  the single most common false alarm.
- **The OperationsCanvas layout is gated on a measured canvas size.** After large
  HMR edits its nodes/wires can fail to render until a **clean dev restart**
  (`rm -rf .next` + restart). If the canvas looks empty (no nodes, no wires), that
  is the cause, not a code bug.
- **Don't run `next build` while `npm run dev` is running** — it overwrites
  `.next` and dev starts 500ing.
- **Server → Client prop rule:** never pass a function (e.g. a lucide icon
  component) as a prop from a Server Component into a Client Component; it 500s.
  Pass a rendered node, or keep the component server-side (this is why
  `ComplianceBadge` is a server component).

---

## 3. Environment variables

`.env.local` is gitignored. Recreate from `.env.example`.

| Var | Used by | Notes |
|---|---|---|
| `GEMINI_API_KEY` | "Ask LabGenie" chat in the Operations Dashboard (`/api/labgenie-route`) | Get one at aistudio.google.com/apikey. **Real keys start with `AIzaSy…`.** |
| `GEMINI_MODEL` | same | Optional. Defaults to `gemini-2.5-flash-lite`. |
| `SLACK_WEBHOOK_URL` | `/contact` form (`/api/contact`) | Posts each lead to Slack, server-side only. |

> `/keystatic` editing needs **no env var**: Keystatic Cloud turns on automatically
> in production and the project slug `website-designers/labgenie-landing` is hardcoded
> in `keystatic.config.tsx`. `NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT` is an optional
> override only (project rename). See `DEPLOY.md` §3.

**Graceful degradation (verified):** with no `GEMINI_API_KEY`, the chat route
returns `{reply:null, error:"unconfigured"}` and the UI falls back to instant
local keyword routing plus a friendly hint (no dev jargon shown to users). With
no `SLACK_WEBHOOK_URL`, the contact form shows a clean error with an email
fallback. Neither crashes.

**Deploying:** see **`DEPLOY.md`** for the full Vercel walkthrough. TL;DR: push to
`main`, import the repo on Vercel (Next.js auto-detected), then either paste the
vars above into Vercel's env settings or run `bash scripts/push-vercel-env.sh`
(after `vercel link`) to push them all from `.env.local`. Keystatic storage
**auto-switches**: local files under `npm run dev`, **Keystatic Cloud** in any
production build (no env var — slug hardcoded; Cloud installs its own GitHub App, no
secret keys). See `DEPLOY.md` §3 / `KEYSTATIC.md`.

---

## 4. Routes & homepage structure

| Route | File | What it is |
|---|---|---|
| `/` | `src/app/page.jsx` | Home (see order below) |
| `/platform` | `platform/page.jsx` | Hero = the live `OperationsCanvas` ("One agent. Every station."), then each station broken out with a product screen |
| `/manufacturers` | `manufacturers/page.jsx` | Buyer roles (editorial rows) + the partner logo ticker |
| `/integrations` | `integrations/page.jsx` | ERP + CRM logos + "how it connects" |
| `/security` | `security/page.jsx` | Compliance program (pre-certification) + data handling |
| `/about` | `about/page.jsx` | Datadivr story (F&B vertical, not spice-specific) |
| `/careers` | `careers/page.jsx` | Team framing + open roles |
| `/contact` | `contact/page.jsx` | Request a demo: perks + form |
| `/api/labgenie-route` | `api/labgenie-route/route.js` | Gemini chat backend |
| `/api/contact` | `api/contact/route.js` | Contact form → Slack |

**Homepage order (current):**
`Hero (AppDashboard console) → Problem → ProductVision (full animated StationMap) → Differentiation → ProofShowcase → FAQ → ClosingCTA`.
(See §0 — `OperationsCanvas` moved to `/platform`, `SocialProof` → `ProofShowcase`.)

> A Terminal-Industries-style **pinned scrollytelling** component
> (`OperationsStory.jsx`) exists in the repo but was **retired from the homepage**
> (it duplicated the platform story and caused scroll-jacking). It is **not
> mounted anywhere** — reuse it on `/platform` only if you re-add a skip/progress
> affordance and shorten the stages.

---

## 5. Design system & tokens (`globals.css` `:root`)

Dark, near-monochrome "blue on ink." Colors are space-separated RGB channels so
Tailwind opacity modifiers (`text-accent/30`) work. Full system in `DESIGN.md`.

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0E141C` | Ink ground (everything sits on this) |
| `--bg-elev / --surface / --surface-2` | cool blue-tinted tiers | Panels/cards |
| `--text` | `#EDF1F6` | Primary text (~16:1, AAA) |
| `--text-muted` | `#A6B2C2` | Body/secondary (~8.6:1, AAA) |
| `--text-dim` | `#97A4B6` | Tertiary (**lifted to ~7.3:1 for AAA**, was `#6F7D8F`) |
| `--accent` | `#0066FF` | Datadivr brand blue: **fills, CTAs, dots, graphical only** |
| `--accent-2` | `#5AA0FF` | Azure (a tint, depth/gradients) |
| `--accent-text` | `#6BAAFF` | **Brand blue for small/secondary TEXT** (~7.8:1, AAA). Tailwind: `text-accent-text` |
| `--accent-warm` | `#FFB454` | Amber — out-of-spec / "in progress" status ONLY |

**Fonts** (`layout.jsx`, `next/font`): **Bricolage Grotesque** (display),
**Archivo** (body), JetBrains Mono (labels/data), Manrope (logo lockup only).
(Replaced Space Grotesk + Inter this cycle — see §0 and `DESIGN.md` §3.)

**Accessibility — holding WCAG AAA (mostly):** body/muted/dim/mono/eyebrow tiers
all clear AAA after the token lifts. **The one accepted exception:** raw
`#0066FF` as *large* text (3.8:1) on the hero headline accent ("F&B
manufacturers.") and the logo ".ai" — that passes AA-large (≥3:1) and is the
sanctioned brand treatment, but it is **not** AAA-large (4.5:1). To make the hero
strictly AAA, switch those to `text-accent-text` (one-line change, softer look).
All small/secondary blue text already uses `accent-text`.

---

## 6. Backgrounds — one continuous surface

The page is **one backdrop**, not per-section panels. Don't reintroduce seams:
- `body` has a single fixed soft gradient over the ink.
- `.grid-frame` is a **positioning context only** (its vertical edge hairlines
  were removed); section divider `border-t`/`border-y` were stripped sitewide.
- `OperationsCanvas`'s section is `background: transparent` (no border-top, no
  interior grid pattern) so the canvas window floats on the continuous backdrop
  instead of reading as a black box.

---

## 7. Motion system (reuse it; don't reinvent per component)

- **`Reveal` / `Stagger` / `StaggerItem`** (`components/Reveal.jsx`) — scroll-in
  entrances. `Reveal` takes `variant`: `up | fade | scale | blur | clip | left | right`.
  Pick the variant that fits the content; do NOT apply one uniform fade-up to
  everything (that is the AI tell). `Stagger` orchestrates sibling stagger via
  parent variants.
- **`Parallax`** (`components/Parallax.jsx`) — scroll-linked Y drift; reduced-motion no-ops.
- **`StationFeature`** (`stations/StationFeature.jsx`) — **scroll-LINKED** reveal
  (scrubbed to scroll position via `useScroll`, not a one-shot): text glides from
  left, screen from right. Slower/Terminal-like by design.
- **`DaysToMinutes`** (`components/DaysToMinutes.jsx`) — the brand-spine signature
  ("3 days" struck through → arrow → "minutes"). Used in SocialProof.
- **`BrandMark`** (`components/BrandMark.jsx`) — inline partner logo, `tone="light"`
  (white silhouette for ink) / `tone="dark"`. (`SynthiteMark.jsx` is the older
  Synthite-specific equivalent, still used in SocialProof/DesignPartner.)
- **`.live-dot`** (globals) — pulsing sonar status dot (set text color for hue).
  **`.panel-hover`** lifts (translateY + brand shadow). **`.flow-stroke`** —
  streaming dashed connector. **`.btn-partner`** (gold flush-fill), **`.btn-orange`**
  (bright-orange flush-fill, used on the security "Talk to our security team" CTA).
- **Lenis smooth scroll** (`components/SmoothScroll.jsx`, dep `lenis`) wraps the app
  in `layout.jsx`; disabled under reduced motion. Requires `suppressHydrationWarning`
  on `<html>` (Lenis mutates html classes) + the Lenis CSS block in globals. The
  live instance is exposed as `window.lenis` (use `window.lenis.scrollTo(y,{immediate:true})`
  for programmatic scroll; native `window.scrollTo` is RAF-reset by Lenis).
- **Marquee gotcha:** `@keyframes marquee` is defined **directly in `globals.css`**
  (not only tailwind.config) — Tailwind purges config keyframes when no
  `animate-marquee` utility is used, which left the ticker static. Keyframe
  `translateX(0 → -50%)` on the duplicated row = right-to-left scroll.
- **Reduced motion is honored everywhere:** `MotionProvider` sets
  `reducedMotion="user"`, components branch on `useReducedMotion()`, and the
  globals `@media (prefers-reduced-motion: reduce)` block kills CSS animations.
- **Performance:** `AetherBackground` (hero particles) and the `OperationsCanvas`
  rAF tick loop **pause when scrolled offscreen** (IntersectionObserver) and on
  tab-switch (`visibilitychange`). Do NOT add a `document.hidden` guard to their
  `start()` — headless/preview reports `document.hidden=true` and would freeze them.

---

## 8. The "no cards" editorial pattern

The client dislikes repeated icon+heading+text card grids (AI slop). The
established replacement is **editorial divided rows**:
`<Stagger className="divide-y divide-border border-t border-border">` of
`<StaggerItem variant="left" as="div" className="grid sm:grid-cols-[220px_1fr]">`
(label/heading left, prose right). Applied on About values, Manufacturers buyer
roles, Security pillars. **Careers and the homepage Problem section still use
grids** — convert them if you revisit. Functional surfaces (product mockups, the
single light proof card, the FAQ accordion) are not "cards" and stay.

---

## 9. OperationsCanvas notes (`components/OperationsCanvas/`, ~1100 JSX + ~1350 CSS)

The interactive node-graph console — **now the `/platform` hero** (moved off the
homepage this cycle; the homepage uses `AppDashboard`). Driven by
`src/lib/operations.js`; scoped CSS module. Its `.title` is the platform-page `h1`.
- **ERP panel:** shows 4 real logos (SAP, Sage, Infor, Ramco) + an "and more"
  line, each with a per-logo `scale` in `ERP_LOGOS` for even optical sizing.
  Hovering a logo fills the panel with that brand's color (`.erpFill` + JS `setFill`).
- **ERP ⇄ LabGenie connector:** two lanes (`erpPathRef`/`erpPathRefB`) with
  opposite-flowing pulses = two-way comms.
- **Module cards** (`.mCard`): full accent-tinted border + faint wash (the old
  3px side-stripe was removed — side-stripes are a banned pattern).
- Below 900px it renders a **mobile fallback** (no SVG wires).

---

## 10. Assets / logos (`public/`)

- **Partner ticker** (`components/ClientTicker.jsx`): dark cards at rest (logos as
  white silhouettes via `brightness(0) invert(1)`), card fills white + logo shows
  real color on hover. Right-to-left marquee with edge fades; pauses on hover.
  Files in `public/logos/clients/`. Each partner optionally has `url` (verified
  domains) and `rest` (a transparent silhouette source when the main file has a
  white background — e.g. Mane uses the color webp `mane.webp` for the hover and
  `mane-mark.png` for the silhouette).
- **ERP logos are now real artwork:** `public/erp/{sap.webp, sage.webp, infor.png,
  ramco.png}`, sized per-logo via a `scale` field in `OperationsCanvas`'s
  `ERP_LOGOS` (so the square SAP and the wide ramco read at a similar optical size).
- **Team avatars + factory photos (`/about`) — duotone pipeline:** AI-generated
  source illustrations/photos live in the working `photos/` folder (gitignored-ish,
  not served). They were processed **once, by hand, with Pillow** into a uniform
  treatment — white background (top-corner flood-fill), a cool-blue duotone matching
  `photos/REFERENCEFORTINT.jpeg`, and watermark crops — and written to
  **`public/team/{sunny,gautham,andrew,siva,isha}.webp`** (avatars) and
  **`public/about/{processing-floor,processing-line}.webp`** (factory). If a source
  image changes, re-run the same Pillow steps (duotone LUT navy `#1A2340`→white;
  resize avatars to 480²). The served `public/` assets are what the site uses.
- **Logo background knockout:** `choice-canning.png` and `nandus.png` had their
  white backgrounds removed at build time with `sharp` (feathered white→transparent)
  so they silhouette cleanly on the dark cards. If you re-add a white-bg logo,
  either provide a transparent PNG or repeat that process.
- Raw source logos live in the root working folder; the **served** assets are all
  under `public/`. Brand kit: `Datadivr Brand Guide.pdf`, `labgenie-ai__logo-assets/`.

---

## 11. Content source of truth

- **`src/lib/content.js`** — copy (headlines, modules, stats, buyer roles,
  designPartner, integrations, security, about, careers, finalCta). Edit words here.
- **`src/lib/operations.js`** — stations + modules for the OperationsCanvas and the
  Gemini router (keep labels in sync; the chat returns module labels).

---

## 12. Known issues / TODO before launch

- **Verify partner URLs.** Ticker links are best-effort; `manekancor.com`/
  `mercelys.com` etc. were checked, but confirm all and add any missing.
- **Security badges are original artwork, not official seals** (LabGenie is
  pre-certification — the copy says so). Swap in real seals as audits complete.
- **Decide the hero AAA call** (§5): keep brand-blue (AA-large) or switch to
  `accent-text` (AAA-large).
- **Mobile nav is an icon-only pill** with `aria-label`s (44px touch targets). Fine
  a11y-wise; consider labels if first-time-user clarity matters.
- Convert the remaining card grids (Careers, homepage Problem) to the editorial row pattern.
- Set the production domain in `layout.jsx`, `robots.js`, `sitemap.js`.
- **Finish Keystatic on-prod editing:** one-time Keystatic Cloud setup in the
  dashboard only — confirm the project `website-designers/labgenie-landing` is
  connected to the repo, add the Vercel domain to its allowed list, invite editors
  (`DEPLOY.md` §3). No Vercel env var or redeploy step — Cloud auto-enables in the
  production build. Until the dashboard setup is done the live site still renders
  content fine; only the on-prod editor is unconfigured.
- **Deploying:** full walkthrough in `DEPLOY.md`; one-shot env push via
  `scripts/push-vercel-env.sh`.

---

## 13. Working with the `impeccable` skill

The skill is committed at `.claude/skills/impeccable` so `/impeccable …` works on
pull. Recent runs this cycle: `animate`, `critique` (snapshot in
`.impeccable/critique/`, gitignored), `distill` (homepage), `clarify`/`harden`
(credibility + graceful degradation), `audit` (latest score ~19/20), `adapt`/
`colorize`/`optimize`/`polish` (the audit fixes). `/impeccable audit` is the
quickest way to re-check a11y/perf/responsive/anti-patterns after changes.

> Verification note: the in-tool browser screenshot times out on this
> animation-dense build, so most checks during development were done via DOM /
> computed-style evaluation rather than pixel comparison.
