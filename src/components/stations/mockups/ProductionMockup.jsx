import { TriangleAlert, ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";

// Production planning screen: planned vs actual run volume across five weeks,
// with week 12 flagged where committed demand outpaces planned capacity.
// A LabGenie alert bubble surfaces the gap and offers a rebalance action.

const WEEKS = [
  { label: "W09", planned: 1.6, actual: 1.5 },
  { label: "W10", planned: 1.7, actual: 1.7 },
  { label: "W11", planned: 1.5, actual: 1.6 },
  { label: "W12", planned: 1.4, actual: 2.0, flagged: true },
  { label: "W13", planned: 1.8, actual: null },
];

const MAX = 2.2; // tonnes, chart ceiling

export default function ProductionMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-panel">
      {/* header */}
      <div className="flex items-center justify-between border-b border-border bg-surface-2/60 px-4 py-3">
        <div>
          <p className="font-display text-sm font-semibold text-text">Production plan</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
            Cardamom extract
          </p>
        </div>
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Tonnes / week
        </span>
      </div>

      {/* chart */}
      <div className="px-5 pb-4 pt-5 sm:px-6">
        {/* legend */}
        <div className="mb-4 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-surface-2 ring-1 ring-border-strong" />
            Planned
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-accent" />
            Committed
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2.5">
          {WEEKS.map((w) => {
            const plannedH = (w.planned / MAX) * 100;
            const actualH = w.actual != null ? (w.actual / MAX) * 100 : null;
            return (
              <div key={w.label} className="flex flex-col items-center gap-2">
                <div className="relative flex h-32 w-full items-end justify-center gap-1.5">
                  {/* planned bar */}
                  <div
                    className="w-3.5 rounded-t-sm bg-surface-2 ring-1 ring-inset ring-border-strong"
                    style={{ height: `${plannedH}%` }}
                  />
                  {/* committed / actual bar */}
                  {actualH != null ? (
                    <div
                      className={`w-3.5 rounded-t-sm ${
                        w.flagged ? "bg-[#FFB454]" : "bg-accent"
                      }`}
                      style={{ height: `${actualH}%` }}
                    />
                  ) : (
                    <div
                      className="w-3.5 rounded-t-sm border border-dashed border-border-strong"
                      style={{ height: `${plannedH}%` }}
                    />
                  )}
                  {w.flagged && (
                    <span className="absolute -top-1 right-1 text-[#FFB454]">
                      <TriangleAlert className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                  )}
                </div>
                <span
                  className={`font-mono text-[10px] uppercase tracking-wider ${
                    w.flagged ? "text-[#FFB454]" : "text-dim"
                  }`}
                >
                  {w.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* alert bubble */}
      <div className="border-t border-border px-5 py-4 sm:px-6">
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5">
            <Logo showWordmark={false} className="text-accent [&_svg]:h-5 [&_svg]:w-5" />
          </span>
          <div className="flex-1 rounded-2xl rounded-tl-md border border-accent/25 bg-accent/[0.08] px-4 py-3">
            <div className="mb-1.5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#FFB454]">
              <TriangleAlert className="h-3 w-3" strokeWidth={2} />
              Capacity gap · week 12
            </div>
            <p className="text-[13px] leading-relaxed text-text">
              Sales committed 2T of cardamom extract for week 12. Current planned
              capacity is 1.4T. Adjust the plan?
            </p>
            <button
              type="button"
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-[12px] font-medium text-white"
            >
              Rebalance plan
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
