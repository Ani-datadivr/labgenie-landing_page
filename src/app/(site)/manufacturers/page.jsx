import { Clock, HeartHandshake, Languages, Rocket, GraduationCap } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ClientTicker from "@/components/ClientTicker";
import FinalCTA from "@/components/FinalCTA";
import RotatingSegments from "@/components/RotatingSegments";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import { readSections, isVisible, buildMetadata } from "@/lib/cms";

// Icons for the "How we work" traits stay in code, matched to the CMS traits by
// order (extra traits fall back to the last icon).
const TRAIT_ICONS = [Clock, HeartHandshake, Languages, Rocket, GraduationCap];

const SEO_FALLBACK = {
  title: "For F&B Manufacturers",
  description:
    "Built for mid-to-large B2B ingredient manufacturers — flavors, spices, oleoresins, and specialty ingredients. For the people who supply the world's brands.",
};

export async function generateMetadata() {
  const { mfHeader } = await readSections(["mfHeader"]);
  return buildMetadata(mfHeader?.seo, {
    fallbackTitle: SEO_FALLBACK.title,
    fallbackDescription: SEO_FALLBACK.description,
  });
}

export default async function ManufacturersPage() {
  const { mfHeader, mfBuyers, mfDaily, mfHowWeWork, mfCta } = await readSections([
    "mfHeader",
    "mfBuyers",
    "mfDaily",
    "mfHowWeWork",
    "mfCta",
  ]);

  const traits = mfHowWeWork?.traits?.length ? mfHowWeWork.traits : [];

  return (
    <>
      {isVisible(mfHeader) && (
        <PageHeader
          eyebrow={mfHeader?.eyebrow || "For F&B manufacturers"}
          title={mfHeader?.title || "Built for the suppliers of the world's biggest brands."}
          sub={mfHeader?.sub}
        />
      )}

      <section className="container-x py-10">
        <Reveal>
          <RotatingSegments />
        </Reveal>
      </section>

      {/* Economic buyers */}
      {isVisible(mfBuyers) && (
        <section className="container-x py-12">
          <Reveal>
            <p className="eyebrow">{mfBuyers?.eyebrow || "Who buys LabGenie"}</p>
            <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl">
              {mfBuyers?.title || "The pain shows up in the corner office."}
            </h2>
          </Reveal>
          <Stagger className="mt-8 divide-y divide-border border-t border-border">
            {(mfBuyers?.items || []).map((b) => (
              <StaggerItem
                key={b.role}
                variant="left"
                as="div"
                className="grid gap-1.5 py-6 sm:grid-cols-[220px_1fr] sm:gap-10"
              >
                <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent-text">{b.role}</span>
                <p className="max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">{b.pain}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {/* Daily users */}
      {isVisible(mfDaily) && (
        <section className="container-x py-12">
          <Reveal>
            <p className="eyebrow">{mfDaily?.eyebrow || "Who uses it daily"}</p>
            <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl">
              {mfDaily?.title || "The win shows up on the floor."}
            </h2>
          </Reveal>
          <Stagger className="mt-8 divide-y divide-border border-t border-border">
            {(mfDaily?.items || []).map((d) => (
              <StaggerItem
                key={d.role}
                variant="left"
                as="div"
                className="grid gap-1.5 py-6 sm:grid-cols-[220px_1fr] sm:gap-10"
              >
                <span className="flex items-center gap-2.5 font-medium text-text">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {d.role}
                </span>
                <p className="max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">{d.win}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {/* How we work — why manufacturers stay */}
      {isVisible(mfHowWeWork) && (
        <section className="container-x py-12">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">{mfHowWeWork?.eyebrow || "How we work"}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 text-3xl sm:text-4xl">
                {mfHowWeWork?.title || "Manufacturers don't just use LabGenie. They like working with us."}
              </h2>
            </Reveal>
          </div>

          <Stagger gap={0.08} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {traits.map((t, i) => {
              const Icon = TRAIT_ICONS[i] || TRAIT_ICONS[TRAIT_ICONS.length - 1];
              return (
                <StaggerItem
                  key={t.title}
                  variant="up"
                  as="div"
                  className="group rounded-2xl border border-border bg-surface/40 p-6 transition-colors duration-300 hover:border-border-strong hover:bg-surface/70"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/[0.08] text-accent">
                    <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-lg text-text">{t.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{t.note}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </section>
      )}

      <ClientTicker />
      {isVisible(mfCta) && (
        <FinalCTA
          eyebrow={mfCta?.eyebrow || "Get started"}
          title={mfCta?.title || "Built for your plant, not a generic demo."}
          sub={
            mfCta?.sub ||
            "Show us the workflow that eats your team's week. We'll show you what it looks like solved on your own data."
          }
        />
      )}
    </>
  );
}
