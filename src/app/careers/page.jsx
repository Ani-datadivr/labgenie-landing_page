import PageHeader from "@/components/PageHeader";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import { careers, site } from "@/lib/content";

export const metadata = {
  title: "Careers",
  description:
    "Join a small, senior team building deep-tech AI for F&B manufacturing — a category that has never had real software.",
};

export default function CareersPage() {
  return (
    <>
      <PageHeader eyebrow={careers.eyebrow} title={careers.title} sub={careers.sub} />

      {/* Perks */}
      <section className="container-x py-12">
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {careers.perks.map((p) => (
            <StaggerItem key={p}>
              <div className="panel h-full p-5">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/15">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-accent" fill="none">
                    <path d="M5 8.2l2 2 4-4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <p className="mt-4 text-sm leading-relaxed text-muted">{p}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Open roles */}
      <section className="container-x py-12">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl">Open roles</h2>
        </Reveal>
        <Stagger className="mt-8 overflow-hidden rounded-2xl border border-border">
          {careers.roles.map((r, i) => (
            <StaggerItem key={r.title}>
              <a
                href={`mailto:careers@${site.domain}?subject=Application: ${encodeURIComponent(r.title)}`}
                className={`group flex cursor-pointer flex-col gap-3 bg-surface px-6 py-5 transition-colors hover:bg-surface-2 sm:flex-row sm:items-center sm:justify-between ${
                  i !== 0 ? "border-t border-border" : ""
                }`}
              >
                <div>
                  <h3 className="text-lg font-medium text-text">{r.title}</h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-dim">
                    {r.team} · {r.location} · {r.type}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm text-accent">
                  Apply
                  <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" aria-hidden="true">
                    <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <p className="mt-8 text-sm text-muted">
            Don&apos;t see your role?{" "}
            <a
              href={`mailto:careers@${site.domain}`}
              className="text-accent underline-offset-4 hover:underline"
            >
              Tell us how you&apos;d help.
            </a>
          </p>
        </Reveal>
      </section>
    </>
  );
}
