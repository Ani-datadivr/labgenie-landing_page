import { Check, ArrowRight, FlaskConical } from "lucide-react";

// Reverse-formulation screen: a target spec on the left, LabGenie's
// reverse-engineered component breakdown on the right (with a stacked bar),
// and a compact sample-tracking thread from sample sent to commercial close.

const TARGET = [
  { label: "Color value", value: "40,000 CU" },
  { label: "Solvent residue", value: "< 2%" },
  { label: "Capsaicin", value: "0.4%" },
];

const COMPONENTS = [
  { name: "Paprika oleoresin", pct: 62, color: "#0066FF" },
  { name: "Carrier oil", pct: 30, color: "#5AA0FF" },
  { name: "Capsicum extract", pct: 8, color: "#9CC4FF" },
];

const STEPS = [
  { label: "Sample sent", meta: "Batch PX-2241 · 250g", state: "done" },
  { label: "Customer response", meta: "Spec confirmed", state: "done" },
  { label: "Commercial conversion", meta: "Converted: 1.2T PO", state: "converted" },
];

export default function FormulationMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-panel">
      {/* header */}
      <div className="flex items-center justify-between border-b border-border bg-surface-2/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <FlaskConical className="h-4 w-4 text-accent" strokeWidth={2} />
          <div>
            <p className="font-display text-sm font-semibold text-text">Reverse formulation</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
              Paprika 40M
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
          Matched
        </span>
      </div>

      {/* two-column card */}
      <div className="grid gap-px bg-border sm:grid-cols-2">
        {/* target spec */}
        <div className="bg-surface p-5">
          <p className="mono-label mb-3 text-dim">Target spec</p>
          <ul className="space-y-2.5">
            {TARGET.map((t) => (
              <li
                key={t.label}
                className="flex items-center justify-between rounded-lg border border-border bg-bg/60 px-3 py-2"
              >
                <span className="text-[12px] text-muted">{t.label}</span>
                <span className="font-mono text-[12px] text-text">{t.value}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* reverse-engineered breakdown */}
        <div className="bg-surface p-5">
          <p className="mono-label mb-3 text-dim">Reverse engineered</p>

          {/* stacked bar, with a sheen that sweeps as it "composes" */}
          <div className="sheen-loop mb-3 flex h-2 w-full overflow-hidden rounded-full">
            {COMPONENTS.map((c) => (
              <div
                key={c.name}
                style={{ width: `${c.pct}%`, background: c.color }}
                className="h-full"
              />
            ))}
          </div>

          <ul className="space-y-2">
            {COMPONENTS.map((c) => (
              <li key={c.name} className="flex items-center gap-2 text-[12px]">
                <span
                  className="h-2 w-2 shrink-0 rounded-sm"
                  style={{ background: c.color }}
                />
                <span className="flex-1 truncate text-muted">{c.name}</span>
                <span className="font-mono text-[12px] text-text">{c.pct}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* sample-tracking thread */}
      <div className="border-t border-border px-5 py-4 sm:px-6">
        <p className="mono-label mb-3 text-dim">Sample tracking</p>
        <ol className="space-y-0">
          {STEPS.map((s, i) => (
            <li key={s.label} className="relative flex gap-3 pb-4 last:pb-0">
              {/* connector */}
              {i < STEPS.length - 1 && (
                <span className="absolute left-[10px] top-5 h-full w-px bg-border-strong" />
              )}
              {/* node */}
              <span
                className={`relative z-10 mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                  s.state === "converted"
                    ? "bg-accent text-white"
                    : "border border-[#4ade80]/40 bg-[#4ade80]/10 text-[#4ade80]"
                }`}
              >
                <Check className="h-3 w-3" strokeWidth={2.5} />
              </span>
              <div className="flex flex-1 items-center justify-between gap-2">
                <span
                  className={`text-[13px] ${
                    s.state === "converted" ? "font-medium text-text" : "text-text"
                  }`}
                >
                  {s.label}
                </span>
                <span
                  className={`inline-flex items-center gap-1 font-mono text-[11px] ${
                    s.state === "converted" ? "text-accent-text" : "text-muted"
                  }`}
                >
                  {s.state === "converted" && <ArrowRight className="h-3 w-3" strokeWidth={2} />}
                  {s.meta}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
