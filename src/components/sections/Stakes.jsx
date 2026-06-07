// The problem, stated plainly and confidently (rig.ai energy). Big type, hard
// cost framing, no decorative motion.
const COSTS = [
  { value: "3 formats", label: "Raw-material, internal, and customer specs — reconciled by hand." },
  { value: "1000s", label: "Inbound inquiries triaged manually across disconnected inboxes." },
  { value: "Days of lag", label: "Before quality, sales, and procurement agree on one answer." },
];

export default function Stakes() {
  return (
    <section className="container-x grid-frame border-t border-border py-20 lg:py-28">
      <div className="flex items-center gap-3">
        <span className="h-px w-7 bg-accent/60" />
        <span className="kicker kicker-accent">The problem</span>
      </div>

      <h2 className="mt-6 max-w-4xl text-4xl leading-[1.05] sm:text-5xl lg:text-[3.4rem]">
        Reconciling one COA against a customer spec takes{" "}
        <span className="text-accent">3 to 5 days</span>. You do it on every batch.
      </h2>

      <p className="lead mt-6 max-w-2xl">
        Quality, sales, and procurement each keep their own copy of the truth in spreadsheets and
        email. Matching a raw-material spec to your internal standard and a customer spec is manual,
        slow, and error-prone, and it gates every deal you can close.
      </p>

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
        {COSTS.map((c) => (
          <div key={c.value} className="bg-bg p-7">
            <div className="font-display text-2xl font-semibold tracking-tight text-text">
              {c.value}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{c.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
