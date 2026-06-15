import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import GradientBackground from "@/components/GradientBackground";
import SeatMeter from "@/components/SeatMeter";
import { readSections, isVisible, buildMetadata } from "@/lib/cms";

const SEO_FALLBACK = {
  title: "Request a Demo",
  description:
    "See your quality documents checked in minutes. We're onboarding a small group of design partners who'll shape LabGenie as we build it.",
};

export async function generateMetadata() {
  const { contactHeader } = await readSections(["contactHeader"]);
  return buildMetadata(contactHeader?.seo, {
    fallbackTitle: SEO_FALLBACK.title,
    fallbackDescription: SEO_FALLBACK.description,
  });
}

export default async function ContactPage() {
  const { contactHeader, contactProgram, contactForm } = await readSections([
    "contactHeader",
    "contactProgram",
    "contactForm",
  ]);

  return (
    <div className="relative">
      {/* Brand-blue grain gradient behind the header, dissolved into the ink
          before it reaches the form so contrast stays AAA. */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <GradientBackground className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(14,20,28,0.35)_42%,rgb(var(--bg-rgb))_78%)]" />
      </div>

      <div className="relative">
        {isVisible(contactHeader) && (
          <PageHeader
            eyebrow={contactHeader?.eyebrow || "Request a demo"}
            title={contactHeader?.title || "See your quality documents checked in minutes."}
            sub={contactHeader?.sub}
          />
        )}

        <section className="container-x py-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            {isVisible(contactProgram) ? (
              <Reveal>
                <div className="space-y-8">
                  <div>
                    <p className="eyebrow">{contactProgram?.eyebrow || "Design partner program"}</p>
                    <p className="mt-3 text-lg leading-relaxed text-muted">
                      {contactProgram?.intro}
                    </p>
                  </div>

                  <SeatMeter />

                  <ul className="space-y-4">
                    {(contactProgram?.benefits || []).map((t) => (
                      <li key={t} className="flex items-start gap-3 text-sm text-muted">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-accent/15">
                          <svg viewBox="0 0 16 16" className="h-3 w-3 text-accent" fill="none">
                            <path d="M5 8.2l2 2 4-4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>

                  {contactProgram?.email && (
                    <div className="border-t border-border pt-6">
                      <p className="text-sm text-muted">{contactProgram?.emailPrompt || "Prefer email?"}</p>
                      <a href={`mailto:${contactProgram.email}`} className="mt-1 inline-block font-display text-lg text-accent-text">
                        {contactProgram.email}
                      </a>
                    </div>
                  )}
                </div>
              </Reveal>
            ) : (
              <div />
            )}

            <Reveal delay={0.1}>
              <ContactForm copy={contactForm} email={contactProgram?.email} />
            </Reveal>
          </div>
        </section>
      </div>
    </div>
  );
}
