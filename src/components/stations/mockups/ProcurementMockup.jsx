import { TrendingUp, Gavel } from "lucide-react";

// Procurement station mockup: a minimal price-intelligence card. One inline
// SVG line chart (cardamom spot price), a risk pill, a highlighted recommended
// buy window band, one recommendation line, one action.

// chart geometry (viewBox coordinates)
const W = 320;
const H = 120;
const PAD_L = 4;
const PAD_R = 4;
const PAD_T = 12;
const PAD_B = 16;

// 8 weekly price points (INR/kg cardamom, rising into festival demand)
const prices = [1820, 1790, 1845, 1910, 1880, 1965, 2040, 2180];
const min = Math.min(...prices);
const max = Math.max(...prices);

const x = (i) => PAD_L + (i / (prices.length - 1)) * (W - PAD_L - PAD_R);
const y = (v) =>
  PAD_T + (1 - (v - min) / (max - min)) * (H - PAD_T - PAD_B);

const points = prices.map((v, i) => [x(i), y(v)]);
const linePath = points.map(([px, py], i) => `${i === 0 ? "M" : "L"}${px.toFixed(1)} ${py.toFixed(1)}`).join(" ");
const areaPath =
  `${linePath} L${x(prices.length - 1).toFixed(1)} ${(H - PAD_B).toFixed(1)} L${x(0).toFixed(1)} ${(H - PAD_B).toFixed(1)} Z`;

// recommended buy window: between points 5 and 7 (current → before peak)
const bandX1 = x(5);
const bandX2 = x(7);

const last = points[points.length - 1];

export default function ProcurementMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-panel">
      {/* title bar */}
      <div className="flex items-center justify-between border-b border-border bg-surface-2/60 px-4 py-3">
        <span className="font-display text-sm font-semibold text-text">
          Cardamom · live market
        </span>
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          INR / kg
        </span>
      </div>

      <div className="p-5 sm:p-6">
        {/* header row: spot + risk pill */}
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <div className="mono-label mb-1 text-dim">Spot · 8E grade</div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-semibold text-text">₹2,180</span>
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-warm">
                <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                +6.9%
              </span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-warm/30 bg-warm/[0.08] px-3 py-1 font-mono text-[11px] text-warm">
            <span className="h-1.5 w-1.5 rounded-full bg-warm" />
            Risk 72 · Rising
          </span>
        </div>

        {/* chart */}
        <div className="rounded-xl border border-border bg-bg/60 p-3">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="h-auto w-full"
            preserveAspectRatio="none"
            role="img"
            aria-label="Cardamom spot price trend, rising over eight weeks with a recommended buy window"
          >
            <defs>
              <linearGradient id="proc-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0066FF" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#0066FF" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* recommended buy-window band */}
            <rect
              x={bandX1}
              y={PAD_T}
              width={bandX2 - bandX1}
              height={H - PAD_T - PAD_B}
              fill="#0066FF"
              fillOpacity="0.1"
              stroke="#0066FF"
              strokeOpacity="0.35"
              strokeDasharray="3 3"
              strokeWidth="1"
            />

            {/* area + line */}
            <path d={areaPath} fill="url(#proc-area)" />
            <path
              d={linePath}
              fill="none"
              stroke="#0066FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* last point elevated, with a live sonar ping */}
            <circle className="chart-ping" cx={last[0]} cy={last[1]} r="3" fill="#5AA0FF" aria-hidden="true" />
            <circle cx={last[0]} cy={last[1]} r="5" fill="#0066FF" fillOpacity="0.18" />
            <circle cx={last[0]} cy={last[1]} r="2.6" fill="#5AA0FF" />
          </svg>

          {/* minimal mono axis labels */}
          <div className="mt-1 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-dim">
            <span>8 wks ago</span>
            <span className="text-accent-text/80">buy window</span>
            <span>now</span>
          </div>
        </div>

        {/* recommendation */}
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-accent/25 bg-accent/[0.06] px-3.5 py-3">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <p className="text-[13px] leading-snug text-text">
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent-text">
              Buy window
            </span>
            <br />
            Next 8 days, before festival demand. Lock volume now to avoid the projected peak.
          </p>
        </div>

        {/* action */}
        <button
          type="button"
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_8px_30px_-12px_rgba(0,102,255,0.75)]"
        >
          <Gavel className="h-4 w-4" aria-hidden="true" />
          Run reverse auction
        </button>
      </div>
    </div>
  );
}
