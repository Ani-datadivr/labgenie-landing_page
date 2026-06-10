// Quality Agent screen: an incoming RFP being matched against your product
// information sheet, row by row, with a light-blue scanner beam sweeping the
// panel like a reader. MATCH = in spec, REVIEW = needs a human look.
// CSS-only scanner (the .scan-line / .scan-edge animation), so no client JS.

// Every verdict shows the measured value against the requirement: a QA reader
// will not trust a MATCH that hides the result it was judged on.
const ROWS = [
  { title: "Capsaicin content", sub: "42,600 SHU · req ≥ 40,000 SHU", status: "match" },
  { title: "Solvent residual", sub: "34 ppm · limit ≤ 30 ppm", status: "review" },
  { title: "Color value", sub: "CV 116,400 · spec ≥ 118,000", status: "review" },
  { title: "Microbiological limit", sub: "TPC 2.1×10³ cfu/g · ≤ 10⁴", status: "match" },
  { title: "Moisture content", sub: "2.4% w/w · limit ≤ 3.0%", status: "match" },
];

export default function QaMockup() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0e14] p-4 shadow-panel sm:p-5">
      {/* status header */}
      <div className="flex items-center gap-2 px-1 pb-4 pt-1">
        <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(0,102,255,0.7)]" />
        <span className="font-mono text-[12px] text-accent-text">Analyzing RFP</span>
        <span className="font-mono text-[12px] text-dim">· Harris Foods</span>
      </div>

      {/* scanned rows */}
      <div className="relative space-y-2.5">
        {ROWS.map((r) => (
          <div
            key={r.title}
            className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3"
          >
            <div className="min-w-0">
              <div className="truncate text-[15px] font-semibold text-text">{r.title}</div>
              <div className="mt-0.5 truncate font-mono text-[11px] text-dim">{r.sub}</div>
            </div>
            <StatusBadge status={r.status} />
          </div>
        ))}

        {/* light-blue scanner beam sweeping down the panel */}
        <div aria-hidden="true" className="scan-line absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-[#5aa0ff]/25 to-transparent" />
        <div aria-hidden="true" className="scan-edge absolute inset-x-0 top-0 h-px bg-[#7db8ff] shadow-[0_0_14px_2px_rgba(122,184,255,0.85)]" />
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const ok = status === "match";
  return (
    <span
      className={`shrink-0 rounded-md border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.12em] ${
        ok
          ? "border-accent/35 bg-accent/10 text-accent-text"
          : "border-warm/40 bg-warm/10 text-warm"
      }`}
    >
      {ok ? "Match" : "Review"}
    </span>
  );
}
