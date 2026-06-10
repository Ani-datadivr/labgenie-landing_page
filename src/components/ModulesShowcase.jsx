import { modules } from "@/lib/content";
import Reveal, { Stagger, StaggerItem } from "./Reveal";

const toneRing = {
  accent: "border-accent/30 text-accent-text",
  blue: "border-accent-2/30 text-accent-2",
  muted: "border-border-strong text-muted",
};
const toneDot = {
  accent: "bg-accent",
  blue: "bg-accent-2",
  muted: "bg-muted",
};

// Live modules get rich cards; building/roadmap get compact lists.
export default function ModulesShowcase({ showHeading = true }) {
  return (
    <section className="container-x py-20">
      {showHeading && (
        <div className="mb-12 max-w-2xl">
          <Reveal>
            <p className="eyebrow">The platform</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-[2.6rem]">
              One operating system, built station by station.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 lead">
              We started with the most painful, most universal problem — spec
              reconciliation — and we&apos;re building outward across every station of
              the manufacturing floor.
            </p>
          </Reveal>
        </div>
      )}

      {/* Live today */}
      <div className="mb-5 flex items-center gap-3">
        <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] ${toneRing.accent}`}>
          <span className={`h-1.5 w-1.5 animate-pulse-glow rounded-full ${toneDot.accent}`} />
          {modules.live.label}
        </span>
      </div>
      <Stagger className="grid gap-4 md:grid-cols-3">
        {modules.live.items.map((m) => (
          <StaggerItem key={m.name}>
            <div className="panel panel-hover group h-full p-6">
              <h3 className="text-xl font-medium text-text">{m.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{m.blurb}</p>
              {m.detail && (
                <p className="mt-4 border-t border-border pt-4 text-[13px] leading-relaxed text-dim">
                  {m.detail}
                </p>
              )}
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Building + Roadmap */}
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {[modules.building, modules.roadmap].map((group) => (
          <Reveal key={group.label}>
            <div className="panel h-full p-6">
              <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] ${toneRing[group.tone]}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${toneDot[group.tone]}`} />
                {group.label}
              </span>
              <ul className="mt-5 space-y-4">
                {group.items.map((m) => (
                  <li key={m.name} className="flex flex-col gap-0.5">
                    <span className="text-[15px] font-medium text-text">{m.name}</span>
                    <span className="text-sm text-muted">{m.blurb}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
