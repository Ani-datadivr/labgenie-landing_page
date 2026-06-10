"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

// The product, shown working — told as a pinned scroll sequence. As the section
// pins, the stage number advances and a quality document moves through LabGenie:
// read -> reconciled across three standards -> flagged -> answered across
// stations -> days into minutes. Scroll progress drives the active stage; the
// visual on the right swaps to match. Reduced motion renders a plain stacked
// list (no pin, no scroll-jacking) with every stage fully visible.
const STAGES = [
  {
    eyebrow: "The inbox",
    title: "Specs arrive in every format.",
    body: "A PDF here, an email there, a supplier's spreadsheet. Every customer and every raw-material lot describes quality its own way.",
    Visual: StageDocs,
  },
  {
    eyebrow: "Read",
    title: "LabGenie reads the document.",
    body: "It pulls moisture, total ash, curcumin, and every other value off the page, whatever the layout, without a template.",
    Visual: StageRead,
  },
  {
    eyebrow: "Reconcile",
    title: "Checked against three standards at once.",
    body: "Raw-material spec, your internal standard, the customer's requirement. Three sources, lined up row by row.",
    Visual: StageReconcile,
  },
  {
    eyebrow: "Flag",
    title: "Anything out of spec is caught.",
    body: "Lead reads 2.1 against a 2.0 ceiling. It surfaces the one row that fails, with the number that failed it.",
    Visual: StageFlag,
  },
  {
    eyebrow: "Orchestrate",
    title: "One question, answered across stations.",
    body: "Quality, inventory, and procurement reply together, so the answer accounts for what you have and what it costs.",
    Visual: StageOrchestrate,
  },
  {
    eyebrow: "The result",
    title: "Three days of checking becomes minutes.",
    body: "The reconciliation that used to take a batch 3 to 5 days now resolves while you read this sentence.",
    Visual: StageResult,
  },
];

