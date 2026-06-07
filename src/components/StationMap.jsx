import Logo from "./Logo";

// Clean station architecture diagram: LabGenie at the centre, three branches
// (GTM / Factory / Innovation) radiating below, stations color-coded by status.
// Org-chart connectors are drawn with hairlines and collapse gracefully on
// mobile (columns stack, connectors hide).
const BRANCHES = [
  {
    name: "GTM",
    blurb: "Win and serve customers",
    stations: [
      { name: "Quality Assurance", status: "live" },
      { name: "Sales", status: "live" },
      { name: "Customer Service", status: "roadmap" },
    ],
  },
  {
    name: "Factory",
    blurb: "Run the operation",
    stations: [
      { name: "Procurement", status: "build" },
      { name: "Production", status: "build" },
      { name: "Inventory", status: "roadmap" },
      { name: "Quality Control", status: "roadmap" },
      { name: "Logistics", status: "roadmap" },
    ],
  },
  {
    name: "Innovation",
    blurb: "Stay ahead",
    stations: [
      { name: "Formulation", status: "build" },
      { name: "Market Intelligence", status: "roadmap" },
    ],
  },
];

const STATUS_CLASS = {
  live: "border-[#4ade80]/45 bg-[#4ade80]/12 text-[#4ade80] glow-live",
  build: "border-[#fb923c]/40 bg-[#fb923c]/12 text-[#fb923c]",
  roadmap: "border-border bg-transparent text-muted",
};

export default function StationMap() {
  return (
    <div className="rounded-2xl border border-border bg-bg-elev/40 p-6 sm:p-10">
      {/* centre node */}
      <div className="flex flex-col items-center">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/40 bg-accent/[0.08] px-5 py-2.5 shadow-glow">
          <Logo showWordmark={false} className="text-text [&_svg]:h-5 [&_svg]:w-5" />
          <span className="font-display text-sm font-semibold text-text">LabGenie</span>
        </div>
        {/* drop + horizontal bar (desktop) */}
        <div className="h-8 w-px bg-border" />
      </div>

      <div className="relative">
        <div className="absolute left-[16.66%] right-[16.66%] top-0 hidden h-px bg-border md:block" />

        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          {BRANCHES.map((b) => (
            <div key={b.name} className="flex flex-col items-center">
              <div className="hidden h-8 w-px bg-border md:block" />
              <div className="w-full rounded-xl border border-border bg-surface/50 p-5">
                <div className="text-center">
                  <h3 className="font-display text-base font-semibold text-text">{b.name}</h3>
                  <p className="mono-label mt-1 normal-case tracking-normal text-dim">{b.blurb}</p>
                </div>
                <ul className="mt-5 space-y-2">
                  {b.stations.map((s) => (
                    <li key={s.name}>
                      <span
                        className={`flex items-center justify-between rounded-lg border px-3 py-2 text-[13px] ${STATUS_CLASS[s.status]}`}
                      >
                        <span className="font-medium">{s.name}</span>
                        {s.status === "live" && <span className="font-mono text-[9px] uppercase tracking-wider opacity-90">Live</span>}
                        {s.status === "build" && <span className="font-mono text-[9px] uppercase tracking-wider opacity-80">Build</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* legend */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <Legend swatch="bg-[#4ade80]" label="Live today" />
        <Legend swatch="bg-[#fb923c]" label="In active build" />
        <Legend swatch="border border-border bg-transparent" label="On the roadmap" />
      </div>
    </div>
  );
}

function Legend({ swatch, label }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-3 w-3 rounded ${swatch}`} />
      <span className="mono-label normal-case tracking-normal text-muted">{label}</span>
    </span>
  );
}
