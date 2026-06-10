"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, animate } from "framer-motion";
import {
  ClipboardCheck,
  Headphones,
  Send,
  Tag,
  Boxes,
  Cog,
  Microscope,
  Truck,
  FlaskConical,
  BarChart3,
  Sparkles,
  RefreshCw,
  HelpCircle,
  ChevronDown,
  SendHorizontal,
  CheckCircle2,
  Target,
  Factory,
  Lightbulb,
  Zap,
  Database,
} from "lucide-react";
import { STATIONS as STATION_DATA } from "@/lib/operations";
import styles from "./OperationsCanvas.module.css";
import MobileDemo from "./MobileDemo";

/* ============================================================================
   DATA MODEL — catalogue lives in @/lib/operations (shared with the Gemini
   route); icons attached here. ERP → LabGenie → station sub-agents.
   ========================================================================== */

const GROUP_LIST = [
  { id: "gtm", name: "Go-to-Market", short: "GTM", Icon: Target },
  { id: "factory", name: "Factory", short: "Factory", Icon: Factory },
  { id: "innovation", name: "Innovation", short: "Innovation", Icon: Lightbulb },
];

const STATION_ICONS = {
  qa: ClipboardCheck,
  cs: Headphones,
  sales: Send,
  proc: Tag,
  inv: Boxes,
  prod: Cog,
  qc: Microscope,
  log: Truck,
  form: FlaskConical,
  mkt: BarChart3,
};

const STATIONS = STATION_DATA.map((s) => ({ ...s, Icon: STATION_ICONS[s.id] }));

const CHIPS = [
  { label: "Match a quote to our catalog", stationId: "qa", module: "Quote matching" },
  { label: "Optimize sugar formulation", stationId: "form", module: "Reverse engineering formulations" },
  { label: "View demand forecasts", stationId: "proc", module: "Demand Planning" },
];

const MODULE_RESULTS = {
  "Quote matching":   { title: "Quote matched",      lines: ["18 specs · 17 in range", "1 flag: moisture 4.2%"] },
  "Quote auto-fill":  { title: "Quote auto-filled",  lines: ["32 fields · 30 from catalog", "2 left for your review"] },
  "New onboarding":   { title: "Onboarding drafted", lines: ["3-step flow · welcome + 2 docs", "Compliance checklist attached"] },
  "Upsell":           { title: "Upsell found",       lines: ["3 accounts · +₹4.2L potential", "Best fit: oleoresin blend"] },
  "Re-order":         { title: "Re-order ready",     lines: ["5 products below min stock", "Draft purchase order · 2-wk lead time"] },
  "Inquiry Routing":  { title: "Inquiry routed",     lines: ["→ Key Accounts · SLA 2h", "Priority: high"] },
  "Demand Planning":  { title: "Demand forecast",    chart: { bars: [48, 61, 55, 72, 80], delta: "+12%", caption: "Next 5 wks · units (k)" } },
  "Reverse auction":  { title: "Auction set up",     lines: ["6 suppliers invited", "Floor ₹82/kg · ends 48h"] },
  "Live prices":      { title: "Live prices",        chart: { bars: [132, 128, 134, 139, 141], delta: "+1.2%", caption: "Turmeric · ₹/kg · 7d" } },
  "Price Forecasts":  { title: "Price forecast",     chart: { bars: [141, 144, 143, 149, 152], delta: "+6%", caption: "Next 5 wks · ₹/kg" } },
  "Shelf life tracker": { title: "Shelf-life checked", lines: ["Rotation ok · 2 lots near expiry", "Oldest lot: 11 days left"] },
  "Stock rotation check": { title: "Rotation verified", lines: ["Pick order correct", "0 issues across 42 lots"] },
  "Vendor Match":     { title: "Vendor matched",     lines: ["4 vendors · 2 approved", "Top: AgroSpice · 96% spec fit"] },
  "Equipment effectiveness": { title: "Effectiveness improved", chart: { bars: [68, 71, 70, 75, 78], delta: "+7%", caption: "Equipment effectiveness % · last 5 shifts" } },
  "Shift Ops":        { title: "Shift plan ready",   lines: ["3 shifts · 18 operators", "1 gap: Line B night"] },
  "Consensus planning": { title: "Consensus aligned", lines: ["Sales vs ops gap −12%", "Plan locked for 5 wks"] },
  "Scheduling":       { title: "Schedule built",     lines: ["24 jobs sequenced", "−1 changeover · +6% throughput"] },
  "Traceability":     { title: "Traceability mapped", lines: ["Lot #A-2231 · 4 hops traced", "Source → batch → ship"] },
  "Fleet tracking":   { title: "Fleet located",      lines: ["7 vehicles live", "2 en route · 1 idle"] },
  "Route optimization": { title: "Route optimized",  lines: ["3 stops · −22% miles", "ETA saved: 48 min"] },
  "Warehouse management": { title: "Warehouse mapped", lines: ["Bins 78% full", "3 slots reassigned (stock rotation)"] },
  "Reverse engineering formulations": { title: "Formulation drafted", lines: ["Sugar −18% · sweetness held 1.0×", "Est. cost −9%/kg"] },
  "Wild ideas":       { title: "Ideas generated",   lines: ["6 concepts · 2 high-novelty", "Lead: tamarind cold-brew"] },
  "Trends":           { title: "Trend index",        chart: { bars: [40, 47, 52, 58, 71], delta: "+18%", caption: "Category interest · 6 mo" } },
  "Competitive":      { title: "Competitive scan",   lines: ["9 products benchmarked", "2 white-space gaps found"] },
};

