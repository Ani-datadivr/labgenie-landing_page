"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Sparkles, CheckCircle2 } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

// Phone-friendly "see it work" loop. The desktop node-graph canvas needs room to
// drag and fan stations, so on mobile we replace it with this auto-playing demo:
// LabGenie takes a real request, routes it to the right station, and returns a
// result — then cycles to the next. Keeps the core proof without the dead grid.
// Pauses when off-screen; renders a static resolved card under reduced motion.
const SCRIPT = [
  {
    q: "Match a quote to our catalog",
    to: "Quality Assurance",
    tag: "QA",
    title: "Quote matched",
    lines: ["18 specs · 17 in range", "1 flag: moisture 4.2%"],
  },
  {
    q: "View demand forecasts",
    to: "Procurement",
    tag: "Proc",
    title: "Demand forecast",
    chart: { bars: [48, 61, 55, 72, 80], delta: "+12%", caption: "Next 5 wks · units (k)" },
  },
  {
    q: "Optimize sugar formulation",
    to: "Formulation",
    tag: "Form",
    title: "Formulation drafted",
    lines: ["Sugar −18% · sweetness held 1.0×", "Est. cost −9%/kg"],
  },
];

const DUR = { ask: 1400, route: 1100, result: 3000 };

export default function MobileDemo() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const [step, setStep] = useState({ i: 0, phase: "ask" });

  // Phase machine: ask → route → result → next scenario. Only ticks while the
  // demo is on-screen and motion is allowed, so it never runs in the background.
  useEffect(() => {
    if (reduce || !inView) return;
    const id = setTimeout(() => {
      setStep((s) => {
        if (s.phase === "ask") return { i: s.i, phase: "route" };
        if (s.phase === "route") return { i: s.i, phase: "result" };
        return { i: (s.i + 1) % SCRIPT.length, phase: "ask" };
      });
    }, DUR[step.phase]);
    return () => clearTimeout(id);
  }, [step, inView, reduce]);

  const i = reduce ? 0 : step.i;
  const phase = reduce ? "result" : step.phase;
  const item = SCRIPT[i];

  return (
    <div ref={ref} className="mx-auto max-w-sm">
      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-panel">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-border bg-white/[0.02] px-4 py-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-surface-2" />
            <span className="h-2.5 w-2.5 rounded-full bg-surface-2" />
            <span className="h-2.5 w-2.5 rounded-full bg-surface-2" />
          </span>
          <span className="mx-auto flex items-center gap-2 font-mono text-[11px] tracking-wide text-muted">
            <span className="h-3 w-3 rounded bg-gradient-to-br from-accent to-accent-2" aria-hidden="true" />
            LabGenie · Operations
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#4ade80]">
            <span className="live-dot h-1.5 w-1.5 text-[#4ade80]" aria-hidden="true" />
            Live
          </span>
        </div>

        <div className="flex min-h-[262px] flex-col p-4" aria-live="polite">
          {/* user request */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`q-${i}`}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="max-w-[85%] self-end rounded-2xl rounded-br-sm border border-accent/30 bg-accent/[0.08] px-3.5 py-2 text-[13px] text-text"
            >
              {item.q}
            </motion.div>
          </AnimatePresence>

          {/* LabGenie response */}
          <div className="mt-3 flex flex-1 items-start gap-2.5">
            <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-accent to-[#7c3aed] text-white">
              <Sparkles size={15} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <AnimatePresence mode="wait">
                {phase === "route" ? (
                  <motion.div
                    key={`route-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-2 rounded-xl border border-border bg-white/[0.02] px-3 py-2.5 text-[12px] text-muted"
                  >
                    <span className="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-muted/30 border-t-accent" aria-hidden="true" />
                    Routing to {item.to}…
                  </motion.div>
                ) : phase === "result" ? (
                  <motion.div
                    key={`result-${i}`}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="rounded-xl border border-accent/30 bg-accent/[0.06] p-3"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={15} strokeWidth={2} className="shrink-0 text-accent-text" aria-hidden="true" />
                      <span className="flex-1 truncate text-[13px] font-semibold text-text">{item.title}</span>
                      <span className="shrink-0 rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-accent-text">
                        {item.tag}
                      </span>
                    </div>
                    {item.chart ? (
                      <MiniBars data={item.chart} />
                    ) : (
                      <ul className="mt-2 space-y-1 text-[12px] text-muted">
                        {item.lines.map((l) => (
                          <li key={l}>{l}</li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key={`idle-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-xl border border-border bg-white/[0.02] px-3 py-2.5 text-[12px] text-muted"
                  >
                    Reading your request…
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* the request set it cycles through — current one lit */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {SCRIPT.map((s, idx) => (
              <span
                key={s.q}
                className={`rounded-full border px-2.5 py-1 font-mono text-[10px] transition-colors duration-300 ${
                  idx === i ? "border-accent/50 bg-accent/10 text-accent-text" : "border-border text-dim"
                }`}
              >
                {s.q}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-dim">
        Open on a larger screen to drive the full interactive operations canvas.
      </p>
    </div>
  );
}

function MiniBars({ data }) {
  const max = Math.max(...data.bars);
  return (
    <div className="mt-2.5">
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="font-mono text-[10px] text-dim">{data.caption}</span>
        <span className="font-mono text-[11px] font-semibold text-[#4ade80]">{data.delta}</span>
      </div>
      <div className="flex h-9 items-end gap-1.5">
        {data.bars.map((b, k) => (
          <span
            key={k}
            style={{ height: `${(b / max) * 100}%` }}
            className="flex-1 rounded-t bg-gradient-to-t from-accent/30 to-accent"
          />
        ))}
      </div>
    </div>
  );
}
