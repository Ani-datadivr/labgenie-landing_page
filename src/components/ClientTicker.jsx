import { clients } from "@/lib/content";

// Infinite client marquee. Duplicates the list so the CSS translateX(-50%)
// loop is seamless. Pauses on hover. Logos are wordmark placeholders — swap
// for real SVG client logos when available.

export default function ClientTicker({ label = "Trusted by ingredient manufacturers" }) {
  const row = [...clients, ...clients];
  return (
    <section className="border-y border-border bg-bg-elev/40 py-10">
      <div className="container-x">
        <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-dim">
          {label}
        </p>
        <div className="marquee-mask group relative">
          <div className="marquee-track gap-12 group-hover:[animation-play-state:paused]">
            {row.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="flex shrink-0 items-center gap-2 font-display text-lg font-medium text-muted/70 transition-colors hover:text-text"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent/50" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
