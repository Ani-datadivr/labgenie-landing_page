"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { hero } from "@/lib/content";
import ReconciliationPanel from "./ReconciliationPanel";

const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 sm:pt-40 lg:pt-44">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Left: copy */}
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted"
          >
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-accent" />
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="mt-6 text-[2.5rem] leading-[1.04] sm:text-5xl lg:text-[3.6rem]"
          >
            The operating system for{" "}
            <span className="text-gradient">ingredient manufacturers.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease }}
            className="mt-6 max-w-xl lead"
          >
            {hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link href={hero.primaryCta.href} className="btn btn-primary">
              {hero.primaryCta.label}
              <Arrow />
            </Link>
            <Link href={hero.secondaryCta.href} className="btn btn-ghost">
              {hero.secondaryCta.label}
            </Link>
          </motion.div>

          {/* Metric */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34, ease }}
            className="mt-10 flex items-center gap-5 border-t border-border pt-6"
          >
            <div className="flex items-baseline gap-2 font-display">
              <span className="text-3xl font-semibold text-text">3–5 days</span>
              <Arrow className="text-dim" />
              <span className="text-3xl font-semibold text-accent">minutes</span>
            </div>
            <p className="max-w-[15rem] text-sm leading-snug text-muted">
              {hero.metric.caption}
            </p>
          </motion.div>
        </div>

        {/* Right: signature animation */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="relative z-10"
        >
          <div className="absolute -inset-6 -z-10 rounded-[28px] bg-gradient-to-br from-accent/10 via-transparent to-accent-2/10 blur-2xl" />
          <ReconciliationPanel />
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
