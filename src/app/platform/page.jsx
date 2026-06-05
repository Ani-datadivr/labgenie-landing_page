import PageHeader from "@/components/PageHeader";
import ReconciliationPanel from "@/components/ReconciliationPanel";
import ModulesShowcase from "@/components/ModulesShowcase";
import OrchestrationStory from "@/components/OrchestrationStory";
import FinalCTA from "@/components/FinalCTA";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Platform",
  description:
    "LabGenie reconciles raw-material, internal, and customer specs simultaneously, then orchestrates quality, sales, and procurement from one chat interface.",
};

export default function PlatformPage() {
  return (
    <>
      <PageHeader
        eyebrow="The platform"
        title="An AI that reads your specs — and runs on them."
        sub="LabGenie reads messy, non-standardized COAs and spec documents, reconciles them across three formats at once, and turns that understanding into action across every operational station."
      />

      {/* The reconciliation explainer */}
      <section className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
          <Reveal>
            <div>
              <p className="eyebrow">The core engine</p>
              <h2 className="mt-3 text-3xl sm:text-4xl">
                Three spec formats, reconciled at once.
              </h2>
              <p className="mt-5 lead">
                Every batch lives between three documents that never agree on
                format: the incoming raw-material spec, your internal standard, and
                each customer&apos;s unique outgoing spec. LabGenie reads all three,
                aligns them parameter by parameter, and flags every deviation — then
                auto-populates the compliance documentation.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Reads PDF, Excel, and email — no standardization required.",
                  "Reconciles raw-material, internal, and customer specs simultaneously.",
                  "Flags deviations before they reach a customer.",
                  "Auto-fills compliance comparisons for human review.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[28px] bg-gradient-to-br from-accent/10 via-transparent to-accent-2/10 blur-2xl" />
              <ReconciliationPanel />
            </div>
          </Reveal>
        </div>
      </section>

      <ModulesShowcase showHeading />
      <OrchestrationStory />
      <FinalCTA />
    </>
  );
}
