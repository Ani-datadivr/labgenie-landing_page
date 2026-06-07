import PageHeader from "@/components/PageHeader";
import ClientTicker from "@/components/ClientTicker";
import DesignPartner from "@/components/DesignPartner";
import FinalCTA from "@/components/FinalCTA";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import { buyer } from "@/lib/content";

export const metadata = {
  title: "For F&B Manufacturers",
  description:
    "Built for mid-to-large B2B ingredient manufacturers — flavors, spices, oleoresins, and specialty ingredients. For the people who supply the world's brands.",
};

const segments = ["Flavors", "Spices", "Oleoresins", "Specialty ingredients"];

export default function ManufacturersPage() {
  return (
    <>
      <PageHeader eyebrow={buyer.eyebrow} title={buyer.title} sub={buyer.sub} />

      <section className="container-x py-10">
        <Reveal>
          <div className="flex flex-wrap gap-2.5">
            {segments.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border bg-white/[0.03] px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Economic buyers */}
      <section className="container-x py-12">
        <Reveal>
          <p className="eyebrow">Who buys LabGenie</p>
          <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl">
            The pain shows up in the corner office.
          </h2>
        </Reveal>
        <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
          {buyer.economic.map((b) => (
            <StaggerItem key={b.role}>
              <div className="panel panel-hover h-full p-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  {b.role}
                </span>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{b.pain}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Daily users */}
      <section className="container-x py-12">
        <Reveal>
          <p className="eyebrow">Who uses it daily</p>
          <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl">
            The win shows up on the floor.
          </h2>
        </Reveal>
        <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
          {buyer.daily.map((d) => (
            <StaggerItem key={d.role}>
              <div className="panel panel-hover h-full p-6">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <span className="font-medium text-text">{d.role}</span>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{d.win}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <DesignPartner />
      <ClientTicker label="Building with ingredient manufacturers" />
      <FinalCTA
        eyebrow="Get started"
        title="Built for your plant, not a generic demo."
        sub="Show us the workflow that eats your team's week. We'll show you what it looks like solved on your own data."
      />
    </>
  );
}
