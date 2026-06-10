import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  KeyRound,
  CloudCog,
  FileCheck,
  Eye,
  Globe,
  Cpu,
  Timer,
  BadgeCheck,
  ScrollText,
  DatabaseZap,
  CircleCheck,
  HeartPulse,
  Fingerprint,
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
    "How LabGenie protects F&B specifications and quality documents: your data stays in your own cloud, processing is transient and auto-purged, you keep ownership of your data, and the platform runs on Google Vertex AI.",
};

const securityEmail = "security@labgenie.ai";

// ---- Compliance program ---------------------------------------------------
// Status is honest: most controls are in progress / aligned, not falsely
// claimed as certified. Tags are paired with text + a dot pattern so meaning
// never rests on color alone.
const STATUS = {
  certified: { label: "Certified", style: "border-accent/40 bg-accent/10 text-accent-text" },
  progress: { label: "In progress", style: "border-[#fb923c]/45 bg-[#fb923c]/10 text-[#fb923c]" },
  aligned: { label: "Aligned", style: "border-[#4ade80]/45 bg-[#4ade80]/10 text-[#4ade80]" },
};

const compliance = [
  {
    standard: "SOC 2 (Type II)",
    monogram: "SOC 2",
    Icon: ShieldCheck,
    status: "progress",
    desc: "Independent attestation of our security, availability, and confidentiality controls over time.",
  },
  {
    standard: "SOC 1",
    monogram: "SOC 1",
    Icon: FileCheck,
    status: "progress",
    desc: "Controls relevant to customers' financial reporting and the systems that support it.",
  },
  {
    standard: "SOC 3",
    monogram: "SOC 3",
    Icon: BadgeCheck,
    status: "progress",
    desc: "A public summary of our SOC 2 controls, shareable without an NDA.",
  },
  {
    standard: "ISO 27001",
    monogram: "ISO 27K",
    Icon: Lock,
    status: "progress",
    desc: "A formal information security management system covering risk, access, and operations.",
  },
  {
    standard: "GDPR",
    monogram: "GDPR",
    Icon: Globe,
    status: "aligned",
    desc: "Lawful processing, data-subject rights, and EU transfer safeguards for personal data.",
  },
  {
    standard: "CCPA",
    monogram: "CCPA",
    Icon: ScrollText,
    status: "aligned",
    desc: "California privacy rights for access, deletion, and control over personal information.",
  },
  {
    standard: "ISO 27701",
    monogram: "ISO 27701",
    Icon: Fingerprint,
    status: "progress",
    desc: "A privacy information management extension to ISO 27001 for handling personal data.",
  },
  {
    standard: "HIPAA",
    monogram: "HIPAA",
    Icon: HeartPulse,
    status: "aligned",
    desc: "Safeguards for protected health information, available where a customer's workflow requires it.",
  },
];

// ---- Protection pillars ---------------------------------------------------
const pillars = [
  {
    name: "Your data stays in your environment",
    Icon: CloudCog,
    body: "LabGenie reads and processes your data inside your own secure virtual private cloud, or through controlled, need-to-access connections. We do not copy your raw business data onto our own systems.",
  },
  {
    name: "Processing is transient and auto-purged",
    Icon: Timer,
    body: "Any temporary processing of your data is short-lived and subject to automatic purge. Nothing is retained on our side once the work is done.",
  },
  {
    name: "You keep ownership of your data",
    Icon: DatabaseZap,
    body: "You retain all right, title, and interest in your raw business data. It is used only to run and improve the platform for you, never sold and never used to train foundation models.",
  },
  {
    name: "Least-privilege access and SSO/SAML",
    Icon: KeyRound,
    body: "Access is scoped to the minimum each role needs. Connect your identity provider over SAML SSO to enforce your own authentication and offboarding.",
  },
  {
    name: "Confidentiality and access control",
    Icon: Lock,
    body: "Your specifications and quality documents are handled as confidential. Access control and confidentiality are written commitments in our agreement, not just settings.",
  },
  {
    name: "Prompt incident notification",
    Icon: ScrollText,
    body: "If a security incident affects your data, notifying you promptly is a contractual obligation, so your team can respond without waiting to find out.",
  },
];

