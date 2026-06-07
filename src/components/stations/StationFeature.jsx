// Alternating station feature row: text on one side, a product mockup on the
// other. Used down the /platform stations breakout.
//
// Props:
//   name      — station name
//   status    — "Live" | "In build" | "Roadmap"
//   headline  — short bold line
//   body       — supporting paragraph
//   children  — the product mockup (a self-contained "screen")
//   flip      — when true, mockup sits on the left (desktop)
const STATUS = {
  Live: {
    badge: "border-[#4ade80]/40 bg-[#4ade80]/10 text-[#4ade80] glow-live",
    dot: "bg-[#4ade80]",
    pulse: true,
  },
  "In build": {
    badge: "border-[#fb923c]/40 bg-[#fb923c]/10 text-[#fb923c] glow-build",
    dot: "bg-[#fb923c]",
    pulse: false,
  },
  Roadmap: {
    badge: "border-border bg-transparent text-dim",
    dot: "bg-dim",
    pulse: false,
  },
};

export default function StationFeature({ name, status, headline, body, children, flip = false }) {
  const cfg = STATUS[status] ?? STATUS.Roadmap;
  return (
    <div className="grid items-center gap-10 border-t border-border py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
      <div className={flip ? "lg:order-2" : ""}>
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] ${cfg.badge}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot} ${cfg.pulse ? "animate-pulse-glow" : ""}`} />
            {status}
          </span>
          <span className="mono-label">{name}</span>
        </div>
        <h3 className="mt-5 text-2xl sm:text-3xl lg:text-[2.1rem]">{headline}</h3>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{body}</p>
      </div>

      <div className={flip ? "lg:order-1" : ""}>{children}</div>
    </div>
  );
}
