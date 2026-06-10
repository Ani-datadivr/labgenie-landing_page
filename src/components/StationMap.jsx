"use client";

import { motion, useReducedMotion } from "framer-motion";
import Logo from "./Logo";

// Clean station architecture diagram: LabGenie at the centre, three branches
// (GTM / Factory / Innovation) radiating below, stations color-coded by status.
// On scroll-in the centre node settles, connectors draw, branches and station
// rows stagger in. Live stations carry a pulsing sonar dot. Org-chart connectors
// collapse gracefully on mobile (columns stack, connectors hide).
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

// One Signal Rule: live = brand-blue signal, build = neutral with a solid dot,
// roadmap = ghost. The Live/Build text labels carry the meaning; color reinforces.
const STATUS_CLASS = {
  live: "border-accent/45 bg-accent/[0.12] text-accent-text glow-live",
  build: "border-border-strong bg-white/[0.04] text-text",
  roadmap: "border-border bg-transparent text-muted",
};

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};
const branchVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function StationMap({ compact = false }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`rounded-2xl border border-border bg-bg-elev/40 ${compact ? "p-5 sm:p-6" : "p-6 sm:p-10"}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
    >
      {/* centre node + connector tree — dropped in compact mode (homepage strip) */}
      <div className={`${compact ? "hidden" : "flex"} flex-col items-center`}>
        <motion.div
          className="inline-flex items-center gap-2.5 rounded-full border border-accent/40 bg-accent/[0.08] px-5 py-2.5 shadow-glow"
          variants={{ hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1 } }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Logo showWordmark={false} className="text-text [&_svg]:h-5 [&_svg]:w-5" />
          <span className="font-display text-sm font-semibold text-text">LabGenie</span>
        </motion.div>
        {/* drop connector (desktop): draws downward */}
        <motion.div
          className="h-8 w-px origin-top bg-border"
          variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1 } }}
          transition={{ duration: 0.4, ease: EASE }}
        />
      </div>

      <div className="relative">
        <motion.div
          className={`absolute left-[16.66%] right-[16.66%] top-0 hidden h-px origin-center bg-border ${compact ? "" : "md:block"}`}
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
          transition={{ duration: 0.6, ease: EASE }}
        />

        <div className={`grid md:grid-cols-3 ${compact ? "gap-4 md:gap-4" : "gap-8 md:gap-6"}`}>
          {BRANCHES.map((b) => (
            <motion.div
              key={b.name}
              className="flex flex-col items-center"
              variants={branchVariants}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <motion.div
                className={`hidden h-8 w-px origin-top bg-border ${compact ? "" : "md:block"}`}
                variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1 } }}
                transition={{ duration: 0.35, ease: EASE }}
              />
              <motion.div
                className={`w-full rounded-xl border border-border bg-surface/50 ${compact ? "p-4" : "p-5"}`}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
              >
                <div className="text-center">
                  <h3 className="font-display text-base font-semibold text-text">{b.name}</h3>
                  <p className="mono-label mt-1 normal-case tracking-normal text-dim">{b.blurb}</p>
                </div>
                <ul className={compact ? "mt-3.5 space-y-1.5" : "mt-5 space-y-2"}>
                  {b.stations.map((s) => (
                    <motion.li key={s.name} variants={rowVariants} transition={{ duration: 0.45, ease: EASE }}>
                      <span
                        className={`flex items-center justify-between rounded-lg border px-3 py-2 text-[13px] transition-transform duration-300 hover:translate-x-1 ${STATUS_CLASS[s.status]}`}
                      >
                        <span className="flex items-center gap-2 font-medium">
                          {s.status === "live" && (
                            <span className="live-dot h-1.5 w-1.5 text-accent-text" aria-hidden="true" />
                          )}
                          {s.status === "build" && (
                            <span className="h-1.5 w-1.5 rounded-full bg-muted" aria-hidden="true" />
                          )}
                          {s.name}
                        </span>
                        {s.status === "live" && <span className="font-mono text-[9px] uppercase tracking-wider opacity-90">Live</span>}
                        {s.status === "build" && <span className="font-mono text-[9px] uppercase tracking-wider opacity-80">Build</span>}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* legend */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <Legend swatch="bg-accent" label="Live today" pulse={!reduce} />
        <Legend swatch="bg-muted" label="In active build" />
        <Legend swatch="border border-border bg-transparent" label="On the roadmap" />
      </div>
    </motion.div>
  );
}

function Legend({ swatch, label, pulse }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-3 w-3 rounded ${pulse ? "live-dot text-accent-text" : swatch}`} />
      <span className="mono-label normal-case tracking-normal text-muted">{label}</span>
    </span>
  );
}
