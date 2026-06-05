import PageHeader from "@/components/PageHeader";
import FinalCTA from "@/components/FinalCTA";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import { security } from "@/lib/content";

export const metadata = {
  title: "Data Security",
  description:
    "Enterprise-grade security for your most sensitive asset: your specifications. Encryption, tenant isolation, access control, and compliance built in from day one.",
};

export default function SecurityPage() {
  return (
    <>
      <PageHeader eyebrow={security.eyebrow} title={security.title} sub={security.sub} />

      <section className="container-x py-12">
        <Stagger className="grid gap-4 sm:grid-cols-2">
          {security.pillars.map((p) => (
            <StaggerItem key={p.name}>
              <div className="panel panel-hover h-full p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/30 bg-accent/[0.08]">
                    <svg viewBox="0 0 20 20" className="h-4 w-4 text-accent" fill="none">
                      <path d="M10 2l6 2.5v4.2c0 4-2.6 6.7-6 8.3-3.4-1.6-6-4.3-6-8.3V4.5L10 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                      <path d="M7.2 10l2 2 3.6-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h3 className="text-lg font-medium text-text">{p.name}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">{p.note}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="container-x py-12">
        <Reveal>
          <div className="panel flex flex-col items-start gap-4 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <h3 className="text-xl text-text">Need our full security documentation?</h3>
              <p className="mt-2 max-w-xl text-sm text-muted">
                Detailed architecture, data-handling, and compliance documentation are
                available to evaluating teams under NDA. This page is a placeholder to be
                finalized with your security team.
              </p>
            </div>
            <a href="/contact" className="btn btn-primary shrink-0">
              Request documentation
            </a>
          </div>
        </Reveal>
      </section>

      <FinalCTA />
    </>
  );
}
