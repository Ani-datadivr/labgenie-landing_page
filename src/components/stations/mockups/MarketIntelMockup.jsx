import { TrendingUp, Package, Scale } from "lucide-react";

// Market intelligence briefing feed: three morning signals, each with an icon,
// headline, source tag and a "relevant to you" line. Reads like a curated
// briefing rather than a data dump.

const SIGNALS = [
  {
    icon: TrendingUp,
    headline: "Ashwagandha demand up 38% QoQ",
    source: "Nutraceutical trade index",
    why: "You hold 4.2T of root extract in finished inventory.",
  },
  {
    icon: Package,
    headline: "Competitor launched a clean-label paprika line",
    source: "Industry newsletter · EU",
    why: "Overlaps your Paprika 40M, the spec you reverse-engineered last week.",
  },
  {
    icon: Scale,
    headline: "EU lowers ethylene oxide limit on spices",
    source: "EU Reg 2026/0411",
    why: "Affects three of your active cardamom and chilli products.",
    flagged: true,
  },
];

export default function MarketIntelMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-panel">
      {/* header */}
      <div className="flex items-center justify-between border-b border-border bg-surface-2/60 px-4 py-3">
        <div>
          <p className="font-display text-sm font-semibold text-text">This morning</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
            3 signals
          </p>
        </div>
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
          Curated for you
        </span>
      </div>

      {/* feed */}
      <div className="px-5 sm:px-6">
        {SIGNALS.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.headline}
              className={`flex gap-3.5 py-4 ${
                i < SIGNALS.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span
                className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border ${
                  s.flagged
                    ? "border-[#FFB454]/30 bg-[#FFB454]/10 text-[#FFB454] flag-glow"
                    : "border-accent/25 bg-accent/[0.08] text-accent"
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-medium leading-snug text-text">
                  {s.headline}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
                  {s.source}
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-muted">
                  <span className="text-dim">Relevant to you because </span>
                  {s.why}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
