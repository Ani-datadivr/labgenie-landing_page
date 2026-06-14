import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import GradientBackground from "@/components/GradientBackground";
import SeatMeter from "@/components/SeatMeter";
import { site } from "@/lib/content";

export const metadata = {
  title: "Request a Demo",
  description:
    "See your quality documents checked in minutes. We're onboarding a small group of design partners who'll shape LabGenie as we build it.",
};

export default function ContactPage() {
  return (
    <div className="relative">
      {/* Brand-blue grain gradient behind the header, dissolved into the ink
          before it reaches the form so contrast stays AAA. */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <GradientBackground className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(14,20,28,0.35)_42%,rgb(var(--bg-rgb))_78%)]" />
      </div>

      <div className="relative">
      <PageHeader
        eyebrow="Request a demo"
        title="See your quality documents checked in minutes."
        sub="We're onboarding a small group of design partners who'll shape the platform as we build it. Tell us a little about your operation and we'll be in touch within one business day."
      />

      <section className="container-x py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="space-y-8">
              <div>
                <p className="eyebrow">Design partner program</p>
                <p className="mt-3 text-lg leading-relaxed text-muted">
                  We&apos;re onboarding a small group of design partners who shape
                  LabGenie as we build it. Partners get direct influence over the
                  roadmap and hands-on support from the founding team.
                </p>
              </div>

              <SeatMeter />

              <ul className="space-y-4">
                {[
                  "Direct line to the founding and product team",
                  "We prioritize the features your workflows need",
                  "Hands-on help structuring your data and reading the insights",
                  "We build the integration to your ERP",
                  "Early access to the platform before public launch",
                  "Recognition as a launch reference customer (with your approval)",
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
                <a href={`mailto:${site.email}`} className="mt-1 inline-block font-display text-lg text-accent-text">
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
      </div>
    </div>
  );
}
