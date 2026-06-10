import { designPartner } from "@/lib/content";
import Reveal, { Stagger, StaggerItem } from "../Reveal";
import DaysToMinutes from "../DaysToMinutes";
import SynthiteMark from "../SynthiteMark";

// One confident proof point. The quote sits on a deliberate near-white card — the
// single light surface on the page — so it reads as a pulled-forward statement,
// not a flip to a light theme. Three hard metrics underneath.
const METRICS = [
  { value: "3–5 days → minutes", animated: true, label: "Time to check a batch's quality documents" },
  { value: "1000+ requests", label: "Handled without a single manual sort" },
  { value: "Synthite", synthite: true, label: "First design partner, the world's largest oleoresin producer" },
];

export default function SocialProof() {
  return (
    <section className="container-x py-20 lg:py-28">
      <div className="max-w-3xl">
        <Reveal className="flex items-center gap-3">
          <span className="h-px w-7 bg-accent/60" />
          <span className="kicker kicker-accent">Proof</span>
        </Reveal>
        <Reveal as="h2" delay={0.05} variant="blur" className="mt-5 text-3xl sm:text-4xl">
          Trusted by the manufacturers who set the standard.
        </Reveal>
      </div>

      {/* The one light card. Visibility-safe reveal (position only): this quote
          is the page's trust moment and must never render blank if the
          animation stalls (hidden tab, throttled rAF) or an observer misfires. */}
      <Reveal
        as="figure"
        variant="rise"
        duration={0.85}
        className="mt-12 rounded-2xl bg-[#f5f7fa] p-8 shadow-panel sm:p-12"
      >
        <div className="font-display text-lg font-semibold tracking-tight text-[#0e141c]">
          <SynthiteMark tone="dark" className="h-5" />
        </div>
        <blockquote className="mt-5 font-display text-2xl font-medium leading-snug tracking-tight text-[#0e141c] sm:text-[2rem] sm:leading-[1.2]">
          &ldquo;{designPartner.quote}&rdquo;
        </blockquote>
        {/* #46505e clears AAA (7:1) on the #f5f7fa card at this small size */}
        <figcaption className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-[#46505e]">
          {designPartner.name} · {designPartner.descriptor}
        </figcaption>
      </Reveal>

      {/* metrics */}
      <Stagger className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
        {METRICS.map((m) => (
          <StaggerItem key={m.value} className="bg-bg p-7">
            <div className="font-display text-2xl font-semibold tracking-tight text-accent-text">
              {m.animated ? <DaysToMinutes /> : m.synthite ? <SynthiteMark className="h-6" /> : m.value}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">{m.label}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
