import Logo from "./Logo";
import { AlertTriangle, TrendingUp, FileCheck2, ArrowRight } from "lucide-react";

// A "daily brief" dashboard overview of every LabGenie agent — the product as a
// morning report. Static mockup; dark surface, brand-blue, status-coded.
const AGENTS = [
  { name: "Quality Assurance", status: "live", metric: "18 specs matched", note: "1 deviation flagged" },
  { name: "Sales", status: "live", metric: "12 requests routed", note: "94% best match" },
  { name: "Procurement", status: "build", metric: "Cardamom +4%", note: "buy window open" },
  { name: "Production", status: "build", metric: "Week 12 short", note: "1.4 of 2.0 T planned" },
  { name: "Formulation", status: "build", metric: "2 samples tracked", note: "1 to conversion" },
  { name: "Market Intel", status: "roadmap", metric: "3 signals", note: "1 EU reg change" },
];

const STATUS = {
  live: { dot: "bg-[#4ade80]", ring: "ring-[#4ade80]/30", label: "Live", text: "text-[#4ade80]" },
  build: { dot: "bg-[#fb923c]", ring: "ring-[#fb923c]/30", label: "Build", text: "text-[#fb923c]" },
  roadmap: { dot: "bg-dim", ring: "ring-border", label: "Soon", text: "text-dim" },
};

const ATTENTION = [
  { Icon: AlertTriangle, tone: "warn", text: "Lead (Pb) over a customer limit on lot TRM-4471.", action: "Hold lot" },
  { Icon: TrendingUp, tone: "accent", text: "Cardamom up 4%. Lock volume before festival demand.", action: "Review buy" },
  { Icon: FileCheck2, tone: "accent", text: "New buyer request matches Paprika 40M at 94%.", action: "Route" },
];

export default function DashboardBrief() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-panel">
      {/* chrome */}
      <div className="flex items-center justify-between border-b border-border bg-surface-2/60 px-4 py-3 sm:px-5">
        <span className="flex items-center gap-2.5">
          <span className="hidden gap-1.5 sm:inline-flex">
            <span className="h-2.5 w-2.5 rounded-full bg-surface-3/80 ring-1 ring-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-surface-3/80 ring-1 ring-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-surface-3/80 ring-1 ring-border" />
          </span>
          <span className="flex items-center gap-2 sm:ml-2">
            <Logo showWordmark={false} className="text-text [&_svg]:h-5 [&_svg]:w-5" />
            <span className="font-display text-sm font-semibold text-text">Daily brief</span>
          </span>
        </span>
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-[#4ade80]" />
          Live
        </span>
      </div>

      <div className="grid gap-px bg-border lg:grid-cols-[1.55fr_1fr]">
        {/* agents overview */}
        <div className="bg-surface p-5 sm:p-6">
          <div className="flex items-baseline justify-between">
            <h3 className="font-display text-[15px] font-semibold text-text">Across every station</h3>
            <span className="mono-label">Today</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {AGENTS.map((a) => {
              const s = STATUS[a.status];
              return (
                <div
                  key={a.name}
                  className="rounded-xl border border-border bg-bg/60 p-3.5 transition-colors hover:border-border-strong"
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${s.dot} ring-2 ${s.ring}`} />
                    <span className={`font-mono text-[9px] uppercase tracking-wider ${s.text}`}>
                      {s.label}
                    </span>
                  </div>
                  <div className="mt-2 text-[13px] font-medium text-text">{a.name}</div>
                  <div className="mt-2 font-display text-sm font-semibold tracking-tight text-text">
                    {a.metric}
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted">{a.note}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* needs attention */}
        <div className="bg-surface p-5 sm:p-6">
          <div className="flex items-baseline justify-between">
            <h3 className="font-display text-[15px] font-semibold text-text">Needs your attention</h3>
            <span className="mono-label">3</span>
          </div>
          <ul className="mt-4 space-y-2.5">
            {ATTENTION.map((item) => (
              <li
                key={item.text}
                className="flex items-start gap-3 rounded-xl border border-border bg-bg/60 p-3.5"
              >
                <item.Icon
                  className={`mt-0.5 h-4 w-4 shrink-0 ${item.tone === "warn" ? "text-warm" : "text-accent"}`}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[12.5px] leading-snug text-muted">{item.text}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 self-center font-mono text-[10px] uppercase tracking-wider text-accent-text">
                  {item.action}
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between rounded-xl border border-accent/25 bg-accent/[0.07] px-4 py-3">
            <span className="text-[12.5px] text-muted">Manual work avoided today</span>
            <span className="font-display text-base font-semibold text-accent-text">~3 days</span>
          </div>
        </div>
      </div>
    </div>
  );
}
