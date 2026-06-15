"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles, CheckCircle2, AlertTriangle } from "lucide-react";
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
// order (case 0 → Synthite visual, case 1 → Mane blend-correction animation).
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
        "LabGenie collapses the quality-document checking that defines our quality and sales operations from days into minutes.",
      points: [
        "Compares every parameter against your product information sheets",
        "Flags exact matches, near-matches, and gaps with reasoning",
        "1000+ inbound requests handled without a single manual sort",
      ],
    },
    {
      tab: "Mane Kancor",
      tabSub: "Blend optimization",
      descriptor: "World's sixth-largest flavor & fragrance company · paying customer",
      quote:
        "Every blend has to land on an exact target. LabGenie learns each blend's history with your own ML models and recommends the raw-material and additive ratios before the batch runs. When a result comes back out of spec, it works out exactly what to add to bring it back to target.",
      points: [
        "Learns each blend's history with your ML models",
        "Recommends the raw-material and additive ratios up front",
        "When a batch misses spec, says exactly what to add to hit it",
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
      </div>

      <div className="flex flex-col justify-center border-border max-lg:border-t max-lg:pt-8 lg:border-l lg:pl-12">
        <div className="mono-label">To match a customer RFP against your specs</div>
        <div className="mt-3 flex items-center gap-2.5 font-display text-3xl font-semibold tracking-tight">
          <span className="text-dim line-through decoration-dim/60">1.5 days</span>
          <Arrow />
          <span className="text-accent-text">5 min</span>
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
        <BlendCorrection reduce={reduce} />
      </div>
    </>
  );
}

// Animated QC-correction: an out-of-spec parameter (amber) corrected to target
// (blue) by an AI-recommended addition. Plays once when the case mounts; shows
// the resolved state immediately under reduced motion. Values are illustrative.
function BlendCorrection({ reduce }) {
  const [step, setStep] = useState(reduce ? 2 : 0);

  useEffect(() => {
    if (reduce) return;
    const t1 = setTimeout(() => setStep(1), 800);
    const t2 = setTimeout(() => setStep(2), 1900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduce]);

  const resolved = step >= 2;

  return (
    <div className="rounded-xl border border-border bg-bg/50 p-5">
      <div className="flex items-center justify-between">
        <span className="mono-label">Batch QC · capsicum–paprika</span>
        <AnimatePresence mode="wait">
          {resolved ? (
            <motion.span
              key="ok"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent/12 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-text"
            >
              <CheckCircle2 size={12} strokeWidth={2.25} /> In spec
            </motion.span>
          ) : (
            <motion.span
              key="flag"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]"
              style={{ background: "rgba(255,180,84,0.14)", color: "var(--flag-amber)" }}
            >
              <AlertTriangle size={12} strokeWidth={2.25} /> Out of spec
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-baseline justify-between">
        <span className="text-[15px] text-text">Heat index</span>
        <span className="flex items-baseline gap-2.5 font-display text-2xl font-semibold tracking-tight">
          <AnimatePresence mode="wait">
            <motion.span
              key={resolved ? "after" : "before"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
              style={resolved ? undefined : { color: "var(--flag-amber)" }}
              className={resolved ? "text-accent-text" : ""}
            >
              {resolved ? "6.2" : "5.9"}
            </motion.span>
          </AnimatePresence>
          <span className="font-mono text-xs text-dim">target 6.2</span>
        </span>
      </div>

      <AnimatePresence>
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-border bg-surface/60 p-3">
              <Sparkles size={14} strokeWidth={1.9} className="mt-0.5 shrink-0 text-accent-text" aria-hidden="true" />
              <span className="text-[13px] leading-relaxed text-muted">
                Add <span className="text-text">1.5% high-heat capsicum oleoresin</span> to reach target.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-4 font-mono text-[10px] leading-relaxed tracking-wide text-dim">
        Example values. LabGenie computes the exact adjustment from your blend history.
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
