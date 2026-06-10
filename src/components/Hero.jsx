"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import AetherBackground from "./AetherBackground";
import AppDashboard from "./AppDashboard";

const ease = [0.22, 1, 0.36, 1];

// Defaults keep the hero working if no CMS content is passed (or a field is
// blank). Editable copy is sourced from Keystatic (singleton "home") and passed
// in as `copy` from the server page.
const DEFAULTS = {
  titleLead: "The only end-to-end platform for",
  titleAccent: "F&B manufacturers.",
  sub: "LabGenie connects your quality, sales, procurement, and production workflows through one AI layer, on top of the ERP you already run.",
  primaryLabel: "Get early access",
  primaryHref: "/contact",
  secondaryLabel: "See it in action",
  secondaryHref: "#operations",
};

// Headline animated word by word: each word rises and sharpens from a soft blur.
function AnimatedHeading({ lead, accent }) {
  const reduce = useReducedMotion();
  const words = [
    ...lead.split(/\s+/).filter(Boolean).map((t) => ({ t })),
    ...accent.split(/\s+/).filter(Boolean).map((t) => ({ t, accent: true })),
  ];

  if (reduce) {
    return (
      <h1 className="display mx-auto max-w-[16ch]">
        {lead} <span className="text-accent">{accent}</span>
      </h1>
    );
  }

  return (
    <motion.h1
      className="display mx-auto max-w-[16ch]"
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: "0.45em", filter: "blur(10px)" },
            show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease } },
          }}
        >
          <span className={w.accent ? "text-accent" : undefined}>{w.t}</span>
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export default function Hero({ copy }) {
  const c = { ...DEFAULTS, ...(copy || {}) };

  return (
    <section className="relative overflow-hidden">
      {/* Aether particle field */}
      <div aria-hidden="true" className="absolute inset-0">
        <AetherBackground />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_25%,transparent_35%,rgb(var(--bg-rgb))_88%)]" />
      </div>

      <div className="container-x grid-frame relative pb-16 pt-32 text-center sm:pt-36 lg:pb-24 lg:pt-44">
        <div>
          <AnimatedHeading lead={c.titleLead} accent={c.titleAccent} />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease }}
          className="lead mx-auto mt-6 text-center"
        >
          {c.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.66, ease }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Link href={c.primaryHref} className="btn btn-primary">
            {c.primaryLabel}
            <Arrow />
          </Link>
          <Link href={c.secondaryHref} className="btn btn-ghost font-mono text-[13px]">
            <span className="text-dim">{"["}</span>
            {c.secondaryLabel}
            <span className="text-dim">{"]"}</span>
          </Link>
        </motion.div>

        {/* daily-brief dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease }}
          className="mx-auto mt-16 max-w-6xl text-left"
        >
          <AppDashboard />
        </motion.div>
      </div>
    </section>
  );
}

function Arrow({ className = "" }) {
  return (
    <svg viewBox="0 0 16 16" className={`h-4 w-4 ${className}`} fill="none" aria-hidden="true">
      <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
