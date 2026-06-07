import { designPartner, clients } from "@/lib/content";

// Quiet, confident proof: a single design-partner statement (no carousel), and a
// static client row. No marquee, no count-up — restraint reads as credibility.
export default function Proof() {
  return (
    <section className="container-x grid-frame border-t border-border py-20 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-7 bg-accent/60" />
            <span className="kicker kicker-accent">Design partner</span>
          </div>
          <p className="mt-6 font-display text-sm text-muted">
            <span className="text-text">{designPartner.name}</span> — {designPartner.descriptor}.
          </p>
        </div>

        <blockquote className="border-l border-border-strong pl-6 sm:pl-8">
          <p className="font-display text-2xl font-medium leading-snug tracking-tight text-text sm:text-3xl">
            &ldquo;{designPartner.quote}&rdquo;
          </p>
          <footer className="mono-label mt-6">
            {designPartner.name} · Quality &amp; sales operations
          </footer>
        </blockquote>
      </div>

      {/* client row */}
      <div className="mt-16 border-t border-border pt-8">
        <span className="mono-label">Built with ingredient manufacturers across the industry</span>
        <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
          {clients.slice(0, 8).map((name) => (
            <div
              key={name}
              className="flex h-16 items-center justify-center bg-bg px-3 text-center"
            >
              <span className="font-display text-sm font-medium text-muted">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
