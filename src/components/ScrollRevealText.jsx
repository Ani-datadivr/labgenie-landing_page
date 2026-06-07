"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

// Scroll-linked text reveal: each word brightens from dim to full as the block
// scrolls through the viewport. The default state is dim-but-visible (never
// blank), and reduced-motion renders fully lit. Use on a key statement, not on
// every paragraph.
export default function ScrollRevealText({ children, className = "", as = "p" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.35"],
  });

  const Tag = as;
  const words = String(children).split(" ");

  if (reduce) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </Tag>
  );
}

function Word({ progress, range, children }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}
