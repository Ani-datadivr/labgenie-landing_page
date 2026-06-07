"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { reconciliation } from "@/lib/content";

const { columns, rows } = reconciliation;

// The signature hero visual: three spec streams (raw material, internal
// standard, customer spec) reconciled row by row. A scan line sweeps down;
// each row resolves to matched (mint) or flagged (warm) as it passes.

export default function ReconciliationPanel() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(reduce ? rows.length : -1);

  useEffect(() => {
    if (reduce) {
      setActive(rows.length);
      return;
    }
    let i = -1;
    const tick = () => {
      i = i + 1;
      if (i > rows.length + 2) i = -1; // brief pause, then replay
      setActive(i);
    };
    const id = setInterval(tick, 850);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="panel relative w-full overflow-hidden p-4 sm:p-5">
      {/* window chrome */}
      <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            Quality check
          </span>
        </div>
        <span className="font-mono text-[10px] text-dim">live</span>
      </div>

      {/* column headers */}
      <div className="grid grid-cols-[1.1fr_repeat(3,1fr)] gap-2 px-1 pb-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-dim">
          Parameter
        </span>
        {columns.map((c) => (
          <div key={c.key} className="min-w-0">
            <p className="truncate text-[11px] font-medium text-text">{c.label}</p>
            <p className="truncate font-mono text-[9px] uppercase tracking-wider text-dim">
              {c.source}
            </p>
          </div>
        ))}
      </div>

      {/* rows */}
      <div className="relative space-y-1.5">
        {/* scan line */}
        {!reduce && active >= 0 && active < rows.length && (
          <motion.div
            layout
            className="pointer-events-none absolute inset-x-0 z-10 h-9 rounded-lg"
            style={{
              top: `calc(${active} * (2.25rem + 0.375rem))`,
              background:
                "linear-gradient(90deg, rgba(0,102,255,0.0), rgba(0,102,255,0.14), rgba(0,102,255,0.0))",
              boxShadow: "0 0 0 1px rgba(0,102,255,0.28)",
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        )}

        {rows.map((row, idx) => {
          const resolved = active >= idx;
          return (
            <div
              key={row.param}
              className="grid h-9 grid-cols-[1.1fr_repeat(3,1fr)] items-center gap-2 rounded-lg px-1"
            >
              <span className="truncate font-mono text-[11px] text-muted">{row.param}</span>

              <Cell value={row.raw} resolved={resolved} tone="neutral" />
              <Cell value={row.internal} resolved={resolved} tone="neutral" />
              <Cell
                value={row.customer}
                resolved={resolved}
                tone={row.match ? "match" : "flag"}
                showStatus
              />
            </div>
          );
        })}
      </div>

      {/* footer summary */}
      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <span className="font-mono text-[10px] text-dim">
          {rows.length} parameters · 3 specs checked
        </span>
        <AnimatePresence>
          {active >= rows.length && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1.5 font-mono text-[10px] text-warm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-warm" />
              1 deviation flagged: Lead (Pb)
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Cell({ value, resolved, tone, showStatus }) {
  const color =
    tone === "match" ? "text-accent" : tone === "flag" ? "text-warm" : "text-muted";
  return (
    <div className="flex min-w-0 items-center gap-1.5">
      <motion.span
        initial={false}
        animate={{ opacity: resolved ? 1 : 0.25 }}
        transition={{ duration: 0.35 }}
        className={`truncate font-mono text-[11px] ${resolved ? color : "text-dim"}`}
      >
        {value}
      </motion.span>
      {showStatus && (
        <AnimatePresence>
          {resolved && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="shrink-0"
              aria-hidden="true"
            >
              {tone === "flag" ? <FlagIcon /> : <CheckIcon />}
            </motion.span>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-accent" fill="none">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <path d="M5 8.2l2 2 4-4.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-warm" fill="none">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <path d="M8 4.5v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.8" fill="currentColor" />
    </svg>
  );
}
