import Hero from "@/components/Hero";
import ClientTicker from "@/components/ClientTicker";
import DesignPartner from "@/components/DesignPartner";
import StatsBand from "@/components/StatsBand";
import ModulesShowcase from "@/components/ModulesShowcase";
import OrchestrationStory from "@/components/OrchestrationStory";
import OperationsCanvas from "@/components/OperationsCanvas/OperationsCanvas";
import FinalCTA from "@/components/FinalCTA";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { buyer } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="mt-24">
        <ClientTicker />
      </div>
      <DesignPartner />
      <StatsBand />
      <OperationsCanvas />
      <ModulesShowcase />
      <OrchestrationStory />

      {/* For-manufacturers teaser */}
      <section className="container-x py-20">
        <Reveal>
          <div className="panel grid gap-8 p-8 sm:p-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow">{buyer.eyebrow}</p>
              <h2 className="mt-3 text-3xl sm:text-4xl">{buyer.title}</h2>
              <p className="mt-4 lead">{buyer.sub}</p>
              <Link href="/manufacturers" className="btn btn-ghost mt-7">
                See it by role
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
                  <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
            <ul className="grid gap-3">
              {buyer.daily.map((d) => (
                <li
                  key={d.role}
                  className="flex items-start gap-3 rounded-xl border border-border bg-bg-elev/50 px-4 py-3.5"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="text-sm text-muted">
                    <span className="font-medium text-text">{d.role}</span> — {d.win}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <FinalCTA />
    </>
  );
}
