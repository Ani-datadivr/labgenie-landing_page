import ScrollRevealText from "../ScrollRevealText";
import Reveal, { Stagger, StaggerItem } from "../Reveal";

// Credibility through origin: Datadivr's years inside real F&B manufacturers,
// now embedded in the product. Copy is editable via Keystatic (singleton
// "differentiation").
const DEFAULTS = {
  kicker: "Why LabGenie",
  title: "Built from the inside, not the outside looking in.",
  intro:
    "LabGenie is the product Datadivr built after years of F&B consulting, the same team, now shipping software instead of slide decks.",
  yearsLabel: "Years working inside",
  yearsText: "some of the largest spice, flavor, and oleoresin manufacturers in the world.",
  leadIn:
    "LabGenie was built out of Datadivr, a consulting firm that spent years working inside some of the biggest names in spices, flavors, and oleoresins. So it already knows:",
  knows: [
    "what a real quality spec looks like, in whatever format a customer sends it",
    "how ingredient procurement actually works when input prices move every day",
    "why the same product drifts batch to batch, and why that matters at release",
  ],
  closing:
    "A generic AI tool has none of this. LabGenie has years of domain knowledge, embedded in every agent.",
};

export default function Differentiation({ copy }) {
  const c = { ...DEFAULTS, ...(copy || {}) };
  const knows = c.knows?.length ? c.knows : DEFAULTS.knows;

  return (
    <section className="container-x py-20 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <Reveal className="flex items-center gap-3">
            <span className="h-px w-7 bg-accent/60" />
            <span className="kicker kicker-accent">{c.kicker}</span>
          </Reveal>
          <Reveal as="h2" delay={0.05} variant="blur" className="mt-5 text-3xl sm:text-4xl lg:text-[2.6rem]">
            {c.title}
          </Reveal>

          {/* lineage, stated plainly: a consulting practice turned product */}
          <Reveal delay={0.1} className="mt-9 max-w-md text-base leading-relaxed text-muted">
            {c.intro}
          </Reveal>

          <Reveal delay={0.15} className="mt-9">
            <span className="mono-label">{c.yearsLabel}</span>
            <p className="mt-3 max-w-md text-lg font-medium leading-snug text-text">
              {c.yearsText}
            </p>
          </Reveal>
        </div>

        <div className="lg:pt-2">
          <Reveal as="p" className="text-lg leading-relaxed text-muted">
            {c.leadIn}
          </Reveal>
          <Stagger gap={0.12} className="mt-6 space-y-4">
            {knows.map((k) => (
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
            {c.closing}
          </ScrollRevealText>
        </div>
      </div>
    </section>
  );
}
