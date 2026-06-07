// "Works with your ERP" grid — a clean hairline grid of monochrome wordmarks.
// Text wordmarks (not fetched logos) keep it reliable and on-brand on the dark
// surface. Hairlines come from a `gap-px` grid over a `bg-border` backing, so it
// stays correct at every breakpoint. Names reflect the ERP / business systems
// F&B ingredient manufacturers actually run.
const DEFAULT_SYSTEMS = [
  "SAP",
  "Oracle NetSuite",
  "Microsoft Dynamics",
  "Infor",
  "Sage",
  "Epicor",
  "Ramco",
  "BatchMaster",
];

export default function ErpLogoCloud({ systems = DEFAULT_SYSTEMS, className = "" }) {
  return (
    <div
      className={`grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4 ${className}`}
    >
      {systems.map((name) => (
        <div
          key={name}
          className="group flex h-24 items-center justify-center bg-bg px-4 transition-colors duration-300 hover:bg-surface md:h-28"
        >
          <span className="select-none font-display text-base font-semibold tracking-tight text-muted transition-colors duration-300 group-hover:text-text md:text-lg">
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}
