import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import {
  Microscope,
  Factory,
  Handshake,
  Gauge,
  ScanLine,
  FlaskConical,
  ArrowRight,
} from "lucide-react";
import { readSections, isVisible, buildMetadata } from "@/lib/cms";

// Icons stay in code, matched to the CMS lists by order.
const PRINCIPLE_ICONS = [Microscope, ScanLine, Handshake, Gauge];
const FACT_ICONS = [Factory, FlaskConical, Gauge];

const SEO_FALLBACK = {
  title: "About",
  description:
    "Datadivr spent three years inside F&B ingredient manufacturing. LabGenie is that hard-won domain knowledge, turned into one chat-native agent.",
};

export async function generateMetadata() {
  const { aboutHeader } = await readSections(["aboutHeader"]);
  return buildMetadata(aboutHeader?.seo, {
    fallbackTitle: SEO_FALLBACK.title,
    fallbackDescription: SEO_FALLBACK.description,
  });
}

export default async function AboutPage() {
  const { aboutHeader, aboutStory, aboutTeam, aboutPrinciples, aboutNumbers, aboutCta } =
    await readSections([
      "aboutHeader",
      "aboutStory",
      "aboutTeam",
      "aboutPrinciples",
      "aboutNumbers",
      "aboutCta",
    ]);

  return (
    <>
      {isVisible(aboutHeader) && (
        <PageHeader
          eyebrow={aboutHeader?.eyebrow || "About Datadivr"}
          title={aboutHeader?.title || "Three years inside F&B, distilled into one agent."}
          sub={aboutHeader?.sub}
        />
      )}

      {/* Our story — grounded with a (dark-graded) field photo */}
      {isVisible(aboutStory) && (
        <section className="container-x py-16">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
            <div>
              <Reveal as="p" className="eyebrow">{aboutStory?.eyebrow || "Our story"}</Reveal>
              <Stagger gap={0.12} className="mt-5 space-y-5">
                {(aboutStory?.paragraphs || []).map((p, i) => (
                  <StaggerItem key={i} as="p" variant="up" className="text-lg leading-relaxed text-muted">
                    {p}
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <Reveal variant="right" delay={0.1}>
              <div className="space-y-5">
                <figure className="overflow-hidden rounded-2xl border border-border shadow-panel">
                  <img
                    src="/about/processing-floor.webp"
                    alt="A spice and oleoresin processing plant: stainless tanks, conveyors, and bins of raw spice."
                    width={984}
                    height={730}
                    loading="lazy"
                    className="block w-full"
                  />
                  <figcaption className="border-t border-border bg-surface/40 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
                    {aboutStory?.figureCaption || "Three years on floors like this became LabGenie."}
                  </figcaption>
                </figure>
                <aside className="panel p-6">
                  <p className="eyebrow">{aboutStory?.asideTitle || "Why this matters"}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted">
                    {aboutStory?.asideText}
                  </p>
                </aside>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* The team */}
      {isVisible(aboutTeam) && (
        <section className="container-x py-16">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">{aboutTeam?.eyebrow || "The team"}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 text-3xl sm:text-4xl">
                {aboutTeam?.title || "Built by people who've sat across the table from F&B manufacturers."}
              </h2>
            </Reveal>
          </div>

          <Stagger gap={0.08} className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {(aboutTeam?.members || []).map((m) => (
              <StaggerItem
                key={m.name}
                variant="up"
                as="div"
                className="group flex flex-col rounded-2xl border border-border bg-surface/40 p-5 transition-colors duration-300 hover:border-border-strong hover:bg-surface/70"
              >
                <img
                  src={`/team/${(m.name || "").toLowerCase()}.webp`}
                  alt={`${m.name}, ${m.role}`}
                  width={80}
                  height={80}
                  loading="lazy"
                  className="h-20 w-20 rounded-full bg-white object-cover ring-1 ring-border transition-transform duration-300 group-hover:scale-105"
                />
                <h3 className="mt-4 font-display text-base font-semibold text-text">{m.name}</h3>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-text">{m.role}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-muted">{m.bio}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {/* What we believe */}
      {isVisible(aboutPrinciples) && (
        <section className="container-x py-16">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">{aboutPrinciples?.eyebrow || "What we believe"}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 text-3xl sm:text-4xl">
                {aboutPrinciples?.title || "Principles we carried from the field into the product."}
              </h2>
            </Reveal>
          </div>

          <Stagger gap={0.1} className="mt-12 divide-y divide-border border-t border-border">
            {(aboutPrinciples?.items || []).map((item, i) => {
              const Icon = PRINCIPLE_ICONS[i] || PRINCIPLE_ICONS[PRINCIPLE_ICONS.length - 1];
              return (
                <StaggerItem
                  key={item.name}
                  variant="left"
                  as="div"
                  className="group grid gap-3 py-8 sm:grid-cols-[1fr_1.35fr] sm:gap-14"
                >
                  <h3 className="flex items-start gap-3.5 font-display text-xl text-text sm:text-2xl">
                    <Icon
                      className="mt-1 h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-hover:scale-110"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    {item.name}
                  </h3>
                  <p className="max-w-2xl text-base leading-relaxed text-muted">{item.note}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </section>
      )}

      {/* From services to product — by the numbers */}
      {isVisible(aboutNumbers) && (
        <section className="container-x py-16">
          <Reveal>
            <div className="panel relative overflow-hidden px-6 py-12 sm:px-12 sm:py-14">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 100% at 0% 50%, rgba(0,102,255,0.10), transparent 70%)",
                }}
              />
              <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                <div>
                  <p className="eyebrow">{aboutNumbers?.eyebrow || "From services to product"}</p>
                  <h2 className="mt-3 max-w-xl text-3xl sm:text-[2.2rem]">
                    {aboutNumbers?.title || "Earned in the field, not invented in a pitch deck."}
                  </h2>

                  <div className="mt-9 grid gap-7 sm:grid-cols-3">
                    {(aboutNumbers?.facts || []).map((f, i) => {
                      const Icon = FACT_ICONS[i] || FACT_ICONS[FACT_ICONS.length - 1];
                      return (
                        <div key={f.stat}>
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white/[0.03] text-accent">
                            <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                          </span>
                          <p className="mt-4 font-display text-2xl text-text sm:text-[1.7rem]">{f.stat}</p>
                          <p className="mt-2 text-[15px] leading-relaxed text-muted">{f.label}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <figure className="overflow-hidden rounded-xl border border-border shadow-panel">
                  <img
                    src="/about/processing-line.webp"
                    alt="Workers sorting and grading red chillies on a spice-processing line."
                    width={665}
                    height={326}
                    loading="lazy"
                    className="block w-full"
                  />
                </figure>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* Closing CTA */}
      {isVisible(aboutCta) && (
        <section className="container-x py-24">
          <Reveal>
            <div className="panel relative overflow-hidden px-6 py-16 text-center sm:px-12 sm:py-20">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(0,102,255,0.14), transparent 70%)",
                }}
              />
              <div className="relative">
                <h2 className="mx-auto max-w-2xl text-3xl sm:text-4xl md:text-[2.8rem]">
                  {aboutCta?.title || "See what three years in the field built."}
                </h2>
                <p className="mx-auto mt-5 max-w-xl lead">
                  {aboutCta?.sub ||
                    "Walk the platform that checks your specs in minutes, or talk to us about putting it on your floor."}
                </p>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                  <Link href={aboutCta?.primaryHref || "/platform"} className="btn btn-primary">
                    {aboutCta?.primaryLabel || "See LabGenie"}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link href={aboutCta?.secondaryHref || "/contact"} className="btn btn-ghost">
                    {aboutCta?.secondaryLabel || "Request a demo"}
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      )}
    </>
  );
}
