# Editing copy (Keystatic CMS)

The site's copy is managed with [Keystatic](https://keystatic.com). Editors change
text through a UI; changes are saved as JSON files in the repo and ship on deploy.

## What's editable today

Open **`/keystatic`** in the running app. Two collections are wired so far:

| In the CMS | Drives | Stored at |
|---|---|---|
| **Home — Hero** | The homepage headline, sub-headline, and both buttons | `src/content/home/index.json` |
| **FAQ** | The questions and answers in the FAQ section | `src/content/faqs/index.json` |

Components read this content server-side via `src/lib/cms.js`. If a file is missing
or a field is blank, the component falls back to its built-in default, so the site
never renders empty.

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

Once those env vars exist, `/keystatic` requires GitHub login and every save opens a
commit/PR. Editors need write access to the repo.

## Adding more copy to the CMS

Most of the site's copy still lives in `src/lib/content.js` and a few components.
To make any of it editable, follow the same three steps the Hero/FAQ use:

1. Add a field (or a new singleton) to `keystatic.config.tsx`.
2. Seed `src/content/<name>/index.json` with the current copy (Keystatic singletons
   store their data as `index.json` inside the configured `path`).
3. Read it in `src/lib/cms.js` and pass it into the component (server components can
   read directly; client components like the Hero take it as a prop with a default).

> Tip: keep CMS fields as plain `fields.text`. Avoid rich-text/Markdoc fields unless
> you need formatting, since those have a more complex on-disk format.
