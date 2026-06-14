"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  LayoutGrid,
  ShieldCheck,
  Megaphone,
  Tag,
  Boxes,
  Factory,
  FlaskConical,
  Bell,
  MessagesSquare,
  TriangleAlert,
  TrendingUp,
  TrendingDown,
  Check,
  Sparkles,
} from "lucide-react";
import Logo from "./Logo";
import CountUp from "./CountUp";

// The hero product moment: a mini LabGenie console. The rail auto-tours every
// workspace, and each one is a real product screen, an exec Overview, then one
// per station, each with a live infographic that draws itself and an AI insight
// that surfaces a beat later. Click a workspace to jump; hovering pauses the
// tour. Restrained to the brand palette (blue = signal, green = good, amber =
// attention). Decorative, so the rail items are buttons and the visuals are
// hidden from the a11y tree; all motion is reduced-motion gated.

const EASE = [0.16, 1, 0.3, 1];
const DWELL = 5200; // ms each workspace holds before auto-advancing

const TONE = {
  accent: "bg-accent/15 text-accent-text",
  amber: "bg-[#FFB454]/15 text-[#FFB454]",
  green: "bg-[#4ade80]/15 text-[#4ade80]",
};

const RAIL = [
  { id: "overview", name: "Overview", Icon: LayoutGrid, status: "live", tag: "Command center" },
  { id: "quality", name: "Quality", Icon: ShieldCheck, status: "live", tag: "Spec match" },
  { id: "sales", name: "Sales", Icon: Megaphone, status: "live", tag: "RFP queue" },
  { id: "procurement", name: "Procurement", Icon: Tag, status: "live", tag: "Live market" },
  { id: "inventory", name: "Inventory", Icon: Boxes, status: "live", tag: "Stock & shelf life" },
  { id: "production", name: "Production", Icon: Factory, status: "build", tag: "OEE & plan" },
  { id: "formulation", name: "Formulation", Icon: FlaskConical, status: "build", tag: "Reverse match" },
];

const NOTIFICATIONS = [
  { Icon: Check, tone: "accent", title: "RFP matched", meta: "Harris Foods · 5/5", time: "2m" },
  { Icon: TriangleAlert, tone: "amber", title: "Spec flagged", meta: "Lead (Pb) · 1.1 ppm", time: "9m" },
  { Icon: TrendingUp, tone: "green", title: "Buy window open", meta: "Cardamom +4%", time: "14m" },
];

// Pool the live Messages panel rotates through (a new one slides in on a loop).
const MSG_POOL = [
  { initials: "EC", name: "Emma Carter", role: "QA", preview: "Verde spec sheet looks clear" },
  { initials: "SO", name: "Sales ops", role: "", preview: "3 new RFPs queued for review" },
  { initials: "TR", name: "Tom Reese", role: "Procurement", preview: "Locked cardamom at ₹2,180/kg" },
  { initials: "DW", name: "Dana Walsh", role: "Ops", preview: "Week 12 plan rebalanced, 95% OEE" },
  { initials: "MH", name: "Megan Hale", role: "Sales", preview: "Nomad quote sent, awaiting reply" },
];

// ── shared bits ────────────────────────────────────────────────────────────

function StatusDot({ status }) {
  return status === "live" ? (
    <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-[#4ade80]" aria-hidden="true" />
  ) : (
    <span className="h-1.5 w-1.5 rounded-full bg-dim/70" aria-hidden="true" />
  );
}

function ViewHead({ children, status = "live", label }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[11px] text-accent-text">{children}</span>
      {label && <span className="truncate font-mono text-[11px] text-dim">· {label}</span>}
      <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-dim">
        <StatusDot status={status} />
        {status === "live" ? "Live" : "In build"}
      </span>
    </div>
  );
}