const byId = (id) => STATIONS.find((s) => s.id === id);

/* ---- chat helpers: instant command routing; Gemini handles conversation ---- */

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

const GENERIC_WORDS = new Set([
  "new", "live", "check", "order", "ops", "this", "that", "your", "you", "the", "and",
  "for", "with", "what", "how", "can", "need", "want", "help", "please", "show", "get", "give", "find",
]);

const CONVERSATIONAL_RE = /^\s*(what|whats|what's|how|why|who|when|where|which|do|does|can|could|would|should|is|are|tell|explain|describe|say|hi|hey|hello|hiya|yo|sup|howdy|namaste|thanks|thank)\b/i;

function isConversational(text) {
  const t = text.trim();
  return CONVERSATIONAL_RE.test(t) || t.endsWith("?");
}

function localMatch(text) {
  const q = norm(text);
  if (!q) return null;
  const padded = ` ${q} `;
  for (const s of STATIONS) {
    for (const m of s.modules) {
      const h = norm(m);
      if (q === h || padded.includes(` ${h} `)) return { stationId: s.id, module: m };
    }
  }
  const qWords = q.split(" ").filter((w) => w.length >= 3 && !GENERIC_WORDS.has(w));
  for (const s of STATIONS) {
    for (const m of s.modules) {
      const mWords = norm(m).split(" ").filter((w) => w.length >= 3 && !GENERIC_WORDS.has(w));
      for (const qw of qWords) {
        for (const mw of mWords) {
          if (qw === mw || (qw.length >= 5 && mw.startsWith(qw)) || (mw.length >= 5 && qw.startsWith(mw))) {
            return { stationId: s.id, module: m };
          }
        }
      }
    }
  }
  return null;
}

/* layout constants */
const STATION_W = 172;
const STATION_H = 80;
const NODE_W = 318;
const NODE_H = 300;
const ERP_W = 188;
const ERP_H = 360;
const PAD = 22;
const GROUPBAR_W = 350;
const GROUPBAR_H = 46;
const ERP_PULSES = 2;

const ERP_LOGOS = [
  { id: "sap", name: "SAP", logo: "/erp/sap.webp", color: "#0aa0e1" },
  { id: "sage", name: "Sage", logo: "/erp/sage.webp", color: "#00d639" },
  { id: "infor", name: "Infor", logo: "/erp/infor.svg", color: "#d4002a" },
  { id: "ramco", name: "Ramco", logo: "/erp/ramco.svg", color: "#f47216" },
];

function bezierPath(x1, y1, x2, y2) {
  const dx = (x2 - x1) * 0.5;
  return `M ${x1} ${y1} C ${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}`;
}

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function nodeHeight(expanded, visModCount) {
  const base = 82;
  if (!expanded || visModCount === 0) return base;
  return base + 9 + visModCount * 30;
}

/* Layout: ERP pinned far-left, LabGenie center-left, station sub-agents fanned
   across the right. Relaxation repels node overlaps and keeps everything in. */
function buildLayout(w, h, ids, expandedMap, modCountFn) {
  const cy = h / 2;
  const erpH = Math.min(ERP_H, h - 2 * PAD);
  const erp = { x: PAD, y: clamp(cy - erpH / 2, PAD, h - erpH - PAD), w: ERP_W, h: erpH };

  // LabGenie pushed to the centre (but always clear of the ERP, and always
  // leaving enough room on the right for the station fan)
  const brainX = clamp(Math.round(w / 2 - NODE_W / 2), erp.x + ERP_W + 64, w - NODE_W - (STATION_W + 150));
  const brainY = clamp(cy - NODE_H / 2, PAD, h - NODE_H - PAD);
  const labgenie = { x: brainX, y: brainY };

  const baseX = brainX + NODE_W + 56;
  const rightEdge = w - STATION_W - PAD;
  const bulgeMax = clamp(rightEdge - baseX, 70, w * 0.3);

  const obstacles = [
    { x: erp.x, y: erp.y, w: ERP_W, h: erpH },
    { x: brainX, y: brainY, w: NODE_W, h: NODE_H },
    { x: (w - GROUPBAR_W) / 2, y: 14, w: GROUPBAR_W, h: GROUPBAR_H },
  ];

  const topPad = 78;
  const botPad = 22;
  const usableH = Math.max(120, h - topPad - botPad);
  const count = ids.length;

  const nodes = ids.map((id, i) => {
    const hgt = nodeHeight(expandedMap[id], modCountFn(id));
    const t = count <= 1 ? 0.5 : i / (count - 1);
    const off = (t - 0.5) * 2;
    const bulge = Math.sqrt(Math.max(0, 1 - off * off));
    const ax = clamp(baseX + bulge * bulgeMax, baseX, rightEdge);
    const ay = clamp(topPad + t * usableH - hgt / 2, PAD, h - hgt - PAD);
    return { id, w: STATION_W, h: hgt, x: ax, y: ay, ax, ay };
  });

  const GAP = 18;
  const ITER = 140;
  const minX = baseX - 40;
  for (let it = 0; it < ITER; it++) {
    for (const n of nodes) {
      n.x += (n.ax - n.x) * 0.03;
      n.y += (n.ay - n.y) * 0.06;
    }
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x) + GAP;
        const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y) + GAP;
        if (ox > 0 && oy > 0) {
          if (oy < ox) {
            const p = oy / 2;
            if (a.y < b.y) { a.y -= p; b.y += p; } else { a.y += p; b.y -= p; }
          } else {
            const p = ox / 2;
            if (a.x < b.x) { a.x -= p; b.x += p; } else { a.x += p; b.x -= p; }
          }
        }
      }
    }
    for (const n of nodes) {
      for (const o of obstacles) {
        const ox = Math.min(n.x + n.w, o.x + o.w) - Math.max(n.x, o.x) + GAP;
        const oy = Math.min(n.y + n.h, o.y + o.h) - Math.max(n.y, o.y) + GAP;
        if (ox > 0 && oy > 0) {
          if (oy < ox) {
            if (n.y + n.h / 2 < o.y + o.h / 2) n.y -= oy; else n.y += oy;
          } else {
            if (n.x + n.w / 2 < o.x + o.w / 2) n.x -= ox; else n.x += ox;
          }
        }
      }
    }
    for (const n of nodes) {
      n.x = clamp(n.x, minX, w - n.w - PAD);
      n.y = clamp(n.y, PAD, h - n.h - PAD);
    }
  }

  const stations = {};
  nodes.forEach((n) => {
    stations[n.id] = { x: n.x, y: n.y };
  });
  return { erp, labgenie, stations };
}

