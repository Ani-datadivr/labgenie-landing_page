import Link from "next/link";
import StationMap from "../StationMap";

// The vision before the depth: one platform across every station, shown as the
// full architecture map. Individual station detail lives on /platform.
export default function ProductVision() {
  return (
    <section className="container-x grid-frame border-t border-border py-20 lg:py-28">
      <div className="max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="h-px w-7 bg-accent/60" />
          <span className="kicker kicker-accent">The platform</span>
        </div>
        <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.75rem]">
          One platform. Every workflow. One conversation.
        </h2>
        <p className="lead mt-4">
          LabGenie puts an AI agent across every operational station. Ask it anything; it knows your
          entire operation.
        </p>
      </div>

      <div className="mt-12">
        <StationMap />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link href="/platform" className="btn btn-ghost font-mono text-[13px]">
          <span className="text-dim">{"["}</span>
          Explore every station
          <span className="text-dim">{"]"}</span>
        </Link>
      </div>
    </section>
  );
}
