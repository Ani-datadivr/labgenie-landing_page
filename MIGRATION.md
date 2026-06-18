# Review sandbox → Production runbook (CMS editing + repo move)

How to let a non-technical person perfect the site copy on a **review sandbox**
deploy (Vercel), then promote the finished copy to the **production** repo on
Render.

Why this works: all editable copy lives as JSON in `src/content/*.json`. Editors
just change those files through a friendly form at `/keystatic`. When you copy the
finalized copy into another repo, it travels with it — nothing is re-entered.

> **Secrets note:** the values below are set as **environment variables** on the
> host (Vercel/Render). Never commit them to the repo. `.env.local` is gitignored.
> **Keystatic needs no env var** — Cloud turns on automatically in production and the
> project slug is hardcoded in `keystatic.config.tsx`; there are no Keystatic keys.

---

## Environment variables (the full set)

| Variable | How to get it |
|---|---|
| `SLACK_WEBHOOK_URL` | Your Slack incoming webhook (contact form → Slack lead) |
| `GEMINI_API_KEY` | Create at https://aistudio.google.com/apikey (starts `AIzaSy…`). A dev `AQ.…` token will NOT authenticate in prod |

Keystatic needs **no environment variable**. Storage **auto-switches** in
`keystatic.config.tsx`: a production build (Vercel) uses Keystatic Cloud (project
`website-designers/labgenie-landing`, hardcoded), and `npm run dev` writes JSON
straight to local files (zero-setup dev). Keystatic Cloud installs its own GitHub
App on the repo for you, so there are no client IDs/secrets/app slugs to manage.

---

## Part A — Owner steps

### Phase 1 — Review sandbox on Vercel (perfect the copy here; nothing public)

1. Push the site to the repo; Vercel auto-deploys the sandbox.
2. Vercel → project → **Settings → Environment Variables** (set for Production +
   Preview): `SLACK_WEBHOOK_URL`, `GEMINI_API_KEY`.
3. **One-time Keystatic Cloud setup** (dashboard only — see `DEPLOY.md` §3 /
   `KEYSTATIC.md`):
   - At https://keystatic.cloud, the **team + project
     `website-designers/labgenie-landing`** exist and the project is **connected** to
     the GitHub repo `Ani-datadivr/labgenie-landing_page` (Keystatic installs its own
     GitHub App — you manage no keys).
   - **Add your Vercel domain(s)** to the project's allowed-domains list
     (the `*.vercel.app` URL plus any custom domain).
   - No Vercel env var to add — Cloud turns on automatically in the production build.
4. **Invite the editor by email** from the Keystatic Cloud dashboard — no GitHub
   account needed.
5. Send them the `/keystatic` link + `EDITOR_GUIDE.md`. Review on the sandbox until
   the copy is flawless.

### Phase 2 — Production on Render (when copy is final)

6. **Copy the approved `src/content/*.json`** from this repo into the **production
   repo** — that's the finalized copy.
7. Push the production repo to Render → **New → Web Service** → connect the
   production repo → **Build:** `next build`, **Start:** `next start` → add env vars
   (`GEMINI_API_KEY`, `SLACK_WEBHOOK_URL`).
8. Done. The production site renders the copied JSON at build time. **No Keystatic
   Cloud setup is needed on Render** if it's just the live site — the content is
   plain JSON files that came across with `src/content/`.

> Render notes: works for Next.js, but you set Build/Start commands manually, and
> free-tier services sleep when idle (first hit after idle is slow). Auto-deploys on
> push.

---

## Part B — Non-technical editor steps

### One-time setup (~1 min)
1. Open the **email invite** sent from Keystatic Cloud and click the link.
2. That's it — no GitHub account, no password to remember. After accepting, you can
   open the `/keystatic` link any time and edit.

### Every edit
3. Open the `/keystatic` link.
4. Pick a page on the left, then a section (the sidebar is grouped by page, in page
   order). Each form starts with an ℹ️ info note explaining what it controls.
5. Type into the labeled boxes. Red box = text too long, shorten it. Required boxes
   can't be empty.
6. Lists (FAQ, stations, team, roles): add / remove / drag-reorder items.
7. Click **Save**.
8. Wait ~1 min, refresh the site to see it live. Save once — don't re-save.
9. Typo? Edit again, Save again. Only text is editable, so the site can't be broken.

Not editable here (ask a developer): layout, colors, images, animations, new sections.

---

## The only "migration" work

Promoting to production = **copy the approved `src/content/*.json`** into the
production repo and deploy it on Render. All the copy is just files and comes along;
the manual copy-over IS the review gate. The Render site needs no second CMS setup.
