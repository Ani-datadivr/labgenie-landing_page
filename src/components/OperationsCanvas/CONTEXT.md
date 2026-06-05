# Operations Canvas — handoff context

Context for anyone (human or AI) picking up the interactive **"One agent. Every
station."** section. Read this before editing.

## What it is
A full-bleed, interactive node-graph on the LabGenie marketing site that tells the
story: **Your ERP → LabGenie (the AI layer on top) → station sub-agents → insights.**
Users can switch teams, drag nodes, expand a station to fire a module, and chat with
LabGenie in plain English (Gemini-backed).

It lives in the homepage between `StatsBand` and `ModulesShowcase`
(`src/app/page.jsx`), rendered right before the "One operating system, built station
by station." heading.

## Stack reality (important)
This repo is **Next.js 14 App Router + Tailwind**, NOT React+Vite. Earlier task
prompts said "React + Vite / CSS Modules only / DM Serif fonts" — ignore that framing.
- Interactive components need `"use client"`.
- Fonts are Inter (body) / Space Grotesk (display) / JetBrains Mono (mono), exposed as
  CSS vars `--font-body` / `--font-display` / `--font-mono`. Consume those; don't
  hardcode fonts.
- The component uses **CSS Modules** (`OperationsCanvas.module.css`) which coexist fine
  with the site's Tailwind. Its color tokens (`--bg`, `--ink`, `--accent`, etc.) are
  scoped locally to `.section` so they don't override the site's global mint theme.

## File map
- `OperationsCanvas.jsx` — the whole component: data wiring, layout engine, rAF
  animation, chat logic, and sub-components (`ErpSource`, `ErpLogo`, `StationCard`,
  `MiniChart`, `LabGenieNode`). Default export `OperationsCanvas`.
- `OperationsCanvas.module.css` — all styles. (Some `.config*` / `.switch*` /
  `.tab*` classes are now DEAD — the config panel was removed — safe to delete.)
- `@/lib/operations.js` — **shared catalogue** (stations, modules, accents,
  `MODULE_DESCRIPTIONS`, `ALL_MODULES`, `stationIdForModule`). Single source of truth
  shared between the UI and the API route. Icons are NOT here (they're React
  components); the UI attaches them via `STATION_ICONS`.
- `src/app/api/labgenie-route/route.js` — server-side Gemini handler (key stays
  server-side).
- `public/erp/` — drop official ERP logo SVGs here (`sap.svg`, etc.); see its README.

## Data model
F&B Manufacturing → 3 groups (`gtm`, `factory`, `innovation`) → 10 stations → modules.
Each station: `{ id, group, short, label, accent, status, modules[] }`. Honesty rule:
only `qa` and `sales` are `status:"live"` (green "Live" chip); everything else is
`"planned"`. Don't present planned stations as shipped.

`MODULE_RESULTS` (in the .jsx) holds the canned demo output per module (title + lines,
or a `chart` for forecast-type modules). Module labels are unique across the whole
catalogue, so everything is keyed by label.