// AI insight, surfaces a beat after the visual settles.
function Insight({ reduce, delay = 1.15, tone = "accent", children }) {
  const border = tone === "amber" ? "border-[#FFB454]/30 bg-[#FFB454]/[0.08]" : "border-accent/25 bg-accent/[0.07]";
  return (
    <motion.div
      className={`flex items-start gap-2 rounded-xl border px-3 py-2.5 ${border}`}
      initial={reduce ? false : { opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: reduce ? 0 : delay, duration: 0.42, ease: EASE }}
    >
      <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md ${TONE[tone]}`}>
        <Sparkles className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
      </span>
      <p className="text-[12px] leading-snug text-text">{children}</p>
    </motion.div>
  );
}

// Animated radial gauge.
function Gauge({ pct, reduce, tone = "#0066FF", size = 78 }) {
  const r = size / 2 - 6;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={tone}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={reduce ? { strokeDashoffset: c * (1 - pct / 100) } : { strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - pct / 100) }}
          transition={{ duration: 1.05, ease: EASE, delay: 0.25 }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-display text-lg font-semibold text-text">
          <CountUp to={pct} duration={1.1} suffix="%" />
        </span>
      </div>
    </div>
  );
}

// Tiny sparkline.
function Spark({ data, tone = "#5AA0FF" }) {
  const w = 64;
  const h = 22;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const d = data
    .map((p, i) => `${i ? "L" : "M"}${((i / (data.length - 1)) * w).toFixed(1)} ${(h - ((p - min) / span) * h).toFixed(1)}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-5 w-16" fill="none" aria-hidden="true">
      <path d={d} stroke={tone} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Messages panel that feels live: a new message slides in at the top on a loop
// with a brief highlight, and the oldest drops off. Static under reduced motion.
function LiveMessages({ reduce }) {
  const uid = useRef(MSG_POOL.length);
  const next = useRef(0);
  const [items, setItems] = useState(() =>
    MSG_POOL.slice(0, 3).map((m, i) => ({ ...m, id: i, fresh: false }))
  );

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      const m = MSG_POOL[next.current % MSG_POOL.length];
      next.current += 1;
      setItems((prev) => [{ ...m, id: uid.current++, fresh: true }, ...prev.slice(0, 2)]);
    }, 4600);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <div className="p-4">
      <div className="flex items-center gap-2">
        <MessagesSquare className="h-3.5 w-3.5 text-accent" strokeWidth={1.9} aria-hidden="true" />
        <span className="text-[13px] font-medium text-text">Messages</span>
        {!reduce && <span className="ml-auto h-1.5 w-1.5 animate-pulse-glow rounded-full bg-[#4ade80]" aria-hidden="true" />}
      </div>
      <ul className="mt-3 space-y-1">
        <AnimatePresence initial={false} mode="popLayout">
          {items.map((m) => (
            <motion.li
              key={m.id}
              layout
              initial={reduce || !m.fresh ? false : { opacity: 0, y: -10, backgroundColor: "rgba(0,102,255,0.16)" }}
              animate={{ opacity: 1, y: 0, backgroundColor: "rgba(0,102,255,0)" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.45, ease: EASE, backgroundColor: { duration: 1.6, delay: 0.25 } }}
              className="group flex cursor-default items-center gap-2.5 overflow-hidden rounded-lg px-2 py-2"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border bg-surface-2 font-mono text-[10px] font-medium text-muted">
                {m.initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5 text-[12px] text-text">
                  <span className="truncate">{m.name}</span>
                  {m.role && <span className="font-mono text-[9px] uppercase tracking-wider text-dim">{m.role}</span>}
                </span>
                <span className="block truncate text-[11px] text-dim">{m.preview}</span>
              </span>
              {m.fresh && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

// ── workspace views ──────────────────────────────────────────────────────────

const KPIS = [
  { label: "Quote win rate", value: 68, suffix: "%", delta: "+6 pts", up: true, spark: [52, 55, 58, 60, 63, 68] },
  { label: "Avg gross margin", value: 21, suffix: "%", delta: "+1.4", up: true, spark: [18, 19, 18, 20, 20, 21] },
  { label: "Specs cleared", value: 1284, suffix: "", delta: "this month", up: true, spark: [9, 11, 12, 14, 16, 18] },
];

// Daily insights that rotate, each tagged with the station it concerns.
const DAILY = [
  {
    station: "Procurement",
    Icon: Tag,
    tone: "accent",
    text: (
      <>
        Cardamom is up <b className="font-semibold text-accent-text">4%</b> with 3 open RFPs riding on it. Lock
        procurement this week to protect <b className="font-semibold text-accent-text">₹3.2L</b>.
      </>
    ),
  },
  {
    station: "Quality",
    Icon: ShieldCheck,
    tone: "amber",
    text: (
      <>
        Harris Foods RFP clears <b className="font-semibold">4 of 5</b> specs. Swap lot B-2247 to fix the solvent
        residual flag.
      </>
    ),
  },
  {
    station: "Sales",
    Icon: Megaphone,
    tone: "accent",
    text: (
      <>
        Nomad matches <b className="font-semibold text-accent-text">SKU-38901 at 91%</b>. The quote is drafted and beats
        their 6-week ask.
      </>
    ),
  },
  {
    station: "Inventory",
    Icon: Boxes,
    tone: "amber",
    text: (
      <>
        Paprika OR rotates in <b className="font-semibold">24 days</b>. Allocate it to the Verde order first.
      </>
    ),
  },
  {
    station: "Production",
    Icon: Factory,
    tone: "amber",
    text: (
      <>
        Week 12 runs <b className="font-semibold">0.6 T short</b>. Combine 3 matching orders to hold 95% OEE.
      </>
    ),
  },
];

function OverviewView({ reduce }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % DAILY.length), 3200);
    return () => clearInterval(t);
  }, [reduce]);
  const cur = DAILY[idx];

  return (
    <div className="flex h-full flex-col gap-3">
      <ViewHead label="all stations">Today at a glance</ViewHead>
      <div className="grid grid-cols-3 gap-2.5">
        {KPIS.map((k) => (
          <div key={k.label} className="rounded-xl border border-border bg-surface/50 p-3">
            <div className="font-mono text-[10px] text-dim">{k.label}</div>
            <div className="mt-1.5 flex items-end justify-between gap-1">
              <span className="font-display text-xl font-semibold tracking-tight text-text">
                <CountUp to={k.value} duration={1.2} suffix={k.suffix} />
              </span>
              <Spark data={k.spark} />
            </div>
            <div className={`mt-1 inline-flex items-center gap-1 font-mono text-[10px] ${k.up ? "text-[#4ade80]" : "text-[#FFB454]"}`}>
              {k.up ? <TrendingUp className="h-3 w-3" aria-hidden="true" /> : <TrendingDown className="h-3 w-3" aria-hidden="true" />}
              {k.delta}
            </div>
          </div>
        ))}
      </div>

      {/* rotating daily insight, each pointing to a station */}
      <div className="relative min-h-[72px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={idx}
            className={`flex items-start gap-2.5 rounded-xl border px-3 py-2.5 ${
              cur.tone === "amber" ? "border-[#FFB454]/30 bg-[#FFB454]/[0.08]" : "border-accent/25 bg-accent/[0.07]"
            }`}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: EASE }}
          >
            <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md ${TONE[cur.tone]}`}>
              <Sparkles className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <div className="mb-0.5 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.14em] text-dim">
                <cur.Icon className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                {cur.station}
                <span aria-hidden="true">→</span>
              </div>
              <p className="text-[12px] leading-snug text-text">{cur.text}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-auto flex items-center gap-2 border-t border-border pt-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
        <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-[#4ade80]" aria-hidden="true" />
        6 stations · 14 agents working
        <span className="ml-auto flex items-center gap-1" aria-hidden="true">
          {DAILY.map((_, i) => (
            <span key={i} className={`h-1 w-1 rounded-full ${i === idx ? "bg-accent-text" : "bg-white/15"}`} />
          ))}
        </span>
      </div>
    </div>
  );
}

const QA_ROWS = [
  { k: "Capsaicin", ok: true },
  { k: "Color value", ok: true },
  { k: "Moisture", ok: true },
  { k: "Solvent residual", ok: false },
];
function QualityView({ reduce }) {
  return (
    <div className="flex h-full flex-col gap-3">
      <ViewHead label="Harris Foods RFP">Spec match</ViewHead>
      <div className="flex items-center gap-4 rounded-xl border border-border bg-surface/50 p-3.5">
        <Gauge pct={80} reduce={reduce} />
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-medium text-text">4 of 5 parameters in range</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {QA_ROWS.map((r) => (
              <span
                key={r.k}
                className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[10px] ${
                  r.ok ? "border-[#4ade80]/35 bg-[#4ade80]/10 text-[#4ade80]" : "border-[#FFB454]/40 bg-[#FFB454]/10 text-[#FFB454]"
                }`}
              >
                {r.ok ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : <TriangleAlert className="h-2.5 w-2.5" strokeWidth={2.5} />}
                {r.k}
              </span>
            ))}
          </div>
        </div>
      </div>
      <Insight reduce={reduce} tone="amber" delay={1.1}>
        Solvent residual is <span className="font-semibold">2 ppm</span> over their limit. Lot{" "}
        <span className="font-semibold">B-2247</span> clears it, swap it in?
      </Insight>
    </div>
  );
}

