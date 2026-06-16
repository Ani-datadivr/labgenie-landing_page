"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles, CheckCircle2 } from "lucide-react";
import Reveal from "../Reveal";
import SynthiteMark from "../SynthiteMark";

// One proof section that carries both flagship customers without two full-height
// blocks. A segmented switcher swaps between the cases; it auto-advances so both
// are seen, pauses on hover/focus, and falls back to a static, both-reachable
// state under reduced motion. Each case animates its own proof visual in.
const EASE = [0.16, 1, 0.3, 1];
const AUTO_MS = 7000;

// Header copy AND the per-case text (tab, descriptor, quote, bullet points) are
// editable via Keystatic (singleton "proofShowcase"). The customer marks/logos
// and the animated proof visuals below stay in code, matched to each case by
// order (case 0 → Synthite visual, case 1 → Mane blend-optimization snapshot).
const DEFAULTS = {
  kicker: "Proof",
  title: "Trusted by the manufacturers who set the standard.",
  sub: "Live in production at Synthite, AVT McCormick, and Mane Kancor, three of the largest names in spices, flavors, and oleoresins.",
  cases: [
    {
      tab: "Synthite",
      tabSub: "RFP matching",
      descriptor: "World's largest spice oleoresin manufacturer · in daily production",
      quote:
        "The Quality Agent turned what used to be a two-day comparison into a five-minute task. My team spends their time on actual quality decisions now, not paperwork.",
      attribution: "Asst. General Manager – Quality Assurance, Synthite Industries",
      points: [
        "Compares every parameter against your product information sheets",
        "Flags exact matches, near-matches, and gaps with reasoning",
        "1000+ inbound requests handled without a single manual sort",
      ],
    },
    {
      tab: "Mane Kancor",
      tabSub: "Blend optimization",
      descriptor: "World's sixth-largest flavor & fragrance company",
      quote:
        "A sales order comes in with a target spec. LabGenie evaluates your available input lots and optimizes the blend to hit that target on the first run — exact lots, exact quantities, no trial and error.",
      points: [
        "Pulls the target spec from your sales order",
        "Optimizes the blend across available lots based on their specs and quantities",
        "When a batch still drifts, tells you exactly what to adjust to bring it back",
      ],
    },
  ],
};

