import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { site, designPartner } from "@/lib/content";

export const metadata = {
  title: "Request a Demo",
  description:
    "See your COAs reconciled in minutes. We're onboarding a small group of design partners who'll shape LabGenie as we build it.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Request a demo"
        title="See your COAs reconciled in minutes."
        sub="We're onboarding a small group of design partners who'll shape the platform as we build it. Tell us a little about your operation and we'll be in touch within one business day."
      />

      <section className="container-x py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="space-y-8">
              <div>
                <p className="eyebrow">Why now</p>
                <p className="mt-3 text-lg leading-relaxed text-muted">
                  Design partners get early access, direct influence over the roadmap,
                  and hands-on support from the founding team — the same way{" "}
                  <span className="text-text">{designPartner.name}</span>,{" "}
                  {designPartner.descriptor}, is shaping LabGenie today.
                </p>
              </div>

              <ul className="space-y-4">
                {[
                  "Early access to live modules: RFP matching, auto-fill, and inquiry routing.",
                  "A direct line to the team building it.",
                  "Pricing and terms designed for early partners.",
                ].map((t) => (
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

              <div className="border-t border-border pt-6">
                <p className="text-sm text-muted">Prefer email?</p>
                <a href={`mailto:${site.email}`} className="mt-1 inline-block font-display text-lg text-accent">
                  {site.email}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
