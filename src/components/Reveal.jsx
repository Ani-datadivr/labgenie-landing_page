"use client";

import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

/**
 * Scroll-reveal wrapper. Animates once when it enters the viewport.
 * Honors prefers-reduced-motion via Framer Motion's reducedMotion="user"
 * (set on the MotionConfig in layout).
 */
export default function Reveal({ children, delay = 0, className, as = "div", y = 18 }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={{ hidden: { opacity: 0, y }, show: { opacity: 1, y: 0 } }}
    >
      {children}
    </MotionTag>
  );
}

export function Stagger({ children, className, gap = 0.08 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: gap }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, as = "div" }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      variants={variants}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