/* ============================================================================
   ErpSource — the customer's ERP, pinned far-left; data streams into LabGenie.
   ========================================================================== */

// One ERP tile: the full logo (white mark at rest). On hover it reports its
// brand color up so the whole panel fills with that company's theme.
function ErpLogo({ logo, name, color, onHover }) {
  const [hasImg, setHasImg] = useState(Boolean(logo));
  return (
    <span
      className={styles.erpLogo}
      title={name}
      onMouseEnter={() => onHover(color)}
      onMouseLeave={() => onHover(null)}
    >
      {hasImg ? (
        <img
          src={logo}
          alt={name}
          className={styles.erpLogoImg}
          style={{ filter: "brightness(0) invert(1)" }}
          onError={() => setHasImg(false)}
        />
      ) : (
        <span className={styles.erpMono}>{name}</span>
      )}
    </span>
  );
}

function ErpSource({ position, erpRef }) {
  const [fill, setFill] = useState(null);
  return (
    <div ref={erpRef} className={styles.erp} style={{ left: position.x, top: position.y, height: position.h }}>
      {/* brand-color wash: fills the panel with the hovered system's theme */}
      <span
        className={styles.erpFill}
        aria-hidden="true"
        style={{ backgroundColor: fill ?? "transparent", opacity: fill ? 0.92 : 0 }}
      />
      <div className={styles.erpHead}>
        <span className={styles.erpIcon} aria-hidden="true">
          <Database size={15} strokeWidth={1.9} />
        </span>
        <span className={styles.erpTitle}>Your ERP</span>
      </div>
      <div className={styles.erpLogos}>
        {ERP_LOGOS.map((l) => (
          <ErpLogo key={l.id} logo={l.logo} name={l.name} color={l.color} onHover={setFill} />
        ))}
        <span className={styles.erpEtc}>and more</span>
      </div>
      <div className={styles.erpFoot}>
        <span className={styles.erpSync} aria-hidden="true" />
        Live sync
      </div>
    </div>
  );
}

/* ============================================================================
   StationCard — draggable sub-agent; modules clickable (one-way packet).
   ========================================================================== */

