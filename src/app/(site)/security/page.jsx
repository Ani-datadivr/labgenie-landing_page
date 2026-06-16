import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  KeyRound,
  Globe,
  Cpu,
  FileCheck,
  ScrollText,
  DatabaseZap,
  BadgeCheck,
  Fingerprint,
  CircleCheck,
  CreditCard,
  Boxes,
  Accessibility,
  Scale,
  Sparkles,
  Mail,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import FinalCTA from "@/components/FinalCTA";
import ComplianceBadge from "@/components/ComplianceBadge";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import { readSections, isVisible, buildMetadata } from "@/lib/cms";

const SEO_FALLBACK = {
  title: "Security & compliance",
  description:
    "How LabGenie protects F&B data: tenant-isolated storage, role-based access, and encryption in transit, with SOC 2 and GDPR aligned and compliant and DPDPA, CCPA, and EU AI Act in audit. Honest status on every framework.",
};

// Status taxonomy stays in code: meaning never rests on colour alone (label + dot).
const STATUS = {
  compliant: { label: "Compliant", style: "border-accent/45 bg-accent/10 text-accent-text" },
  live: { label: "Live", style: "border-accent/45 bg-accent/10 text-accent-text" },
  progress: { label: "In audit", style: "border-[#fb923c]/45 bg-[#fb923c]/12 text-[#fb923c]" },
  planned: { label: "Planned", style: "border-border bg-white/[0.04] text-muted" },
};

// Icons for the live-controls grid, matched to the CMS list by order.
const CONTROL_ICONS = [DatabaseZap, KeyRound, Lock, Cpu];
// Icons for the data-handling flow, matched by order.
const DATAFLOW_ICONS = [Lock, DatabaseZap, Cpu];
// Icons for the Responsible-AI points, matched by order.
const AI_ICONS = [Scale, Sparkles, Cpu];

// Medallion monogram + icon per standard. Editors edit only the standard's name;
// unknown standards fall back to a derived monogram and a generic icon.
const BADGE_META = {
  "SOC 2 Type II": { monogram: "SOC 2", Icon: ShieldCheck },
  GDPR: { monogram: "GDPR", Icon: Globe },
  "India DPDPA": { monogram: "DPDPA", Icon: Fingerprint },
  "CCPA / CPRA": { monogram: "CCPA", Icon: ScrollText },
  "EU AI Act": { monogram: "AI ACT", Icon: Cpu },
  "ISO 27001": { monogram: "ISO 27K", Icon: Lock },
  "PCI DSS": { monogram: "PCI", Icon: CreditCard },
  "FSMA 204": { monogram: "FSMA", Icon: Boxes },
  FSSAI: { monogram: "FSSAI", Icon: BadgeCheck },
  "FDA 21 CFR 11": { monogram: "21 CFR", Icon: FileCheck },
  "WCAG 2.1 AA": { monogram: "WCAG", Icon: Accessibility },
};

const badgeMeta = (standard) =>
  BADGE_META[standard] || { monogram: standard.slice(0, 6).toUpperCase(), Icon: ShieldCheck };

export async function generateMetadata() {
  const { secHeader } = await readSections(["secHeader"]);
  return buildMetadata(secHeader?.seo, {
    fallbackTitle: SEO_FALLBACK.title,
    fallbackDescription: SEO_FALLBACK.description,
  });
}

