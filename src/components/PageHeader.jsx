"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

// Standard inner-page hero header. The title rises word-tinted from a soft blur,
// led by a drawing accent rule, so every inner page opens with the same
// confident entrance the home hero sets.
export default function PageHeader({ eyebrow, title, sub }) {
  const reduce = useReducedMotion();
  const show = reduce ? false : true;

  return (
    <section className="relative overflow-hidden pt-36 sm:pt-40">
      {/* faint drifting brand glow behind the header */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-3xl motion-safe:animate-float"
      />
      <div className="container-x relative">
        <motion.p
          className="eyebrow inline-flex items-center gap-2"
          initial={show ? { opacity: 0, y: 10 } : false}
          whileInView={show ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span className="h-px w-6 bg-accent/70 motion-safe:origin-left" />
          {eyebrow}
        </motion.p>
        <motion.h1
          className="mt-4 max-w-3xl text-4xl sm:text-5xl lg:text-[3.4rem]"
          initial={show ? { opacity: 0, y: 18, filter: "blur(12px)" } : false}
          whileInView={show ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.06, ease: EASE }}
        >
          {title}
        </motion.h1>
        {sub && (
          <motion.p
            className="mt-5 max-w-2xl lead"
            initial={show ? { opacity: 0, y: 14 } : false}
            whileInView={show ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.14, ease: EASE }}
          >
            {sub}
          </motion.p>
        )}
      </div>
    </section>
  );
}
