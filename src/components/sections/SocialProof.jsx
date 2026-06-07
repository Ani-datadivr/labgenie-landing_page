import { designPartner } from "@/lib/content";

// One confident proof point. The quote sits on a deliberate near-white card — the
// single light surface on the page — so it reads as a pulled-forward statement,
// not a flip to a light theme. Three hard metrics underneath.
const METRICS = [
  { value: "3 days → minutes", label: "Time to check a batch's quality documents" },
  { value: "Thousands of requests", label: "Handled without a single manual sort" },
  { value: "Synthite", label: "First design partner, the world's largest oleoresin producer" },
];

export default function SocialProof() {
  return (
    <section className="container-x grid-frame border-t border-border py-20 lg:py-28">
      <div className="max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="h-px w-7 bg-accent/60" />
          <span className="kicker kicker-accent">Proof</span>
        </div>
        <h2 className="mt-5 text-3xl sm:text-4xl">
          Trusted by the manufacturers who set the standard.
        </h2>
      </div>

      {/* the one light card */}
      <figure className="mt-12 rounded-2xl bg-[#f5f7fa] p-8 shadow-panel sm:p-12">
        <div className="font-display text-lg font-semibold tracking-tight text-[#0e141c]">
          {designPartner.name}
        </div>
        <blockquote className="mt-5 font-display text-2xl font-medium leading-snug tracking-tight text-[#0e141c] sm:text-[2rem] sm:leading-[1.2]">
          &ldquo;{designPartner.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-[#5b6675]">
          {designPartner.name} · {designPartner.descriptor}
        </figcaption>
      </figure>

      {/* metrics */}
      <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
        {METRICS.map((m) => (
          <div key={m.value} className="bg-bg p-7">
            <div className="font-display text-2xl font-semibold tracking-tight text-accent">
              {m.value}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">{m.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
