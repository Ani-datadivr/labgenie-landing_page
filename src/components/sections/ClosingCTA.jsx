import Link from "next/link";
import ChatMockup from "../ChatMockup";

// Bookend the page with the product in action: the buyer's own context typed
// into LabGenie, answered with a concrete first step.
const CLOSE_STATIONS = [
  { name: "Quality", accent: "#0066FF", action: "3 days a batch checking quality certificates is your biggest drain." },
  { name: "Sales", accent: "#5AA0FF", action: "400+ customer requests a month, every one sorted by hand." },
];

export default function ClosingCTA() {
  return (
    <section className="container-x grid-frame border-y border-border py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div>
          <h2 className="text-4xl sm:text-5xl lg:text-[3.2rem]">
            Your operation is complex. Getting started isn&apos;t.
          </h2>
          <p className="lead mt-6">
            Start with one workflow: quality, sales, or procurement. LabGenie goes live on top of
            your existing ERP in weeks.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="btn btn-primary">
              Book a demo
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
                <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/contact" className="btn btn-ghost font-mono text-[13px]">
              <span className="text-dim">{"["}</span>
              Talk to the team
              <span className="text-dim">{"]"}</span>
            </Link>
          </div>
        </div>

        <ChatMockup
          query="We handle 400+ customer requests a month and spend 3 days a batch checking quality certificates. Where do we start?"
          stations={CLOSE_STATIONS}
          answer="Start with the Quality Assurance Station. Here's what week one looks like."
          typed="Where do we start?"
        />
      </div>
    </section>
  );
}