## The Gemini chat (conversational, not a classifier)
`POST /api/labgenie-route` with `{ query }` → returns either:
- `{ stationId, module, reply }` — run this module (and `reply` is LabGenie's line), or
- `{ reply }` — just a conversational answer (jokes, capability explanations, witty
  off-topic redirects), or
- `{ reply: null, error: "unconfigured" | "upstream" | "exception" }`.

Persona: a witty, F&B-savvy ops co-pilot. Off-topic → stays in character (F&B-themed
joke / playful redirect). It has the full station+module catalogue WITH descriptions in
its prompt, so it can explain what anything does. Structured output via Gemini
`responseSchema` (`reply` string + `module` enum constrained to real labels or "NONE").

### Model + quota (READ THIS before debugging "upstream" errors)
- Model: **`gemini-2.5-flash-lite`** (with `thinkingConfig.thinkingBudget: 0`).
- The owner's Google project free tier is capped **per day, per model**, and is tiny:
  `gemini-2.0-flash` = 0/day, `gemini-2.5-flash` = ~20/day, `gemini-1.5-flash*` = 404.
  Only `2.5-flash-lite` / `gemini-flash-latest` have usable free quota on this account.
- So a 429 `upstream` error is almost always the **daily quota**
  (`GenerateRequestsPerDayPerProjectPerModel-FreeTier`), resets ~midnight Pacific — NOT
  a bad key. Permanent fix: enable billing on the Google project (pennies/day here).
- Key is `GEMINI_API_KEY` in `.env.local`. **Env vars load only on dev-server startup —
  restart `npm run dev` after changing the key.** Note the key on this account starts
  `AQ.` (not the usual `AIza`) but authenticates fine.

### Cache
In-memory LRU-ish cache in the route (6h TTL, 500 entries) keyed by lowercased query.
Cache hits return `{ ...cached, cached: true }` and spend **no** quota. Per-instance
(fine for low traffic / single instance; on multi-instance serverless it's per-lambda).

### Client chat flow (`onChatSubmit`)
1. If the text is NOT conversational (`isConversational` = starts with a question/greeting
   word or ends with "?") → try the **strict local matcher** (`localMatch`, word-boundary
   only — it deliberately will NOT match "tell" inside "inTELLigence"). Hit → route
   instantly, no Gemini call.
2. Otherwise call Gemini. If it returns a module → run the route animation and show
   `reply` as the result. If only `reply` → show it as an in-node notice.
3. On error/unreachable → fall back to `localMatch`, else a toast. Module clicks and the
   quick chips bypass Gemini entirely (instant local routing). Direct module
   clicks/chips show the canned `MODULE_RESULTS`; Gemini routes show the spoken `reply`.

## Layout engine (`buildLayout`)
Computed in a `useMemo` from `dims` (measured once via `ResizeObserver`), `visibleIds`
(stations in the selected group), and `expanded`. Positions:
- **ERP** pinned far-left (the database cylinder), vertically centered.
- **LabGenie** pushed to the **centre** (`w/2 - NODE_W/2`), clamped so it always clears
  the ERP and leaves room on the right for the fan. Not draggable (it's the anchor).
- **Stations** fan out across the right side on a concave arc, then a **relaxation pass**
  (140 iters) repels node–node and node–obstacle overlaps and clamps everything inside
  the canvas with margins (`PAD=22`, inter-node `GAP=18`). Obstacles = ERP box, LabGenie
  box, and the top-center group selector. It accounts for each card's REAL height
  including an expanded dropdown, so expanding a station pushes neighbors away.
- Only the selected group's stations render (≤5). The old config panel + per-module
  hide/show was REMOVED; `visibleIds` is just all stations in the group.

Station cards are draggable via framer-motion **motion values** (`x`/`y`), so they can be
dragged AND re-flow smoothly (animated) when the group/expanded set changes.

## Animation (single rAF loop, refs not state)
One `requestAnimationFrame` loop drives everything by mutating SVG attributes via refs
(no per-frame React renders):
- **Brain → station wires**: cubic-bezier paths recomputed each frame from live
  `getBoundingClientRect()`, so they track dragged cards. Tinted to each station's accent
  with a soft glow filter.
- **ERP → LabGenie conduit**: a gradient "beam" (`#erp-conduit`) with **2 soft light
  pulses** sweeping toward LabGenie via animated `stroke-dashoffset` (premium look — the
  earlier discrete dots were removed by request).
- **Comm packet** (chat/chip/module route): a state machine in `flowRef`
  (`forward → hold(impact) → return → done`). Two-way for LabGenie-initiated (chat/chips:
  brain→station→brain), one-way for module clicks (station→brain). The glow color is the
  **target station's accent** (NOT pink — that was changed). On completion, `completeRoute`
  shows either the Gemini `reply` (if present) or the canned `MODULE_RESULTS` in the
  LabGenie node.

## Responsive
Below 900px the canvas is hidden (CSS) and a static, grouped station list renders inside
`.container-x` for accessibility (dragging isn't usable on touch).

## Gotchas / operational notes
- **Dev port drifts.** Restarts grab 3000/3001/3002/… whatever's free — read the
  `Local: http://localhost:XXXX` line; don't hardcode a port.
- **ERP logos 404 → wordmark fallback.** `ErpLogo` renders `/erp/<id>.svg`, falling back
  to the wordmark text on error. Until real SVGs are added to `public/erp/`, expect
  harmless `404 /erp/*.svg` in the terminal. The actual brand logos were NOT recreated
  (proprietary) — only logo-ready slots + wordmark placeholders.
- **Webpack pack-cache warnings** (`PackFileCacheStrategy … incorrect header check`) are
  cosmetic leftovers from an earlier disk-full incident; clear `.next/cache` (or `.next`)
  to silence. Non-fatal.
- **Disk:** the C: drive was critically low earlier in this project; a full disk makes
  Next fail to compile (`ENOSPC`). If pages stop compiling, check free space first.
- Don't re-add a loose substring matcher to `localMatch` — it caused "tell me a joke" to
  route to Market Intelligence ("inTELLigence"). Keep it word-boundary strict.

## Run / verify
```
npm run dev            # then open the printed localhost URL at /#operations
```
Quick checks: switch GTM/Factory/Innovation (nodes re-flow, no overlap/clipping); expand
a dropdown (neighbors repel); click a module (one-way packet → canned result); type
"forecast demand" (instant local route); type "tell me a joke" (Gemini → F&B joke);
"what does the OEE optimizer do" (Gemini → explanation). A repeat of the same question
should return instantly (cache).

## Possible next steps (not done)
- Real ERP logo SVGs in `public/erp/`.
- Enable Google billing for real Gemini headroom.
- Delete dead `.config*/.switch*/.tab*` CSS.
- Optional: persistent/shared cache (KV) if deployed multi-instance.
