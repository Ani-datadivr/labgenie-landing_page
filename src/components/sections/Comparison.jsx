import { Check, X, Minus } from "lucide-react";
import SectionHeader from "./SectionHeader";

// rig.ai-style comparison: LabGenie against the manual process and a generic AI
// tool, across the dimensions an F&B QA/ops buyer actually weighs. The LabGenie
// column is highlighted; every cell carries text, never color alone.
const COLS = ["Manual process", "Generic AI tool", "LabGenie"];

const ROWS = [
  { c: "COA → spec reconciliation", v: ["3–5 days per batch", "Hours, if it parses", "Minutes"], mark: [null, null, "yes"] },
  { c: "F&B domain accuracy", v: ["High, but slow", "Hallucinates specs", "Trained on F&B data"], mark: ["partial", "no", "yes"] },
  { c: "Reconciles 3 spec formats at once", v: ["One at a time", "No", "Yes"], mark: ["no", "no", "yes"] },
  { c: "Reads from your ERP", v: ["Copy-paste", "No", "Yes"], mark: ["no", "no", "yes"] },
  { c: "Cross-station orchestration", v: ["Email threads", "No", "Yes"], mark: ["no", "no", "yes"] },
  { c: "Auditable, reviewable output", v: ["Manual trail", "Opaque", "Built in"], mark: ["partial", "no", "yes"] },
];

function Mark({ kind }) {
  if (kind === "yes") return <Check size={15} strokeWidth={2.5} className="text-accent" aria-label="yes" />;
  if (kind === "no") return <X size={15} strokeWidth={2.5} className="text-dim" aria-label="no" />;
  if (kind === "partial") return <Minus size={15} strokeWidth={2.5} className="text-muted" aria-label="partial" />;
  return null;
}

export default function Comparison() {
  return (
    <section className="container-x grid-frame border-t border-border py-20 lg:py-28">
      <SectionHeader
        kicker="Why it's different"
        title="Not a chatbot bolted onto your inbox."
        sub="LabGenie is built on the data and workflows of F&B ingredient manufacturing, so it does the reconciliation work, not just talk about it."
      />

      <div className="mt-12 overflow-x-auto">
        <div className="min-w-[640px] overflow-hidden rounded-2xl border border-border">
          {/* header */}
          <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] border-b border-border bg-surface/60">
            <div className="px-5 py-4">
              <span className="mono-label">Capability</span>
            </div>
            {COLS.map((c, i) => (
              <div
                key={c}
                className={`px-5 py-4 ${i === 2 ? "bg-accent/[0.07]" : ""}`}
              >
                <span
                  className={`font-display text-sm font-semibold ${
                    i === 2 ? "text-accent-text" : "text-muted"
                  }`}
                >
                  {c}
                </span>
              </div>
            ))}
          </div>

          {/* rows */}
          {ROWS.map((row, ri) => (
            <div
              key={row.c}
              className={`grid grid-cols-[1.4fr_1fr_1fr_1fr] ${
                ri !== ROWS.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="px-5 py-4 text-sm text-text">{row.c}</div>
              {row.v.map((val, ci) => (
                <div
                  key={ci}
                  className={`flex items-center gap-2 px-5 py-4 text-sm ${
                    ci === 2 ? "bg-accent/[0.05] text-text" : "text-muted"
                  }`}
                >
                  <Mark kind={row.mark[ci]} />
                  <span>{val}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
