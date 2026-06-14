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

// Leadership — bios distilled from the deck. Photos are processed to a uniform
// white-background blue-duotone treatment in /public/team.
const team = [
  {
    name: "Sunny",
    role: "Founder & CEO",
    photo: "/team/sunny.webp",
    bio: "Pioneered Dataiku's India presence and led product marketing at RapidMiner and Dataiku before founding Datadivr.",
  },
  {
    name: "Gautham",
    role: "CTO",
    photo: "/team/gautham.webp",
    bio: "Architect behind every LabGenie deployment in production, from the Synthite RFP Matcher to ShelfSmart. Owns the agent infrastructure.",
  },
  {
    name: "Andrew",
    role: "Head of Operations",
    photo: "/team/andrew.webp",
    bio: "A decade of US experience in AI, product, and consulting across CPG, retail, pharma, and financial services.",
  },
  {
    name: "Siva",
    role: "Forward-Deployed Engineer",
    photo: "/team/siva.webp",
    bio: "AI engineer and startup builder. Founding engineer across mobility and commerce startups, MVP to launch.",
  },
  {
    name: "Isha",
    role: "Strategy & GTM",
    photo: "/team/isha.webp",
    bio: "Runs strategic operations and go-to-market from the founder's office — the link between customers and product priorities.",
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
    stat: "Food & beverage",
    label: "the vertical we work across, not a single niche",
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
        sub="We are Datadivr. We spent three years working shoulder to shoulder with F&B manufacturers, Synthite among them, alongside many of the names on our partner wall. LabGenie is what we learned, turned into a product."
      />

      {/* Our story — grounded with a (dark-graded) field photo */}
      <section className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          <div>
            <Reveal as="p" className="eyebrow">Our story</Reveal>
            <Stagger gap={0.12} className="mt-5 space-y-5">
              <StaggerItem as="p" variant="up" className="text-lg leading-relaxed text-muted">
                For the last three years, Datadivr worked closely with F&B
                manufacturers across the industry, Synthite, Mane, McCormick, and many of
                the names on our partner wall. We sat with their quality, sales, and
                procurement teams, learned how each one runs, and felt the same friction
                everywhere: messy certificates of analysis, spec reconciliation that drags
                on for days, and quality, sales, and procurement kept in separate silos that
                never quite agree.
              </StaggerItem>
              <StaggerItem as="p" variant="up" className="text-lg leading-relaxed text-muted">
                Along the way we learned what actually moves the needle on a plant
                floor, and what is just software overhead dressed up as progress.
                That distinction is the whole point. LabGenie is the product of that
                experience: an AI operating system that turns hard-won domain
                knowledge into one chat-native agent built for the way these
                manufacturers really work.
              </StaggerItem>
              <StaggerItem as="p" variant="up" className="text-lg leading-relaxed text-muted">
                Datadivr is moving from hands-on services to a product company, and
                LabGenie is our flagship. We are not adapting a generic AI tool to a
                market we just discovered. We are shipping the system we already
                spent years learning to build by hand.
              </StaggerItem>
            </Stagger>
          </div>

          <Reveal variant="right" delay={0.1}>
            <div className="space-y-5">
              <figure className="overflow-hidden rounded-2xl border border-border shadow-panel">
                <img
                  src="/about/processing-floor.webp"
                  alt="A spice and oleoresin processing plant: stainless tanks, conveyors, and bins of raw spice."
                  width={984}
                  height={730}
                  loading="lazy"
                  className="block w-full"
                />
                <figcaption className="border-t border-border bg-surface/40 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
                  Three years on floors like this became LabGenie.
                </figcaption>
              </figure>
              <aside className="panel p-6">
                <p className="eyebrow">Why this matters</p>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">
                  Generic AI can summarize a document. It cannot tell you whether a batch meets a
                  customer&apos;s outgoing spec, because it has never read ten thousand of them.
                </p>
              </aside>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The team */}
      <section className="container-x py-16">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow">The team</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              Built by people who&apos;ve sat across the table from F&B manufacturers.
            </h2>
          </Reveal>
        </div>

        <Stagger gap={0.08} className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {team.map((m) => (
            <StaggerItem
              key={m.name}
              variant="up"
              as="div"
              className="group flex flex-col rounded-2xl border border-border bg-surface/40 p-5 transition-colors duration-300 hover:border-border-strong hover:bg-surface/70"
            >
              <img
                src={m.photo}
                alt={`${m.name}, ${m.role}`}
                width={80}
                height={80}
                loading="lazy"
                className="h-20 w-20 rounded-full bg-white object-cover ring-1 ring-border transition-transform duration-300 group-hover:scale-105"
              />
              <h3 className="mt-4 font-display text-base font-semibold text-text">{m.name}</h3>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-text">{m.role}</p>
              <p className="mt-3 text-[13px] leading-relaxed text-muted">{m.bio}</p>
            </StaggerItem>
          ))}
        </Stagger>
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

        <Stagger gap={0.1} className="mt-12 divide-y divide-border border-t border-border">
          {principles.map(({ icon: Icon, name, note }) => (
            <StaggerItem
              key={name}
              variant="left"
              as="div"
              className="group grid gap-3 py-8 sm:grid-cols-[1fr_1.35fr] sm:gap-14"
            >
              <h3 className="flex items-start gap-3.5 font-display text-xl text-text sm:text-2xl">
                <Icon
                  className="mt-1 h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                {name}
              </h3>
              <p className="max-w-2xl text-base leading-relaxed text-muted">{note}</p>
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
            <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="eyebrow">From services to product</p>
                <h2 className="mt-3 max-w-xl text-3xl sm:text-[2.2rem]">
                  Earned in the field, not invented in a pitch deck.
                </h2>

                <div className="mt-9 grid gap-7 sm:grid-cols-3">
                  {facts.map(({ icon: Icon, stat, label }) => (
                    <div key={stat}>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white/[0.03] text-accent">
                        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <p className="mt-4 font-display text-2xl text-text sm:text-[1.7rem]">{stat}</p>
                      <p className="mt-2 text-[15px] leading-relaxed text-muted">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <figure className="overflow-hidden rounded-xl border border-border shadow-panel">
                <img
                  src="/about/processing-line.webp"
                  alt="Workers sorting and grading red chillies on a spice-processing line."
                  width={665}
                  height={326}
                  loading="lazy"
                  className="block w-full"
                />
              </figure>
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
