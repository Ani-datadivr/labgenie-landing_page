import Logo from "./Logo";

// Command-centre chat: an operational question in, a structured answer that
// visibly pulls from several stations at once. Dark frame, lighter interface
// surfaces. Reused in the hero and the closing CTA with different content.
//
// Props:
//   query    — the question asked
//   stations — [{ name, accent, action }] consulted in parallel
//   answer   — LabGenie's resolved answer
//   typed    — optional text shown in the faux input bar (defaults to query)
export default function ChatMockup({ query, stations = [], answer, typed }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-panel">
      {/* title bar */}
      <div className="flex items-center justify-between border-b border-border bg-surface-2/60 px-4 py-3">
        <span className="flex items-center gap-2">
          <Logo showWordmark={false} className="text-text [&_svg]:h-5 [&_svg]:w-5" />
          <span className="font-display text-sm font-semibold text-text">LabGenie</span>
        </span>
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Full operation context
        </span>
      </div>

      {/* conversation */}
      <div className="space-y-5 p-5 sm:p-6">
        {/* user query */}
        <div className="flex justify-end">
          <p className="max-w-[88%] rounded-2xl rounded-br-md bg-surface-2 px-4 py-3 text-[13px] leading-relaxed text-text">
            {query}
          </p>
        </div>

        {/* stations consulted */}
        {stations.length > 0 && (
        <div className="rounded-xl border border-border bg-bg/60 p-3.5">
          <div className="mono-label mb-3 normal-case tracking-[0.12em] text-dim">
            Consulting {stations.length} stations in parallel
          </div>
          <ul className="space-y-2.5">
            {stations.map((s) => (
              <li key={s.name} className="flex items-start gap-2.5 text-[13px]">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: s.accent }}
                />
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  {s.name}
                </span>
                <span className="flex-1 text-muted">{s.action}</span>
                <Check />
              </li>
            ))}
          </ul>
        </div>
        )}

        {/* answer */}
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5">
            <Logo showWordmark={false} className="text-accent [&_svg]:h-5 [&_svg]:w-5" />
          </span>
          <p className="max-w-[92%] rounded-2xl rounded-tl-md border border-accent/25 bg-accent/[0.08] px-4 py-3 text-[13px] leading-relaxed text-text">
            {answer}
          </p>
        </div>
      </div>

      {/* faux input bar */}
      <div className="flex items-center gap-2 border-t border-border px-4 py-3">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-bg px-3 py-2">
          <span className="truncate font-mono text-[12px] text-muted">{typed ?? query}</span>
          <span className="ml-auto h-3.5 w-px animate-pulse-glow bg-accent" />
        </div>
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-white">
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
            <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" fill="none" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
