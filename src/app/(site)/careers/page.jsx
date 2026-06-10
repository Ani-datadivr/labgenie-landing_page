import Link from "next/link";
import {
  Users,
  Compass,
  Workflow,
  Handshake,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import { site } from "@/lib/content";

export const metadata = {
  title: "Careers",
  description:
    "Join a small, senior team building LabGenie, the AI operating system for F&B manufacturers. A few roles, high ownership, work that ships to real customers.",
};

const careersEmail = `careers@${site.domain}`;

// ---- How we work: who you join and why it matters. --------------------------
const values = [
  {
    icon: Users,
    title: "A senior team, already in place",
    body: "The people building LabGenie have done this before, in F&B and in AI. You join a small group of operators and engineers who hold a high bar and share it openly.",
  },
  {
    icon: Compass,
    title: "Shape the earliest product",
    body: "We are at the start of building, which means the decisions you make now define what LabGenie becomes. You own real surfaces end to end, not slices handed down a chain.",
  },
  {
    icon: Handshake,
    title: "Close to real customers",
    body: "You work directly with the F&B manufacturers who run on LabGenie, across dairy, beverage, ingredients, flavors, and more. Their work is the brief, and your work reaches them.",
  },
  {
    icon: Workflow,
    title: "Your work ships",
    body: "Short loops, few layers, fast decisions. What you build this week is in front of customers soon after, and you see exactly how it lands.",
  },
];

// ---- Open roles: a clean hairline list, not heavy cards. --------------------
const roles = [
  {
    title: "Product Manager",
    tag: "India · Product",
    blurb:
      "Own a core part of the product alongside a senior team that already knows this domain cold. You will turn real manufacturer workflows into shipped features and decide what we build at the earliest stage.",
  },
  {
    title: "GTM Engineer",
    tag: "Europe · Go-to-market",
    blurb:
      "Build the motion that gets LabGenie in front of European F&B manufacturers. You pair technical depth with commercial instinct, working directly with the founders to find what resonates and make it repeatable.",
  },
  {
    title: "Customer Success",
    tag: "India · Customer",
    blurb:
      "Bring early customers onto LabGenie and keep them succeeding on it. You sit between the people running the plants and the team building the product, and your read on customers shapes the roadmap.",
  },
  {
    title: "Product Designer",
    tag: "India / Remote · Design",
    blurb:
      "Define how LabGenie looks and feels from the start. You design instrumentation that reads as precise and calm, partnering with engineers and the founders to set the bar for everything that follows.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Help build the earliest version of LabGenie."
        sub="We are a small, exceptional team building the AI operating system for F&B manufacturing. The senior team is already here. We are hiring a few people to shape the product at its earliest stage, with high ownership, real customers, and work that ships."
      />

      {/* How we work: who you join and why it matters */}
      <section className="container-x py-16">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow">How we work</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              A few exceptional people, building something real together.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 lead">
              You work directly with some of the best minds in the F&B and AI
              space, on a product that is already in the hands of real
              manufacturers. The team is small enough that what you own matters,
              and senior enough that you learn fast.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2">
          {values.map((v) => {
            const Icon = v.icon;
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

      {/* Open roles: clean hairline list */}
      <section className="container-x py-16">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow">Open roles</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-3xl sm:text-4xl">Roles we are hiring for.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 lead">
              A short list, on purpose. We hire deliberately and move quickly
              once we meet the right person. Every role works close to the
              product and close to the customer.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-10 overflow-hidden rounded-2xl border border-border">
          {roles.map((r, i) => (
            <StaggerItem key={r.title}>
              <a
                href={`mailto:${careersEmail}?subject=${encodeURIComponent(
                  `Application: ${r.title}`
                )}`}
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

        <Reveal>
          <p className="mt-8 text-sm text-muted">
            Do not see your role? If you are exceptional at what you do and want
            to help build LabGenie early, reach out anyway.{" "}
            <a
              href={`mailto:${careersEmail}`}
              className="font-medium text-accent-text underline-offset-4 hover:underline"
            >
              Reach out at {careersEmail}.
            </a>
          </p>
        </Reveal>
      </section>

      {/* Closing CTA: careers-appropriate, not a demo request */}
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
                Don't see your role? Tell us what you would build.
              </h2>
              <p className="mx-auto mt-5 max-w-xl lead">
                Tell us what you would own and why this problem is yours. We read
                every message and reply fast.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <a href={`mailto:${careersEmail}`} className="btn btn-primary">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Email {careersEmail}
                </a>
                <Link href="/contact" className="btn btn-ghost">
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
