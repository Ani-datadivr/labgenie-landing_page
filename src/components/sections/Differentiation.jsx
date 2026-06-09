import ScrollRevealText from "../ScrollRevealText";
import Reveal, { Stagger, StaggerItem } from "../Reveal";
import BrandMark from "../BrandMark";

const PARTNERS = [
  { src: "/logos/clients/synthite.svg", alt: "Synthite", h: "h-3.5" },
  { src: "/logos/clients/mane-mark.png", alt: "Mane Kancor", h: "h-4" },
  { src: "/logos/clients/mccormick.png", alt: "McCormick", h: "h-3.5" },
];

// Credibility through origin: DataDivr's years inside real F&B manufacturers,
// now embedded in the product.
const KNOWS = [
  "what a real quality spec looks like, in whatever format a customer sends it",
  "how ingredient procurement actually works when input prices move every day",
  "why the same product drifts batch to batch, and why that matters at release",
];

export default function Differentiation() {
  return (
    <section className="container-x py-20 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <Reveal className="flex items-center gap-3">
            <span className="h-px w-7 bg-accent/60" />
            <span className="kicker kicker-accent">Why LabGenie</span>
          </Reveal>
          <Reveal as="h2" delay={0.05} variant="blur" className="mt-5 text-3xl sm:text-4xl lg:text-[2.6rem]">
            Built from the inside, not the outside looking in.
          </Reveal>

          {/* lineage, stated plainly: a consulting practice turned product */}
          <Reveal delay={0.1} className="mt-9 max-w-md text-base leading-relaxed text-muted">
            LabGenie is the product DataDivr built after years of F&amp;B consulting,
            the same team, now shipping software instead of slide decks.
          </Reveal>

          <div className="mt-9">
            <Reveal as="div" className="mono-label">Years working inside</Reveal>
            <Stagger gap={0.08} delay={0.1} className="mt-3 flex flex-wrap items-center gap-2.5">
              {PARTNERS.map((p) => (
                <StaggerItem
                  key={p.alt}
                  variant="scale"
                  className="inline-flex items-center rounded-full border border-border bg-bg-elev/60 px-4 py-2 transition-colors duration-300 hover:border-border-strong"
                >
                  <BrandMark src={p.src} alt={p.alt} className={p.h} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>

        <div className="lg:pt-2">
          <Reveal as="p" className="flex flex-wrap items-center gap-x-1.5 text-lg leading-relaxed text-muted">
            LabGenie was built out of DataDivr, a consulting firm that spent years working inside
            <BrandMark src="/logos/clients/synthite.svg" alt="Synthite" className="h-[0.8em]" />,
            <BrandMark src="/logos/clients/mane-mark.png" alt="Mane Kancor" className="h-[0.9em]" />, and
            <BrandMark src="/logos/clients/mccormick.png" alt="McCormick" className="h-[0.8em]" />. So it already knows:
          </Reveal>
          <Stagger gap={0.12} className="mt-6 space-y-4">
            {KNOWS.map((k) => (
              <StaggerItem key={k} variant="left" as="div" className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-lg leading-relaxed text-text">{k}.</span>
              </StaggerItem>
            ))}
          </Stagger>
          <ScrollRevealText
            as="p"
            className="mt-8 font-display text-xl font-medium leading-snug tracking-tight text-text sm:text-2xl"
          >
            A generic AI tool has none of this. LabGenie has years of domain knowledge, embedded in every agent.
          </ScrollRevealText>
        </div>
      </div>
    </section>
  );
}
