# LabGenie — Landing Page

The marketing site for **LabGenie**, the AI operating system for **F&B
manufacturers** (flavors, spices, oleoresins, and specialty ingredients), built
by **Datadivr**. A multi-page, dark "Datadivr blue on ink" experience built with
**Next.js 14 (App Router)**, **Tailwind CSS**, **Framer Motion**, and **Lenis**
smooth scroll.

> **New to the codebase or an AI assistant picking this up?** Read
> [`HANDOVER.md`](./HANDOVER.md) — it's the detailed engineering map (gotchas,
> motion system, tokens, OperationsCanvas internals).
>
> **Deploying?** [`DEPLOY.md`](./DEPLOY.md) is the Vercel walkthrough (env vars,
> the one-command `scripts/push-vercel-env.sh`, and the Keystatic Cloud setup so
> on-prod editing works).

---

## For everyone: what this site is

LabGenie reads messy quality documents and spec sheets, reconciles them against
raw-material, internal, and customer standards, and runs quality, sales, and
procurement from one chat interface. The reconciliation that used to take 3 to 5
days per batch happens in minutes.

This site's job is to make a skeptical, technical buyer trust that the product is
real, then book a demo. It does that by *showing the product working* (an
interactive operations dashboard, animated spec reconciliation, real domain data)
rather than describing it.

---

## For developers

### Getting started
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```
Node 18+. Telemetry is disabled in the npm scripts (`NEXT_TELEMETRY_DISABLED=1`).
The site builds and runs with **no environment variables**; the chat and
contact-to-Slack features degrade gracefully until keys exist.

### Two things that will trip you up
1. **If you see random 404s, manifest errors, or an empty Operations dashboard:**
   stop the dev server, `rm -rf .next`, and restart. The dev cache corrupts under
   rapid edits, and the Operations dashboard's layout is gated on a measured size
   that needs a clean start.
2. **Never run `next build` while `npm run dev` is running.**

### Project shape
```
src/
  app/            # routes (App Router, JSX): /, /platform, /manufacturers,
                  # /integrations, /security, /about, /careers, /contact, /api/*
  components/     # UI + the motion toolkit (Reveal, Parallax, SmoothScroll, …)
    OperationsCanvas/   # the interactive node-graph dashboard (self-contained)
    sections/           # homepage sections
    stations/           # platform station features + product "screen" mockups
  lib/
    content.js    # ← all copy lives here
    operations.js # ← stations + modules for the dashboard and the Gemini router
public/           # served assets (logos, ERP/CRM marks, icons)
```

### Stack notes
- **JSX, not TypeScript.** Tailwind for styling; design tokens are CSS variables
  in `src/app/globals.css`.
- **Motion** is part of the build, not an afterthought. Reusable primitives live
  in `components/` (`Reveal` with content-specific variants, `Parallax`,
  `StationFeature` scroll-linked reveals, `DaysToMinutes`). Everything is gated by
  `prefers-reduced-motion`, and heavy canvas/particle loops pause when offscreen.
- **Lenis** provides inertial smooth scroll (wraps the app in `layout.jsx`,
  disabled under reduced motion).

---

## For designers

### The look: "the lit instrument panel"
A dark, engineered surface that reads like precision instrumentation in a low-lit
control room. One brand blue carries all signal; everything else is structural
neutral; warmth is rationed to a single amber that means exactly one thing (out of
spec). The full system, with do's and don'ts, is in [`DESIGN.md`](./DESIGN.md).

### Colors (CSS variables in `globals.css` `:root`)
Stored as space-separated RGB channels so Tailwind opacity modifiers work
(`text-accent/30`). Change the `*-rgb` triplets to rebrand globally.

| Token | Meaning |
|---|---|
| `--accent` `#0066FF` | Datadivr brand blue — fills, CTAs, the logo dots, focus rings |
| `--accent-text` `#6BAAFF` | Brand blue tuned for small text (passes AAA contrast) |
| `--accent-2` `#5AA0FF` | Azure — depth and gradients |
| `--accent-warm` `#FFB454` | Amber — out-of-spec / "in progress" status only |
| `--bg`, `--surface`, `--bg-elev` | Ink ground and cool blue-tinted panel tiers |
| `--text`, `--text-muted`, `--text-dim` | Text hierarchy (all tuned for AAA on ink) |

### Type
Space Grotesk (display) · Inter (body) · JetBrains Mono (labels/data) · Manrope
(logo lockup only), via `next/font` in `layout.jsx`.

### Principles to keep
- **No card-grid slop.** Repeated icon+heading+text cards were replaced with
  editorial divided rows. Keep that pattern.
- **One continuous background.** No per-section panels or hairline grid frames;
  the whole page is one ink surface.
- **Show the product working** (mockups, the live dashboard, count-ups), don't
  describe it.

### Editing content
Almost all copy lives in **`src/lib/content.js`** — headlines, modules, stats,
buyer roles, the design-partner quote, etc. You rarely need to touch JSX to change
words. Station/module labels live in **`src/lib/operations.js`** (keep them in
sync with the chat router).

Every section is also editable through a UI: **Keystatic CMS at `/keystatic`**.
Storage auto-switches with no env var: `npm run dev` writes the JSON in
`src/content/` (zero setup); any production build (Vercel) uses **Keystatic Cloud**
(slug hardcoded in `keystatic.config.tsx`), where editors are invited by email (no
GitHub account needed). See [`KEYSTATIC.md`](./KEYSTATIC.md) and
[`DEPLOY.md`](./DEPLOY.md) §3.

---

## Signature interactions
- **Operations dashboard** — an interactive node graph where the ERP streams data
  two ways into LabGenie, which routes work to station sub-agents; includes a live
  "Ask LabGenie" chat.
- **Platform station screens** — a Quality "RFP match" panel with a light-blue
  scanner beam, and a Sales panel that streams a drafted reply, each sliding in as
  you scroll.
- **Partner ticker** — a right-to-left marquee of partner logos that resolve to
  full color on hover.
- **Days → minutes** — the brand's central transformation, animated.

---

## TODO before launch
- [ ] Add real `GEMINI_API_KEY` and `SLACK_WEBHOOK_URL` (in `.env.local` locally,
      and in Vercel env for prod — `DEPLOY.md`).
- [ ] Do the one-time Keystatic Cloud setup (dashboard only: confirm the project
      `website-designers/labgenie-landing` is connected to the repo, allow the Vercel
      domain, invite editors) so on-prod content editing works — no env var needed
      (`DEPLOY.md` §3).
- [ ] Verify the partner ticker links and swap placeholder ERP wordmarks (Infor,
      Ramco) for official logos.
- [ ] Replace the original compliance medallions with real seals as audits
      complete (the site currently states it is pre-certification).
- [ ] Set the production domain in `layout.jsx`, `robots.js`, `sitemap.js`.
- [ ] Decide the hero accent contrast call (AA-large brand blue vs strict AAA) —
      see `HANDOVER.md` §5.
