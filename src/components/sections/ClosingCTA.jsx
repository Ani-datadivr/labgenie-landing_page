import Link from "next/link";
import ChatMockup from "../ChatMockup";
import Reveal from "../Reveal";

// Bookend the page with the product in action: the buyer's own context typed
// into LabGenie, answered with a concrete first step. Headline/sub/buttons are
// editable via Keystatic (singleton "closingCta"); the chat mockup is demo
// content and stays in code.
const CLOSE_STATIONS = [
  { name: "Quality", accent: "#0066FF", action: "1.5 days matching each RFP against your product specs is your biggest drain." },
  { name: "Sales", accent: "#5AA0FF", action: "400+ customer requests a month, every one sorted by hand." },
];

const DEFAULTS = {
  title: "Your operation is complex. Getting started isn't.",
  sub: "Start with one workflow: quality, sales, or procurement. LabGenie goes live on top of your existing ERP in weeks.",
  primaryLabel: "Book a demo",
  secondaryLabel: "Talk to the team",
};

export default function ClosingCTA({ copy }) {
  const c = { ...DEFAULTS, ...(copy || {}) };
  return (
    <section className="container-x py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <Reveal variant="left">
          <h2 className="text-4xl sm:text-5xl lg:text-[3.2rem]">
            {c.title}
          </h2>
          <p className="lead mt-6">
            {c.sub}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="btn btn-primary group">
              {c.primaryLabel}
              <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" aria-hidden="true">
                <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </Reveal>

        <Reveal variant="scale" delay={0.1} duration={0.85}>
          <ChatMockup
            query="We handle 400+ customer requests a month and spend 1.5 days matching each one against our specs. Where do we start?"
            stations={CLOSE_STATIONS}
            answer="Start with the Quality Assurance Station. Here's what week one looks like."
            typed="Where do we start?"
          />
        </Reveal>
      </div>
    </section>
  );
}
