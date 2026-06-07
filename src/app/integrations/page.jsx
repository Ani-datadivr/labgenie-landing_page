import PageHeader from "@/components/PageHeader";
import FinalCTA from "@/components/FinalCTA";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import IntegrationLogos from "@/components/IntegrationLogos";
import { integrations } from "@/lib/content";

export const metadata = {
  title: "Integrations",
  description:
    "LabGenie connects to the ERP, lab, and quality systems you already run, reading quality certificates and spec sheets where they live and writing back trusted compliance paperwork.",
};

export default function IntegrationsPage() {
  return (
    <>
      <PageHeader
        eyebrow={integrations.eyebrow}
        title={integrations.title}
        sub={integrations.sub}
      />

      {/* ERP / CRM / tool logos */}
      <section className="container-x py-12">
        <Reveal>
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-dim">
            Works with the systems you already run
          </p>
        </Reveal>
        <IntegrationLogos />
      </section>

      {/* Categories */}
      <section className="container-x py-12">
        <Stagger className="grid gap-4 sm:grid-cols-2">
          {integrations.categories.map((c) => (
            <StaggerItem key={c.name}>
              <div className="panel panel-hover h-full p-6">
                <h3 className="text-lg font-medium text-text">{c.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{c.note}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* How it connects */}
      <section className="container-x py-12">
        <Reveal>
          <div className="panel p-8 sm:p-12">
            <p className="eyebrow">How it connects</p>
            <h2 className="mt-3 max-w-2xl text-2xl sm:text-3xl">
              Read where your data lives. Write back what you can trust.
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {[
                { step: "01", title: "Read", body: "Ingest quality certificates, spec sheets, and incoming requests from PDF, Excel, email, and your ERP." },
                { step: "02", title: "Check", body: "Match and compare across raw-material, internal, and customer requirements." },
                { step: "03", title: "Write back", body: "Populate compliance documentation and route work back into your systems." },
              ].map((s) => (
                <div key={s.step} className="border-t border-border pt-5">
                  <span className="font-mono text-xs text-accent">{s.step}</span>
                  <h4 className="mt-2 text-lg text-text">{s.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <FinalCTA
        eyebrow="Get started"
        title="See how cleanly LabGenie fits your stack."
        sub="Tell us which ERP and tools you run. We'll show you what connects on day one, with no rip-and-replace."
      />
    </>
  );
}
