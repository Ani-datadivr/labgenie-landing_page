import { Clock, HeartHandshake, Languages, Rocket, GraduationCap } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ClientTicker from "@/components/ClientTicker";
import FinalCTA from "@/components/FinalCTA";
import RotatingSegments from "@/components/RotatingSegments";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import { buyer } from "@/lib/content";

// How we work — the traits manufacturers actually stay for.
const TRAITS = [
  { Icon: Clock, title: "We answer on time", note: "Need a hand? You get a real person quickly, not a ticket number and a week of silence." },
  { Icon: HeartHandshake, title: "We check in", note: "We stay close even when everything is running smoothly, not just when something breaks." },
  { Icon: Languages, title: "No jargon, ever", note: "We speak your team's language. No acronyms thrown around to sound clever or sell harder." },
  { Icon: Rocket, title: "Effortless onboarding", note: "We do the heavy lifting, so going live feels smooth, never like another IT project." },
  { Icon: GraduationCap, title: "We learn from you", note: "Your team teaches us how the floor really runs, and the product keeps getting sharper for it." },
];

export const metadata = {
  title: "For F&B Manufacturers",
  description:
    "Built for mid-to-large B2B ingredient manufacturers — flavors, spices, oleoresins, and specialty ingredients. For the people who supply the world's brands.",
};

export default function ManufacturersPage() {
  return (
    <>
      <PageHeader eyebrow={buyer.eyebrow} title={buyer.title} sub={buyer.sub} />

      <section className="container-x py-10">
        <Reveal>
          <RotatingSegments />
        </Reveal>
      </section>

      {/* Economic buyers */}
      <section className="container-x py-12">
        <Reveal>
          <p className="eyebrow">Who buys LabGenie</p>
          <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl">
            The pain shows up in the corner office.
          </h2>
        </Reveal>
        <Stagger className="mt-8 divide-y divide-border border-t border-border">
          {buyer.economic.map((b) => (
            <StaggerItem
              key={b.role}
              variant="left"
              as="div"
              className="grid gap-1.5 py-6 sm:grid-cols-[220px_1fr] sm:gap-10"
            >
              <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent-text">{b.role}</span>
              <p className="max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">{b.pain}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Daily users */}
      <section className="container-x py-12">
        <Reveal>
          <p className="eyebrow">Who uses it daily</p>
          <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl">
            The win shows up on the floor.
          </h2>
        </Reveal>
        <Stagger className="mt-8 divide-y divide-border border-t border-border">
          {buyer.daily.map((d) => (
            <StaggerItem
              key={d.role}
              variant="left"
              as="div"
              className="grid gap-1.5 py-6 sm:grid-cols-[220px_1fr] sm:gap-10"
            >
              <span className="flex items-center gap-2.5 font-medium text-text">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {d.role}
              </span>
              <p className="max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">{d.win}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* How we work — why manufacturers stay */}
      <section className="container-x py-12">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow">How we work</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              Manufacturers don&apos;t just use LabGenie. They like working with us.
            </h2>
          </Reveal>
        </div>

        <Stagger gap={0.08} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TRAITS.map(({ Icon, title, note }) => (
            <StaggerItem
              key={title}
              variant="up"
              as="div"
              className="group rounded-2xl border border-border bg-surface/40 p-6 transition-colors duration-300 hover:border-border-strong hover:bg-surface/70"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/[0.08] text-accent">
                <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-lg text-text">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{note}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <ClientTicker />
      <FinalCTA
        eyebrow="Get started"
        title="Built for your plant, not a generic demo."
        sub="Show us the workflow that eats your team's week. We'll show you what it looks like solved on your own data."
      />
    </>
  );
}
