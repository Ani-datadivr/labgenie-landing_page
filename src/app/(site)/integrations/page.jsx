import PageHeader from "@/components/PageHeader";
import FinalCTA from "@/components/FinalCTA";
import Reveal from "@/components/Reveal";
import IntegrationLogos from "@/components/IntegrationLogos";
import { readSections, isVisible, buildMetadata } from "@/lib/cms";

const SEO_FALLBACK = {
  title: "Integrations",
  description:
    "LabGenie connects to the ERP, lab, and quality systems you already run, reading quality certificates and spec sheets where they live and writing back trusted compliance paperwork.",
};

export async function generateMetadata() {
  const { intHeader } = await readSections(["intHeader"]);
  return buildMetadata(intHeader?.seo, {
    fallbackTitle: SEO_FALLBACK.title,
    fallbackDescription: SEO_FALLBACK.description,
  });
}

export default async function IntegrationsPage() {
  const { intHeader, intHowItConnects, intCta } = await readSections([
    "intHeader",
    "intHowItConnects",
    "intCta",
  ]);

  return (
    <>
      {isVisible(intHeader) && (
        <PageHeader
          eyebrow={intHeader?.eyebrow || "Integrations"}
          title={intHeader?.title || "Sits on top of the systems you already run."}
          sub={intHeader?.sub}
        />
      )}

      {/* ERP / CRM / tool logos */}
      <section className="container-x py-12">
        <Reveal>
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-dim">
            {intHowItConnects?.logosNote || "Works with the systems you already run"}
          </p>
        </Reveal>
        <IntegrationLogos />
      </section>

      {/* How it connects */}
      {isVisible(intHowItConnects) && (
        <section className="container-x py-12">
          <Reveal>
            <div className="panel p-8 sm:p-12">
              <p className="eyebrow">{intHowItConnects?.eyebrow || "How it connects"}</p>
              <h2 className="mt-3 max-w-2xl text-2xl sm:text-3xl">
                {intHowItConnects?.title || "Read where your data lives. Write back what you can trust."}
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {(intHowItConnects?.steps || []).map((s) => (
                  <div key={s.step || s.title} className="border-t border-border pt-5">
                    <span className="font-mono text-xs text-accent-text">{s.step}</span>
                    <h4 className="mt-2 text-lg text-text">{s.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {isVisible(intCta) && (
        <FinalCTA
          eyebrow={intCta?.eyebrow || "Get started"}
          title={intCta?.title || "See how cleanly LabGenie fits your stack."}
          sub={
            intCta?.sub ||
            "Tell us which ERP and tools you run. We'll show you what connects on day one, with no rip-and-replace."
          }
        />
      )}
    </>
  );
}
