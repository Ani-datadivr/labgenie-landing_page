import ScrollRevealText from "../ScrollRevealText";

// Credibility through origin: DataDivr's years inside real F&B manufacturers,
// now embedded in the product. No fabricated logos — named references only.
const KNOWS = [
  "what a real quality spec looks like, in whatever format a customer sends it",
  "how ingredient procurement actually works when input prices move every day",
  "why the same product drifts batch to batch, and why that matters at release",
];

export default function Differentiation() {
  return (
    <section className="container-x grid-frame border-t border-border py-20 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-7 bg-accent/60" />
            <span className="kicker kicker-accent">Why LabGenie</span>
          </div>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.6rem]">
            Built from the inside, not the outside looking in.
          </h2>

          {/* lineage */}
          <div className="mt-10 flex items-center gap-4">
            <div className="rounded-xl border border-border bg-surface/50 px-5 py-4">
              <div className="mono-label text-dim">Origin</div>
              <div className="mt-1 font-display text-lg font-semibold text-text">DataDivr</div>
              <div className="text-xs text-muted">F&amp;B consulting</div>
            </div>
            <svg viewBox="0 0 40 16" className="h-4 w-10 shrink-0 text-accent" fill="none" aria-hidden="true">
              <path d="M2 8h32M28 3l6 5-6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="rounded-xl border border-accent/30 bg-accent/[0.08] px-5 py-4">
              <div className="mono-label text-accent/80">Product</div>
              <div className="mt-1 font-display text-lg font-semibold text-text">LabGenie</div>
              <div className="text-xs text-muted">The F&amp;B platform</div>
            </div>
          </div>

          <div className="mt-8">
            <div className="mono-label">Years working inside</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Synthite", "Mane", "McCormick"].map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-border bg-bg-elev/60 px-4 py-1.5 font-display text-sm font-medium text-text"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:pt-2">
          <p className="text-lg leading-relaxed text-muted">
            LabGenie was built out of DataDivr, a consulting firm that spent years working inside
            Synthite, Mane, and McCormick. So it already knows:
          </p>
          <ul className="mt-6 space-y-4">
            {KNOWS.map((k) => (
              <li key={k} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-lg leading-relaxed text-text">{k}.</span>
              </li>
            ))}
          </ul>
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
