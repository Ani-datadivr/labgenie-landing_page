import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import {
  Microscope,
  Factory,
  Handshake,
  Gauge,
  ScanLine,
  FlaskConical,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "About",
  description:
    "Datadivr spent three years inside F&B ingredient manufacturing. LabGenie is that hard-won domain knowledge, turned into one chat-native agent.",
};

// Principles — drawn from PRODUCT.md's design principles and the Datadivr brand voice.
const principles = [
  {
    icon: Microscope,
    name: "Domain truth over hype",
    note: "We speak moisture, total ash, curcumin, and quality-document checking precisely. Specificity is trust; vagueness reads as not understanding the problem.",
  },
  {
    icon: ScanLine,
    name: "Show the work",
    note: "Every match and every flag is traceable to the spec that produced it. The agent demonstrates its reasoning instead of asking you to take it on faith.",
  },
  {
    icon: Handshake,
    name: "Built with manufacturers, not for them",
    note: "The product was shaped on real plant floors, against real documents, with the QA, sales, and procurement teams who run on it.",
  },
  {
    icon: Gauge,
    name: "Speed is the proof",
    note: "Checking that once took days now lands in minutes. We measure ourselves by the work the floor no longer has to do by hand.",
  },
];

// Honest, defensible facts about the journey — no fabricated revenue or logo counts.
const facts = [
  {
    icon: Factory,
    stat: "3 years",
    label: "partnering with F&B ingredient manufacturers",
  },
  {
    icon: FlaskConical,
    stat: "Flavors, spices, oleoresins",
    label: "the categories we know firsthand",
  },
  {
    icon: Gauge,
    stat: "Days to minutes",
    label: "to check a batch's quality documents",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Datadivr"
        title="Three years inside F&B, distilled into one agent."
        sub="We are Datadivr. We spent three years working shoulder to shoulder with the manufacturers who make flavors, spices, and oleoresins. LabGenie is what we learned, turned into a product."
      />

      {/* Our story */}
      <section className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <Reveal>
            <div>
              <p className="eyebrow">Our story</p>
              <div className="mt-5 space-y-5">
                <p className="text-lg leading-relaxed text-muted">
                  For the last three years, Datadivr worked closely with F&B
                  ingredient manufacturers across the industry. We sat with their
                  quality, sales, and procurement teams, learned how each one runs,
                  and felt the same friction everywhere: messy certificates of
                  analysis, spec reconciliation that drags on for days, and quality,
                  sales, and procurement kept in separate silos that never quite
                  agree.
                </p>
                <p className="text-lg leading-relaxed text-muted">
                  Along the way we learned what actually moves the needle on a plant
                  floor, and what is just software overhead dressed up as progress.
                  That distinction is the whole point. LabGenie is the product of that
                  experience: an AI operating system that turns hard-won domain
                  knowledge into one chat-native agent built for the way these
                  manufacturers really work.
                </p>
                <p className="text-lg leading-relaxed text-muted">
                  Datadivr is moving from hands-on services to a product company, and
                  LabGenie is our flagship. We are not adapting a generic AI tool to a
                  market we just discovered. We are shipping the system we already
                  spent years learning to build by hand.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="panel p-7">
              <p className="eyebrow">Why this matters</p>
              <p className="mt-5 text-base leading-relaxed text-muted">
                Generic AI can summarize a document. It cannot tell you whether a
                batch meets a customer&apos;s outgoing spec, because it has never read
                ten thousand of them.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted">
                LabGenie carries the vocabulary, the edge cases, and the workflows we
                absorbed over three years in the field. That context is the difference
                between a chatbot and an operating system the floor can trust.
              </p>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* What we believe */}
      <section className="container-x py-16">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow">What we believe</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              Principles we carried from the field into the product.
            </h2>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2">
          {principles.map(({ icon: Icon, name, note }) => (
            <StaggerItem key={name}>
              <div className="panel panel-hover h-full p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white/[0.03] text-accent">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl text-text">{name}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted">{note}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* From services to product — by the numbers */}
      <section className="container-x py-16">
        <Reveal>
          <div className="panel relative overflow-hidden px-6 py-12 sm:px-12 sm:py-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(ellipse 60% 100% at 0% 50%, rgba(0,102,255,0.10), transparent 70%)",
              }}
            />
            <div className="relative">
              <p className="eyebrow">From services to product</p>
              <h2 className="mt-3 max-w-2xl text-3xl sm:text-[2.2rem]">
                Earned in the field, not invented in a pitch deck.
              </h2>

              <div className="mt-10 grid gap-8 sm:grid-cols-3">
                {facts.map(({ icon: Icon, stat, label }) => (
                  <div key={stat}>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white/[0.03] text-accent">
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <p className="mt-4 font-display text-2xl text-text sm:text-[1.7rem]">
                      {stat}
                    </p>
                    <p className="mt-2 text-base leading-relaxed text-muted">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Closing CTA */}
      <section className="container-x py-24">
        <Reveal>
          <div className="panel relative overflow-hidden px-6 py-16 text-center sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(0,102,255,0.14), transparent 70%)",
              }}
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl sm:text-4xl md:text-[2.8rem]">
                See what three years in the field built.
              </h2>
              <p className="mx-auto mt-5 max-w-xl lead">
                Walk the platform that checks your specs in minutes, or talk to us
                about putting it on your floor.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Link href="/platform" className="btn btn-primary">
                  See LabGenie
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/contact" className="btn btn-ghost">
                  Request a demo
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
