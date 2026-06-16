import { config, fields, singleton } from "@keystatic/core";

// =============================================================================
// LabGenie CMS — every page, every section, edited by a non-technical editor.
//
// One singleton per visual section, grouped by page in the sidebar (see
// `ui.navigation`). Each section starts with a "Show on the website" toggle, so
// an unneeded section is switched off (reversible — nothing is deleted). Lists
// (FAQs, stations, team, roles, badges, nav/footer links) add/remove/reorder
// freely. Text only — visuals, icons, and animations stay in code, so an editor
// can never break the layout. Page lead sections also carry SEO (browser tab +
// Google snippet).
//
// Storage:
//   • Keystatic Cloud on the deployed site (production build) — the editing path
//     for non-technical editors. They're invited by email at keystatic.cloud (no
//     GitHub account needed) and Save commits straight to this repo, which
//     redeploys the Vercel sandbox. No host env vars or secret keys required.
//   • Local files in `npm run dev` — zero-setup editing; the running localhost
//     site is the live preview, and a developer never has to log in to edit.
// The reader (src/lib/cms.js) reads the committed JSON in `src/content/` either
// way, so the rendered site is unaffected by the storage kind.
// =============================================================================

// Keystatic Cloud project slug (keystatic.cloud → your project). Hardcoded so the
// deployed editor "just works" with no Vercel env var; override with
// NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT if the project is ever renamed.
const CLOUD_PROJECT =
  process.env.NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT ||
  "website-designers/labgenie-landing";

// Cloud on a production build (Vercel, or `npm run build && npm start`); local
// files in `npm run dev`. NODE_ENV is inlined by Next on both client and server,
// so the admin UI and the reader agree on the storage kind.
const useCloud = process.env.NODE_ENV === "production";

const storage = useCloud
  ? ({ kind: "cloud" } as const)
  : ({ kind: "local" } as const);

// ---- Reusable field helpers (factories → fresh descriptor each call) --------

// "Show this section" toggle — also the section's info box. Ticked by default;
// untick to hide the whole section from the live page without deleting anything.
// Pass `note` to describe what this specific section controls / what stays in code.
const showToggle = (note?: string) =>
  fields.checkbox({
    label: "Show this section on the website",
    description:
      "ℹ️ " +
      (note
        ? note + " "
        : "Edit the text in the fields below — lengths are capped so nothing can break the layout. Photos, icons, and animations stay in code. ") +
      "Untick to hide this whole section from the live page (nothing is deleted — tick again to bring it back).",
    defaultValue: true,
  });

// A leading info box for sections that have no Show/Hide toggle. Renders as help
// text under the first field. Use `info(note)` as a field's description.
const info = (note: string) => `ℹ️ ${note}`;

// Per-page SEO. Lives on each page's top/lead section.
const seoField = () =>
  fields.object(
    {
      title: fields.text({
        label: "Browser tab title",
        description:
          "Shows in the browser tab and as the blue link in Google. Best around 60 characters. Leave blank to use the site default.",
        validation: { length: { max: 70 } },
      }),
      description: fields.text({
        label: "Search description",
        description:
          "The grey summary under the title in Google search results. Best around 150 characters.",
        multiline: true,
        validation: { length: { max: 200 } },
      }),
    },
    { label: "SEO — browser tab & Google", description: "How this page looks in a browser tab and in search results." }
  );

// A standard "eyebrow / heading / sub" header trio used by inner pages.
const headerFields = () => ({
  eyebrow: fields.text({
    label: "Eyebrow (small label above the title)",
    validation: { length: { max: 40 } },
  }),
  title: fields.text({
    label: "Page title",
    multiline: true,
    validation: { isRequired: true, length: { max: 120 } },
  }),
  sub: fields.text({
    label: "Sub-headline",
    multiline: true,
    validation: { length: { max: 320 } },
  }),
});

// A closing call-to-action band (FinalCTA): eyebrow + title + sub.
const finalCtaFields = () => ({
  eyebrow: fields.text({ label: "Eyebrow", validation: { length: { max: 40 } } }),
  title: fields.text({
    label: "Heading",
    multiline: true,
    validation: { isRequired: true, length: { max: 120 } },
  }),
  sub: fields.text({
    label: "Sub-headline",
    multiline: true,
    validation: { length: { max: 260 } },
  }),
});

