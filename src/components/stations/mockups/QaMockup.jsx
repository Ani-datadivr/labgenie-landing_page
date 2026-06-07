import { Paperclip, ArrowRight, Check } from "lucide-react";

// Quality Assurance station mockup: RFP matching against the PI sheet.
// Left  — an incoming customer RFP / spec (free-form PDF).
// Right — LabGenie matched line by line against the product information (PI
//         sheet) already in the customer's ERP: green for in-spec, amber flag
//         where the product diverges from what the buyer requires.

// What the buyer's RFP asks for.
const rfpLines = [
  ["Moisture", "≤ 10%"],
  ["Protein", "≥ 12%"],
  ["pH", "6.2 - 6.8"],
  ["Lead (Pb)", "≤ 1.0 ppm"],
  ["Microbial", "< 10³ cfu/g"],
];

// Requested vs your product information (PI sheet) on file.
const matched = [
  { param: "Moisture", req: "≤10%", pi: "8.2%", ok: true },
  { param: "Protein", req: "≥12%", pi: "12.6%", ok: true },
  { param: "pH", req: "6.2-6.8", pi: "6.5", ok: true },
  { param: "Lead (Pb)", req: "≤1.0", pi: "1.1 ppm", ok: false },
];

export default function QaMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-panel">
      {/* title bar */}
      <div className="flex items-center justify-between border-b border-border bg-surface-2/60 px-4 py-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          Quality Assurance
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
          Customer RFP · spec match
        </span>
      </div>

      <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-[1fr_auto_1fr]">
        {/* ---------- BEFORE: incoming customer RFP ---------- */}
        <div className="min-w-0 bg-surface p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-2">
            <span className="mono-label text-dim">Incoming RFP</span>
          </div>
          <div className="rotate-[-0.4deg] rounded-md border border-border-strong bg-[#11161d] p-3.5 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.9)]">
            <div className="mb-2.5 flex items-center justify-between border-b border-dashed border-white/10 pb-2">
              <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-dim">
                <Paperclip className="h-3 w-3" aria-hidden="true" />
                Customer RFP · buyer
              </span>
              <span className="font-mono text-[9px] tracking-wider text-dim">rfp.pdf</span>
            </div>
            <p className="mb-2 font-mono text-[10px] leading-relaxed text-muted/80">
              Buyer spec sheet<br />
              RFP ACME-2291 / recv 06 Jun
            </p>
            <ul className="space-y-1">
              {rfpLines.map(([k, v]) => (
                <li
                  key={k}
                  className="flex items-center justify-between gap-2 font-mono text-[11px] leading-tight text-muted"
                >
                  <span className="truncate">{k}</span>
                  <span className="shrink-0 text-text/90">{v}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2.5 border-t border-dashed border-white/10 pt-2 font-mono text-[9px] italic text-dim">
              free-form spec · every buyer's format differs
            </div>
          </div>
        </div>

        {/* center divider arrow */}
        <div className="relative grid place-items-center bg-surface px-1 py-2 sm:py-0">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-accent/30 bg-accent/[0.08] text-accent">
            <ArrowRight className="h-4 w-4 sm:block hidden" aria-hidden="true" />
            <ArrowRight className="h-4 w-4 rotate-90 sm:hidden" aria-hidden="true" />
          </span>
        </div>

        {/* ---------- AFTER: matched to PI sheet ---------- */}
        <div className="min-w-0 bg-surface p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="mono-label text-accent/90">Matched</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              Against your PI sheet
            </span>
          </div>

          <div className="rounded-md border border-border bg-bg/60">
            {/* column heads */}
            <div className="grid grid-cols-[1.3fr_1fr_1fr] gap-1.5 border-b border-border px-2.5 py-2">
              <span className="font-mono text-[9px] uppercase tracking-wider text-dim">Param</span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-dim">Requested</span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-dim">Your PI</span>
            </div>

            <ul>
              {matched.map((r) => (
                <li
                  key={r.param}
                  className="grid grid-cols-[1.3fr_1fr_1fr] items-center gap-1.5 border-b border-border/60 px-2.5 py-2 last:border-b-0"
                >
                  <span className="flex min-w-0 items-center gap-1.5">
                    {r.ok ? (
                      <Check className="h-3.5 w-3.5 shrink-0 text-[#4ade80]" aria-hidden="true" />
                    ) : (
                      <FlagDot />
                    )}
                    <span className="truncate font-mono text-[10px] text-muted">{r.param}</span>
                  </span>
                  <span className="truncate font-mono text-[10px] text-text/90">{r.req}</span>
                  <span
                    className={`truncate font-mono text-[10px] ${
                      r.ok ? "text-[#4ade80]" : "text-warm"
                    }`}
                  >
                    {r.pi}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* deviation callout */}
          <div className="mt-3 flex items-start gap-2 rounded-md border border-warm/30 bg-warm/[0.07] px-2.5 py-2">
            <FlagDot />
            <p className="text-[11px] leading-snug text-text">
              <span className="font-mono uppercase tracking-wider text-warm">Flag</span>{" "}
              Your product information lists Lead (Pb) at 1.1 ppm; this buyer requires ≤1.0 ppm.
              Flag before you quote.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlagDot() {
  return (
    <svg viewBox="0 0 16 16" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warm" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
      <path d="M8 4.5v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.8" fill="currentColor" />
    </svg>
  );
}
