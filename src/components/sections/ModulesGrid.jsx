import { modules } from "@/lib/content";
import SectionHeader from "./SectionHeader";

// The platform, as a structured maturity ledger rather than identical cards:
// Live today / In active build / On the roadmap, each a hairline group.
const TIERS = [
  { key: "live", tag: "Live today", tagClass: "border-accent/40 bg-accent/10 text-accent-text" },
  { key: "building", tag: "In active build", tagClass: "border-border-strong bg-white/[0.04] text-muted" },
  { key: "roadmap", tag: "On the roadmap", tagClass: "border-border bg-transparent text-dim" },
];

export default function ModulesGrid() {
  return (
    <section className="container-x grid-frame border-t border-border py-20 lg:py-28">
      <SectionHeader
        kicker="The platform"
        title="Start where the pain is. Grow into the whole operation."
        sub="LabGenie began with COA reconciliation, the most universal F&B pain, and is expanding station by station into one operating system."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {TIERS.map((tier) => {
          const group = modules[tier.key];
          return (
            <div key={tier.key} className="rounded-2xl border border-border bg-bg-elev/40 p-6">
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] ${tier.tagClass}`}
              >
                {tier.tag}
              </span>
              <ul className="mt-6 divide-y divide-border">
                {group.items.map((m) => (
                  <li key={m.name} className="py-4 first:pt-0">
                    <div className="flex items-start gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <div>
                        <h4 className="font-display text-[15px] font-medium text-text">{m.name}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{m.blurb}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
