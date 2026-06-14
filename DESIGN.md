---
name: LabGenie
description: The AI operating system for F&B ingredient manufacturers — Datadivr-aligned dark brand site.
colors:
  brand-blue: "#0066FF"
  azure: "#5AA0FF"
  accent-text: "#6BAAFF"
  ink: "#0E141C"
  bg-elev: "#131A24"
  surface: "#18212E"
  surface-2: "#1F2A3A"
  text: "#EDF1F6"
  muted: "#A6B2C2"
  dim: "#97A4B6"
  flag-amber: "#FFB454"
typography:
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 3.6rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.22em"
  brand:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
rounded:
  md: "14px"
  lg: "20px"
  pill: "999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.brand-blue}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: LabGenie

## 1. Overview

**Creative North Star: "The Lit Instrument Panel"**

LabGenie is a dark, engineered surface that reads like precision instrumentation glowing in a low-lit control room. The product reconciles messy COAs against customer specs in minutes; the site should feel like watching that machine work — calm ink fields, hairline structure, and a single electric-blue signal that lights up where something resolves. The palette is deliberately disciplined: one brand blue, one supporting azure, an ink ground, and white. Warmth is rationed to a single amber that means exactly one thing — out of spec.

This system is **Datadivr-aligned**. As Datadivr transitions to a product company, LabGenie is the flagship product, and its identity carries Datadivr's exact mark (an open dial arc with five spectrum dots) and brand blue (#0066FF). Consistency with that identity outranks standalone novelty.

It explicitly rejects four things: **generic dark SaaS** (no purple-gradient hero-metric template, no endless identical icon-cards), **legacy enterprise ERP** (not the cluttered gray industrial look it replaces), **consumer food branding** (no warm appetite-appeal CPG styling — this is B2B infrastructure), and **overhyped AI startup** voice (show the mechanism, never claim magic).

