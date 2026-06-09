import Logo from "./Logo";
import { Search, LayoutGrid, ShieldCheck, Megaphone, Workflow, FlaskConical } from "lucide-react";

// A polished, product-aligned mockup of the LabGenie app dashboard: browser
// chrome, sidebar, a command bar, KPI cards with sparklines, a 7-day throughput
// chart, and a live activity feed. Static (no client JS); brand-blue throughout.

const NAV = [
  { name: "Overview", Icon: LayoutGrid, active: true },
  { name: "Quality", Icon: ShieldCheck },
  { name: "Sales", Icon: Megaphone },
  { name: "Production", Icon: FlaskConical },
  { name: "Integrations", Icon: Workflow },
];

const KPIS = [
  { label: "RFPs matched", value: "247", spark: [6, 8, 7, 10, 9, 12, 14] },
  { label: "Quotes drafted", value: "89", spark: [4, 5, 5, 7, 6, 8, 9] },
  { label: "Specs cleared", value: "1,284", spark: [9, 11, 10, 13, 14, 16, 18] },
];

// 7-day throughput, last value is the peak (today).
const BARS = [44, 60, 52, 76, 66, 88, 100];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const ACTIVITY = [
  { tag: "Q", tone: "accent", title: "RFP matched", meta: "Harris Foods", right: "5 / 5 specs" },
  { tag: "S", tone: "violet", title: "Quote ready", meta: "Nomad Dairy", right: "SKU-38901" },
  { tag: "P", tone: "cyan", title: "Buy window", meta: "Cardamom +4%", right: "review" },
  { tag: "Q", tone: "accent", title: "Spec review", meta: "Verde Beverages", right: "3 flagged" },
];

const TAG_BG = {
  accent: "bg-accent/15 text-accent-text",
  violet: "bg-[#818cf8]/15 text-[#a5b4fc]",
  cyan: "bg-[#22d3ee]/15 text-[#67e8f9]",
};

function Sparkline({ points, className = "" }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = max - min || 1;
  const w = 72;
  const h = 24;
  const step = w / (points.length - 1);
  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${(i * step).toFixed(1)} ${(h - ((p - min) / span) * h).toFixed(1)}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={`h-6 w-[72px] ${className}`} fill="none" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AppDashboard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-bg shadow-panel">
      {/* browser chrome */}
      <div className="flex items-center gap-3 border-b border-border bg-surface-2/70 px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-surface-3/90 ring-1 ring-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-surface-3/90 ring-1 ring-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-surface-3/90 ring-1 ring-border" />
        </span>
        <div className="ml-2 hidden items-center gap-1.5 rounded-lg bg-bg/70 px-3 py-1.5 sm:flex">
          <svg viewBox="0 0 16 16" className="h-3 w-3 text-dim" fill="none"><path d="M5 7V5a3 3 0 1 1 6 0v2m-7 0h8v6H4z" stroke="currentColor" strokeWidth="1.2"/></svg>
          <span className="font-mono text-[11px] text-muted">app.labgenie.ai/dashboard</span>
        </div>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-[#4ade80]/30 bg-[#4ade80]/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[#4ade80]">
          <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-[#4ade80]" />
          Live
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr]">
        {/* sidebar */}
        <aside className="hidden flex-col border-r border-border bg-surface/40 p-4 sm:flex">
          <span className="flex items-center gap-2 px-1">
            <Logo showWordmark={false} className="text-text [&_svg]:h-5 [&_svg]:w-5" />
            <span className="font-display text-sm font-semibold text-text">labgenie</span>
          </span>
          <nav className="mt-6 space-y-1">
            {NAV.map(({ name, Icon, active }) => (
              <span
                key={name}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] ${
                  active ? "bg-accent/12 font-medium text-text" : "text-muted"
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? "text-accent" : "text-dim"}`} aria-hidden="true" />
                {name}
              </span>
            ))}
          </nav>
          <span className="mt-auto hidden items-center gap-2 px-2 pt-6 lg:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-dim">All systems operational</span>
          </span>
        </aside>

        {/* main */}
        <div className="min-w-0 p-5 sm:p-6">
          {/* header row */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="mono-label">Operations · Today</p>
              {/* Decorative mockup label, not a document heading (keeps the
                  page outline h1 -> h2 with no skipped level). */}
              <div className="mt-1.5 font-display text-xl font-semibold text-text sm:text-2xl">
                Good morning.
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/60 px-3 py-2">
              <Search className="h-3.5 w-3.5 text-dim" aria-hidden="true" />
              <span className="font-mono text-[11px] text-muted">Ask LabGenie anything</span>
              <span className="ml-1 h-3.5 w-px animate-pulse-glow bg-accent" />
            </div>
          </div>

          {/* KPI cards */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            {KPIS.map((k) => (
              <div key={k.label} className="rounded-xl border border-border bg-surface/50 p-3.5">
                <div className="mono-label normal-case tracking-normal text-dim">{k.label}</div>
                <div className="mt-2 flex items-end justify-between gap-2">
                  <span className="font-display text-xl font-semibold tracking-tight text-text sm:text-2xl">
                    {k.value}
                  </span>
                  <Sparkline points={k.spark} className="text-accent/80" />
                </div>
              </div>
            ))}
          </div>

          {/* chart + activity */}
          <div className="mt-3 grid gap-3 lg:grid-cols-[1.3fr_1fr]">
            {/* throughput chart */}
            <div className="rounded-xl border border-border bg-surface/50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-text">Throughput · last 7 days</span>
                <span className="rounded-md bg-[#4ade80]/12 px-2 py-0.5 font-mono text-[10px] text-[#4ade80]">
                  +24% WoW
                </span>
              </div>
              <div className="mt-5 flex h-36 items-end justify-between gap-2">
                {BARS.map((h, i) => {
                  const peak = i === BARS.length - 1;
                  return (
                    <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                      <div
                        className="w-full rounded-t-[4px]"
                        style={{
                          height: `${h}%`,
                          background: peak
                            ? "linear-gradient(180deg, #5aa0ff, #0066ff)"
                            : "linear-gradient(180deg, rgba(0,102,255,0.55), rgba(0,102,255,0.12))",
                          boxShadow: peak ? "0 0 24px -6px rgba(0,102,255,0.7)" : "none",
                        }}
                      />
                      <span className="font-mono text-[9px] uppercase tracking-wider text-dim">{DAYS[i]}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* live activity */}
            <div className="rounded-xl border border-border bg-surface/50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-text">Live activity</span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-[#4ade80]">
                  <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-[#4ade80]" />
                  Live
                </span>
              </div>
              <ul className="mt-3 space-y-2">
                {ACTIVITY.map((a, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-md font-mono text-[10px] font-semibold ${TAG_BG[a.tone]}`}>
                      {a.tag}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[12.5px] text-text">
                      {a.title} <span className="text-dim">· {a.meta}</span>
                    </span>
                    <span className="shrink-0 font-mono text-[10px] text-muted">{a.right}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
