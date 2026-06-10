import Link from "next/link";
import StationMap from "../StationMap";
import Reveal from "../Reveal";

// The vision before the depth: one platform across every station, shown as the
// full architecture map. Individual station detail lives on /platform.
export default function ProductVision() {
  return (
    <section className="container-x py-20 max-[899px]:hidden lg:py-28">
      <div className="max-w-3xl">
        <Reveal className="flex items-center gap-3">
          <span className="h-px w-7 bg-accent/60" />
          <span className="kicker kicker-accent">The platform</span>
        </Reveal>
        <Reveal as="h2" delay={0.05} variant="blur" className="mt-5 text-3xl sm:text-4xl lg:text-[2.75rem]">
          One platform. Every workflow. One conversation.
        </Reveal>
        <Reveal as="p" delay={0.12} className="lead mt-4">
          LabGenie puts an AI agent across every operational station. Ask it anything; it knows your
          entire operation.
        </Reveal>
      </div>

      <div className="mt-10">
        <StationMap compact />
      </div>

      <Reveal className="mt-8 flex flex-wrap items-center gap-3">
        <Link href="/platform" className="btn btn-ghost font-mono text-[13px]">
          <span className="text-dim">{"["}</span>
          Explore every station
          <span className="text-dim">{"]"}</span>
        </Link>
      </Reveal>
    </section>
  );
}