export default function ProofShowcase({ copy }) {
  const c = { ...DEFAULTS, ...(copy || {}) };
  const cases = (c.cases?.length ? c.cases : DEFAULTS.cases).slice(0, 2);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const tabRefs = useRef([]);

  // auto-advance, unless paused (hover/focus) or reduced motion
  useEffect(() => {
    if (reduce || paused) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % cases.length), AUTO_MS);
    return () => clearTimeout(t);
  }, [active, paused, reduce, cases.length]);

  const onKeyDown = (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = (active + dir + cases.length) % cases.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const current = cases[active];

  return (
    <section className="container-x py-20 lg:py-28">
      <div className="max-w-3xl">
        <Reveal className="flex items-center gap-3">
          <span className="h-px w-7 bg-accent/60" />
          <span className="kicker kicker-accent">{c.kicker}</span>
        </Reveal>
        <Reveal as="h2" delay={0.05} variant="blur" className="mt-5 text-3xl sm:text-4xl">
          {c.title}
        </Reveal>
        <Reveal as="p" delay={0.12} className="lead mt-4">
          {c.sub}
        </Reveal>
      </div>

      <Reveal
        variant="scale"
        delay={0.1}
        duration={0.8}
        className="mt-10"
      >
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* tabs */}
          <div
            role="tablist"
            aria-label="Customer proof points"
            onKeyDown={onKeyDown}
            className="flex flex-wrap gap-2"
          >
            {cases.map((cs, i) => {
              const on = i === active;
              return (
                <button
                  key={i}
                  ref={(el) => (tabRefs.current[i] = el)}
                  role="tab"
                  type="button"
                  id={`proof-tab-${i}`}
                  aria-selected={on}
                  aria-controls="proof-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  className="relative overflow-hidden rounded-xl border border-border px-4 py-2.5 text-left transition-colors duration-300 hover:border-border-strong"
                >
                  {on && (
                    <motion.span
                      layoutId="proofTabBg"
                      className="absolute inset-0 -z-0 rounded-xl bg-surface"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-baseline gap-2">
                    <span className={`font-display text-[15px] font-semibold tracking-tight ${on ? "text-text" : "text-muted"}`}>
                      {cs.tab}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
                      {cs.tabSub}
                    </span>
                  </span>
                  {/* auto-advance progress, only on the active tab */}
                  {on && !reduce && (
                    <span
                      key={active}
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent/70"
                      style={{
                        animation: `proof-progress ${AUTO_MS}ms linear`,
                        animationPlayState: paused ? "paused" : "running",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* panel */}
          <div
            id="proof-panel"
            role="tabpanel"
            aria-labelledby={`proof-tab-${active}`}
            className="panel relative mt-4 overflow-hidden"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(ellipse 60% 90% at 85% 15%, rgba(0,102,255,0.10), transparent 70%)",
              }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ duration: 0.42, ease: EASE }}
                className="relative grid min-h-[20rem] gap-8 p-8 sm:p-10 lg:grid-cols-2 lg:gap-12"
              >
                {active === 0 ? (
                  <SynthiteCase data={current} />
                ) : (
                  <ManeCase data={current} reduce={reduce} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------------------------------------------------------- Synthite */

function SynthiteCase({ data }) {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <SynthiteMark className="h-6" />
        </div>
        <p className="mono-label mt-3">{data.descriptor}</p>
        <blockquote className="mt-6 font-display text-xl font-medium leading-snug tracking-tight text-text sm:text-2xl">
          &ldquo;{data.quote}&rdquo;
        </blockquote>
        {data.attribution && (
          <figcaption className="mt-4 text-[13px] leading-snug text-dim">
            — {data.attribution}
          </figcaption>
        )}
      </div>

      <div className="flex flex-col justify-center border-border max-lg:border-t max-lg:pt-8 lg:border-l lg:pl-12">
        <div className="mono-label">{data.statLabel || "To match a customer RFP against your specs"}</div>
        <div className="mt-3 flex items-center gap-2.5 font-display text-3xl font-semibold tracking-tight">
          <span className="text-dim line-through decoration-dim/60">{data.statBefore || "1.5 days"}</span>
          <Arrow />
          <span className="text-accent-text">{data.statAfter || "5 min"}</span>
        </div>

        <ul className="mt-8 space-y-3">
          {(data.points || []).map((p) => (
            <li key={p} className="flex items-start gap-3 text-[15px] leading-relaxed text-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------- Mane */

function ManeCase({ data, reduce }) {
  return (
    <>
      <div className="flex flex-col">
        <span className="font-display text-xl font-semibold tracking-tight text-text">{data.tab}</span>
        <p className="mono-label mt-3">{data.descriptor}</p>
        <p className="mt-6 text-[15px] leading-relaxed text-muted sm:text-base">
          {data.quote}
        </p>
        <ul className="mt-6 space-y-3">
          {(data.points || []).map((p) => (
            <li key={p} className="flex items-start gap-3 text-[15px] leading-relaxed text-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col justify-center border-border max-lg:border-t max-lg:pt-8 lg:border-l lg:pl-12">
        <BlendOptimizer reduce={reduce} />
      </div>
    </>
  );
}

// Animated blend-optimization snapshot: a sales order's target spec comes in,
// LabGenie weighs the available input lots, and outputs the exact lots and
// quantities that hit the target on the first run. Plays once when the case
// mounts; shows the resolved blend immediately under reduced motion. Values are
// illustrative — the workflow is sales-order spec → lot selection → blend → hit.
const INPUT_LOTS = [
  { id: "Lot A-204", spec: "HI 6.8", qty: "1,200 kg" },
  { id: "Lot B-118", spec: "HI 5.4", qty: "900 kg" },
  { id: "Lot C-337", spec: "HI 6.1", qty: "1,500 kg" },
];
const BLEND_OUTPUT = [
  { id: "Lot A-204", qty: "420 kg" },
  { id: "Lot C-337", qty: "980 kg" },
];

function BlendOptimizer({ reduce }) {
  const [step, setStep] = useState(reduce ? 2 : 0);

  useEffect(() => {
    if (reduce) return;
    const t1 = setTimeout(() => setStep(1), 900);
    const t2 = setTimeout(() => setStep(2), 2100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduce]);

  const solved = step >= 2;

  return (
    <div className="rounded-xl border border-border bg-bg/50 p-5">
      {/* 1 · sales order in, with its target spec */}
      <div className="flex items-center justify-between">
        <span className="mono-label">Sales order · SO-4471</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/12 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-text">
          Target spec
        </span>
      </div>
      <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 font-display text-lg font-semibold tracking-tight text-text">
        <span>Heat index <span className="text-accent-text">6.2</span></span>
        <span className="text-dim">·</span>
        <span>
          Capsaicin <span className="text-accent-text">3000</span>
          <span className="ml-1 font-mono text-xs text-dim">ppm</span>
        </span>
      </div>

      {/* 2 · available input lots */}
      <div className="mt-5">
        <span className="mono-label">Available input lots</span>
        <ul className="mt-2 space-y-1.5">
          {INPUT_LOTS.map((lot) => (
            <li
              key={lot.id}
              className="flex items-center justify-between rounded-lg border border-border bg-surface/40 px-3 py-2 text-[13px]"
            >
              <span className="text-text">{lot.id}</span>
              <span className="flex items-center gap-3 font-mono text-[12px] text-dim">
                <span>{lot.spec}</span>
                <span>{lot.qty}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* 3 · optimize → optimized blend out, hitting the target */}
      <AnimatePresence mode="wait">
        {!solved ? (
          <motion.div
            key="optimizing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mt-4 flex items-center gap-2.5 rounded-lg border border-border bg-surface/60 p-3 text-[13px] text-muted"
          >
            <Sparkles size={14} strokeWidth={1.9} className="shrink-0 text-accent-text" aria-hidden="true" />
            Optimizing blend across 3 lots…
          </motion.div>
        ) : (
          <motion.div
            key="blend"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="mt-4 rounded-lg border border-accent/30 bg-accent/[0.06] p-3">
              <div className="flex items-center justify-between">
                <span className="mono-label">Optimized blend</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/12 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-text">
                  <CheckCircle2 size={12} strokeWidth={2.25} /> Hits target
                </span>
              </div>
              <ul className="mt-2.5 space-y-1.5">
                {BLEND_OUTPUT.map((b) => (
                  <li key={b.id} className="flex items-center justify-between text-[13px]">
                    <span className="text-text">{b.id}</span>
                    <span className="font-mono text-[12px] text-accent-text">{b.qty}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-2.5 flex items-center justify-between border-t border-border/60 pt-2 font-mono text-[12px] text-dim">
                <span>Result</span>
                <span className="text-text">HI 6.2 · Cap 3000 ✓</span>
              </div>
            </div>

            {/* drift correction — the same agent names the exact fix */}
            <div className="mt-3 flex items-start gap-2.5 rounded-lg border border-border bg-surface/60 p-3">
              <Sparkles size={14} strokeWidth={1.9} className="mt-0.5 shrink-0 text-accent-text" aria-hidden="true" />
              <span className="text-[13px] leading-relaxed text-muted">
                If a batch drifts, it names the exact fix — e.g.{" "}
                <span className="text-text">add 1.5% high-heat capsicum oleoresin</span>.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-4 font-mono text-[10px] leading-relaxed tracking-wide text-dim">
        Example values. LabGenie computes the exact lots and quantities from your live inventory.
      </p>
    </div>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 34 16" className="h-3.5 w-8 shrink-0 text-accent-text" fill="none" aria-hidden="true">
      <path d="M2 8h26M22 3l7 5-7 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
