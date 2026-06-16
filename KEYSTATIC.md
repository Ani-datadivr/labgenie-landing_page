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

## Switching to GitHub mode (editors commit via GitHub)

Storage auto-switches: it uses **local** files until `KEYSTATIC_GITHUB_CLIENT_ID` is
set, then uses **GitHub** (edits become commits/PRs on `Ani-datadivr/labgenie-landing_page`).
See `keystatic.config.tsx`.

One-time GitHub App setup:

1. Temporarily force GitHub storage so Keystatic can run its setup flow — either
   deploy the app, or run `npm start` (production mode) locally, then open `/keystatic`.
   Keystatic shows a **"Create GitHub App"** button.
2. Click it. Keystatic generates a GitHub App on your account/org pointed at this repo
   and hands back four values.
3. Put them in `.env.local` (and in your host's env for production):
   ```
   KEYSTATIC_GITHUB_CLIENT_ID=...
   KEYSTATIC_GITHUB_CLIENT_SECRET=...
   KEYSTATIC_SECRET=...                      # any long random string
   NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=... # the app's slug
   ```
4. Set the GitHub App's callback URL to `https://<your-domain>/api/keystatic/github/oauth/callback`
   (and `http://localhost:3000/api/keystatic/github/oauth/callback` for local testing).

Once those env vars exist, `/keystatic` requires GitHub login. Editors need write
access to the repo.

## Draft → Preview → Publish (the `staging` branch)

So editors never change the live site by accident, they work on a draft branch and
preview it before publishing:

1. **Create the draft branch once:** `git branch staging main && git push -u origin staging`.
   Vercel auto-builds it to a stable preview URL (`…-git-staging-….vercel.app`).
2. **Point the Preview button at it:** set `NEXT_PUBLIC_KEYSTATIC_PREVIEW_URL` (in
   Vercel env, copy the real `*-git-staging-*` host from Vercel → Deployments). The
   config wires this into `storage.previewUrl`, so Keystatic shows a **Preview** link
   on every editing screen.
3. **Editor flow:** in the Keystatic top bar, switch the branch to **`staging`** → edit
   → **Save** (commits to `staging`, live site untouched) → **Preview** (opens the
   staging deploy with the changes) → **Create pull request** and merge `staging → main`
   to publish. Merging to `main` triggers the production deploy.

> Optional one-click publish: a small authenticated route could merge `staging → main`
> via the GitHub API so editors never touch a PR. Not built yet — see the plan notes.

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
