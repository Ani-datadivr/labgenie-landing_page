import PageHeader from "@/components/PageHeader";
import DesignPartner from "@/components/DesignPartner";
import FinalCTA from "@/components/FinalCTA";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import { about } from "@/lib/content";

export const metadata = {
  title: "About",
  description:
    "We're building the AI-native operating system for F&B ingredient manufacturing — an industry that still runs on email, PDFs, and tribal knowledge.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow={about.eyebrow} title={about.title} />

      <section className="container-x py-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <Reveal>
            <div className="space-y-5">
              {about.body.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="panel p-7">
              <p className="eyebrow">What we believe</p>
              <ul className="mt-5 space-y-6">
                {about.values.map((v) => (
                  <li key={v.name}>
                    <h4 className="text-base font-medium text-text">{v.name}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{v.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <DesignPartner />
      <FinalCTA />
    </>
  );
}