export default function OperationsStory() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
    layoutEffect: false,
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(STAGES.length - 1, Math.max(0, Math.floor(p * STAGES.length)));
    setActive(i);
  });

  // SSR + first client paint render the plain stacked story (no framer tree), so
  // server and client HTML match. After mount we upgrade to the pinned version.
  if (reduce || !mounted) return <StaticStory id="how-it-works" />;

  const Visual = STAGES[active].Visual;

  return (
    <>
      {/* Below lg the pinned two-column layout can't fit one viewport, so the
          stacked walk-through takes over (pinning is a desktop pattern). */}
      <StaticStory className="lg:hidden" />
      <section
        ref={ref}
        id="how-it-works"
        aria-label="How LabGenie works"
        className="relative hidden lg:block"
        style={{ height: `${STAGES.length * 100}vh` }}
      >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden pt-20 pb-12">
        {/* scroll progress rail (bottom, clear of the fixed navbar) */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-accent to-accent-2"
          style={{ scaleX: scrollYProgress }}
        />

        <div className="container-x grid w-full items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* left: advancing number + copy */}
          <div className="relative">
            <div className="flex items-end gap-4">
              <div className="relative h-[5.5rem] w-[5.5rem] overflow-hidden sm:h-28 sm:w-28">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={active}
                    className="absolute inset-0 font-display text-[5rem] font-semibold leading-none tracking-tight text-accent sm:text-[7rem]"
                    initial={{ y: "60%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-60%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    {String(active + 1).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="mb-2 font-mono text-sm text-dim">/ {String(STAGES.length).padStart(2, "0")}</span>
            </div>

            <div className="mt-7 min-h-[12rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <span className="kicker kicker-accent">{STAGES[active].eyebrow}</span>
                  <h2 className="mt-4 max-w-md font-display text-3xl font-semibold leading-tight tracking-tight text-text sm:text-4xl">
                    {STAGES[active].title}
                  </h2>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted sm:text-base">
                    {STAGES[active].body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* stage ticks */}
            <div className="mt-8 flex gap-2" aria-hidden="true">
              {STAGES.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === active ? "w-8 bg-accent" : i < active ? "w-4 bg-accent/40" : "w-4 bg-border-strong"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* right: the morphing instrument panel */}
          <div className="relative">
            <div className="panel relative mx-auto aspect-[4/3] max-h-[64svh] w-full overflow-hidden p-5 sm:p-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className="absolute inset-5 sm:inset-7"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <Visual />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}

/* ===== Stage visuals ===== */

const DOCS = [
  { tag: "PDF", name: "Customer spec" },
  { tag: "XLSX", name: "Supplier COA" },
  { tag: "EML", name: "RFP attachment" },
  { tag: "SCAN", name: "Lab certificate" },
];

function StageDocs() {
  return (
    <div className="grid h-full grid-cols-2 grid-rows-2 gap-3">
      {DOCS.map((d, i) => (
        <motion.div
          key={d.tag}
          className="flex flex-col justify-between rounded-xl border border-border bg-bg-elev/60 p-3"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE, delay: i * 0.08 }}
        >
          <span className="inline-flex w-fit rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-muted">
            {d.tag}
          </span>
          <div className="space-y-1.5">
            <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
            <div className="h-1.5 w-1/2 rounded-full bg-white/[0.07]" />
            <span className="block pt-1 text-[11px] text-dim">{d.name}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const SPECS = [
  { k: "Moisture", v: "7.4%" },
  { k: "Total ash", v: "6.1%" },
  { k: "Curcumin", v: "3.2%" },
  { k: "Lead (Pb)", v: "2.1 ppm" },
];

function StageRead() {
  return (
    <div className="flex h-full gap-4">
      {/* the page being scanned */}
      <div className="relative w-2/5 overflow-hidden rounded-xl border border-border bg-bg-elev/60 p-3">
        <div className="space-y-2">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-1.5 rounded-full bg-white/[0.08]" style={{ width: `${90 - i * 7}%` }} />
          ))}
        </div>
        <div className="scan-line absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-transparent via-accent/25 to-transparent" />
        <div className="scan-edge absolute inset-x-0 top-0 h-px bg-accent shadow-[0_0_12px_2px_rgba(0,102,255,0.7)]" />
      </div>
      {/* extracted values */}
      <ul className="flex-1 space-y-2">
        {SPECS.map((s, i) => (
          <motion.li
            key={s.k}
            className="flex items-center justify-between rounded-lg border border-border bg-surface/50 px-3 py-2"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.3 + i * 0.12 }}
          >
            <span className="text-[13px] text-muted">{s.k}</span>
            <span className="font-mono text-[13px] text-text">{s.v}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

const RECON = [
  { k: "Moisture", a: "7.4", b: "≤ 8.0", c: "≤ 8.5", ok: true },
  { k: "Total ash", a: "6.1", b: "≤ 7.0", c: "≤ 7.0", ok: true },
  { k: "Curcumin", a: "3.2", b: "≥ 3.0", c: "≥ 2.5", ok: true },
];

function StageReconcile() {
  return (
    <div className="flex h-full flex-col">
      <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr] gap-2 border-b border-border pb-2 font-mono text-[10px] uppercase tracking-wider text-dim">
        <span>Value</span>
        <span>Raw mat.</span>
        <span>Internal</span>
        <span>Customer</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2">
        {RECON.map((r, i) => (
          <motion.div
            key={r.k}
            className="grid grid-cols-[1.2fr_1fr_1fr_1fr] items-center gap-2 rounded-lg border border-accent/30 bg-accent/[0.06] px-2.5 py-2"
            initial={{ opacity: 0, scaleX: 0.6 }}
            animate={{ opacity: 1, scaleX: 1 }}
            style={{ originX: 0 }}
            transition={{ duration: 0.4, ease: EASE, delay: i * 0.14 }}
          >
            <span className="text-[13px] text-text">{r.k}</span>
            <span className="font-mono text-[12px] text-text">{r.a}</span>
            <span className="font-mono text-[12px] text-muted">{r.b}</span>
            <span className="inline-flex items-center gap-1 font-mono text-[12px] text-[#4ade80]">
              <Check /> {r.c}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StageFlag() {
  const rows = [...RECON, { k: "Lead (Pb)", a: "2.1", b: "≤ 2.0", c: "≤ 2.0", ok: false }];
  return (
    <div className="flex h-full flex-col justify-center gap-2">
      {rows.map((r, i) => (
        <motion.div
          key={r.k}
          className={`grid grid-cols-[1.2fr_1fr_1fr] items-center gap-2 rounded-lg border px-2.5 py-2 ${
            r.ok ? "border-accent/25 bg-accent/[0.05]" : "border-[#FFB454]/55 bg-[#FFB454]/[0.1] glow-build"
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE, delay: i * 0.08 }}
        >
          <span className={`text-[13px] ${r.ok ? "text-text" : "font-medium text-[#FFB454]"}`}>{r.k}</span>
          <span className={`font-mono text-[12px] ${r.ok ? "text-text" : "font-semibold text-[#FFB454]"}`}>{r.a}</span>
          <span className="inline-flex items-center gap-1 font-mono text-[12px]">
            {r.ok ? (
              <span className="text-[#4ade80]"><Check /> pass</span>
            ) : (
              <span className="text-[#FFB454]"><Warn /> over {r.b}</span>
            )}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

const CHIPS = ["Quality", "Inventory", "Procurement"];

function StageOrchestrate() {
  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm border border-border bg-surface/60 px-4 py-3 text-[13px] text-text">
        Can we hit this customer&apos;s spec with what we have in stock?
      </div>
      <div className="flex flex-wrap gap-2">
        {CHIPS.map((c, i) => (
          <motion.span
            key={c}
            className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/[0.08] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-accent-text"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: EASE, delay: 0.2 + i * 0.12 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {c}
          </motion.span>
        ))}
      </div>
      <motion.div
        className="max-w-[88%] rounded-2xl rounded-tl-sm border border-accent/30 bg-accent/[0.06] px-4 py-3 text-[13px] leading-relaxed text-text"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE, delay: 0.7 }}
      >
        Yes. Lot 4471 matches on every value, you hold 18 t, and at today&apos;s input price the margin clears.
      </motion.div>
    </div>
  );
}

function StageResult() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="flex items-baseline gap-3 font-display font-semibold tracking-tight">
        <span className="relative text-2xl text-muted sm:text-3xl">
          3&ndash;5 days
          <motion.span
            className="absolute left-0 top-1/2 h-0.5 w-full origin-left bg-muted"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.3 }}
          />
        </span>
      </div>
      <motion.div
        className="mt-3 font-display text-5xl font-semibold tracking-tight text-accent sm:text-6xl"
        initial={{ opacity: 0, y: 14, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: EASE, delay: 0.6 }}
      >
        minutes
      </motion.div>
      <motion.span
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#4ade80]/40 bg-[#4ade80]/[0.08] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[#4ade80]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1 }}
      >
        <Check /> Batch released
      </motion.span>
    </div>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" aria-hidden="true">
      <path d="M2.5 6.5l2.5 2.5 4.5-5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Warn() {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" aria-hidden="true">
      <path d="M6 1.5L11 10H1L6 1.5zM6 5v2.2M6 8.4v.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Reduced-motion / small-screen fallback: a plain stacked walk-through. */
function StaticStory({ id, className = "" }) {
  return (
    <section id={id} aria-label="How LabGenie works" className={`container-x py-20 lg:py-28 ${className}`}>
      <div className="max-w-2xl">
        <span className="kicker kicker-accent">How it works</span>
        <h2 className="mt-4 text-3xl sm:text-4xl">From a messy document to a released batch.</h2>
      </div>
      <ol className="mt-12 space-y-8">
        {STAGES.map((s, i) => (
          <li key={s.title} className="grid gap-4 border-t border-border pt-8 sm:grid-cols-[auto_1fr] sm:gap-8">
            <span className="font-display text-3xl font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <span className="kicker kicker-accent">{s.eyebrow}</span>
              <h3 className="mt-2 font-display text-xl font-semibold text-text">{s.title}</h3>
              <p className="mt-2 max-w-xl text-muted">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
