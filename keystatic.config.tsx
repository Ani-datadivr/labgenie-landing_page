import { config, fields, singleton } from "@keystatic/core";

// GitHub storage in production (once the GitHub App env vars are set); local
// file storage in development so the editor works at /keystatic with no setup.
// The switch is automatic based on whether the GitHub App client id is present.
const storage = process.env.KEYSTATIC_GITHUB_CLIENT_ID
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