// ---- Data handling & AI ---------------------------------------------------
const aiPoints = [
  {
    name: "Processed where your data lives",
    Icon: Eye,
    body: "LabGenie works on your specifications and quality documents inside your own secure cloud, or over controlled, need-to-access connections. We do not store your raw business data on our systems.",
  },
  {
    name: "Never used to train models",
    Icon: ShieldCheck,
    body: "Your data is used only to run and improve the platform for you. It is never sold and never used to train foundation models, and you keep full ownership of it.",
  },
  {
    name: "Built on Google Vertex AI",
    Icon: Cpu,
    body: "The platform runs on Google Vertex AI, Google's enterprise AI infrastructure, and the AI processing is governed by Google's Vertex AI terms.",
  },
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

export default function SecurityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trust & security"
        title="Security and compliance, built in."
        sub="Your specifications are your edge. LabGenie keeps your data in your own cloud, processes it transiently, and never stores your raw business data on our systems, backed by a compliance program built for cautious quality and operations teams."
      />

      {/* Compliance & certifications */}
      <section className="container-x py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">Our compliance program</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 text-3xl sm:text-4xl">
                Compliance and certifications.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 lead">
                We are pre-certification. We map our controls to the standards your
                auditors expect, and each badge below shows its real status, in
                progress or aligned, never a certification we have not earned.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Certifications marked in progress are actively being pursued.
              Reports and current attestation status are available under NDA.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {compliance.map(({ standard, monogram, Icon, status, desc }) => (
            <StaggerItem key={standard} className="h-full">
              <div className="group relative flex h-full flex-col items-center bg-surface p-6 text-center transition-colors">
                {/* Hover ring glow: decorative, not essential to meaning */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 55% at 50% 22%, rgba(0,102,255,0.12), transparent 70%)",
                  }}
                />
                <div className="relative flex flex-col items-center">
                  <ComplianceBadge
                    monogram={monogram}
                    Icon={Icon}
                    dim={status !== "aligned" && status !== "certified"}
                  />
                  <h3 className="mt-4 text-base font-medium text-text">{standard}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
                  <div className="mt-4">
                    <StatusTag status={status} />
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-6 text-sm leading-relaxed text-muted">
          The medallions above are our own visual treatment, not official seals.
          Official certification seals will be displayed once each audit
          completes.
        </p>
      </section>

      {/* How we protect your data */}
      <section className="container-x py-16">
        <div className="max-w-2xl">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl">How we protect your data.</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 lead">
              The principles below come straight from the agreement we sign with
              you. They apply from the first document LabGenie reads.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-10 divide-y divide-border border-t border-border">
          {pillars.map(({ name, Icon, body }) => (
            <StaggerItem
              key={name}
              variant="left"
              as="div"
              className="grid items-start gap-3 py-7 sm:grid-cols-[320px_1fr] sm:gap-12"
            >
              <h3 className="flex items-center gap-3 text-lg font-medium text-text">
                <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.6} />
                {name}
              </h3>
              <p className="max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">{body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Data handling & AI */}
      <section className="container-x py-16">
        <Reveal>
          <div className="panel relative overflow-hidden p-8 sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(ellipse 70% 90% at 100% 0%, rgba(0,102,255,0.10), transparent 65%)",
              }}
            />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
              <div className="max-w-xl">
                <p className="eyebrow">Data handling and AI</p>
                <h2 className="mt-3 text-3xl sm:text-4xl">
                  Your data stays yours, in your own cloud.
                </h2>
                <p className="mt-5 lead">
                  LabGenie reads your specifications and quality documents to do
                  your work: check, match, and route. It processes that data
                  inside your own secure cloud, keeps any temporary processing
                  transient and auto-purged, and never stores your raw business
                  data on our systems. The AI runs on Google Vertex AI.
                </p>
              </div>

              <ul className="grid gap-4">
                {aiPoints.map(({ name, Icon, body }) => (
                  <li
                    key={name}
                    className="flex gap-4 rounded-2xl border border-border bg-white/[0.02] p-5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/[0.08]">
                      <Icon aria-hidden="true" className="h-4 w-4 text-accent" strokeWidth={1.6} />
                    </span>
                    <div>
                      <h3 className="text-base font-medium text-text">{name}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Security contact / documentation CTA */}
      <section className="container-x py-16">
        <Reveal>
          <div className="panel relative overflow-hidden p-8 sm:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 0% 100%, rgba(0,102,255,0.12), transparent 70%)",
              }}
            />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <h2 className="text-2xl sm:text-3xl">
                  Reviewing LabGenie with your security team?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  We share architecture diagrams, data-flow details, subprocessor
                  lists, and current attestation reports under NDA. Tell us what
                  your review needs and we will route it to the right people.
                </p>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
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
                  <Link href="/contact" className="btn btn-orange">
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
                <p className="text-xs text-muted">
                  General questions: {site.email}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <FinalCTA
        eyebrow="Talk to security"
        title="Bring your security team. We'll bring the answers."
        sub="Get our security documentation and the design partner agreement under NDA, and see exactly how your data is handled in your own environment."
      />
    </>
  );
}