**Key Characteristics:**
- Ink-grounded dark surface (#0E141C) with cool blue-tinted neutrals stepped above it.
- One electric-blue brand signal; everything else is structural neutral.
- Hairline borders and grid structure over heavy cards or shadows.
- Motion that demonstrates the product working (reconciliation scan line, orchestration), gated by reduced-motion.

## 2. Colors

A near-monochrome blue-on-ink system: one saturated brand blue carries all signal, neutrals are cool-tinted, and a lone amber marks failure.

### Primary
- **Datadivr Blue** (#0066FF): The brand signal and the official Datadivr/LabGenie blue. Used as a **fill and on large display type only** — primary CTAs, the logo's spectrum dots, accent words on large headings ("manufacturers."), focus rings, the reconciliation scan line, resolved-match states, and the interactive background-grid hover. At ~3.83:1 on ink it clears AA for large text but not body; it is never used for small text. This is the only saturated color on the page.
- **Accent Text** (#6BAAFF): A lighter tint of the brand blue reserved for **small blue text** — mono kickers, data labels, inline emphasis, links, status chips. At ~7.77:1 on ink it meets AAA, where #0066FF would fail. Visually the same signal; legible at body sizes.

### Secondary
- **Azure** (#5AA0FF): A lighter tint of the brand blue for depth — gradient lift on the primary button, ambient orb glows, and the brighter end of the background-grid hover spectrum. Never competes with the brand blue; it supports it.

### Neutral
- **Ink** (#0E141C): The body ground. The official Datadivr dark. Everything sits on this.
- **Elevated / Surface / Surface-2** (#131A24 / #18212E / #1F2A3A): Cool blue-tinted panel tiers, each a step lighter, for cards, the COA panel, and nav surfaces.
- **Text** (#EDF1F6): Near-white primary text on ink (~16:1, AAA).
- **Muted** (#A6B2C2): Secondary/body-supporting text (~8.6:1 on ink, AAA body).
- **Dim** (#97A4B6): Tertiary labels and de-emphasized metadata only. Lifted to ~7.3:1 on ink so even tertiary text stays AAA.

### Tertiary
- **Flag Amber** (#FFB454): Reserved exclusively for out-of-spec / flagged states (e.g. a failing Lead (Pb) row). It is a status color, not a brand color.

### Named Rules
**The One Signal Rule.** Datadivr Blue is the only saturated hue on any screen. If a second saturated color appears for decoration, delete it. Azure (#5AA0FF) and Accent Text (#6BAAFF) are tints of the same blue, not separate colors.

**The Small-Text-Is-Accent-Text Rule.** #0066FF is a fill and large-display color only (~3.83:1 on ink). Any blue text below large-heading size uses #6BAAFF (~7.77:1, AAA) instead. Reaching for `text-accent` on a label or body span is the bug; the token is `accent-text`.

**The Amber-Means-Failure Rule.** Amber appears only where a value is out of spec. Never as decoration, never as a generic accent. If nothing has failed, there is no amber on the screen.

## 3. Typography

**Display Font:** Bricolage Grotesque (with system-ui, sans-serif)
**Body Font:** Archivo (with system-ui, sans-serif)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, monospace)
**Brand Wordmark Font:** Manrope (logo lockup only — "labgenie.ai")

**Character:** A contrast grotesque display (Bricolage Grotesque) over a precise, screen-built grotesque body (Archivo), with a mono voice reserved for data and labels. The pairing reads engineered and chosen, not defaulted. (This deliberately replaced Space Grotesk + Inter, which are training-data-default faces; the `$10K-checklist` pass called for fonts that are "neither Inter nor Roboto.") Manrope appears only in the official logo lockup; it is not a fourth body face.

### Hierarchy
- **Display / H1** (500, clamp(2.5rem, 5vw, 3.6rem), 1.05, -0.02em): Hero and page headlines. `text-wrap: balance`.
- **Headline / H2** (500, ~2rem, 1.05): Section titles.
- **Title / H3** (500, ~1.25rem, 1.1): Card and module headings.
- **Body** (400, 1rem, 1.6): Prose. Capped ~65–75ch via `max-w-xl` lead blocks.
- **Label / Mono** (400, 11px, 0.22em, UPPERCASE): Eyebrows, data tags, station labels — short strings only.

### Named Rules
**The Mono-For-Data Rule.** JetBrains Mono is for labels, specs, and numbers — never for body sentences. Mono prose reads as costume.

## 4. Elevation

The system is structural-flat: depth comes from cool tonal layering (ink → elevated → surface → surface-2) and hairline borders, not from heavy drop shadows. Shadows are used sparingly and only for the brand glow on interactive elements and to float the signature panels.

### Shadow Vocabulary
- **Brand glow** (`box-shadow: 0 0 0 1px rgba(0,102,255,0.30), 0 0 40px -8px rgba(0,102,255,0.40)`): Reserved for the brand signal on focused/active interactive surfaces.
- **Panel float** (`box-shadow: 0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 60px -30px rgba(0,0,0,0.8)`): The lifted surface under signature panels (COA reconciliation, modules).
- **CTA lift** (`box-shadow: 0 8px 30px -10px rgba(0,102,255,0.75)`): Primary button only.

### Named Rules
**The Hairline-First Rule.** Define structure with 1px borders at `rgba(255,255,255,0.08)` before reaching for a shadow. Shadows are for the brand glow and floating panels, not for separating every block.

## 5. Components

### Logo
- **Mark:** An open arc (genie dial) drawn in `currentColor` with five Datadivr-blue (#0066FF) spectrum dots stepping down its right side. Exact official artwork — never redraw or recolor the dots.
- **Wordmark:** "labgenie" in text color + ".ai" in brand blue, set in Manrope, lowercase, tracking -0.02em.

### Buttons
- **Shape:** Rounded (14px / `rounded-xl`).
- **Primary:** Blue gradient (`#1A78FF → #0066FF`), white text, semibold, CTA-lift shadow. White-on-blue, matching the logo.
- **Hover / Focus:** Brightness +8%, deeper blue glow; focus-visible ring in brand blue, 2px offset.
- **Ghost:** Transparent on a strong hairline border, text color; hover lifts background to `rgba(255,255,255,0.06)`.

### Cards / Panels
- **Corner Style:** 20px (`rounded-2xl`).
- **Background:** `surface` (#18212E) with a faint top-down white sheen gradient.
- **Shadow Strategy:** Panel-float (see Elevation). Flat at rest otherwise.
- **Border:** 1px hairline `rgba(255,255,255,0.08)`; `panel-hover` lifts to `rgba(255,255,255,0.14)`.
- **Internal Padding:** 24px.

### Inputs / Fields
- **Style:** Surface fill, hairline border, 14px radius.
- **Focus:** Brand-blue ring (2px, 2px offset) via the global `:focus-visible` rule.

### Navigation
- **Style:** Transparent bar over ink, logo left, mono-ish links, blue primary CTA right. Collapses to a hamburger below the desktop breakpoint.

### Interactive Background Grid (signature)
- A skewed grid of cells. On cursor hover a cell fills instantly with a color from the brand cool-blue spectrum (blue / azure / sky / cyan / indigo), then fades back over ~2s. Pure CSS `:hover` + transition (no per-cell JS) so thousands of cells stay smooth; collapsed to instant by `prefers-reduced-motion`. Sits behind the hero under a radial mask that keeps copy readable.

### Reconciliation Panel (signature)
- The hero visual: three spec streams reconciled row by row with a brand-blue scan line. Matched rows resolve to brand blue; flagged rows to amber. Color is never the sole signal — match/flag also carry an icon.

## 6. Do's and Don'ts

### Do:
- **Do** use Datadivr Blue (#0066FF) as the single saturated signal — CTAs, the logo dots, resolved states, focus rings, the grid hover.
- **Do** ground every surface on Ink (#0E141C) and step neutrals upward with cool blue-tinted tiers.
- **Do** keep body text at #EDF1F6 / #A6B2C2 for AAA contrast on ink; reserve #97A4B6 for tertiary metadata only.
- **Do** use Accent Text (#6BAAFF) for any small blue text — labels, links, inline emphasis, chips; #0066FF small text fails AAA.
- **Do** render the logo from the exact official artwork (white arc + five #0066FF dots, "labgenie.ai" in Manrope). Retain it precisely.
- **Do** gate every animation behind `prefers-reduced-motion` with a non-motion fallback, and keep content visible by default (never gate visibility on a motion reveal).
- **Do** carry status meaning with an icon plus color, never color alone.

### Don't:
- **Don't** build **generic dark SaaS**: no purple-gradient hero, no hero-metric template, no endless identical icon-heading-text card grids.
- **Don't** drift toward **legacy enterprise ERP**: no cluttered gray industrial chrome.
- **Don't** use **consumer food-brand** warmth: no appetite-appeal CPG styling. Amber is failure-only, not a warm accent.
- **Don't** adopt **overhyped AI startup** voice or visuals: no breathless magic-box claims; show the mechanism.
- **Don't** introduce a second saturated color. Azure is a tint of the brand blue, not a new hue.
- **Don't** use `border-left`/`border-right` > 1px as a colored stripe, gradient-clipped text as a new choice, or decorative glassmorphism.
- **Don't** set body copy in JetBrains Mono — mono is for labels, specs, and numbers only.
