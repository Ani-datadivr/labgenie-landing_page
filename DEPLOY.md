# Deploying LabGenie to Vercel

The repo is deploy-ready: `next build` passes, both API routes run on the Node
runtime, and Keystatic falls back to local mode when its GitHub env vars are
absent (so the public site renders fine regardless). Follow this once.

---

## 1. Import the project (Vercel dashboard)

1. https://vercel.com → **Add New… → Project**.
2. **Import Git Repository** → authorize GitHub if asked → pick
   `Ani-datadivr/labgenie-landing_page`.
3. Framework Preset auto-detects **Next.js**. Leave Build Command (`next build`),
   Output, and Root Directory at their defaults. **Do not override anything.**
4. Add the environment variables below **before clicking Deploy** (see §2).
5. **Deploy.** You get a `https://<project>.vercel.app` URL. Every later push to
   `main` auto-deploys.

(CLI alternative: `npm i -g vercel` → `vercel link` → `vercel env add …` → `vercel --prod`.)

---

## 2. Environment variables (add in Vercel → Settings → Environment Variables)

Set each for **Production** and **Preview** (and Development if you use `vercel dev`).
These are NOT in the repo (`.env.local` is gitignored), so Vercel needs them
explicitly. If you add them after the first deploy, **redeploy** to apply.

| Name | Value | Required for |
|---|---|---|
| `GEMINI_API_KEY` | A real Google AI Studio key (starts with `AIzaSy…`) | The "Ask LabGenie" chat in the Operations Dashboard |
| `GEMINI_MODEL` | `gemini-2.5-flash` (optional) | Chat model override |
| `SLACK_WEBHOOK_URL` | Your Slack incoming webhook URL | Contact form → Slack lead |
| `NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT` | your `team/project` slug from keystatic.cloud (§3) | `/keystatic` editing on the live site |

### One-command env push (CLI)
Instead of pasting each value in the dashboard, you can push everything from your
already-filled local `.env.local`:
```bash
npm i -g vercel && vercel login && vercel link   # one time, pick the project
bash scripts/push-vercel-env.sh                  # pushes every var to Prod + Preview
vercel --prod                                     # deploy
```
Keystatic Cloud (§3) needs no secret keys here — just the one public
`NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT` slug, which you can add in the dashboard.

> **Gemini:** the token used in local dev (`AQ.Ab8…`) is **not** a standard API
> key and will not authenticate. Generate one at
> https://aistudio.google.com/apikey and use that. Without a valid key the chat
> degrades gracefully to local keyword routing (it won't crash, but answers
> aren't from Gemini).

> **Slack:** the same webhook from your `curl`/dev works as-is. The lead is sent
> server-side from `/api/contact`; the URL is never exposed to the browser.

---

## 3. Keystatic on Vercel (content editing) — Cloud mode

This is a **review sandbox**: editors edit here on Vercel, you review on the Vercel
URL, then you copy the approved `src/content/*.json` into the real (Render) repo.
Editors log in by **email invite — no GitHub account needed.**

- **The live site always renders correctly** — content lives in `src/content/`
  (committed to git) and is read at build time, independent of storage mode.
- **One-time Keystatic Cloud setup:**

  1. Go to https://keystatic.cloud → sign in → **create a team** (free, up to 3 users).
  2. **Create a project** inside the team and **connect it to the GitHub repo**
     `Ani-datadivr/labgenie-landing_page` (Keystatic installs its own GitHub App on
     the repo for you — you don't manage any OAuth keys).
  3. Note the project slug shown as **`team/project`** (e.g. `labgenie/landing-page`).
  4. In the project's settings, **add your Vercel domain(s)** to the allowed list
     (the `*.vercel.app` production URL, plus any custom domain). `localhost:3000`
     is allowed for local testing.
  5. In **Vercel → Settings → Environment Variables**, add
     `NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT = team/project` for **Production + Preview**,
     then **redeploy**.
  6. **Invite your 1–2 editors by email** from the Keystatic Cloud dashboard.

- After the redeploy, `/keystatic` on the live site asks editors to sign in to
  Keystatic Cloud (email), and **Save commits straight to `main`** → Vercel rebuilds
  in ~1 min → the change shows on the Vercel URL for you to review. No branches, no PRs.
- Editing locally still works with **zero setup** at `localhost:3000/keystatic` when
  `NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT` is unset (writes the JSON files directly; the
  running page is the live preview). See `KEYSTATIC.md`.

---

## 4. Post-deploy smoke test (do this on the live URL)

- [ ] Home loads; hero animates; dashboard + background render.
- [ ] All routes 200: `/platform` `/integrations` `/security` `/about` `/careers` `/manufacturers` `/contact`.
- [ ] **Operations Dashboard chat:** ask "match this RFP to our catalog" → you get a routed reply (real Gemini reply if the key is valid).
- [ ] **Contact form:** submit a test → the lead appears in your Slack channel.
- [ ] Mobile: nav, hero, dashboard, and tickers behave; no horizontal scroll.

---

## 5. Custom domain (optional)

Vercel → Project → **Settings → Domains** → add `labgenie.ai` (or a subdomain) and
follow the DNS records Vercel shows. Update `metadataBase` / `robots` / `sitemap`
hosts in `src/app` if you point a real domain at it.

---

## 6. Notes

- Node version: Vercel's default (Next 14) is fine; no `engines` pin needed.
- Images are local (`/public`), so no `next.config` remote-image domains are required.
- `package-lock.json` is committed, so Vercel installs the exact dependency
  versions that built successfully here.