function StatusTag({ status }) {
  const s = STATUS[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] ${s.style}`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {s.label}
    </span>
  );
}

function BadgeCard({ standard, status }) {
  const { monogram, Icon } = badgeMeta(standard);
  return (
    <StaggerItem className="h-full">
      <div className="group relative flex h-full flex-col items-center bg-surface p-6 text-center transition-colors">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "radial-gradient(ellipse 60% 55% at 50% 22%, rgba(0,102,255,0.12), transparent 70%)" }}
        />
        <div className="relative flex flex-col items-center gap-3">
          <ComplianceBadge monogram={monogram} Icon={Icon} dim={status === "planned"} />
          <h3 className="text-sm font-medium text-text">{standard}</h3>
          <StatusTag status={status} />
        </div>
      </div>
    </StaggerItem>
  );
}

export default async function SecurityPage() {
  const {
    secHeader,
    secControls,
    secCompliance,
    secDataFlow,
    secResponsibleAi,
    secContact,
    secCta,
  } = await readSections([
    "secHeader",
    "secControls",
    "secCompliance",
    "secDataFlow",
    "secResponsibleAi",
    "secContact",
    "secCta",
  ]);

  return (
    <>
      {isVisible(secHeader) && (
        <PageHeader
          eyebrow={secHeader?.eyebrow || "Trust & security"}
          title={secHeader?.title || "Security and compliance, built in."}
          sub={secHeader?.sub}
        />
      )}

      {/* Controls live today */}
      {isVisible(secControls) && (
        <section className="container-x py-14">
          <Reveal className="flex items-center gap-3">
            <span className="h-px w-7 bg-accent/60" />
            <span className="kicker kicker-accent">{secControls?.eyebrow || "Live today"}</span>
          </Reveal>
          <Stagger className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {(secControls?.items || []).map(({ name, note }, i) => {
              const Icon = CONTROL_ICONS[i] || CONTROL_ICONS[CONTROL_ICONS.length - 1];
              return (
                <StaggerItem key={name} className="bg-bg p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/[0.08]">
                    <Icon aria-hidden="true" className="h-5 w-5 text-accent" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-4 flex items-center gap-2 text-base font-medium text-text">
                    {name}
                    <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.14em] text-accent-text">
                      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent-text" />
                      Live
                    </span>
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{note}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </section>
      )}

      {/* Compliance program — badge grid */}
      {isVisible(secCompliance) && (
        <section className="container-x py-14">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <Reveal>
                <h2 className="text-3xl sm:text-4xl">{secCompliance?.title || "Our compliance program."}</h2>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {secCompliance?.intro ||
                    "We are pre-certification. Reports and current attestation status are available under NDA."}
                </p>
              </Reveal>
            </div>
          </div>

          {/* Compliant */}
          {secCompliance?.compliant?.length > 0 && (
            <>
              <Reveal className="mt-10 flex items-center gap-3">
                <span className="kicker">Aligned &amp; compliant</span>
                <StatusTag status="compliant" />
              </Reveal>
              <Stagger className="mt-5 grid max-w-md grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
                {secCompliance.compliant.map((standard) => (
                  <BadgeCard key={standard} standard={standard} status="compliant" />
                ))}
              </Stagger>
            </>
          )}

          {/* In audit */}
          {secCompliance?.inProgress?.length > 0 && (
            <>
              <Reveal className="mt-10 flex items-center gap-3">
                <span className="kicker">In audit</span>
                <StatusTag status="progress" />
              </Reveal>
              <Stagger className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 md:grid-cols-3">
                {secCompliance.inProgress.map((standard) => (
                  <BadgeCard key={standard} standard={standard} status="progress" />
                ))}
              </Stagger>
            </>
          )}

          {/* Roadmap (optional — hidden when empty) */}
          {secCompliance?.planned?.length > 0 && (
            <>
              <Reveal className="mt-10 flex items-center gap-3">
                <span className="kicker">On our roadmap</span>
                <StatusTag status="planned" />
              </Reveal>
              <Stagger className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-6">
                {secCompliance.planned.map((standard) => (
                  <BadgeCard key={standard} standard={standard} status="planned" />
                ))}
              </Stagger>
            </>
          )}

          <p className="mt-6 text-sm leading-relaxed text-muted">
            {secCompliance?.footnote ||
              "The medallions are our own visual treatment, not official seals. Each official seal appears once its audit completes."}
          </p>
        </section>
      )}

      {/* How your data is handled — honest 3-step flow */}
      {isVisible(secDataFlow) && (
        <section className="container-x py-14">
          <Reveal>
            <div className="panel relative overflow-hidden p-8 sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{ background: "radial-gradient(ellipse 70% 90% at 100% 0%, rgba(0,102,255,0.10), transparent 65%)" }}
              />
              <div className="relative">
                <p className="eyebrow">{secDataFlow?.eyebrow || "How your data is handled"}</p>
                <div className="mt-8 grid items-stretch gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
                  {(secDataFlow?.steps || []).map(({ name, note }, i) => {
                    const Icon = DATAFLOW_ICONS[i] || DATAFLOW_ICONS[DATAFLOW_ICONS.length - 1];
                    return (
                      <div key={name} className="relative bg-surface p-6">
                        <span className="mono-label">Step {i + 1}</span>
                        <span className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/[0.08]">
                          <Icon aria-hidden="true" className="h-5 w-5 text-accent" strokeWidth={1.6} />
                        </span>
                        <h3 className="mt-4 text-base font-medium text-text">{name}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted">{note}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* Responsible AI — EU AI Act Limited Risk */}
      {isVisible(secResponsibleAi) && (
        <section className="container-x py-14">
          <Reveal>
            <div className="panel relative overflow-hidden p-8 sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{ background: "radial-gradient(ellipse 60% 80% at 0% 100%, rgba(0,102,255,0.12), transparent 70%)" }}
              />
              <div className="relative grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-12">
                <div className="max-w-md">
                  <p className="eyebrow">{secResponsibleAi?.eyebrow || "Responsible AI"}</p>
                  <h2 className="mt-3 text-2xl sm:text-3xl">
                    {secResponsibleAi?.title || "Classified Limited Risk under the EU AI Act."}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted">
                    {secResponsibleAi?.body}
                  </p>
                </div>
                <ul className="grid gap-4 sm:grid-cols-3">
                  {(secResponsibleAi?.points || []).map(({ name, note }, i) => {
                    const Icon = AI_ICONS[i] || AI_ICONS[AI_ICONS.length - 1];
                    return (
                      <li key={name} className="rounded-2xl border border-border bg-white/[0.02] p-5">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent/30 bg-accent/[0.08]">
                          <Icon aria-hidden="true" className="h-4 w-4 text-accent" strokeWidth={1.6} />
                        </span>
                        <h3 className="mt-3 text-sm font-medium text-text">{name}</h3>
                        <p className="mt-1 text-[13px] leading-relaxed text-muted">{note}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* Security contact / documentation CTA */}
      {isVisible(secContact) && (
        <section className="container-x py-14">
          <Reveal>
            <div className="panel relative overflow-hidden p-8 sm:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{ background: "radial-gradient(ellipse 60% 80% at 0% 100%, rgba(0,102,255,0.12), transparent 70%)" }}
              />
              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                  <h2 className="text-2xl sm:text-3xl">
                    {secContact?.title || "Reviewing LabGenie with your security team?"}
                  </h2>
                  <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                    {(secContact?.bullets || []).map((t) => (
                      <li key={t} className="flex items-center gap-2 text-sm text-muted">
                        <CircleCheck aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.8} />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex shrink-0 flex-col items-start gap-4">
                  <div className="flex flex-wrap gap-3">
                    <Link href="/contact" className="btn btn-primary">
                      {secContact?.primaryLabel || "Request security documentation"}
                    </Link>
                    <Link href="/contact" className="btn btn-orange">
                      {secContact?.secondaryLabel || "Talk to our security team"}
                    </Link>
                  </div>
                  {secContact?.securityEmail && (
                    <a
                      href={`mailto:${secContact.securityEmail}`}
                      className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
                    >
                      <Mail aria-hidden="true" className="h-4 w-4 text-accent" strokeWidth={1.8} />
                      <span className="font-mono tracking-tight">{secContact.securityEmail}</span>
                    </a>
                  )}
                  {secContact?.generalNote && (
                    <p className="text-xs text-muted">{secContact.generalNote}</p>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {isVisible(secCta) && (
        <FinalCTA
          eyebrow={secCta?.eyebrow || "Talk to security"}
          title={secCta?.title || "Bring your security team. We'll bring the answers."}
          sub={
            secCta?.sub ||
            "Get our security documentation under NDA, and see exactly how your data is handled."
          }
        />
      )}
    </>
  );
}
