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
import { site } from "@/lib/content";

export const metadata = {
  title: "Security & compliance",
  description:
    "How LabGenie protects F&B data: tenant-isolated storage, role-based access, and encryption in transit today, with SOC 2, GDPR, DPDPA, and EU AI Act work in progress. Honest status on every framework.",
};

const securityEmail = "security@labgenie.ai";

// Honest status taxonomy. Nothing here is claimed as certified, because nothing
// is yet. "Live" = a control already in place; "In progress" = a framework we
// are actively working toward; "Planned" = assessed and on the roadmap. Meaning
// never rests on color alone (label + dot carry it).
const STATUS = {
  live: { label: "Live", style: "border-accent/45 bg-accent/10 text-accent-text" },
  progress: { label: "In progress", style: "border-[#fb923c]/45 bg-[#fb923c]/12 text-[#fb923c]" },
  planned: { label: "Planned", style: "border-border bg-white/[0.04] text-muted" },
};

// ---- Controls live today (the genuinely-implemented set) ------------------
const controls = [
  { name: "Tenant isolation", Icon: DatabaseZap, note: "Each customer in its own database schema." },
  { name: "Role-based access", Icon: KeyRound, note: "JWT auth, least-privilege roles." },
  { name: "Encrypted in transit", Icon: Lock, note: "HTTPS enforced, HSTS configured." },
  { name: "Compliance-grade AI", Icon: Cpu, note: "AI vetted to meet regulatory standards." },
];

// ---- Compliance program: two honest tiers --------------------------------
const inProgress = [
  { standard: "SOC 2 Type II", monogram: "SOC 2", Icon: ShieldCheck },
  { standard: "GDPR", monogram: "GDPR", Icon: Globe },
  { standard: "India DPDPA", monogram: "DPDPA", Icon: Fingerprint },
  { standard: "CCPA / CPRA", monogram: "CCPA", Icon: ScrollText },
  { standard: "EU AI Act", monogram: "AI ACT", Icon: Cpu },
];

const planned = [
  { standard: "ISO 27001", monogram: "ISO 27K", Icon: Lock },
  { standard: "PCI DSS", monogram: "PCI", Icon: CreditCard },
  { standard: "FSMA 204", monogram: "FSMA", Icon: Boxes },
  { standard: "FSSAI", monogram: "FSSAI", Icon: BadgeCheck },
  { standard: "FDA 21 CFR 11", monogram: "21 CFR", Icon: FileCheck },
  { standard: "WCAG 2.1 AA", monogram: "WCAG", Icon: Accessibility },
];

// ---- How your data is handled (honest 3-step flow) -----------------------
const dataFlow = [
  { name: "Encrypted in transit", Icon: Lock, note: "Uploaded over HTTPS, HSTS enforced." },
  { name: "Isolated per tenant", Icon: DatabaseZap, note: "Your data sits in its own schema." },
  { name: "Processed by compliance-grade AI", Icon: Cpu, note: "You keep ownership of your data." },
];

// ---- Responsible AI (EU AI Act: Limited Risk) ----------------------------
const aiPoints = [
  { name: "Advises, you decide", Icon: Scale, note: "LabGenie recommends; people make the call." },
  { name: "AI, clearly disclosed", Icon: Sparkles, note: "We're rolling out labels on every AI-generated output." },
  { name: "Compliance-grade only", Icon: Cpu, note: "We only use AI that meets regulatory and data-protection standards." },
];

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

