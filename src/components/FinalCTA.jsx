import Link from "next/link";
import { finalCta } from "@/lib/content";

// Confident structural close. Copy is contextual per page (pass eyebrow/title/
// sub); the primary is "Request a demo" and the secondary is the gold
// "Become a design partner" button with a glowing flush-fill on hover.
export default function FinalCTA({
  eyebrow = "Get started",
  title = finalCta.title,
  sub = finalCta.sub,
}) {
  return (
    <section className="container-x">
      <div className="relative overflow-hidden py-24 text-center lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 50% 0%, rgba(0,102,255,0.14), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl">
          <span className="kicker kicker-accent">{eyebrow}</span>
          <h2 className="display mt-6 text-balance text-[clamp(2.2rem,5vw,3.75rem)]">{title}</h2>
          <p className="lead mx-auto mt-6">{sub}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href={finalCta.primary.href} className="btn btn-primary">
              {finalCta.primary.label}
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
                <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href={finalCta.secondary.href} className="btn btn-partner">
              {finalCta.secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
