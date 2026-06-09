"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

/**
 * The brand spine, animated: "3 days" is struck through, an arrow streams, and
 * "minutes" resolves in brand blue. Fires once on scroll-in. Reduced motion
 * renders the resolved end state with no animation.
 */
export default function DaysToMinutes() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const play = reduce ? "show" : inView ? "show" : "hidden";

  return (
    <span
      ref={ref}
      className="flex flex-wrap items-center gap-x-2 gap-y-1 font-display text-2xl font-semibold tracking-tight"
    >
      {/* old reality: 3 days, struck through */}
      <span className="relative whitespace-nowrap text-muted">
        3 days
        <motion.span
          aria-hidden="true"
          className="absolute left-0 top-1/2 h-px w-full origin-left bg-muted"
          initial={false}
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
          animate={play}
          transition={{ duration: 0.4, ease: EASE, delay: reduce ? 0 : 0.35 }}
        />
      </span>

      {/* the transformation arrow, streaming right */}
      <svg viewBox="0 0 34 16" className="h-3.5 w-9 shrink-0 self-center text-accent-text" fill="none" aria-hidden="true">
        <motion.path
          d="M2 8h26M22 3l7 5-7 5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1 } }}
          animate={play}
          transition={{ duration: 0.5, ease: EASE, delay: reduce ? 0 : 0.55 }}
        />
      </svg>

      {/* new reality: minutes, resolved in brand blue */}
      <motion.span
        className="text-accent-text"
        initial={false}
        variants={{ hidden: { opacity: 0, y: 8, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1 } }}
        animate={play}
        transition={{ duration: 0.5, ease: EASE, delay: reduce ? 0 : 0.95 }}
      >
        minutes
      </motion.span>
    </span>
  );
}