const QUEUE = [
  { co: "Nomad Foods", item: "Paprika oleoresin · 2 MT", match: 91 },
  { co: "Verde Beverages", item: "Cardamom 8E · 4 MT", match: 84 },
  { co: "Arbor Spice", item: "Turmeric C3 · 1 MT", match: 62 },
];
function SalesView({ reduce }) {
  return (
    <div className="flex h-full flex-col gap-3">
      <ViewHead label="inbound this morning">RFP queue</ViewHead>
      <div className="space-y-2">
        {QUEUE.map((q, i) => (
          <motion.div
            key={q.co}
            className="flex items-center gap-3 rounded-xl border border-border bg-surface/50 px-3.5 py-2.5"
            initial={reduce ? false : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: reduce ? 0 : 0.15 + i * 0.12, duration: 0.4, ease: EASE }}
          >
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-medium text-text">{q.co}</div>
              <div className="truncate font-mono text-[10px] text-dim">{q.item}</div>
            </div>
            <div className="flex w-20 shrink-0 items-center gap-2">
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.span
                  className="block h-full rounded-full"
                  style={{ background: q.match >= 80 ? "#4ade80" : "#FFB454" }}
                  initial={reduce ? false : { width: 0 }}
                  animate={{ width: `${q.match}%` }}
                  transition={{ delay: reduce ? 0 : 0.3 + i * 0.12, duration: 0.7, ease: EASE }}
                />
              </span>
              <span className="font-mono text-[11px] text-text">{q.match}%</span>
            </div>
          </motion.div>
        ))}
      </div>
      <Insight reduce={reduce} delay={1.0}>
        Nomad matches <span className="font-semibold text-accent-text">SKU-38901 at 91%</span>. Draft &amp; quote ready,
        ETA beats their 6-week ask.
      </Insight>
    </div>
  );
}

