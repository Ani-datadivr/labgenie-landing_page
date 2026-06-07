import SectionHeader from "./SectionHeader";

// A genuine three-step sequence, so the numerals earn their place: Read →
// Reconcile → Orchestrate. Structural columns with big mono indices.
const STEPS = [
  {
    n: "01",
    title: "Read",
    body: "Ingest COAs, spec sheets, and inbound inquiries in any format — PDF, Excel, email — straight from your ERP and document systems.",
    line: "PARSE · CLASSIFY · EXTRACT",
  },
  {
    n: "02",
    title: "Reconcile",
    body: "Match the raw-material spec, your internal standard, and the customer spec at once, flagging every deviation and filling the compliance comparison for review.",
    line: "RAW · INTERNAL · CUSTOMER",
  },
  {
    n: "03",
    title: "Orchestrate",
    body: "Route each request to the right station and answer cross-functional questions from one chat, so quality, sales, and procurement move on a single source of truth.",
    line: "ROUTE · ANSWER · ACT",
  },
];

export default function HowItWorks() {
  return (
    <section className="container-x grid-frame border-t border-border py-20 lg:py-28">
      <SectionHeader
        kicker="How it works"
        title="Read the data. Reconcile the specs. Orchestrate the work."
        sub="One agent sits on top of the systems you already run and turns days of manual reconciliation into minutes."
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
        {STEPS.map((s) => (
          <div key={s.n} className="group bg-bg p-8 transition-colors duration-300 hover:bg-surface">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-4xl font-semibold tracking-tight text-accent">
                {s.n}
              </span>
              <span className="mono-label">{s.line}</span>
            </div>
            <h3 className="mt-6 text-xl text-text">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