export default config({
  storage,
  ...(useCloud ? { cloud: { project: CLOUD_PROJECT } } : {}),
  ui: {
    brand: { name: "LabGenie CMS" },
    // The sidebar is grouped by page, top-to-bottom, so a first-time editor
    // works down each page the way a visitor reads it.
    navigation: {
      "Home page": [
        "home",
        "problem",
        "productVision",
        "differentiation",
        "proofShowcase",
        "faqs",
        "closingCta",
      ],
      "Platform page": ["platformIntro", "platformStations", "platformCta"],
      "For Manufacturers page": [
        "mfHeader",
        "mfSegments",
        "mfBuyers",
        "mfDaily",
        "mfHowWeWork",
        "mfCta",
      ],
      "About page": [
        "aboutHeader",
        "aboutStory",
        "aboutTeam",
        "aboutPrinciples",
        "aboutNumbers",
        "aboutCta",
      ],
      "Security page": [
        "secHeader",
        "secControls",
        "secCompliance",
        "secDataFlow",
        "secResponsibleAi",
        "secContact",
        "secCta",
      ],
      "Careers page": [
        "careersHeader",
        "careersHowWeWork",
        "careersRoles",
        "careersCta",
      ],
      "Integrations page": ["intHeader", "intHowItConnects", "intCta"],
      "Contact page": ["contactHeader", "contactProgram", "contactForm"],
      "Site-wide": ["navbar", "footer", "siteSettings"],
    },
  },
  singletons: {
    // =========================================================================
    // HOME PAGE
    // =========================================================================
    home: singleton({
      label: "Hero",
      path: "src/content/home",
      format: { data: "json" },
      schema: {
        visible: showToggle(
          "The top of the homepage — the big headline, sub-line, and two buttons. The animated product console below the buttons is a live demo and stays in code."
        ),
        titleLead: fields.text({
          label: "Headline — lead",
          description:
            "First part of the big hero headline (default color). Keep it short — about 3–6 words.",
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
        seo: seoField(),
      },
    }),

    problem: singleton({
      label: "Problem",
      path: "src/content/problem",
      format: { data: "json" },
      schema: {
        visible: showToggle(),
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
              description:
                "Shown as-is, e.g. “1.5–2 days”. Leave blank if using the animated count below.",
              validation: { length: { max: 24 } },
            }),
            countTo: fields.integer({
              label: "Animated count (optional)",
              description:
                "If set, the stat counts up to this number instead of showing the text above. Leave empty for a text stat.",
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
            description:
              "Three cards work best on the layout. Each uses either a text stat or an animated count.",
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
      label: "Product Vision",
      path: "src/content/product-vision",
      format: { data: "json" },
      schema: {
        visible: showToggle(),
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
      label: "Why LabGenie",
      path: "src/content/differentiation",
      format: { data: "json" },
      schema: {
        visible: showToggle(),
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
      label: "Proof",
      path: "src/content/proof-showcase",
      format: { data: "json" },
      schema: {
        visible: showToggle(
          "The proof section: the heading, the two customer tabs, and each case's quote and bullet points. The blend-correction animation on the second tab stays in code."
        ),
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
          validation: { length: { max: 260 } },
        }),
        cases: fields.array(
          fields.object({
            tab: fields.text({
              label: "Tab name (customer)",
              validation: { isRequired: true, length: { max: 40 } },
            }),
            tabSub: fields.text({
              label: "Tab sub-label",
              validation: { length: { max: 40 } },
            }),
            descriptor: fields.text({
              label: "Descriptor line",
              multiline: true,
              validation: { length: { max: 120 } },
            }),
            quote: fields.text({
              label: "Quote / paragraph",
              description: "Shown as the customer quote or case paragraph.",
              multiline: true,
              validation: { length: { max: 400 } },
            }),
            points: fields.array(
              fields.text({ label: "Point", validation: { length: { max: 140 } } }),
              { label: "Bullet points", itemLabel: (props) => props.value || "Point" }
            ),
            statLabel: fields.text({
              label: "Stat caption (first tab only)",
              description:
                "The small line above the before→after numbers, e.g. “To match a customer RFP against your specs”. Used on the first tab only; leave blank on others.",
              validation: { length: { max: 80 } },
            }),
            statBefore: fields.text({
              label: "Stat — before (struck through)",
              description: "e.g. “1.5 days”.",
              validation: { length: { max: 20 } },
            }),
            statAfter: fields.text({
              label: "Stat — after",
              description: "e.g. “5 min”.",
              validation: { length: { max: 20 } },
            }),
          }),
          {
            label: "Customer cases",
            description:
              "The two flagship cases. The customer logos and the second tab's animation stay in code; this is the text around them.",
            itemLabel: (props) => props.fields.tab.value || "Case",
          }
        ),
      },
    }),

    faqs: singleton({
      label: "FAQ",
      path: "src/content/faqs",
      format: { data: "json" },
      schema: {
        visible: showToggle(
          "The FAQ section: the small heading on the left and the list of questions on the right. Edit both below."
        ),
        kicker: fields.text({
          label: "Kicker (small label, left column)",
          validation: { length: { max: 24 } },
        }),
        heading: fields.text({
          label: "Heading (left column)",
          multiline: true,
          validation: { length: { max: 90 } },
        }),
        intro: fields.text({
          label: "Intro line (left column)",
          multiline: true,
          validation: { length: { max: 200 } },
        }),
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
            description:
              "Add, remove, or reorder questions. Drag the handle to reorder.",
            itemLabel: (props) => props.fields.question.value || "Question",
          }
        ),
      },
    }),

    closingCta: singleton({
      label: "Closing CTA",
      path: "src/content/closing-cta",
      format: { data: "json" },
      schema: {
        visible: showToggle(),
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

    // =========================================================================
    // PLATFORM PAGE
    // =========================================================================
    platformIntro: singleton({
      label: "Page intro & SEO",
      path: "src/content/platform-intro",
      format: { data: "json" },
      schema: {
        title: fields.text({
          label: "Console heading",
          description: info(
            "The heading + sub above the live operations console at the top of /platform. The console itself (the interactive demo) is built in code. Leave blank to keep the built-in wording."
          ),
          multiline: true,
          validation: { length: { max: 120 } },
        }),
        sub: fields.text({
          label: "Console sub-headline",
          multiline: true,
          validation: { length: { max: 240 } },
        }),
        seo: seoField(),
      },
    }),

    platformStations: singleton({
      label: "Stations",
      path: "src/content/platform-stations",
      format: { data: "json" },
      schema: {
        visible: showToggle(
          "The list of station feature rows. Edit each station's name, status, headline, body, and points. Each station's product illustration stays in code and is matched by order — don't reorder unless a developer re-maps the visuals."
        ),
        items: fields.array(
          fields.object({
            name: fields.text({
              label: "Station name",
              validation: { isRequired: true, length: { max: 40 } },
            }),
            status: fields.text({
              label: "Status (Live / In build / Roadmap)",
              validation: { length: { max: 20 } },
            }),
            headline: fields.text({
              label: "Headline",
              multiline: true,
              validation: { isRequired: true, length: { max: 90 } },
            }),
            body: fields.text({
              label: "Description",
              multiline: true,
              validation: { isRequired: true, length: { max: 320 } },
            }),
            points: fields.array(
              fields.text({ label: "Point", validation: { length: { max: 160 } } }),
              {
                label: "Bullet points (optional)",
                itemLabel: (props) => props.value || "Point",
              }
            ),
          }),
          {
            label: "Stations",
            description:
              "Each station's illustration/mockup stays in code and is matched by order. Reorder carefully.",
            itemLabel: (props) => props.fields.name.value || "Station",
          }
        ),
      },
    }),

    platformCta: singleton({
      label: "Final CTA",
      path: "src/content/platform-cta",
      format: { data: "json" },
      schema: { visible: showToggle(), ...finalCtaFields() },
    }),

    // =========================================================================
    // FOR MANUFACTURERS PAGE
    // =========================================================================
    mfHeader: singleton({
      label: "Page header & SEO",
      path: "src/content/mf-header",
      format: { data: "json" },
      schema: { visible: showToggle(), ...headerFields(), seo: seoField() },
    }),

    mfSegments: singleton({
      label: "Industry segments & partners",
      path: "src/content/mf-segments",
      format: { data: "json" },
      schema: {
        visible: showToggle(
          "The animated line under the header (“Years of domain knowledge with manufacturers of …”) that cycles through F&B categories, plus the label above the scrolling partner logos. The partner logos themselves are images managed in code."
        ),
        leadIn: fields.text({
          label: "Lead-in line",
          description: "The fixed text before the cycling category word.",
          validation: { length: { max: 80 } },
        }),
        umbrella: fields.text({
          label: "Umbrella word (reduced-motion fallback)",
          description:
            "Shown in place of the animation for visitors who turn off motion, e.g. “food & beverage”.",
          validation: { length: { max: 40 } },
        }),
        segments: fields.array(
          fields.text({ label: "Category", validation: { length: { max: 40 } } }),
          {
            label: "F&B categories (cycled)",
            description: "Add, remove, or reorder the words that cycle at the end of the line.",
            itemLabel: (props) => props.value || "Category",
          }
        ),
        partnersLabel: fields.text({
          label: "Partner-logos label",
          description: "The small caption above the scrolling logos near the bottom of the page.",
          validation: { length: { max: 60 } },
        }),
      },
    }),

    mfBuyers: singleton({
      label: "Economic buyers",
      path: "src/content/mf-buyers",
      format: { data: "json" },
      schema: {
        visible: showToggle(),
        eyebrow: fields.text({ label: "Eyebrow", validation: { length: { max: 40 } } }),
        title: fields.text({
          label: "Heading",
          multiline: true,
          validation: { length: { max: 120 } },
        }),
        items: fields.array(
          fields.object({
            role: fields.text({
              label: "Role",
              validation: { isRequired: true, length: { max: 40 } },
            }),
            pain: fields.text({
              label: "Pain point",
              multiline: true,
              validation: { isRequired: true, length: { max: 220 } },
            }),
          }),
          { label: "Buyers", itemLabel: (props) => props.fields.role.value || "Buyer" }
        ),
      },
    }),

    mfDaily: singleton({
      label: "Daily users",
      path: "src/content/mf-daily",
      format: { data: "json" },
      schema: {
        visible: showToggle(),
        eyebrow: fields.text({ label: "Eyebrow", validation: { length: { max: 40 } } }),
        title: fields.text({
          label: "Heading",
          multiline: true,
          validation: { length: { max: 120 } },
        }),
        items: fields.array(
          fields.object({
            role: fields.text({
              label: "Role",
              validation: { isRequired: true, length: { max: 40 } },
            }),
            win: fields.text({
              label: "Win",
              multiline: true,
              validation: { isRequired: true, length: { max: 220 } },
            }),
          }),
          { label: "Users", itemLabel: (props) => props.fields.role.value || "User" }
        ),
      },
    }),

    mfHowWeWork: singleton({
      label: "How we work",
      path: "src/content/mf-how-we-work",
      format: { data: "json" },
      schema: {
        visible: showToggle(),
        eyebrow: fields.text({ label: "Eyebrow", validation: { length: { max: 40 } } }),
        title: fields.text({
          label: "Heading",
          multiline: true,
          validation: { length: { max: 140 } },
        }),
        traits: fields.array(
          fields.object({
            title: fields.text({
              label: "Trait title",
              validation: { isRequired: true, length: { max: 60 } },
            }),
            note: fields.text({
              label: "Trait description",
              multiline: true,
              validation: { isRequired: true, length: { max: 200 } },
            }),
          }),
          {
            label: "Traits",
            description: "Icons are assigned in code by order.",
            itemLabel: (props) => props.fields.title.value || "Trait",
          }
        ),
      },
    }),

    mfCta: singleton({
      label: "Final CTA",
      path: "src/content/mf-cta",
      format: { data: "json" },
      schema: { visible: showToggle(), ...finalCtaFields() },
    }),

    // =========================================================================
    // ABOUT PAGE
    // =========================================================================
    aboutHeader: singleton({
      label: "Page header & SEO",
      path: "src/content/about-header",
      format: { data: "json" },
      schema: { visible: showToggle(), ...headerFields(), seo: seoField() },
    }),

    aboutStory: singleton({
      label: "Our story",
      path: "src/content/about-story",
      format: { data: "json" },
      schema: {
        visible: showToggle(),
        eyebrow: fields.text({ label: "Eyebrow", validation: { length: { max: 40 } } }),
        paragraphs: fields.array(
          fields.text({
            label: "Paragraph",
            multiline: true,
            validation: { length: { max: 600 } },
          }),
          { label: "Story paragraphs", itemLabel: () => "Paragraph" }
        ),
        figureCaption: fields.text({
          label: "Photo caption",
          validation: { length: { max: 120 } },
        }),
        asideTitle: fields.text({
          label: "Aside — title",
          validation: { length: { max: 40 } },
        }),
        asideText: fields.text({
          label: "Aside — text",
          multiline: true,
          validation: { length: { max: 260 } },
        }),
      },
    }),

    aboutTeam: singleton({
      label: "Team",
      path: "src/content/about-team",
      format: { data: "json" },
      schema: {
        visible: showToggle(),
        eyebrow: fields.text({ label: "Eyebrow", validation: { length: { max: 40 } } }),
        title: fields.text({
          label: "Heading",
          multiline: true,
          validation: { length: { max: 140 } },
        }),
        members: fields.array(
          fields.object({
            name: fields.text({
              label: "Name",
              validation: { isRequired: true, length: { max: 40 } },
            }),
            role: fields.text({
              label: "Role",
              validation: { length: { max: 60 } },
            }),
            bio: fields.text({
              label: "Bio",
              multiline: true,
              validation: { length: { max: 240 } },
            }),
          }),
          {
            label: "Members",
            description: "Photos are matched in code by name.",
            itemLabel: (props) => props.fields.name.value || "Member",
          }
        ),
      },
    }),

    aboutPrinciples: singleton({
      label: "Principles",
      path: "src/content/about-principles",
      format: { data: "json" },
      schema: {
        visible: showToggle(),
        eyebrow: fields.text({ label: "Eyebrow", validation: { length: { max: 40 } } }),
        title: fields.text({
          label: "Heading",
          multiline: true,
          validation: { length: { max: 140 } },
        }),
        items: fields.array(
          fields.object({
            name: fields.text({
              label: "Principle",
              validation: { isRequired: true, length: { max: 80 } },
            }),
            note: fields.text({
              label: "Description",
              multiline: true,
              validation: { isRequired: true, length: { max: 300 } },
            }),
          }),
          {
            label: "Principles",
            description: "Icons are assigned in code by order.",
            itemLabel: (props) => props.fields.name.value || "Principle",
          }
        ),
      },
    }),

    aboutNumbers: singleton({
      label: "By the numbers",
      path: "src/content/about-numbers",
      format: { data: "json" },
      schema: {
        visible: showToggle(),
        eyebrow: fields.text({ label: "Eyebrow", validation: { length: { max: 40 } } }),
        title: fields.text({
          label: "Heading",
          multiline: true,
          validation: { length: { max: 120 } },
        }),
        facts: fields.array(
          fields.object({
            stat: fields.text({
              label: "Stat",
              validation: { isRequired: true, length: { max: 40 } },
            }),
            label: fields.text({
              label: "Label",
              multiline: true,
              validation: { isRequired: true, length: { max: 120 } },
            }),
          }),
          {
            label: "Facts",
            description: "Icons are assigned in code by order.",
            itemLabel: (props) => props.fields.stat.value || "Fact",
          }
        ),
      },
    }),

    aboutCta: singleton({
      label: "Closing CTA",
      path: "src/content/about-cta",
      format: { data: "json" },
      schema: {
        visible: showToggle(),
        title: fields.text({
          label: "Heading",
          multiline: true,
          validation: { isRequired: true, length: { max: 120 } },
        }),
        sub: fields.text({
          label: "Sub-headline",
          multiline: true,
          validation: { length: { max: 240 } },
        }),
        primaryLabel: fields.text({
          label: "Primary button — label",
          validation: { length: { max: 28 } },
        }),
        primaryHref: fields.text({
          label: "Primary button — link",
          validation: { length: { max: 200 } },
        }),
        secondaryLabel: fields.text({
          label: "Secondary button — label",
          validation: { length: { max: 28 } },
        }),
        secondaryHref: fields.text({
          label: "Secondary button — link",
          validation: { length: { max: 200 } },
        }),
      },
    }),

    // =========================================================================
    // SECURITY PAGE
    // =========================================================================
    secHeader: singleton({
      label: "Page header & SEO",
      path: "src/content/sec-header",
      format: { data: "json" },
      schema: { visible: showToggle(), ...headerFields(), seo: seoField() },
    }),

    secControls: singleton({
      label: "Controls live today",
      path: "src/content/sec-controls",
      format: { data: "json" },
      schema: {
        visible: showToggle(),
        eyebrow: fields.text({ label: "Eyebrow", validation: { length: { max: 40 } } }),
        items: fields.array(
          fields.object({
            name: fields.text({
              label: "Control name",
              validation: { isRequired: true, length: { max: 60 } },
            }),
            note: fields.text({
              label: "Description",
              multiline: true,
              validation: { isRequired: true, length: { max: 160 } },
            }),
          }),
          {
            label: "Controls",
            description: "Icons are assigned in code by order.",
            itemLabel: (props) => props.fields.name.value || "Control",
          }
        ),
      },
    }),

    secCompliance: singleton({
      label: "Compliance program",
      path: "src/content/sec-compliance",
      format: { data: "json" },
      schema: {
        visible: showToggle(),
        title: fields.text({
          label: "Heading",
          multiline: true,
          validation: { length: { max: 90 } },
        }),
        intro: fields.text({
          label: "Intro paragraph",
          multiline: true,
          validation: { length: { max: 260 } },
        }),
        compliant: fields.array(
          fields.text({
            label: "Standard",
            validation: { isRequired: true, length: { max: 40 } },
          }),
          {
            label: "Aligned & compliant",
            description: "Badge label only; the medallion art is assigned in code.",
            itemLabel: (props) => props.value || "Standard",
          }
        ),
        inProgress: fields.array(
          fields.text({
            label: "Standard",
            validation: { isRequired: true, length: { max: 40 } },
          }),
          {
            label: "In audit",
            description: "Badge label only; the medallion art is assigned in code.",
            itemLabel: (props) => props.value || "Standard",
          }
        ),
        planned: fields.array(
          fields.text({
            label: "Standard",
            validation: { isRequired: true, length: { max: 40 } },
          }),
          {
            label: "On the roadmap",
            description: "Badge label only; the medallion art is assigned in code.",
            itemLabel: (props) => props.value || "Standard",
          }
        ),
        footnote: fields.text({
          label: "Footnote",
          multiline: true,
          validation: { length: { max: 240 } },
        }),
      },
    }),

    secDataFlow: singleton({
      label: "How data is handled",
      path: "src/content/sec-data-flow",
      format: { data: "json" },
      schema: {
        visible: showToggle(),
        eyebrow: fields.text({ label: "Eyebrow", validation: { length: { max: 40 } } }),
        steps: fields.array(
          fields.object({
            name: fields.text({
              label: "Step name",
              validation: { isRequired: true, length: { max: 60 } },
            }),
            note: fields.text({
              label: "Description",
              multiline: true,
              validation: { isRequired: true, length: { max: 160 } },
            }),
          }),
          {
            label: "Steps",
            description: "Step numbers and icons are assigned in code by order.",
            itemLabel: (props) => props.fields.name.value || "Step",
          }
        ),
      },
    }),

    secResponsibleAi: singleton({
      label: "Responsible AI",
      path: "src/content/sec-responsible-ai",
      format: { data: "json" },
      schema: {
        visible: showToggle(),
        eyebrow: fields.text({ label: "Eyebrow", validation: { length: { max: 40 } } }),
        title: fields.text({
          label: "Heading",
          multiline: true,
          validation: { length: { max: 90 } },
        }),
        body: fields.text({
          label: "Paragraph",
          multiline: true,
          validation: { length: { max: 320 } },
        }),
        points: fields.array(
          fields.object({
            name: fields.text({
              label: "Point title",
              validation: { isRequired: true, length: { max: 60 } },
            }),
            note: fields.text({
              label: "Description",
              multiline: true,
              validation: { isRequired: true, length: { max: 160 } },
            }),
          }),
          {
            label: "Points",
            description: "Icons are assigned in code by order.",
            itemLabel: (props) => props.fields.name.value || "Point",
          }
        ),
      },
    }),

    secContact: singleton({
      label: "Security contact",
      path: "src/content/sec-contact",
      format: { data: "json" },
      schema: {
        visible: showToggle(),
        title: fields.text({
          label: "Heading",
          multiline: true,
          validation: { length: { max: 90 } },
        }),
        bullets: fields.array(
          fields.text({ label: "Bullet", validation: { length: { max: 80 } } }),
          { label: "Bullets", itemLabel: (props) => props.value || "Bullet" }
        ),
        primaryLabel: fields.text({
          label: "Primary button — label",
          validation: { length: { max: 40 } },
        }),
        secondaryLabel: fields.text({
          label: "Secondary button — label",
          validation: { length: { max: 40 } },
        }),
        securityEmail: fields.text({
          label: "Security email",
          validation: { length: { max: 80 } },
        }),
        generalNote: fields.text({
          label: "General-questions note",
          validation: { length: { max: 120 } },
        }),
      },
    }),

    secCta: singleton({
      label: "Final CTA",
      path: "src/content/sec-cta",
      format: { data: "json" },
      schema: { visible: showToggle(), ...finalCtaFields() },
    }),

    // =========================================================================
    // CAREERS PAGE
    // =========================================================================
    careersHeader: singleton({
      label: "Page header & SEO",
      path: "src/content/careers-header",
      format: { data: "json" },
      schema: { visible: showToggle(), ...headerFields(), seo: seoField() },
    }),

    careersHowWeWork: singleton({
      label: "How we work",
      path: "src/content/careers-how-we-work",
      format: { data: "json" },
      schema: {
        visible: showToggle(),
        eyebrow: fields.text({ label: "Eyebrow", validation: { length: { max: 40 } } }),
        title: fields.text({
          label: "Heading",
          multiline: true,
          validation: { length: { max: 140 } },
        }),
        lead: fields.text({
          label: "Lead paragraph",
          multiline: true,
          validation: { length: { max: 360 } },
        }),
        values: fields.array(
          fields.object({
            title: fields.text({
              label: "Value title",
              validation: { isRequired: true, length: { max: 60 } },
            }),
            body: fields.text({
              label: "Description",
              multiline: true,
              validation: { isRequired: true, length: { max: 300 } },
            }),
          }),
          {
            label: "Values",
            description: "Icons are assigned in code by order.",
            itemLabel: (props) => props.fields.title.value || "Value",
          }
        ),
      },
    }),

    careersRoles: singleton({
      label: "Open roles",
      path: "src/content/careers-roles",
      format: { data: "json" },
      schema: {
        visible: showToggle(),
        eyebrow: fields.text({ label: "Eyebrow", validation: { length: { max: 40 } } }),
        title: fields.text({
          label: "Heading",
          multiline: true,
          validation: { length: { max: 90 } },
        }),
        lead: fields.text({
          label: "Lead paragraph",
          multiline: true,
          validation: { length: { max: 320 } },
        }),
        roles: fields.array(
          fields.object({
            title: fields.text({
              label: "Role title",
              validation: { isRequired: true, length: { max: 60 } },
            }),
            tag: fields.text({
              label: "Location · Team",
              validation: { length: { max: 60 } },
            }),
            blurb: fields.text({
              label: "Description",
              multiline: true,
              validation: { isRequired: true, length: { max: 400 } },
            }),
          }),
          {
            label: "Roles",
            itemLabel: (props) => props.fields.title.value || "Role",
          }
        ),
        footnote: fields.text({
          label: "Footnote (after the list)",
          multiline: true,
          validation: { length: { max: 240 } },
        }),
      },
    }),

    careersCta: singleton({
      label: "Closing CTA",
      path: "src/content/careers-cta",
      format: { data: "json" },
      schema: {
        visible: showToggle(),
        title: fields.text({
          label: "Heading",
          multiline: true,
          validation: { isRequired: true, length: { max: 120 } },
        }),
        sub: fields.text({
          label: "Sub-headline",
          multiline: true,
          validation: { length: { max: 240 } },
        }),
        secondaryLabel: fields.text({
          label: "Secondary button — label",
          validation: { length: { max: 28 } },
        }),
      },
    }),

    // =========================================================================
    // INTEGRATIONS PAGE
    // =========================================================================
    intHeader: singleton({
      label: "Page header & SEO",
      path: "src/content/int-header",
      format: { data: "json" },
      schema: { visible: showToggle(), ...headerFields(), seo: seoField() },
    }),

    intHowItConnects: singleton({
      label: "How it connects",
      path: "src/content/int-how-it-connects",
      format: { data: "json" },
      schema: {
        visible: showToggle(),
        logosNote: fields.text({
          label: "Logos strip note",
          validation: { length: { max: 80 } },
        }),
        eyebrow: fields.text({ label: "Eyebrow", validation: { length: { max: 40 } } }),
        title: fields.text({
          label: "Heading",
          multiline: true,
          validation: { length: { max: 120 } },
        }),
        steps: fields.array(
          fields.object({
            step: fields.text({
              label: "Step number",
              validation: { length: { max: 8 } },
            }),
            title: fields.text({
              label: "Step title",
              validation: { isRequired: true, length: { max: 40 } },
            }),
            body: fields.text({
              label: "Description",
              multiline: true,
              validation: { isRequired: true, length: { max: 200 } },
            }),
          }),
          {
            label: "Steps",
            itemLabel: (props) => props.fields.title.value || "Step",
          }
        ),
      },
    }),

    intCta: singleton({
      label: "Final CTA",
      path: "src/content/int-cta",
      format: { data: "json" },
      schema: { visible: showToggle(), ...finalCtaFields() },
    }),

    // =========================================================================
    // CONTACT PAGE
    // =========================================================================
    contactHeader: singleton({
      label: "Page header & SEO",
      path: "src/content/contact-header",
      format: { data: "json" },
      schema: { visible: showToggle(), ...headerFields(), seo: seoField() },
    }),

    contactProgram: singleton({
      label: "Design partner panel",
      path: "src/content/contact-program",
      format: { data: "json" },
      schema: {
        visible: showToggle(),
        eyebrow: fields.text({ label: "Eyebrow", validation: { length: { max: 40 } } }),
        intro: fields.text({
          label: "Intro paragraph",
          multiline: true,
          validation: { length: { max: 320 } },
        }),
        benefits: fields.array(
          fields.text({ label: "Benefit", validation: { length: { max: 120 } } }),
          { label: "Benefits", itemLabel: (props) => props.value || "Benefit" }
        ),
        emailPrompt: fields.text({
          label: "“Prefer email?” prompt",
          validation: { length: { max: 40 } },
        }),
        email: fields.text({
          label: "Contact email",
          validation: { length: { max: 80 } },
        }),
      },
    }),

    contactForm: singleton({
      label: "Form labels",
      path: "src/content/contact-form",
      format: { data: "json" },
      schema: {
        nameLabel: fields.text({
          label: "Name — label",
          description: info(
            "Every label, placeholder, validation message, and button on the “Request a demo” form. The form fields, country and phone pickers, and where the lead is sent are built in code."
          ),
          validation: { length: { max: 40 } },
        }),
        namePlaceholder: fields.text({ label: "Name — placeholder", validation: { length: { max: 60 } } }),
        emailLabel: fields.text({ label: "Email — label", validation: { length: { max: 40 } } }),
        emailPlaceholder: fields.text({ label: "Email — placeholder", validation: { length: { max: 60 } } }),
        companyLabel: fields.text({ label: "Company — label", validation: { length: { max: 40 } } }),
        companyPlaceholder: fields.text({ label: "Company — placeholder", validation: { length: { max: 60 } } }),
        teamSizeLabel: fields.text({ label: "Team size — label", validation: { length: { max: 40 } } }),
        teamSizePlaceholder: fields.text({ label: "Team size — placeholder", validation: { length: { max: 60 } } }),
        countryLabel: fields.text({ label: "Country — label", validation: { length: { max: 40 } } }),
        countryPlaceholder: fields.text({ label: "Country — placeholder", validation: { length: { max: 60 } } }),
        phoneLabel: fields.text({ label: "Phone — label", validation: { length: { max: 40 } } }),
        phonePlaceholder: fields.text({ label: "Phone — placeholder", validation: { length: { max: 60 } } }),
        messageLabel: fields.text({ label: "Message — label", validation: { length: { max: 60 } } }),
        messagePlaceholder: fields.text({ label: "Message — placeholder", validation: { length: { max: 120 } } }),
        submitLabel: fields.text({ label: "Submit button", validation: { length: { max: 28 } } }),
        sendingLabel: fields.text({ label: "Submit button — sending", validation: { length: { max: 28 } } }),
        successTitle: fields.text({ label: "Success — title", validation: { length: { max: 60 } } }),
        successBody: fields.text({
          label: "Success — message",
          multiline: true,
          validation: { length: { max: 240 } },
        }),
        errorText: fields.text({
          label: "Error message (before the email)",
          multiline: true,
          validation: { length: { max: 160 } },
        }),
        vName: fields.text({ label: "Validation — name missing", validation: { length: { max: 80 } } }),
        vEmailRequired: fields.text({ label: "Validation — email missing", validation: { length: { max: 80 } } }),
        vEmailInvalid: fields.text({ label: "Validation — email invalid", validation: { length: { max: 80 } } }),
        vPhoneCode: fields.text({ label: "Validation — dialing code missing", validation: { length: { max: 80 } } }),
        vPhoneInvalid: fields.text({ label: "Validation — phone invalid", validation: { length: { max: 80 } } }),
        vMessage: fields.text({ label: "Validation — message missing", validation: { length: { max: 80 } } }),
      },
    }),

    // =========================================================================
    // SITE-WIDE
    // =========================================================================
    navbar: singleton({
      label: "Navigation bar",
      path: "src/content/navbar",
      format: { data: "json" },
      schema: {
        links: fields.array(
          fields.object({
            name: fields.text({
              label: "Label",
              validation: { isRequired: true, length: { max: 24 } },
            }),
            url: fields.text({
              label: "Link",
              validation: { isRequired: true, length: { max: 120 } },
            }),
          }),
          {
            label: "Nav links",
            description: info(
              "The links in the top navigation bar (used across every page), plus the button on the top-right below. The icons shown on mobile are assigned in code by order."
            ),
            itemLabel: (props) => props.fields.name.value || "Link",
          }
        ),
        ctaLabel: fields.text({
          label: "Top-right button — label",
          validation: { length: { max: 28 } },
        }),
        ctaHref: fields.text({
          label: "Top-right button — link",
          validation: { length: { max: 120 } },
        }),
      },
    }),

    footer: singleton({
      label: "Footer",
      path: "src/content/footer",
      format: { data: "json" },
      schema: {
        tagline: fields.text({
          label: "Tagline (under the logo)",
          description: info(
            "The footer (shown on every page): the tagline, the link columns, and the bottom note. The logo and the © year are handled in code."
          ),
          multiline: true,
          validation: { length: { max: 160 } },
        }),
        groups: fields.array(
          fields.object({
            title: fields.text({
              label: "Column title",
              validation: { isRequired: true, length: { max: 40 } },
            }),
            links: fields.array(
              fields.object({
                label: fields.text({
                  label: "Label",
                  validation: { isRequired: true, length: { max: 40 } },
                }),
                href: fields.text({
                  label: "Link",
                  validation: { isRequired: true, length: { max: 120 } },
                }),
              }),
              { label: "Links", itemLabel: (props) => props.fields.label.value || "Link" }
            ),
          }),
          {
            label: "Columns",
            itemLabel: (props) => props.fields.title.value || "Column",
          }
        ),
        legalNote: fields.text({
          label: "Bottom-right note",
          validation: { length: { max: 120 } },
        }),
      },
    }),

    siteSettings: singleton({
      label: "Site settings",
      path: "src/content/site-settings",
      format: { data: "json" },
      schema: {
        siteName: fields.text({
          label: "Site name",
          description: info(
            "Site-wide basics used in several places: the name in the footer copyright, the contact email, the domain shown in the footer, and the default browser-tab title / search description for any page without its own."
          ),
          validation: { length: { max: 40 } },
        }),
        email: fields.text({
          label: "Contact email",
          validation: { length: { max: 80 } },
        }),
        domain: fields.text({
          label: "Domain",
          validation: { length: { max: 80 } },
        }),
        defaultSeoTitle: fields.text({
          label: "Default browser tab title",
          description: "Used on pages without their own SEO title.",
          validation: { length: { max: 70 } },
        }),
        defaultSeoDescription: fields.text({
          label: "Default search description",
          multiline: true,
          validation: { length: { max: 200 } },
        }),
      },
    }),
  },
});
