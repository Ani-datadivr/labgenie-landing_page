import Reveal from "./Reveal";
import { designPartner } from "@/lib/content";

export default function DesignPartner() {
  return (
    <section className="container-x py-16">
      <Reveal>
        <figure className="panel relative overflow-hidden px-6 py-12 sm:px-12 sm:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse 50% 100% at 100% 50%, rgba(77,124,254,0.10), transparent 70%)",
            }}
          />
          <div className="relative max-w-3xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              First design partner
            </span>
            <blockquote className="mt-5 font-display text-2xl leading-snug text-text sm:text-[1.8rem]">
              &ldquo;{designPartner.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 text-sm">
              <span className="font-semibold text-text">{designPartner.name}</span>
              <span className="text-dim">—</span>
              <span className="text-muted">{designPartner.descriptor}</span>
            </figcaption>
          </div>
        </figure>
      </Reveal>
    </section>
  );
}
