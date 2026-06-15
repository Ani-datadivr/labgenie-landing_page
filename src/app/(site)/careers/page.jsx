import Link from "next/link";
import { Users, Compass, Workflow, Handshake, Mail, MapPin, ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import { site } from "@/lib/content";
import { readSections, isVisible, buildMetadata } from "@/lib/cms";

const SEO_FALLBACK = {
  title: "Careers",
  description:
    "Join a small, senior team building LabGenie, the AI operating system for F&B manufacturers. A few roles, high ownership, work that ships to real customers.",
};

// Icons for the "How we work" values, matched to the CMS list by order.
const VALUE_ICONS = [Users, Compass, Handshake, Workflow];

const careersEmail = `careers@${site.domain}`;

export async function generateMetadata() {
  const { careersHeader } = await readSections(["careersHeader"]);
  return buildMetadata(careersHeader?.seo, {
    fallbackTitle: SEO_FALLBACK.title,
    fallbackDescription: SEO_FALLBACK.description,
  });
}

export default async function CareersPage() {
  const { careersHeader, careersHowWeWork, careersRoles, careersCta } = await readSections([
    "careersHeader",
    "careersHowWeWork",
    "careersRoles",
    "careersCta",
  ]);

  return (
    <>
      {isVisible(careersHeader) && (
        <PageHeader
          eyebrow={careersHeader?.eyebrow || "Careers"}
          title={careersHeader?.title || "Help build the earliest version of LabGenie."}
          sub={careersHeader?.sub}
        />
      )}

      {/* How we work: who you join and why it matters */}
      {isVisible(careersHowWeWork) && (
        <section className="container-x py-16">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">{careersHowWeWork?.eyebrow || "How we work"}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 text-3xl sm:text-4xl">
                {careersHowWeWork?.title || "A few exceptional people, building something real together."}
              </h2>
            </Reveal>
            {careersHowWeWork?.lead && (
              <Reveal delay={0.1}>
                <p className="mt-5 lead">{careersHowWeWork.lead}</p>
              </Reveal>
            )}
          </div>

          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2">
            {(careersHowWeWork?.values || []).map((v, i) => {
              const Icon = VALUE_ICONS[i] || VALUE_ICONS[VALUE_ICONS.length - 1];
              return (
                <StaggerItem key={v.title}>
                  <div className="panel panel-hover h-full p-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
                      <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-lg font-medium text-text">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </section>
      )}

      {/* Open roles: clean hairline list */}
      {isVisible(careersRoles) && (
        <section className="container-x py-16">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">{careersRoles?.eyebrow || "Open roles"}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 text-3xl sm:text-4xl">{careersRoles?.title || "Roles we are hiring for."}</h2>
            </Reveal>
            {careersRoles?.lead && (
              <Reveal delay={0.1}>
                <p className="mt-5 lead">{careersRoles.lead}</p>
              </Reveal>
            )}
          </div>

          <Stagger className="mt-10 overflow-hidden rounded-2xl border border-border">
            {(careersRoles?.roles || []).map((r, i) => (
              <StaggerItem key={r.title}>
                <a
                  href={`mailto:${careersEmail}?subject=${encodeURIComponent(`Application: ${r.title}`)}`}
                  className={`group flex flex-col gap-4 bg-surface px-6 py-6 transition-colors hover:bg-surface-2 sm:flex-row sm:items-center sm:justify-between sm:gap-8 ${
                    i !== 0 ? "border-t border-border" : ""
                  }`}
                >
                  <div className="sm:max-w-2xl">
                    <h3 className="text-lg font-medium text-text">{r.title}</h3>
                    <p className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                      <MapPin className="h-3 w-3" aria-hidden="true" />
                      <span>{r.tag}</span>
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{r.blurb}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 self-start text-sm font-medium text-accent-text sm:self-center">
                    Email us
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>

          {careersRoles?.footnote && (
            <Reveal>
              <p className="mt-8 text-sm text-muted">
                {careersRoles.footnote}{" "}
                <a
                  href={`mailto:${careersEmail}`}
                  className="font-medium text-accent-text underline-offset-4 hover:underline"
                >
                  Reach out at {careersEmail}.
                </a>
              </p>
            </Reveal>
          )}
        </section>
      )}

      {/* Closing CTA: careers-appropriate, not a demo request */}
      {isVisible(careersCta) && (
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
                  {careersCta?.title || "Don't see your role? Tell us what you would build."}
                </h2>
                <p className="mx-auto mt-5 max-w-xl lead">
                  {careersCta?.sub ||
                    "Tell us what you would own and why this problem is yours. We read every message and reply fast."}
                </p>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                  <a href={`mailto:${careersEmail}`} className="btn btn-primary">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Email {careersEmail}
                  </a>
                  <Link href="/contact" className="btn btn-ghost">
                    {careersCta?.secondaryLabel || "Get in touch"}
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
