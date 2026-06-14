"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Logo from "./Logo";

// Station architecture diagram: LabGenie at the top, three branches (GTM /
// Factory / Innovation) drawn beneath it, stations color-coded by status.
// The entrance is staged: (1) LabGenie settles, (2) the connectors branch out,
// (3) the station boxes appear one by one, and only then (4) the live / build /
// roadmap colors glow in. Reduced motion renders the finished, colored state.
const EASE = [0.16, 1, 0.3, 1];

const BRANCHES = [
  {
    name: "GTM",
    blurb: "Win and serve customers",
    stations: [
      { name: "Quality Assurance", status: "live" },
      { name: "Sales", status: "live" },
      { name: "Customer Service", status: "roadmap" },
    ],
  },
  {
    name: "Factory",
    blurb: "Run the operation",
    stations: [
      { name: "Procurement", status: "build" },
      { name: "Production", status: "build" },
      { name: "Inventory", status: "roadmap" },
      { name: "Quality Control", status: "roadmap" },
      { name: "Logistics", status: "roadmap" },
    ],
  },
  {
    name: "Innovation",
    blurb: "Stay ahead",
    stations: [
      { name: "Formulation", status: "build" },
      { name: "Market Intelligence", status: "roadmap" },
    ],
  },
];

const NEUTRAL = "border-border bg-transparent text-muted";
const STATUS_CLASS = {
  live: "border-[#4ade80]/45 bg-[#4ade80]/12 text-[#4ade80] glow-live",
  build: "border-[#fb923c]/40 bg-[#fb923c]/12 text-[#fb923c]",
  roadmap: "border-border bg-transparent text-muted",
};

// Stage timeline (ms): 1 node · 2 connectors · 3 boxes · 4 colorize.
const T_LINES = 480;
const T_BOXES = 1050;
const T_COLOR = 2250;

export default function StationMap({ compact = false }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [stage, setStage] = useState(reduce ? 4 : 0);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const timers = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setStage(1);
        timers.push(setTimeout(() => setStage(2), T_LINES));
        timers.push(setTimeout(() => setStage(3), T_BOXES));
        timers.push(setTimeout(() => setStage(4), T_COLOR));
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [reduce]);

  const lit = stage >= 4;

  return (
    <div ref={ref} className={`rounded-2xl border border-border bg-bg-elev/40 ${compact ? "p-5 sm:p-6" : "p-6 sm:p-10"}`}>
      {/* centre node + drop connector */}
      <div className={`${compact ? "hidden" : "flex"} flex-col items-center`}>
        <motion.div
          className="inline-flex items-center gap-2.5 rounded-full border border-accent/40 bg-accent/[0.08] px-5 py-2.5 shadow-glow"
          initial={reduce ? false : { opacity: 0, scale: 0.8, y: -6 }}
          animate={stage >= 1 ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: -6 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <Logo showWordmark={false} className="text-text [&_svg]:h-5 [&_svg]:w-5" />
          <span className="font-display text-sm font-semibold text-text">LabGenie</span>
        </motion.div>
        <motion.div
          className="h-8 w-px origin-top bg-border"
          initial={reduce ? false : { scaleY: 0 }}
          animate={stage >= 2 ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        />
      </div>

      <div className="relative">
        {/* horizontal trunk branching to the three columns */}
        <motion.div
          className={`absolute left-[16.66%] right-[16.66%] top-0 hidden h-px origin-center bg-border ${compact ? "" : "md:block"}`}
          initial={reduce ? false : { scaleX: 0 }}
          animate={stage >= 2 ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: reduce ? 0 : 0.15 }}
        />

        <div className={`grid md:grid-cols-3 ${compact ? "gap-4 md:gap-4" : "gap-8 md:gap-6"}`}>
          {BRANCHES.map((b, bi) => (
            <div key={b.name} className="flex flex-col items-center">
              {/* drop line into this branch */}
              <motion.div
                className={`hidden h-8 w-px origin-top bg-border ${compact ? "" : "md:block"}`}
                initial={reduce ? false : { scaleY: 0 }}
                animate={stage >= 2 ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 0.35, ease: EASE, delay: reduce ? 0 : 0.35 + bi * 0.12 }}
              />
              {/* branch box — appears one by one */}
              <motion.div
                className={`w-full rounded-xl border border-border bg-surface/50 ${compact ? "p-4" : "p-5"}`}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ duration: 0.5, ease: EASE, delay: reduce ? 0 : bi * 0.18 }}
              >
                <div className="text-center">
                  <h3 className="font-display text-base font-semibold text-text">{b.name}</h3>
                  <p className="mono-label mt-1 normal-case tracking-normal text-dim">{b.blurb}</p>
                </div>
                <ul className={compact ? "mt-3.5 space-y-1.5" : "mt-5 space-y-2"}>
                  {b.stations.map((s, si) => (
                    <motion.li
                      key={s.name}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                      transition={{ duration: 0.4, ease: EASE, delay: reduce ? 0 : bi * 0.18 + 0.25 + si * 0.07 }}
                    >
                      <span
                        className={`flex items-center justify-between rounded-lg border px-3 py-2 text-[13px] transition-[color,background-color,border-color,box-shadow] duration-700 hover:translate-x-1 ${
                          lit ? STATUS_CLASS[s.status] : NEUTRAL
                        }`}
                      >
                        <span className="flex items-center gap-2 font-medium">
                          {lit && s.status === "live" && <span className="live-dot h-1.5 w-1.5 text-[#4ade80]" aria-hidden="true" />}
                          {lit && s.status === "build" && <span className="h-1.5 w-1.5 rounded-full bg-[#fb923c]" aria-hidden="true" />}
                          {s.name}
                        </span>
                        {lit && s.status === "live" && <span className="font-mono text-[9px] uppercase tracking-wider opacity-90">Live</span>}
                        {lit && s.status === "build" && <span className="font-mono text-[9px] uppercase tracking-wider opacity-80">Build</span>}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* legend */}
      <motion.div
        className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        initial={reduce ? false : { opacity: 0 }}
        animate={lit ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Legend swatch="bg-[#4ade80]" label="Live today" pulse={!reduce} />
        <Legend swatch="bg-[#fb923c]" label="In active build" />
        <Legend swatch="border border-border bg-transparent" label="On the roadmap" />
      </motion.div>
    </div>
  );
}

function Legend({ swatch, label, pulse }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-3 w-3 rounded ${pulse ? "live-dot text-[#4ade80]" : swatch}`} />
      <span className="mono-label normal-case tracking-normal text-muted">{label}</span>
    </span>
  );
}
