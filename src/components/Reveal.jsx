"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1]; // ease-out-expo: confident, decisive

// Content-specific entrances. The point of having more than one is to avoid the
// uniform fade-and-rise on every block (the AI tell). Pick the variant that fits
// what's being revealed: copy rises, panels clip up, visuals scale in.
const VARIANTS = {
  up: { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  scale: { hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1 } },
  blur: { hidden: { opacity: 0, y: 16, filter: "blur(12px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } },
  clip: {
    hidden: { opacity: 0, y: 28, clipPath: "inset(0 0 100% 0)" },
    show: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" },
  },
  left: { hidden: { opacity: 0, x: -32 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 32 }, show: { opacity: 1, x: 0 } },
};

/**
 * Scroll-reveal wrapper. Animates once when it enters the viewport, then stays.
 * Content is rendered in the DOM regardless — the reveal only animates an already
 * present element, so headless/hidden-tab renders never ship blank.
 * Honors prefers-reduced-motion via MotionConfig reducedMotion="user".
 */
export default function Reveal({
  children,
  delay = 0,
  duration = 0.7,
  className,
  as = "div",
  variant = "up",
  y, // legacy override for the "up" variant distance
}) {
  const MotionTag = motion[as] || motion.div;
  let v = VARIANTS[variant] || VARIANTS.up;
  if (typeof y === "number") {
    v = { hidden: { ...v.hidden, y }, show: { ...v.show, y: 0 } };
  }
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: EASE }}
      variants={v}
    >
      {children}
    </MotionTag>
  );
}

// Parent that orchestrates a sibling stagger. Children must be <StaggerItem>.
// Variants live on the parent so the stagger transition actually propagates.
export function Stagger({ children, className, gap = 0.09, delay = 0, as = "div" }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({ children, className, as = "div", variant = "up" }) {
  const MotionTag = motion[as] || motion.div;
  const v = VARIANTS[variant] || VARIANTS.up;
  return (
    <MotionTag
      className={className}
      variants={v}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}
