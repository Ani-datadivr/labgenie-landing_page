import Logo from "../../Logo";
import { Check, ArrowRight } from "lucide-react";

// Sales station mockup: an RFQ triage chat. An inbound RFQ comes in, then
// LabGenie answers with a catalog match, a confidence meter, a spec
// comparison, and a decisive next-action button.

const specs = [
  { label: "Color value", requested: "40,000 CU", catalog: "41,200 CU" },
  { label: "Solvent residue", requested: "≤2%", catalog: "1.4%" },
  { label: "Volume", requested: "500 kg", catalog: "in stock" },
];

export default function SalesMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-panel">
      {/* title bar */}
      <div className="flex items-center justify-between border-b border-border bg-surface-2/60 px-4 py-3">
        <span className="flex items-center gap-2">
          <Logo showWordmark={false} className="text-text [&_svg]:h-5 [&_svg]:w-5" />
          <span className="font-display text-sm font-semibold text-text">Sales · request triage</span>
        </span>
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
          Inbox connected
        </span>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        {/* incoming request */}
        <div className="flex justify-end">
          <div className="max-w-[88%] rounded-2xl rounded-br-md bg-surface-2 px-4 py-3">
            <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.16em] text-dim">
              Incoming request · buyer
            </div>
            <p className="text-[13px] leading-relaxed text-text">
              Request: paprika oleoresin, 40,000 color units, under 2% solvent residue, 500 kg.
            </p>
          </div>
        </div>

        {/* LabGenie response */}
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5">
            <Logo showWordmark={false} className="text-accent [&_svg]:h-5 [&_svg]:w-5" />
          </span>

          <div className="w-full max-w-[92%] space-y-3 rounded-2xl rounded-tl-md border border-accent/25 bg-accent/[0.08] p-4">
            <p className="text-[13px] leading-relaxed text-text">
              Existing product matched.
            </p>

            {/* match card */}
            <div className="rounded-xl border border-border bg-bg/70 p-3.5">
              <div className="mb-3 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="mono-label mb-0.5 normal-case tracking-[0.12em] text-dim">
                    Catalog match
                  </div>
                  <div className="truncate text-sm font-semibold text-text">
                    Paprika Oleoresin 40M
                  </div>
                </div>
                <span className="shrink-0 rounded-full border border-[#4ade80]/30 bg-[#4ade80]/[0.1] px-2 py-0.5 font-mono text-[10px] text-[#4ade80]">
                  In catalog
                </span>
              </div>

              {/* confidence meter */}
              <div className="mb-3">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    Spec match
                  </span>
                  <span className="font-mono text-[11px] font-medium text-accent">94%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: "94%" }}
                  />
                </div>
              </div>

              {/* spec comparison */}
              <ul className="space-y-1.5 border-t border-border pt-2.5">
                <li className="grid grid-cols-[1.2fr_1fr_1fr_auto] items-center gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-dim">Spec</span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-dim">Requested</span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-dim">Catalog</span>
                  <span />
                </li>
                {specs.map((s) => (
                  <li
                    key={s.label}
                    className="grid grid-cols-[1.2fr_1fr_1fr_auto] items-center gap-2"
                  >
                    <span className="truncate text-[11px] text-muted">{s.label}</span>
                    <span className="truncate font-mono text-[11px] text-text/90">{s.requested}</span>
                    <span className="truncate font-mono text-[11px] text-text/90">{s.catalog}</span>
                    <Check className="h-3.5 w-3.5 shrink-0 text-[#4ade80]" aria-hidden="true" />
                  </li>
                ))}
              </ul>
            </div>

            {/* suggested action */}
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
                Suggested action
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-3 py-2 text-[12px] font-semibold text-white shadow-[0_8px_30px_-12px_rgba(0,102,255,0.75)]">
                Route to account manager
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