const PRICES = [1820, 1790, 1845, 1910, 1880, 1965, 2040, 2180];
function ProcurementView({ reduce }) {
  const W = 300;
  const H = 92;
  const min = Math.min(...PRICES);
  const max = Math.max(...PRICES);
  const x = (i) => 2 + (i / (PRICES.length - 1)) * (W - 4);
  const y = (v) => 8 + (1 - (v - min) / (max - min)) * (H - 22);
  const pts = PRICES.map((v, i) => [x(i), y(v)]);
  const line = pts.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)} ${py.toFixed(1)}`).join(" ");
  const area = `${line} L${x(7).toFixed(1)} ${H - 12} L${x(0).toFixed(1)} ${H - 12} Z`;
  const last = pts[pts.length - 1];
  return (
    <div className="flex h-full flex-col gap-3">
      <ViewHead label="cardamom · 8E grade">Live market</ViewHead>
      <div className="flex items-baseline gap-2">
        <span className="font-display text-2xl font-semibold text-text">₹2,180</span>
        <span className="font-mono text-[10px] text-dim">/kg</span>
        <span className="ml-1 inline-flex items-center gap-1 font-mono text-[11px] text-[#FFB454]">
          <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" /> +6.9% · 8 wks
        </span>
      </div>

      <div className="rounded-xl border border-border bg-bg/50 p-2.5">
        <div className="flex gap-1.5">
          {/* y axis */}
          <div className="flex w-7 shrink-0 flex-col justify-between py-0.5 text-right font-mono text-[8px] text-dim">
            <span>₹2.2k</span>
            <span>₹2.0k</span>
            <span>₹1.8k</span>
          </div>

          {/* plot + annotation */}
          <div className="relative flex-1">
            <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="dash-proc2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0066FF" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#0066FF" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.rect
                x={x(5)}
                y={8}
                width={x(7) - x(5)}
                height={H - 22}
                fill="#0066FF"
                stroke="#0066FF"
                strokeOpacity="0.4"
                strokeDasharray="3 3"
                initial={reduce ? { fillOpacity: 0.14 } : { fillOpacity: 0 }}
                animate={{ fillOpacity: 0.14 }}
                transition={{ delay: reduce ? 0 : 1.0, duration: 0.5 }}
              />
              <motion.path d={area} fill="url(#dash-proc2)" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.5 }} />
              <motion.path
                d={line}
                fill="none"
                stroke="#0066FF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: EASE }}
              />
              <circle className="chart-ping" cx={last[0]} cy={last[1]} r="3" fill="#5AA0FF" />
              <circle cx={last[0]} cy={last[1]} r="2.6" fill="#5AA0FF" />
            </svg>

            {/* callout sits over the slope, just above the buy-window band — no
                connector, so it can't drift apart on different viewports */}
            <motion.div
              className="absolute left-1/2 top-1 max-w-[62%] -translate-x-1/2 rounded-lg border border-accent/40 bg-bg/95 px-2 py-1.5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.8)]"
              initial={reduce ? false : { opacity: 0, scale: 0.9, y: -3 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : 1.0, duration: 0.36, ease: EASE }}
            >
              <div className="flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.14em] text-accent-text">
                <Sparkles className="h-2.5 w-2.5" strokeWidth={2} aria-hidden="true" />
                Buy window
              </div>
              <div className="mt-0.5 text-[10px] leading-tight text-text">
                +6% in 8 days, lock 2 MT to save ~<span className="font-semibold text-accent-text">₹3.2L</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* x axis */}
        <div className="mt-1.5 flex justify-between pl-[34px] font-mono text-[8px] uppercase tracking-wider text-dim">
          <span>8 wks ago</span>
          <span className="text-accent-text/80">buy window</span>
          <span>now</span>
        </div>
      </div>
    </div>
  );
}

const LOTS = [
  { name: "Cardamom 8E", qty: "4.2 MT", life: 71, tag: "ok" },
  { name: "Paprika OR", qty: "1.8 MT", life: 24, tag: "rotate" },
  { name: "Turmeric C3", qty: "6.0 MT", life: 88, tag: "ok" },
];
function InventoryView({ reduce }) {
  return (
    <div className="flex h-full flex-col gap-3">
      <ViewHead label="finished goods">On-hand &amp; shelf life</ViewHead>
      <div className="space-y-2.5">
        {LOTS.map((l, i) => (
          <div key={l.name} className="rounded-xl border border-border bg-surface/50 px-3.5 py-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium text-text">{l.name}</span>
              <span className="font-mono text-[12px] text-accent-text">{l.qty}</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.span
                  className="block h-full rounded-full"
                  style={{ background: l.tag === "rotate" ? "#FFB454" : "#4ade80" }}
                  initial={reduce ? false : { width: 0 }}
                  animate={{ width: `${l.life}%` }}
                  transition={{ delay: reduce ? 0 : 0.2 + i * 0.12, duration: 0.7, ease: EASE }}
                />
              </span>
              <span className={`font-mono text-[9px] uppercase tracking-wider ${l.tag === "rotate" ? "text-[#FFB454]" : "text-dim"}`}>
                {l.tag === "rotate" ? "24 days" : "Healthy"}
              </span>
            </div>
          </div>
        ))}
      </div>
      <Insight reduce={reduce} tone="amber" delay={1.1}>
        Paprika OR rotates in <span className="font-semibold">24 days</span>. Allocate it to the Verde order first.
      </Insight>
    </div>
  );
}

const WEEKS = [
  { label: "W09", p: 73, c: 68 },
  { label: "W10", p: 77, c: 77 },
  { label: "W11", p: 68, c: 73 },
  { label: "W12", p: 64, c: 91, flag: true },
  { label: "W13", p: 82, c: null },
];
function ProductionView({ reduce }) {
  return (
    <div className="flex h-full flex-col gap-3">
      <ViewHead status="build" label="cardamom extract">OEE &amp; plan</ViewHead>
      <div className="flex items-center gap-4 rounded-xl border border-border bg-surface/50 p-3.5">
        <Gauge pct={95} reduce={reduce} tone="#4ade80" />
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-medium text-text">Overall equipment effectiveness</div>
          <div className="mt-2 grid grid-cols-5 gap-1.5">
            {WEEKS.map((w, i) => (
              <div key={w.label} className="flex flex-col items-center gap-1">
                <div className="relative flex h-12 w-full items-end justify-center">
                  {w.c != null ? (
                    <motion.div
                      className={`w-2.5 rounded-t-sm ${w.flag ? "bg-[#FFB454] flag-glow" : "bg-accent"}`}
                      initial={reduce ? false : { height: 0 }}
                      animate={{ height: `${w.c}%` }}
                      transition={{ delay: reduce ? 0 : 0.2 + i * 0.08, duration: 0.5, ease: EASE }}
                    />
                  ) : (
                    <div className="w-2.5 rounded-t-sm border border-dashed border-border-strong" style={{ height: `${w.p}%` }} />
                  )}
                </div>
                <span className={`font-mono text-[8px] uppercase ${w.flag ? "text-[#FFB454]" : "text-dim"}`}>{w.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Insight reduce={reduce} tone="amber" delay={1.15}>
        Week 12 is <span className="font-semibold">0.6 T short</span>. Combine 3 matching orders to hold 95% OEE.
      </Insight>
    </div>
  );
}

const COMPONENTS = [
  { name: "Paprika oleoresin", pct: 62, color: "#0066FF" },
  { name: "Carrier oil", pct: 30, color: "#5AA0FF" },
  { name: "Capsicum extract", pct: 8, color: "#9CC4FF" },
];
function FormulationView({ reduce }) {
  return (
    <div className="flex h-full flex-col gap-3">
      <ViewHead status="build" label="paprika 40M">Reverse match</ViewHead>
      <div className="rounded-xl border border-border bg-surface/50 p-3.5">
        <div className="flex items-center justify-between">
          <span className="mono-label text-dim">Composition</span>
          <span className="font-mono text-[11px] text-[#4ade80]">98% to target</span>
        </div>
        <div className="sheen-loop mt-3 flex h-2.5 w-full overflow-hidden rounded-full">
          {COMPONENTS.map((c) => (
            <motion.div
              key={c.name}
              style={{ background: c.color }}
              className="h-full"
              initial={reduce ? false : { width: 0 }}
              animate={{ width: `${c.pct}%` }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            />
          ))}
        </div>
        <ul className="mt-3 space-y-1.5">
          {COMPONENTS.map((c) => (
            <li key={c.name} className="flex items-center gap-2 text-[12px]">
              <span className="h-2 w-2 shrink-0 rounded-sm" style={{ background: c.color }} aria-hidden="true" />
              <span className="flex-1 truncate text-muted">{c.name}</span>
              <span className="font-mono text-[12px] text-text">{c.pct}%</span>
            </li>
          ))}
        </ul>
      </div>
      <Insight reduce={reduce} delay={1.1}>
        Reverse-matched at <span className="font-semibold text-accent-text">98%</span> and converted to a 1.2 T PO.
      </Insight>
    </div>
  );
}

const VIEWS = {
  overview: OverviewView,
  quality: QualityView,
  sales: SalesView,
  procurement: ProcurementView,
  inventory: InventoryView,
  production: ProductionView,
  formulation: FormulationView,
};

// ── shell ────────────────────────────────────────────────────────────────

export default function AppDashboard() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState("overview");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const i = RAIL.findIndex((s) => s.id === active);
    const t = setTimeout(() => setActive(RAIL[(i + 1) % RAIL.length].id), DWELL);
    return () => clearTimeout(t);
  }, [active, paused, reduce]);

  const item = RAIL.find((s) => s.id === active);
  const View = VIEWS[active];

  return (
    <div
      className="overflow-hidden rounded-2xl border border-border bg-bg shadow-panel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* browser chrome */}
      <div className="flex items-center gap-3 border-b border-border bg-surface-2/70 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-surface-3/90 ring-1 ring-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-surface-3/90 ring-1 ring-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-surface-3/90 ring-1 ring-border" />
        </span>
        <div className="ml-2 hidden items-center gap-1.5 rounded-lg bg-bg/70 px-3 py-1.5 sm:flex">
          <svg viewBox="0 0 16 16" className="h-3 w-3 text-dim" fill="none" aria-hidden="true">
            <path d="M5 7V5a3 3 0 1 1 6 0v2m-7 0h8v6H4z" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <span className="font-mono text-[11px] text-muted">app.labgenie.ai/operations</span>
        </div>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-[#4ade80]/30 bg-[#4ade80]/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[#4ade80]">
          <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-[#4ade80]" />
          Live
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] lg:grid-cols-[216px_1fr_252px]">
        {/* ── rail (tabs) ── */}
        <aside className="hidden flex-col border-r border-border bg-surface/40 p-4 sm:flex">
          <div className="flex items-center gap-2 px-1">
            <Logo showWordmark={false} className="text-text [&_svg]:h-5 [&_svg]:w-5" />
            <span className="font-display text-sm font-semibold text-text">labgenie</span>
          </div>

          <div className="mt-5 flex items-center justify-between px-1">
            <span className="mono-label">Workspaces</span>
            {!reduce && (
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-dim">{paused ? "Paused" : "Touring"}</span>
            )}
          </div>

          <nav className="mt-2 space-y-0.5">
            {RAIL.map((s) => {
              const on = s.id === active;
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Show the ${s.name} workspace`}
                  aria-pressed={on}
                  onClick={() => {
                    setActive(s.id);
                    setPaused(true); // a deliberate pick holds; the tour resumes on mouse-leave
                  }}
                  className={`group relative flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors duration-200 ${
                    on ? "bg-accent/12 font-medium text-text" : "text-muted hover:bg-white/[0.04] hover:text-text"
                  }`}
                >
                  {on && !reduce && (
                    <motion.span
                      layoutId="rail-active"
                      className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      aria-hidden="true"
                    />
                  )}
                  <s.Icon className={`h-4 w-4 shrink-0 transition-colors ${on ? "text-accent" : "text-dim group-hover:text-accent-text"}`} aria-hidden="true" />
                  <span className="flex-1 truncate">{s.name}</span>
                  <StatusDot status={s.status} />
                </button>
              );
            })}
          </nav>

          <div className="mt-auto hidden items-center gap-2 px-1 pt-5 lg:flex">
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-[#4ade80]" aria-hidden="true" />
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-dim">All systems operational</span>
          </div>
        </aside>

        {/* ── active workspace ── */}
        <div className="flex min-w-0 flex-col">
          <div className="flex items-center gap-2.5 border-b border-border px-5 py-3">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                className="flex min-w-0 items-center gap-2.5"
                initial={reduce ? false : { opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: 6 }}
                transition={{ duration: 0.28, ease: EASE }}
              >
                <span className="grid h-7 w-7 place-items-center rounded-lg border border-accent/30 bg-accent/[0.08]">
                  <item.Icon className="h-3.5 w-3.5 text-accent" strokeWidth={1.9} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-text">{item.name}</div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-dim">{item.tag}</div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="ml-auto hidden items-center gap-1.5 text-[11px] lg:flex">
              <CountUp to={1284} className="font-display font-semibold text-accent-text" />
              <span className="text-dim">specs cleared today</span>
            </div>
          </div>

          <div className="relative min-h-[336px] sm:min-h-[352px]">
            {/* Views crossfade with overlap (no mode="wait") so the panel never
                flashes empty between stations. */}
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                className="absolute inset-0 px-5 py-5"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.34, ease: EASE }}
              >
                <View reduce={reduce} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* prompt bar — the invitation to interact */}
          <div className="border-t border-border px-5 py-3.5">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-surface/60 px-3 py-2.5 transition-colors hover:border-border-strong">
              <Sparkles className="h-3.5 w-3.5 text-accent" strokeWidth={1.8} aria-hidden="true" />
              <span className="font-mono text-[12px] text-muted">Ask LabGenie, or pick a workspace to watch it work</span>
              <span className="ml-1 h-3.5 w-px animate-pulse-glow bg-accent" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* ── notifications + messages ── */}
        <aside className="hidden flex-col border-l border-border bg-surface/30 lg:flex">
          <div className="border-b border-border p-4">
            <div className="flex items-center gap-2">
              <Bell className="h-3.5 w-3.5 text-accent" strokeWidth={1.9} aria-hidden="true" />
              <span className="text-[13px] font-medium text-text">Notifications</span>
              <span className="ml-auto grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 font-mono text-[9px] font-semibold text-white">
                {NOTIFICATIONS.length}
              </span>
            </div>
            <ul className="mt-3 space-y-1">
              {NOTIFICATIONS.map(({ Icon, tone, title, meta, time }) => (
                <li key={title} className="group flex cursor-default items-start gap-2.5 rounded-lg px-2 py-2 transition-colors duration-200 hover:bg-white/[0.04]">
                  <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md ${TONE[tone]}`}>
                    <Icon className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12px] text-text">{title}</span>
                    <span className="block truncate text-[11px] text-dim">{meta}</span>
                  </span>
                  <span className="shrink-0 font-mono text-[9px] text-dim">{time}</span>
                </li>
              ))}
            </ul>
          </div>

          <LiveMessages reduce={reduce} />
        </aside>
      </div>
    </div>
  );
}
