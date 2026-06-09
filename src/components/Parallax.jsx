"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Scroll-linked parallax layer. As the element travels through the viewport its
 * content drifts on the Y axis (and optionally scales), giving the page depth
 * without animating layout. `speed` is the total travel in px across the scroll
 * window: negative moves up faster than scroll (foreground), positive lags
 * behind (background).
 *
 * Reduced-motion renders a plain element with no scroll binding.
 */
export default function Parallax({
  children,
  speed = -60,
  scaleTo,
  className,
  as = "div",
}) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-speed / 2, speed / 2]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    scaleTo ? [scaleTo, 1, scaleTo] : [1, 1, 1]
  );

  const MotionTag = motion[as] || motion.div;

  if (reduce) {
    const Tag = as;
    return (
      <Tag ref={ref} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag ref={ref} style={{ y, scale: scaleTo ? scale : undefined }} className={className}>
      {children}
    </MotionTag>
  );
}
