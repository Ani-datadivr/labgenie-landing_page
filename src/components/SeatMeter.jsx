"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];
const TOTAL = 5;
const FILLED = 3;
const LEFT = TOTAL - FILLED;

// Loud scarcity card for the design-partner program. On scroll-in the card
// pops, the meter fills the taken seats, then the big "seats left" number
// springs in. A "Filling fast" badge keeps pulsing so it can't be missed.
// Reduced motion renders the resolved, static state.
export default function SeatMeter() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(reduce);
  const [n, setN] = useState(reduce ? FILLED : 0);
  const [show, setShow] = useState(reduce);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const timers = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setStarted(true);
        for (let i = 1; i <= FILLED; i++) timers.push(setTimeout(() => setN(i), 320 + i * 230));
        timers.push(setTimeout(() => setShow(true), 320 + FILLED * 230 + 240));
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [reduce]);

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-2xl border border-accent/40 bg-accent/[0.07] p-5 shadow-[0_18px_50px_-30px_rgba(0,102,255,0.7)]"
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      animate={started ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{ background: "radial-gradient(ellipse 80% 100% at 100% 0%, rgba(0,102,255,0.18), transparent 70%)" }}
      />
      <div className="relative" role="img" aria-label={`${LEFT} of ${TOTAL} founding design-partner seats remain — these partners shape the product's roadmap`}>
        <span className="mono-label">Founding design partners</span>

        <div className="mt-3 flex items-end gap-3">
          <motion.span
            className="font-display text-5xl font-bold leading-[0.85] text-accent-text"
            initial={reduce ? false : { opacity: 0, scale: 0.4 }}
            animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
            transition={{ type: "spring", stiffness: 460, damping: 15 }}
          >
            {LEFT}
          </motion.span>
          <div className="pb-1">
            <div className="text-lg font-semibold leading-tight text-text">seats left</div>
            <div className="font-mono text-[11px] text-dim">of {TOTAL} in this cohort</div>
          </div>
        </div>

        {/* segmented meter — taken seats fill, remaining ones glow */}
        <div className="mt-4 flex gap-1.5">
          {Array.from({ length: TOTAL }).map((_, i) => {
            const filled = i < n;
            const open = i >= FILLED && show;
            return (
              <motion.span
                key={i}
                className={`h-2 flex-1 rounded-full ${open ? "animate-pulse-glow" : ""}`}
                initial={false}
                animate={{ backgroundColor: filled ? "rgba(0,102,255,1)" : open ? "rgba(255,180,84,0.55)" : "rgba(255,255,255,0.08)" }}
                transition={{ duration: 0.3, ease: EASE }}
              />
            );
          })}
        </div>

        <motion.p
          className="mt-4 text-[13px] leading-relaxed text-muted"
          initial={reduce ? false : { opacity: 0, y: 4 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.15 }}
        >
          The partners in this cohort{" "}
          <span className="font-medium text-text">help define what LabGenie becomes</span> — a direct line to the
          roadmap, not just a seat.
        </motion.p>
      </div>
    </motion.div>
  );
}
