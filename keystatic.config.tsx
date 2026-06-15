import { config, fields, singleton } from "@keystatic/core";

// Storage kind:
//   • GitHub mode once the GitHub App creds exist (KEYSTATIC_GITHUB_CLIENT_ID) —
//     this is the prod editing path; edits commit to the repo.
//   • Local files otherwise — dev editing with zero setup, AND it keeps
//     `next build` passing on Vercel before the App exists (GitHub mode REQUIRES
//     the creds at build time, or the build errors).
//   • To run Keystatic's one-time "Create GitHub App" wizard locally, force
//     GitHub mode in dev with `KEYSTATIC_STORAGE=github npm run dev` (dev doesn't
//     do the build-time validation). See DEPLOY.md §3.
// The reader (src/lib/cms.js) reads committed files either way, so the rendered
// site is unaffected by the storage kind.
const useGitHub =
  Boolean(process.env.KEYSTATIC_GITHUB_CLIENT_ID) ||
  process.env.KEYSTATIC_STORAGE === "github";
const storage = useGitHub
  ? ({
      kind: "github",
      repo: { owner: "Ani-datadivr", name: "labgenie-landing_page" },
    } as const)
  : ({ kind: "local" } as const);

export default config({
  storage,
  ui: {
    brand: { name: "LabGenie CMS" },
  },
  // Sidebar order matches the homepage top-to-bottom so editors can work down
  // the page. Every field is text-only with help text + length limits, so a
  // non-technical editor can publish directly without being able to break the
  // layout (anything structural/visual stays in code). In GitHub mode a Save
  // commits straight to the repo and the site rebuilds — no approval step.
  singletons: {
    home: singleton({
      label: "1 · Hero",
      path: "src/content/home",
      format: { data: "json" },
      schema: {
        titleLead: fields.text({
          label: "Headline — lead",
          description: "First part of the big hero headline (default color). Keep it short — about 3–6 words.",
          multiline: true,
          validation: { isRequired: true, length: { max: 60 } },
        }),
        titleAccent: fields.text({
          label: "Headline — accent",
          description: "End of the headline, shown in brand blue. 1–4 words.",
          validation: { isRequired: true, length: { max: 40 } },
        }),
        sub: fields.text({
          label: "Sub-headline",
          description: "One or two sentences under the headline.",
          multiline: true,
          validation: { isRequired: true, length: { max: 240 } },
        }),
        primaryLabel: fields.text({
          label: "Primary button — label",
          validation: { isRequired: true, length: { max: 28 } },
        }),
        primaryHref: fields.text({
          label: "Primary button — link",
          description: "Where the button goes, e.g. /contact",
          validation: { isRequired: true, length: { max: 200 } },
        }),
        secondaryLabel: fields.text({
          label: "Secondary button — label",
          validation: { length: { max: 28 } },
        }),
        secondaryHref: fields.text({
          label: "Secondary button — link",
          description: "e.g. /platform or #operations",
          validation: { length: { max: 200 } },
        }),
      },
    }),

    // ---- Homepage sections (text-only; visuals/animations stay in code) ----
    problem: singleton({
      label: "2 · Problem",
      path: "src/content/problem",
      format: { data: "json" },
      schema: {
        title: fields.text({
          label: "Section heading",
          multiline: true,
          validation: { isRequired: true, length: { max: 120 } },
        }),
        cards: fields.array(
          fields.object({
            area: fields.text({
              label: "Area (e.g. Quality)",
              validation: { isRequired: true, length: { max: 20 } },
            }),
            stat: fields.text({
              label: "Big stat (text)",
              description: "Shown as-is, e.g. “1.5–2 days”. Leave blank if using the animated count below.",
              validation: { length: { max: 24 } },
            }),
            countTo: fields.integer({
              label: "Animated count (optional)",
              description: "If set, the stat counts up to this number instead of showing the text above. Leave empty for a text stat.",
              validation: { isRequired: false },
            }),
            countSuffix: fields.text({
              label: "Count suffix (e.g. “+ requests”)",
              validation: { length: { max: 24 } },
            }),
            body: fields.text({
              label: "Description",
              multiline: true,
              validation: { isRequired: true, length: { max: 180 } },
            }),
          }),
          {
            label: "Cards",
            description: "Three cards work best on the layout. Each uses either a text stat or an animated count.",
            itemLabel: (props) => props.fields.area.value || "Card",
          }
        ),
        closing: fields.text({
          label: "Closing line",
          multiline: true,
          validation: { isRequired: true, length: { max: 160 } },
        }),
      },
    }),
    productVision: singleton({
      label: "3 · Product Vision",
      path: "src/content/product-vision",
      format: { data: "json" },
      schema: {
        kicker: fields.text({
          label: "Kicker (small label above heading)",
          validation: { length: { max: 24 } },
        }),
        title: fields.text({
          label: "Heading",
          multiline: true,
          validation: { isRequired: true, length: { max: 90 } },
        }),
        sub: fields.text({
          label: "Sub-headline",
          multiline: true,
          validation: { length: { max: 220 } },
        }),
        ctaLabel: fields.text({
          label: "Button label",
          validation: { length: { max: 32 } },
        }),
      },
    }),
    differentiation: singleton({
      label: "4 · Why LabGenie",
      path: "src/content/differentiation",
      format: { data: "json" },
      schema: {
        kicker: fields.text({
          label: "Kicker (small label above heading)",
          validation: { length: { max: 24 } },
        }),
        title: fields.text({
          label: "Heading",
          multiline: true,
          validation: { isRequired: true, length: { max: 90 } },
        }),
        intro: fields.text({
          label: "Lineage paragraph (left column)",
          multiline: true,
          validation: { length: { max: 240 } },
        }),
        yearsLabel: fields.text({
          label: "“Years working inside” label",
          validation: { length: { max: 40 } },
        }),
        yearsText: fields.text({
          label: "Years working inside — text",
          multiline: true,
          validation: { length: { max: 160 } },
        }),
        leadIn: fields.text({
          label: "Right column lead-in",
          multiline: true,
          validation: { length: { max: 280 } },
        }),
        knows: fields.array(
          fields.text({ label: "Point", validation: { length: { max: 160 } } }),
          {
            label: "“It already knows…” points",
            itemLabel: (props) => props.value || "Point",
          }
        ),
        closing: fields.text({
          label: "Closing line",
          multiline: true,
          validation: { length: { max: 200 } },
        }),
      },
    }),
    proofShowcase: singleton({
      label: "5 · Proof",
      path: "src/content/proof-showcase",
      format: { data: "json" },
      schema: {
        kicker: fields.text({
          label: "Kicker (small label above heading)",
          validation: { length: { max: 24 } },
        }),
        title: fields.text({
          label: "Heading",
          multiline: true,
          validation: { isRequired: true, length: { max: 90 } },
        }),
        sub: fields.text({
          label: "Sub-headline",
          description: "The customer cases, quotes, and animated visuals below are managed in code.",
          multiline: true,
          validation: { length: { max: 260 } },
        }),
      },
    }),
    faqs: singleton({
      label: "6 · FAQ",
      path: "src/content/faqs",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            question: fields.text({
              label: "Question",
              validation: { isRequired: true, length: { max: 140 } },
            }),
            answer: fields.text({
              label: "Answer",
              multiline: true,
              validation: { isRequired: true, length: { max: 900 } },
            }),
          }),
          {
            label: "Questions",
            description: "Add, remove, or reorder questions. Drag the handle to reorder.",
            itemLabel: (props) => props.fields.question.value || "Question",
          }
        ),
      },
    }),
    closingCta: singleton({
      label: "7 · Closing CTA",
      path: "src/content/closing-cta",
      format: { data: "json" },
      schema: {
        title: fields.text({
          label: "Heading",
          multiline: true,
          validation: { isRequired: true, length: { max: 90 } },
        }),
        sub: fields.text({
          label: "Sub-headline",
          multiline: true,
          validation: { length: { max: 240 } },
        }),
        primaryLabel: fields.text({
          label: "Primary button — label",
          validation: { isRequired: true, length: { max: 28 } },
        }),
        secondaryLabel: fields.text({
          label: "Secondary button — label",
          validation: { length: { max: 28 } },
        }),
      },
    }),
  },
});
