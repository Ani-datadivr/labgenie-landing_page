"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

// Station feature row: copy on the left, the product screen on the right.
// The reveal is scroll-LINKED (scrubbed to scroll position, not a one-shot), so
// as you scroll the row up the page the text glides in from the left and the
// screen from the right and settle as the row reaches the upper-middle of the
// viewport. Slower and tied to the scrollbar, the way terminal-industries.com
// paces its reveals. Reduced motion renders everything in place.
//
// Props: name, status ("Live"|"In build"|"Roadmap"), headline, body, points[], children
// One Signal Rule: live = brand-blue signal, build = neutral, roadmap = ghost.
// The text label carries the meaning; color reinforces it.
const STATUS = {
  Live: { badge: "border-accent/40 bg-accent/10 text-accent-text glow-live", dot: "bg-accent", pulse: true },
  "In build": { badge: "border-border-strong bg-white/[0.04] text-text glow-build", dot: "bg-muted", pulse: false },
  Roadmap: { badge: "border-border bg-transparent text-dim", dot: "bg-dim", pulse: false },
};

export default function StationFeature({ name, status, headline, body, points, children }) {
  const cfg = STATUS[status] ?? STATUS.Roadmap;
  const reduce = useReducedMotion();
  const ref = useRef(null);

  // Long scrub window: starts as the row enters from the bottom, completes as it
  // reaches the upper third. Reversible on scroll up.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.4"],
    layoutEffect: false,
  });
  const textX = useTransform(scrollYProgress, [0, 1], [-90, 0]);
  const screenX = useTransform(scrollYProgress, [0, 1], [110, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  const textStyle = reduce ? undefined : { x: textX, opacity };
  const screenStyle = reduce ? undefined : { x: screenX, opacity };

  return (
    <div ref={ref} className="relative grid items-center gap-10 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:py-28">
      <motion.div style={textStyle}>
        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] ${cfg.badge}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot} ${cfg.pulse ? "animate-pulse-glow" : ""}`} />
            {status}
          </span>
          <span className="mono-label">{name}</span>
        </div>
        <h2 className="mt-5 text-2xl sm:text-3xl lg:text-[2.1rem]">{headline}</h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{body}</p>
        {points && (
          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[15px] leading-relaxed text-text/90">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {p}
              </li>
            ))}
          </ul>
        )}
      </motion.div>

      <motion.div style={screenStyle}>{children}</motion.div>
    </div>
  );
}
