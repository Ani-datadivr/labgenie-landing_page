"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { orchestration } from "@/lib/content";
import Reveal from "./Reveal";

const { eyebrow, title, prompt, steps, answer } = orchestration;

// Animated narrative: a user prompt triggers the orchestrator to consult
// Quality, Inventory, and Procurement in sequence, then return one answer.
export default function OrchestrationStory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(0); // 0 prompt, 1..n steps, n+1 answer

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setPhase(steps.length + 1);
      return;
    }
    const total = steps.length + 2;
    let p = 0;
    setPhase(0);
    const id = setInterval(() => {
      p += 1;
      setPhase(p);
      if (p >= total - 1) clearInterval(id);
    }, 900);
    return () => clearInterval(id);
  }, [inView, reduce]);

  return (
    <section className="container-x py-24" ref={ref}>
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-[2.6rem]">{title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 lead">
              LabGenie is a chat interface that orchestrates across every operational
              station — so one question pulls from quality, inventory, and procurement
              at once, instead of three people emailing each other.
            </p>
          </Reveal>
        </div>

        {/* Chat panel */}
        <Reveal delay={0.1}>
          <div className="panel p-4 sm:p-6">
            {/* user prompt */}
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-br-sm border border-border-strong bg-white/[0.04] px-4 py-3 text-sm text-text">
                {prompt}
              </div>
            </div>

            {/* orchestrator working */}
            <div className="mt-5 space-y-2.5">
              {steps.map((s, i) => {
                const visible = phase >= i + 1;
                return (
                  <AnimatePresence key={s.station}>
                    {visible && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-start gap-3 rounded-xl border border-border bg-bg-elev/60 px-3.5 py-2.5"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-accent/15">
                          <svg viewBox="0 0 16 16" className="h-3 w-3 text-accent" fill="none">
                            <path d="M5 8.2l2 2 4-4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <p className="text-sm leading-snug text-muted">
                          <span className="font-mono text-[11px] uppercase tracking-wider text-accent-text">
                            {s.station}
                          </span>
                          <span className="mx-2 text-dim">·</span>
                          {s.action}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                );
              })}
            </div>

            {/* answer */}
            <AnimatePresence>
              {phase >= steps.length + 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-5 flex items-start gap-3 rounded-2xl rounded-bl-sm border border-accent/30 bg-accent/[0.07] px-4 py-3.5"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-accent/20 font-mono text-[11px] font-bold text-accent-text">
                    LG
                  </span>
                  <p className="text-sm leading-relaxed text-text">{answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
