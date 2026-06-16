# Editing copy (Keystatic CMS)

The site's copy is managed with [Keystatic](https://keystatic.com). Editors change
text through a UI; changes are saved as JSON files in the repo and ship on deploy.

## What's editable today

Open **`/keystatic`** in the running app. **Every section of every page** is wired,
plus the navbar, footer, and site settings. The sidebar is grouped by page
(`ui.navigation` in `keystatic.config.tsx`):

- **Home** — Hero, Problem, Product Vision, Why LabGenie, Proof, FAQ, Closing CTA
- **Platform** — Page intro & SEO, Stations, Final CTA
- **For Manufacturers** — Header, Industry segments & partners, Economic buyers, Daily users, How we work, Final CTA
- **About** — Header, Our story, Team, Principles, By the numbers, Closing CTA
- **Security** — Header, Controls, Compliance program, Data handling, Responsible AI, Security contact, Final CTA
- **Careers** — Header, How we work, Open roles, Closing CTA
- **Integrations** — Header, How it connects, Final CTA
- **Contact** — Header, Design partner panel, Form labels
- **Site-wide** — Navigation bar, Footer, Site settings

Each section singleton is one JSON file under `src/content/` (e.g. `src/content/home.json`,
`src/content/about-team.json`). Components read this content server-side via
`src/lib/cms.js` (`readSingleton` / `readSections`). If a file is missing or a field is
blank, the component falls back to its built-in `DEFAULTS`, so the site never renders empty.

**Conventions baked into the schema:**

- **`visible` toggle** — most sections start with a "Show on the website" checkbox.
  The page renders the section only when `isVisible(section)` (true unless explicitly
  unticked). Hiding is reversible; nothing is deleted.
- **`seo`** — each page's lead/header section carries a `seo` object (title + description).
  Pages turn it into metadata with `buildMetadata(seo, { fallbackTitle, fallbackDescription })`
  in `generateMetadata`. Blank → the page's built-in fallback / site default.
- **Lists** — `fields.array(...)` for FAQs, stations, team, roles, badges, nav/footer
  links. Icons, photos, step numbers, and animation values stay in code and are matched
  by order, so editors can't break the visuals.

## Editing locally (works now, no setup)

```bash
npm run dev
# visit http://localhost:3000/keystatic
```

In local mode, saving in the UI writes directly to the JSON files in `src/content/`.
Commit those files like any other change.

## Switching to Cloud mode (editors invited by email)

Storage auto-switches in `keystatic.config.tsx`: a **production build** (Vercel, or
`npm run build && npm start`) uses **Keystatic Cloud**; `npm run dev` uses **local**
files. The gate is `NODE_ENV === "production"`, and the Cloud project slug
`website-designers/labgenie-landing` is **hardcoded** — so there's **no env var to
set**. Cloud edits commit to `Ani-datadivr/labgenie-landing_page` via Keystatic
Cloud's own GitHub App; you don't manage any OAuth keys.

> Optional: `NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT` overrides the hardcoded slug if the
> Cloud project is ever renamed. Not needed for normal operation.

One-time Keystatic Cloud setup (dashboard only):

1. At https://keystatic.cloud, the **team + project `website-designers/labgenie-landing`**
   exist and the project is **connected to this GitHub repo** (Keystatic installs its
   GitHub App on the repo for you).
2. In the Cloud project settings, **add your deployed domain(s)** to the allowed list
   (`*.vercel.app` + any custom domain). `localhost:3000` is allowed for local testing.
3. **Invite editors by email** from the Cloud dashboard — no GitHub account needed.

On the deployed site `/keystatic` then requires a Keystatic Cloud sign-in; on a dev
laptop (`npm run dev`) it stays in zero-setup local-file mode.

## How saving works (direct, no draft branch)

This deployment is a **review sandbox**, so the flow is deliberately simple:

- An editor **Saves** → Keystatic Cloud commits straight to `main` → Vercel rebuilds in
  ~1 min → the change is visible on the sandbox URL.
- The owner reviews on that URL and, when the copy is right, ports the approved
  `src/content/*.json` into the real (Render) repo. Nothing here auto-publishes to the
  public site — that copy-over is the review gate. See `MIGRATION.md`.

> No `staging` branch, Preview button, or PRs are used in this setup — they'd add
> friction with no benefit for a sandbox whose whole job is fast, easy review.

## Adding more copy to the CMS

The pattern, mirrored across every section:

1. Add a field (or a new singleton) to `keystatic.config.tsx`. Use `showToggle()` for a
   Show/Hide checkbox and `seoField()` for SEO; group it under a page in `ui.navigation`.
2. Seed `src/content/<name>.json` with the current copy (singletons with
   `format: { data: "json" }` store as a flat `<path>.json` file).
3. Read it in the page via `readSingleton`/`readSections` from `src/lib/cms.js`, gate it
   with `isVisible(section)`, and pass it into the component, which keeps a `DEFAULTS`
   object and merges `{ ...DEFAULTS, ...(copy || {}) }`.

> Tip: keep CMS fields as plain `fields.text`. Avoid rich-text/Markdoc fields unless
> you need formatting, since those have a more complex on-disk format.