function BadgeCard({ standard, monogram, Icon, status }) {
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

export default function SecurityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trust & security"
        title="Security and compliance, built in."
        sub="Foundational controls are live today. The certifications your auditors expect are in progress or on a clear roadmap. Every badge below shows its real status, never one we haven't earned."
      />

      {/* Controls live today */}
      <section className="container-x py-14">
        <Reveal className="flex items-center gap-3">
          <span className="h-px w-7 bg-accent/60" />
          <span className="kicker kicker-accent">Live today</span>
        </Reveal>
        <Stagger className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {controls.map(({ name, Icon, note }) => (
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
          ))}
        </Stagger>
      </section>

      {/* Compliance program — badge grid */}
      <section className="container-x py-14">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl">Our compliance program.</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-4 text-base leading-relaxed text-muted">
                We are pre-certification. Reports and current attestation status are available under NDA.
              </p>
            </Reveal>
          </div>
        </div>

        {/* In progress */}
        <Reveal className="mt-10 flex items-center gap-3">
          <span className="kicker">Actively pursuing</span>
          <StatusTag status="progress" />
        </Reveal>
        <Stagger className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {inProgress.map((c) => (
            <BadgeCard key={c.standard} {...c} status="progress" />
          ))}
        </Stagger>

        {/* Planned */}
        <Reveal className="mt-10 flex items-center gap-3">
          <span className="kicker">On our roadmap</span>
          <StatusTag status="planned" />
        </Reveal>
        <Stagger className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-6">
          {planned.map((c) => (
            <BadgeCard key={c.standard} {...c} status="planned" />
          ))}
        </Stagger>

        <p className="mt-6 text-sm leading-relaxed text-muted">
          The medallions are our own visual treatment, not official seals. Each official seal appears once its audit completes.
        </p>
      </section>

      {/* How your data is handled — honest 3-step flow */}
      <section className="container-x py-14">
        <Reveal>
          <div className="panel relative overflow-hidden p-8 sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{ background: "radial-gradient(ellipse 70% 90% at 100% 0%, rgba(0,102,255,0.10), transparent 65%)" }}
            />
            <div className="relative">
              <p className="eyebrow">How your data is handled</p>
              <div className="mt-8 grid items-stretch gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
                {dataFlow.map(({ name, Icon, note }, i) => (
                  <div key={name} className="relative bg-surface p-6">
                    <span className="mono-label">Step {i + 1}</span>
                    <span className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/[0.08]">
                      <Icon aria-hidden="true" className="h-5 w-5 text-accent" strokeWidth={1.6} />
                    </span>
                    <h3 className="mt-4 text-base font-medium text-text">{name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Responsible AI — EU AI Act Limited Risk */}
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
                <p className="eyebrow">Responsible AI</p>
                <h2 className="mt-3 text-2xl sm:text-3xl">Classified Limited Risk under the EU AI Act.</h2>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  LabGenie informs decisions, it doesn&apos;t make them, which keeps it in the EU AI Act&apos;s
                  lightest tier, with transparency our core obligation.
                </p>
              </div>
              <ul className="grid gap-4 sm:grid-cols-3">
                {aiPoints.map(({ name, Icon, note }) => (
                  <li key={name} className="rounded-2xl border border-border bg-white/[0.02] p-5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent/30 bg-accent/[0.08]">
                      <Icon aria-hidden="true" className="h-4 w-4 text-accent" strokeWidth={1.6} />
                    </span>
                    <h3 className="mt-3 text-sm font-medium text-text">{name}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted">{note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Security contact / documentation CTA */}
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
                <h2 className="text-2xl sm:text-3xl">Reviewing LabGenie with your security team?</h2>
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  {[
                    "Security documentation under NDA",
                    "Architecture and data-flow review",
                    "Subprocessor and residency details",
                  ].map((t) => (
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
                    Request security documentation
                  </Link>
                  <Link href="/contact" className="btn btn-ghost">
                    Talk to our security team
                  </Link>
                </div>
                <a
                  href={`mailto:${securityEmail}`}
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
                >
                  <Mail aria-hidden="true" className="h-4 w-4 text-accent" strokeWidth={1.8} />
                  <span className="font-mono tracking-tight">{securityEmail}</span>
                </a>
                <p className="text-xs text-muted">General questions: {site.email}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <FinalCTA
        eyebrow="Talk to security"
        title="Bring your security team. We'll bring the answers."
        sub="Get our security documentation under NDA, and see exactly how your data is handled."
      />
    </>
  );
}
