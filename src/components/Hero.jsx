"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import AetherBackground from "./AetherBackground";
import AppDashboard from "./AppDashboard";

// Mobile-only: the WebGL dotted surface. Loaded lazily and gated behind a
// media query so `three` never ships to desktop, where AetherBackground runs.
const DottedSurface = dynamic(() => import("./DottedSurface"), { ssr: false });

const ease = [0.22, 1, 0.36, 1];

function useIsMobile(query = "(max-width: 639px)") {
  // Starts false so the server/desktop render uses AetherBackground and never
  // pulls in three; on a phone it flips true after mount and swaps in the dots.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return isMobile;
}

// Defaults keep the hero working if no CMS content is passed (or a field is
// blank). Editable copy is sourced from Keystatic (singleton "home") and passed
// in as `copy` from the server page.
const DEFAULTS = {
  titleLead: "The end-to-end platform for",
  titleAccent: "F&B manufacturers.",
  sub: "LabGenie connects your quality, sales, procurement, and production workflows through one AI layer, on top of the ERP you already run.",
  primaryLabel: "Get early access",
  primaryHref: "/contact",
  secondaryLabel: "See it in action",
  secondaryHref: "/platform",
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
      aria-label={`${lead} ${accent}`}
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          className={`mr-[0.25em] inline-block last:mr-0 ${w.accent ? "text-accent" : ""}`}
          variants={{
            hidden: { opacity: 0, y: "0.45em", filter: "blur(10px)" },
            show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease } },
          }}
        >
          {w.t}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export default function Hero({ copy }) {
  const c = { ...DEFAULTS, ...(copy || {}) };
  const isMobile = useIsMobile();

  return (
    <section className="relative overflow-hidden">
      {/* Background field: rippling dot surface on mobile, the Aether particle
          field on desktop. Same radial vignette fades either into the bg so the
          headline stays the focus. */}
      <div aria-hidden="true" className="absolute inset-0">
        {isMobile ? (
          <DottedSurface className="absolute inset-0" opacity={0.55} />
        ) : (
          <AetherBackground />
        )}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_25%,transparent_35%,rgb(var(--bg-rgb))_88%)]" />
      </div>

      <div className="container-x grid-frame relative pt-32 text-center sm:pt-36 lg:pt-44">
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

      </div>

      {/* operations console — breaks wider than the text column for presence */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.8, ease }}
        className="relative mx-auto mt-16 w-full max-w-[1440px] px-5 pb-16 text-left sm:px-6 lg:px-8 lg:pb-24"
      >
        <AppDashboard />
      </motion.div>
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
