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
  singletons: {
    home: singleton({
      label: "Home — Hero",
      path: "src/content/home",
      format: { data: "json" },
      schema: {
        titleLead: fields.text({
          label: "Headline — lead",
          description: "First part of the hero headline, shown in default color.",
          multiline: true,
        }),
        titleAccent: fields.text({
          label: "Headline — accent",
          description: "End of the headline, shown in brand blue.",
        }),
        sub: fields.text({ label: "Sub-headline", multiline: true }),
        primaryLabel: fields.text({ label: "Primary button — label" }),
        primaryHref: fields.text({ label: "Primary button — link" }),
        secondaryLabel: fields.text({ label: "Secondary button — label" }),
        secondaryHref: fields.text({ label: "Secondary button — link" }),
      },
    }),
    faqs: singleton({
      label: "FAQ",
      path: "src/content/faqs",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            question: fields.text({ label: "Question" }),
            answer: fields.text({ label: "Answer", multiline: true }),
          }),
          {
            label: "Questions",
            itemLabel: (props) => props.fields.question.value || "Question",
          }
        ),
      },
    }),
  },
});
