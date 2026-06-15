# Staging → Production runbook (CMS editing + repo move)

How to let a non-technical person perfect the site copy on a **staging** deploy,
then promote the finished site to the **production** repo on Render.

Why this works: all editable copy lives as JSON in `src/content/*.json`. Editors
just change those files through a friendly form at `/keystatic`. When you push the
codebase to another repo, the finalized copy travels with it — nothing is re-entered.

> **Secrets note:** the values below are set as **environment variables** on the
> host (Vercel/Render). Never commit them to the repo. `.env.local` is gitignored.

---

## Environment variables (the full set)

| Variable | How to get it |
|---|---|
| `KEYSTATIC_SECRET` | Generate once: `openssl rand -hex 32` (signs editor sessions) |
| `SLACK_WEBHOOK_URL` | Your Slack incoming webhook (contact form → Slack lead) |
| `GEMINI_API_KEY` | Create at https://aistudio.google.com/apikey (starts `AIzaSy…`). A dev `AQ.…` token will NOT authenticate in prod |
| `KEYSTATIC_GITHUB_CLIENT_ID` | Shown by GitHub at the end of the "Create GitHub App" wizard |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | Same wizard screen |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | The slug of the app you create in the wizard |

The GitHub three cannot be pre-generated — they're created by GitHub when you mint
the app. A GitHub App is tied to **one repo**, so the staging and production repos
each need their own app.

---

## Part A — Owner steps

### Phase 1 — Staging on Vercel (perfect the copy here; nothing public)

1. Push the site to the **test repo**; Vercel auto-deploys staging.
2. Vercel → test project → **Settings → Environment Variables** (set for Production):
   `KEYSTATIC_SECRET`, `SLACK_WEBHOOK_URL`, `GEMINI_API_KEY`.
3. **Redeploy.**
4. Open `https://<test-app>.vercel.app/keystatic` → **"Create GitHub App"** → name it
   (e.g. `labgenie-cms`) → approve on GitHub. It shows the 3 GitHub values.
5. Add those 3 to Vercel env vars → **Redeploy**.
6. Invite the editor: GitHub → test repo → **Settings → Collaborators → Add people**.
7. Send them the `/keystatic` link + `EDITOR_GUIDE.md`. Review on staging until the
   copy is flawless.

### Phase 2 — Production on Render (when copy is final)

8. Push this codebase to the **production repo** (finalized `src/content/*.json` rides along).
9. Update `keystatic.config.tsx` → `repo: { owner, name }` to the production repo.
10. Render → **New → Web Service** → connect the production repo → **Build:** `next build`,
    **Start:** `next start` → add env vars (`KEYSTATIC_SECRET`, `GEMINI_API_KEY`, `SLACK_WEBHOOK_URL`).
11. On the live Render URL open `/keystatic` → **"Create GitHub App"** again (new repo =
    new app) → add its 3 values to Render → redeploy.
12. Done. Editor saves commit to the production repo; Render auto-redeploys.

> Render notes: works for Next.js, but you set Build/Start commands manually, and
> free-tier services sleep when idle (first hit after idle is slow). Auto-deploys on
> push, so the Save → commit → rebuild loop works like Vercel.

---

## Part B — Non-technical editor steps

### One-time setup (~3 min)
1. Create a free account at https://github.com (username/email only — no coding).
2. Accept the collaborator invite (GitHub emails it; or `github.com/<owner>/<repo>/invitations`).
3. Open the `/keystatic` link → **Sign in with GitHub** → **Authorize**.

### Every edit
4. Open the `/keystatic` link.
5. Pick a section on the left (numbered `1 · Hero` → `7 · Closing CTA`, in page order).
6. Type into the labeled boxes. Red box = text too long, shorten it. Required boxes
   can't be empty.
7. Lists (FAQ, Problem cards): add / remove / drag-reorder items.
8. Click **Save**.
9. Wait ~1–2 min, refresh the site to see it live. Save once — don't re-save.
10. Typo? Edit again, Save again. Only text is editable, so the site can't be broken.

Not editable here (ask a developer): layout, colors, images, animations, new sections.

---

## The only "migration" work

Switching repos = **one line** in `keystatic.config.tsx` (`owner`/`name`) + **re-running
the GitHub App wizard** on the new host. All the copy is just files and comes along.
