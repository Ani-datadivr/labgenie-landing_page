import { stats } from "@/lib/content";
import { Stagger, StaggerItem } from "./Reveal";

export default function StatsBand() {
  return (
    <section className="container-x py-16">
      <Stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
        {stats.map((s) => (
          <StaggerItem key={s.label}>
            <div className="h-full bg-surface px-6 py-8">
              <p className="font-display text-3xl font-semibold text-text sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-muted">{s.label}</p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-accent-text/80">
                {s.mono}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
