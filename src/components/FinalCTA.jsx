import Link from "next/link";
import Reveal from "./Reveal";
import { finalCta } from "@/lib/content";

export default function FinalCTA() {
  return (
    <section className="container-x py-24">
      <Reveal>
        <div className="panel relative overflow-hidden px-6 py-16 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(60,231,192,0.12), transparent 70%)",
            }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl sm:text-4xl md:text-[2.8rem]">
              {finalCta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl lead">{finalCta.sub}</p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href={finalCta.primary.href} className="btn btn-primary">
                {finalCta.primary.label}
              </Link>
              <Link href={finalCta.secondary.href} className="btn btn-ghost">
                {finalCta.secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
