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
| `KEYSTATIC_SECRET` | a random 32-byte hex (`openssl rand -hex 32`) | `/keystatic` editor session signing |
| `KEYSTATIC_GITHUB_CLIENT_ID` | from the GitHub App wizard (§3) | `/keystatic` editing on the live site |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | from the GitHub App wizard (§3) | same |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | from the GitHub App wizard (§3) | same |

### One-command env push (CLI)
Instead of pasting each value in the dashboard, you can push everything from your
already-filled local `.env.local`:
```bash
npm i -g vercel && vercel login && vercel link   # one time, pick the project
bash scripts/push-vercel-env.sh                  # pushes every var to Prod + Preview
vercel --prod                                     # deploy
```
Re-run `push-vercel-env.sh` after the §3 wizard adds the GitHub App values to `.env.local`.

> **Gemini:** the token used in local dev (`AQ.Ab8…`) is **not** a standard API
> key and will not authenticate. Generate one at
> https://aistudio.google.com/apikey and use that. Without a valid key the chat
> degrades gracefully to local keyword routing (it won't crash, but answers
> aren't from Gemini).

> **Slack:** the same webhook from your `curl`/dev works as-is. The lead is sent
> server-side from `/api/contact`; the URL is never exposed to the browser.

---

## 3. Keystatic on Vercel (content editing)

- **The live site always renders correctly** — content lives in `src/content/`
  (committed to git) and is read at build time, independent of storage mode.
- Storage is now **GitHub mode automatically on Vercel** (and local files in dev),
  so on-prod editing is wired. To finish it, mint the GitHub App once:

  1. Deploy first (with at least `KEYSTATIC_SECRET` set).
  2. Open `https://<your-app>.vercel.app/keystatic`. Keystatic shows a
     **"Create GitHub App"** button (because the app isn't registered yet).
  3. Click it and approve on GitHub. GitHub creates the App on
     `Ani-datadivr/labgenie-landing_page` and redirects back; Keystatic then
     **shows you** `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`,
     and the app slug.
  4. Add those three to Vercel as `KEYSTATIC_GITHUB_CLIENT_ID`,
     `KEYSTATIC_GITHUB_CLIENT_SECRET`, and `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`
     (paste them into `.env.local` and re-run `scripts/push-vercel-env.sh`, or add
     in the dashboard), then **redeploy**.
  5. Now `/keystatic` on the live site lets approved GitHub users edit content;
     each save is a commit to the repo, which auto-redeploys.

- Editing locally still works with zero setup at `localhost:3000/keystatic`
  (writes the JSON files directly). See `KEYSTATIC.md`.

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