function StationCard({ station, modules, home, expanded, processing, hit, onToggleExpand, onModuleRoute, cardRef, canvasRef }) {
  const { Icon } = station;
  const live = station.status === "live";
  const mx = useMotionValue(home.x);
  const my = useMotionValue(home.y);

  useEffect(() => {
    const a1 = animate(mx, home.x, { type: "spring", stiffness: 240, damping: 30 });
    const a2 = animate(my, home.y, { type: "spring", stiffness: 240, damping: 30 });
    return () => {
      a1.stop();
      a2.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [home.x, home.y]);

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.card} ${processing ? styles.processing : ""} ${hit ? styles.hit : ""}`}
      style={{ x: mx, y: my, "--accent": station.accent }}
      drag
      dragConstraints={canvasRef}
      dragMomentum={false}
      dragElastic={0.1}
      whileDrag={{ scale: 1.04, zIndex: 40 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <span className={styles.cardSheen} aria-hidden="true" />
      <div className={styles.cardHead}>
        <span className={styles.iconTile} aria-hidden="true">
          <Icon size={16} strokeWidth={1.75} />
        </span>
        <h3 className={styles.cardName}>{station.short}</h3>
        <span className={`${styles.statusDot} ${live ? styles.dotLive : styles.dotPlanned}`} aria-hidden="true" />
      </div>

      <button
        type="button"
        className={styles.expandRow}
        aria-expanded={expanded}
        aria-label={`${expanded ? "Collapse" : "Expand"} ${station.label} modules`}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          onToggleExpand(station.id);
        }}
      >
        <span className={`${styles.chip} ${live ? styles.chipLive : styles.chipPlanned}`}>
          {live ? "Live" : "Planned"}
        </span>
        <span className={styles.modCount}>{modules.length} mod</span>
        <ChevronDown size={14} strokeWidth={2} className={`${styles.chevron} ${expanded ? styles.chevronOpen : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.ul
            className={styles.modList}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            {modules.map((m) => (
              <li key={m}>
                <button
                  type="button"
                  className={styles.modItem}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    onModuleRoute(station.id, m);
                  }}
                  aria-label={`Run ${m} — route to LabGenie`}
                >
                  <span className={styles.modDot} aria-hidden="true" />
                  <span className={styles.modLabel}>{m}</span>
                  <Zap size={12} strokeWidth={2} className={styles.modZap} aria-hidden="true" />
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ============================================================================
   MiniChart
   ========================================================================== */

function MiniChart({ data, accent }) {
  const max = Math.max(...data.bars);
  const min = Math.min(...data.bars);
  const span = max - min || 1;
  return (
    <div className={styles.chart} style={{ "--accent": accent }}>
      <div className={styles.chartHead}>
        <span className={styles.chartCaption}>{data.caption}</span>
        <span className={styles.chartDelta}>{data.delta}</span>
      </div>
      <div className={styles.bars}>
        {data.bars.map((b, i) => (
          <span key={i} className={styles.bar} style={{ height: `${30 + ((b - min) / span) * 70}%` }} />
        ))}
      </div>
    </div>
  );
}

/* ============================================================================
   LabGenieNode — the brain (the layer on top of the ERP). Not draggable.
   ========================================================================== */

function LabGenieNode({ position, routeTarget, routeResult, thinking, notice, chatValue, setChatValue, onSubmit, chips, activeChip, onChip, onReset, onHelp, nodeRef }) {
  const routingStation = routeTarget ? byId(routeTarget) : null;
  const resultStation = routeResult ? byId(routeResult.stationId) : null;

  return (
    <div
      ref={nodeRef}
      className={`${styles.brain} ${routeResult ? styles.brainResult : ""}`}
      style={{ left: position.x, top: position.y, "--accent": resultStation?.accent }}
    >
      <span className={styles.brainSheen} aria-hidden="true" />
      <div className={styles.brainHead}>
        <span className={styles.brainAvatar} aria-hidden="true">
          <Sparkles size={18} strokeWidth={1.75} />
        </span>
        <div className={styles.brainTitleWrap}>
          <h3 className={styles.brainTitle}>LabGenie</h3>
          <span className={styles.brainSub}>F&amp;B Operations AI</span>
        </div>
        {/* Real controls only: reset re-mounts the canvas (cards return home),
            help explains the demo. No decoy affordances. */}
        <div className={styles.brainActions}>
          <button type="button" className={styles.iconBtn} aria-label="Reset the canvas" title="Reset the canvas" onClick={onReset}><RefreshCw size={14} /></button>
          <button type="button" className={styles.iconBtn} aria-label="How this demo works" title="How this demo works" onClick={onHelp}><HelpCircle size={14} /></button>
        </div>
      </div>

      <div className={styles.brainBody}>
        <AnimatePresence mode="wait">
          {thinking ? (
            <motion.div
              key="thinking"
              className={`${styles.brainStatus} ${styles.brainStatusActive}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="status"
            >
              <span className={styles.spinner} aria-hidden="true" />
              LabGenie is thinking…
            </motion.div>
          ) : routeResult ? (
            <motion.div
              key={`res-${routeResult.module}`}
              className={styles.result}
              style={{ "--accent": resultStation?.accent }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              role="status"
            >
              <div className={styles.resultHead}>
                <CheckCircle2 size={15} strokeWidth={2} className={styles.resultCheck} />
                <span className={styles.resultTitle}>{routeResult.title || routeResult.module}</span>
                <span className={styles.resultTag}>{resultStation?.short}</span>
              </div>
              {routeResult.replyText ? (
                <p className={styles.resultReply}>{routeResult.replyText}</p>
              ) : routeResult.chart ? (
                <MiniChart data={routeResult.chart} accent={resultStation?.accent} />
              ) : (
                <ul className={styles.resultLines}>
                  {routeResult.lines.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          ) : routingStation ? (
            <motion.div
              key="routing"
              className={`${styles.brainStatus} ${styles.brainStatusActive}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="status"
            >
              <span className={styles.ping} style={{ background: routingStation.accent }} aria-hidden="true" />
              Routing to {routingStation.short}…
            </motion.div>
          ) : notice ? (
            <motion.div
              key="notice"
              className={styles.notice}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.24 }}
              role="status"
            >
              <Sparkles size={13} strokeWidth={2} className={styles.noticeIcon} aria-hidden="true" />
              {notice}
            </motion.div>
          ) : (
            <motion.div key="idle" className={styles.brainStatus} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="status">
              Ask me anything. I&apos;ll route it to the right station.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form
        className={styles.brainForm}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <input
          className={styles.brainInput}
          type="text"
          value={chatValue}
          onChange={(e) => setChatValue(e.target.value)}
          placeholder="Ask LabGenie anything…"
          aria-label="Ask LabGenie"
        />
        <button type="submit" className={styles.sendBtn} aria-label="Send to LabGenie" disabled={thinking}>
          {thinking ? <span className={styles.spinnerSm} aria-hidden="true" /> : <SendHorizontal size={15} strokeWidth={2} />}
        </button>
      </form>

      <div className={styles.chips}>
        {chips.map((c) => (
          <button
            key={c.label}
            type="button"
            className={`${styles.quickChip} ${activeChip === c.label ? styles.quickChipActive : ""}`}
            onClick={() => onChip(c)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className={styles.brainFoot}>
        <span className={styles.footDot} aria-hidden="true" />
        Synced with your ERP · Checking new customer requests.
      </div>
    </div>
  );
}

/* ============================================================================
   OperationsCanvas — orchestrator (default export)
   ========================================================================== */

// Thin wrapper so "Reset the canvas" can re-mount the whole demo: dragged
// cards return home, chat/route state clears, layout re-measures.
export default function OperationsCanvas() {
  const [resetKey, setResetKey] = useState(0);
  return <CanvasInner key={resetKey} onReset={() => setResetKey((k) => k + 1)} />;
}

function CanvasInner({ onReset }) {
  const canvasRef = useRef(null);
  const nodeRef = useRef(null);
  const erpRef = useRef(null);

  const cardRefs = useRef({});
  const pathRefs = useRef({});
  const flowPathRef = useRef(null);
  const flowCircleRef = useRef(null);
  const flowRef = useRef({ id: null, module: null, reply: null, phase: null, t: 0, hold: 0 });
  const erpPathRef = useRef(null);
  const erpFlowRefs = useRef([]);
  const erpDashRef = useRef(0);
  const erpPathRefB = useRef(null);
  const erpFlowRefsB = useRef([]);
  const erpDashRefB = useRef(0);
  const initedRef = useRef(false);
  const toastTimer = useRef(null);
  const resultTimer = useRef(null);
  const noticeTimer = useRef(null);

  const [dims, setDims] = useState(null);
  const [group, setGroup] = useState("gtm");
  const [expanded, setExpanded] = useState({});
  const [chatValue, setChatValue] = useState("");
  const [routeTarget, setRouteTarget] = useState(null);
  const [hitId, setHitId] = useState(null);
  const [routeResult, setRouteResult] = useState(null);
  const [activeChip, setActiveChip] = useState(null);
  const [toast, setToast] = useState(null);
  const [thinking, setThinking] = useState(false);
  const [notice, setNotice] = useState(null);

  const visibleIds = useMemo(() => STATIONS.filter((s) => s.group === group).map((s) => s.id), [group]);

  const visibleIdsRef = useRef(visibleIds);
  useEffect(() => {
    visibleIdsRef.current = visibleIds;
  }, [visibleIds]);

  const layout = useMemo(() => {
    if (!dims) return null;
    const modCount = (id) => byId(id).modules.length;
    return buildLayout(dims.w, dims.h, visibleIds, expanded, modCount);
  }, [dims, visibleIds, expanded]);

  /* ---- measure canvas once (RAF first, ResizeObserver as backstop) ---- */
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const tryMeasure = () => {
      if (initedRef.current) return true;
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return false;
      setDims({ w, h });
      initedRef.current = true;
      return true;
    };

    // Measure synchronously across a few frames so the layout appears even when
    // a ResizeObserver doesn't fire on first paint (headless / fast hydration).
    let raf = 0;
    let tries = 0;
    const pump = () => {
      if (tryMeasure() || tries++ > 20) return;
      raf = requestAnimationFrame(pump);
    };
    pump();

    const ro = new ResizeObserver(() => tryMeasure());
    ro.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  /* ---- live wires + ERP ingestion particles + comm packet (rAF) ---- */
  useEffect(() => {
    let raf = 0;
    let running = false;

    const completeRoute = (id, module, reply) => {
      flowRef.current = { id: null, module: null, reply: null, phase: null, t: 0, hold: 0 };
      setRouteTarget(null);
      setHitId(null);
      setActiveChip(null);
      if (reply) {
        setRouteResult({ stationId: id, module, replyText: reply });
      } else {
        const res = MODULE_RESULTS[module];
        setRouteResult(res ? { stationId: id, module, ...res } : null);
      }
      clearTimeout(resultTimer.current);
      resultTimer.current = setTimeout(() => setRouteResult(null), 7500);
    };

    const tick = () => {
      const canvas = canvasRef.current;
      const brain = nodeRef.current;
      if (canvas && brain) {
        const cb = canvas.getBoundingClientRect();
        if (cb.width > 0) {
          const bb = brain.getBoundingClientRect();
          const bx = bb.right - cb.left;
          const by = bb.top - cb.top + bb.height / 2;
          const flId = flowRef.current.id;

          // brain → station wires
          visibleIdsRef.current.forEach((id) => {
            const node = cardRefs.current[id];
            const path = pathRefs.current[id];
            if (node && path) {
              const r = node.getBoundingClientRect();
              const sx = r.left - cb.left + r.width / 2;
              const sy = r.top - cb.top + r.height / 2;
              path.setAttribute("d", bezierPath(bx, by, sx, sy));
              path.style.opacity = id === flId ? "0.75" : "";
            }
          });

          // ERP ⇄ LabGenie: a two-lane conduit. The upper lane streams pulses
          // ERP → LabGenie (ingestion); the lower lane streams LabGenie → ERP
          // (write-back), so the link reads as live two-way communication.
          const erpEl = erpRef.current;
          if (erpEl && erpPathRef.current && erpPathRefB.current) {
            const er = erpEl.getBoundingClientRect();
            const ex = er.right - cb.left - 6;
            const ey = er.top - cb.top + er.height / 2;
            const blx = bb.left - cb.left;
            const bly = by;
            const OFF = 5;
            const seg = 30;

            // lane A — ERP → LabGenie (upper)
            const edA = bezierPath(ex, ey - OFF, blx, bly - OFF);
            erpPathRef.current.setAttribute("d", edA);
            const elenA = erpPathRef.current.getTotalLength();
            const cycleA = elenA + 90;
            erpDashRef.current = (erpDashRef.current + 2.3) % cycleA;
            for (let i = 0; i < ERP_PULSES; i++) {
              const fp = erpFlowRefs.current[i];
              if (!fp) continue;
              fp.setAttribute("d", edA);
              fp.setAttribute("stroke-dasharray", `${seg} ${cycleA}`);
              const phase = (erpDashRef.current + (i * cycleA) / ERP_PULSES) % cycleA;
              fp.setAttribute("stroke-dashoffset", String(elenA + seg - phase));
            }

            // lane B — LabGenie → ERP (lower), pulses travel the opposite way
            const edB = bezierPath(ex, ey + OFF, blx, bly + OFF);
            erpPathRefB.current.setAttribute("d", edB);
            const elenB = erpPathRefB.current.getTotalLength();
            const cycleB = elenB + 90;
            erpDashRefB.current = (erpDashRefB.current + 2.0) % cycleB;
            for (let i = 0; i < ERP_PULSES; i++) {
              const fp = erpFlowRefsB.current[i];
              if (!fp) continue;
              fp.setAttribute("d", edB);
              fp.setAttribute("stroke-dasharray", `${seg} ${cycleB}`);
              const phase = (erpDashRefB.current + (i * cycleB) / ERP_PULSES) % cycleB;
              fp.setAttribute("stroke-dashoffset", String(phase));
            }
          }

          // comm packet (forward → impact → return → result)
          const fl = flowRef.current;
          const node = fl.id ? cardRefs.current[fl.id] : null;
          if (fl.id && node && flowPathRef.current) {
            const r = node.getBoundingClientRect();
            const sx = r.left - cb.left + r.width / 2;
            const sy = r.top - cb.top + r.height / 2;
            flowPathRef.current.setAttribute("d", bezierPath(bx, by, sx, sy));
            const len = flowPathRef.current.getTotalLength();
            const SPEED = 0.02;

            if (fl.phase === "forward") {
              fl.t += SPEED;
              if (fl.t >= 1) {
                fl.t = 1;
                fl.phase = "hold";
                fl.hold = 0;
                setHitId(fl.id);
              }
            } else if (fl.phase === "hold") {
              fl.hold += 1;
              if (fl.hold > 26) fl.phase = "return";
            } else if (fl.phase === "return") {
              fl.t -= SPEED;
              if (fl.t <= 0) {
                fl.t = 0;
                fl.phase = "done";
                completeRoute(fl.id, fl.module, fl.reply);
              }
            }

            if (flowCircleRef.current) {
              if (fl.phase === "done") {
                flowCircleRef.current.setAttribute("opacity", "0");
              } else {
                const pt = flowPathRef.current.getPointAtLength(fl.t * len);
                flowCircleRef.current.setAttribute("cx", pt.x);
                flowCircleRef.current.setAttribute("cy", pt.y);
                flowCircleRef.current.setAttribute("opacity", "1");
              }
            }
          } else {
            if (flowCircleRef.current) flowCircleRef.current.setAttribute("opacity", "0");
            if (flowPathRef.current) flowPathRef.current.setAttribute("d", "");
          }
        }
      }
      if (running) raf = requestAnimationFrame(tick);
    };

    // Run the wire/particle loop only while the canvas is on-screen and the tab
    // is visible; otherwise it idles instead of burning frames in the background.
    let onScreen = true;
    const start = () => {
      if (running || !onScreen) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const onVis = () => (document.hidden ? stop() : start());
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        onScreen ? start() : stop();
      },
      { rootMargin: "200px" }
    );
    if (canvasRef.current) io.observe(canvasRef.current);
    document.addEventListener("visibilitychange", onVis);
    start();

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(toastTimer.current);
      clearTimeout(resultTimer.current);
      clearTimeout(noticeTimer.current);
    };
  }, []);

  /* ---- helpers ---- */
  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  };

  const showNotice = (text) => {
    setNotice(text);
    clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(null), 7000);
  };

  const selectGroup = (g) => {
    if (g === group) return;
    setGroup(g);
    setExpanded({});
  };

  const startRoute = (stationId, module, { chipLabel = null, mode = "twoway", reply = null } = {}) => {
    const st = byId(stationId);
    if (!st) return;
    if (st.group !== group) {
      setGroup(st.group);
      setExpanded({});
    }
    setRouteResult(null);
    setNotice(null);
    setActiveChip(chipLabel);
    setRouteTarget(stationId);
    if (mode === "oneway") {
      setHitId(stationId);
      flowRef.current = { id: stationId, module, reply, phase: "hold", t: 1, hold: 0 };
    } else {
      setHitId(null);
      flowRef.current = { id: stationId, module, reply, phase: "forward", t: 0, hold: 0 };
    }
    clearTimeout(resultTimer.current);
  };

  const onChatSubmit = async () => {
    const text = chatValue.trim();
    if (!text || thinking) return;
    setChatValue("");

    if (!isConversational(text)) {
      const local = localMatch(text);
      if (local) {
        startRoute(local.stationId, local.module, { mode: "twoway" });
        return;
      }
    }

    setRouteResult(null);
    setNotice(null);
    setThinking(true);
    try {
      const res = await fetch("/api/labgenie-route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text }),
      });
      const data = await res.json();
      if (data?.stationId && data?.module) {
        startRoute(data.stationId, data.module, { mode: "twoway", reply: data.reply });
      } else if (data?.error === "unconfigured") {
        // No AI key configured: fall back to instant local routing, and if the
        // phrase doesn't match a known workflow, guide the user (no dev jargon).
        const local = localMatch(text);
        if (local) startRoute(local.stationId, local.module, { mode: "twoway" });
        else showNotice('Try a workflow like "match this RFP" or "route inbound inquiries".');
      } else if (data?.reply) {
        showNotice(data.reply);
      } else {
        const local = localMatch(text);
        if (local) startRoute(local.stationId, local.module, { mode: "twoway" });
        else showToast("Couldn't reach LabGenie. Try again in a moment.");
      }
    } catch {
      const local = localMatch(text);
      if (local) startRoute(local.stationId, local.module, { mode: "twoway" });
      else showToast("Couldn't reach LabGenie. Try again in a moment.");
    } finally {
      setThinking(false);
    }
  };

  const onChip = (chip) => startRoute(chip.stationId, chip.module, { chipLabel: chip.label, mode: "twoway" });
  const onModuleRoute = (stationId, module) => startRoute(stationId, module, { mode: "oneway" });
  const toggleExpand = (id) => setExpanded((e) => ({ ...e, [id]: !e[id] }));

  const flowColor = routeTarget ? byId(routeTarget).accent : "#3378FF";

  return (
    <section id="operations" className={styles.section}>
      <div className="container-x">
        <header className={styles.header}>
          <p className={styles.eyebrow}>Operations Dashboard</p>
          <h2 className={styles.title}>One agent. Every station.</h2>
          <p className={`${styles.sub} max-[899px]:hidden`}>
            LabGenie sits on top of your ERP, reads the data, then routes any request to the right sub-agent.
            Switch teams, expand a station to fire a module, drag anything, or just ask in plain English.
          </p>
          <p className={`${styles.sub} min-[900px]:hidden`}>
            LabGenie sits on top of your ERP, reads the data, then routes any request to the right sub-agent.
            Watch it take a few requests below.
          </p>
        </header>
      </div>

      {/* ---- full-bleed interactive canvas (desktop) ---- */}
      <div className={styles.canvasFull}>
        <div className={styles.windowChrome}>
          <span className={styles.winDots} aria-hidden="true">
            <span /><span /><span />
          </span>
          <span className={styles.winTitle}>
            <span className={styles.winMark} aria-hidden="true" />
            LabGenie · Operations
          </span>
          <span className={styles.winStatus}>
            <span className={styles.winPulse} aria-hidden="true" />
            Live
          </span>
        </div>
        <div ref={canvasRef} className={styles.canvas}>
          <div className={styles.groupBar} role="group" aria-label="Filter stations by team">
            {GROUP_LIST.map((g) => {
              const { Icon } = g;
              const count = STATIONS.filter((s) => s.group === g.id).length;
              const active = group === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  aria-pressed={active}
                  aria-label={`${g.name} (${count} stations)`}
                  className={`${styles.groupBtn} ${active ? styles.groupBtnActive : ""}`}
                  onClick={() => selectGroup(g.id)}
                >
                  {active && <motion.span layoutId="groupActive" className={styles.groupActiveBg} transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                  <Icon size={15} strokeWidth={2} className={styles.groupIcon} />
                  <span className={styles.groupLabel}>{g.short}</span>
                  <span className={styles.groupCount}>{count}</span>
                </button>
              );
            })}
          </div>

          <svg className={styles.lines} aria-hidden="true">
            <defs>
              <filter id="lg-flow-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="lg-wire-glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="0.65" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="erp-conduit" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#0066ff" stopOpacity="0.1" />
                <stop offset="1" stopColor="#7db8ff" stopOpacity="0.55" />
              </linearGradient>
              <linearGradient id="erp-conduit-rev" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#5aa0ff" stopOpacity="0.55" />
                <stop offset="1" stopColor="#0066ff" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* ERP ⇄ LabGenie: two-lane conduit, opposite-flowing pulses */}
            <path ref={erpPathRef} className={styles.erpWire} fill="none" stroke="url(#erp-conduit)" filter="url(#lg-wire-glow)" />
            <path ref={erpPathRefB} className={styles.erpWire} fill="none" stroke="url(#erp-conduit-rev)" filter="url(#lg-wire-glow)" />
            {Array.from({ length: ERP_PULSES }).map((_, i) => (
              <path
                key={`a${i}`}
                ref={(el) => {
                  if (el) erpFlowRefs.current[i] = el;
                  else delete erpFlowRefs.current[i];
                }}
                className={styles.erpFlow}
                fill="none"
                strokeLinecap="round"
                filter="url(#lg-flow-glow)"
              />
            ))}
            {Array.from({ length: ERP_PULSES }).map((_, i) => (
              <path
                key={`b${i}`}
                ref={(el) => {
                  if (el) erpFlowRefsB.current[i] = el;
                  else delete erpFlowRefsB.current[i];
                }}
                className={styles.erpFlowB}
                fill="none"
                strokeLinecap="round"
                filter="url(#lg-flow-glow)"
              />
            ))}

            {/* brain → station wires */}
            {visibleIds.map((id) => {
              const st = byId(id);
              return (
                <path
                  key={id}
                  ref={(el) => {
                    if (el) pathRefs.current[id] = el;
                    else delete pathRefs.current[id];
                  }}
                  className={styles.line}
                  fill="none"
                  stroke={st.accent}
                  strokeWidth="1.25"
                  filter="url(#lg-wire-glow)"
                />
              );
            })}

            <path
              ref={flowPathRef}
              className={`${styles.flowLine} ${routeTarget ? styles.flowLineOn : ""}`}
              fill="none"
              style={{ stroke: flowColor }}
              filter="url(#lg-flow-glow)"
            />
            <circle ref={flowCircleRef} r="5" opacity="0" style={{ fill: flowColor }} filter="url(#lg-flow-glow)" />
          </svg>

          {layout && (
            <>
              <ErpSource position={layout.erp} erpRef={erpRef} />

              <AnimatePresence>
                {visibleIds.map((id) => (
                  <StationCard
                    key={id}
                    station={byId(id)}
                    modules={byId(id).modules}
                    home={layout.stations[id]}
                    expanded={!!expanded[id]}
                    processing={routeTarget === id}
                    hit={hitId === id}
                    onToggleExpand={toggleExpand}
                    onModuleRoute={onModuleRoute}
                    canvasRef={canvasRef}
                    cardRef={(el) => {
                      if (el) cardRefs.current[id] = el;
                      else delete cardRefs.current[id];
                    }}
                  />
                ))}
              </AnimatePresence>

              <LabGenieNode
                position={layout.labgenie}
                routeTarget={routeTarget}
                routeResult={routeResult}
                thinking={thinking}
                notice={notice}
                chatValue={chatValue}
                setChatValue={setChatValue}
                onSubmit={onChatSubmit}
                chips={CHIPS}
                activeChip={activeChip}
                onChip={onChip}
                onReset={onReset}
                onHelp={() =>
                  showNotice(
                    "Switch teams, expand a station to fire a module, drag cards around, or ask in plain English. Reset puts everything back."
                  )
                }
                nodeRef={nodeRef}
              />
            </>
          )}

          <AnimatePresence>
            {toast && (
              <motion.div
                key={toast}
                role="status"
                className={styles.toast}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                {toast}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ---- mobile (< 900px): auto-playing "see it work" demo ---- */}
      <div className={`container-x ${styles.mobile}`}>
        <MobileDemo />
      </div>
    </section>
  );
}
