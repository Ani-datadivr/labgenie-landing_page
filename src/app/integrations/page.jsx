import PageHeader from "@/components/PageHeader";
import FinalCTA from "@/components/FinalCTA";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import { integrations } from "@/lib/content";

export const metadata = {
  title: "Integrations",
  description:
    "LabGenie connects to the ERP, LIMS, QMS, and document systems you already run — reading COAs and spec sheets where they live and writing back trusted compliance documentation.",
};

export default function IntegrationsPage() {
  return (
    <>
      <PageHeader
        eyebrow={integrations.eyebrow}
        title={integrations.title}
        sub={integrations.sub}
      />

      {/* ERP logos */}
      <section className="container-x py-12">
        <Reveal>
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-dim">
            Works with the ERPs you already run
          </p>
        </Reveal>
        <Stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
          {integrations.erps.map((erp) => (
            <StaggerItem key={erp}>
              <div className="flex h-24 items-center justify-center bg-surface px-4 text-center transition-colors hover:bg-surface-2">
                <span className="font-display text-sm font-medium text-muted">{erp}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
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
                { step: "01", title: "Read", body: "Ingest COAs, spec sheets, and inbound inquiries from PDF, Excel, email, and your ERP." },
                { step: "02", title: "Reconcile", body: "Match and reconcile across raw-material, internal, and customer standards." },
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

      <FinalCTA />
    </>
  );
}
