/**
 * ComplianceBadge
 * -----------------------------------------------------------------------------
 * A crafted, ORIGINAL trust-seal medallion drawn as inline SVG. This is our own
 * visual treatment, never an official trademarked certification seal (AICPA SOC,
 * ISO, etc.). It pairs with the honest status tag rendered alongside it.
 *
 * Treatment: concentric hairline rings, a fine notched/guilloche edge of ticks,
 * a subtle radial sheen in brand blue, and the standard's short monogram in
 * mono/condensed type at the center, with a small lucide glyph below it.
 *
 * "Aligned" (active) seals read brighter; "in progress" seals are slightly
 * desaturated. Meaning is never carried by color alone: the text status tag and
 * its dot remain the source of truth.
 */
export default function ComplianceBadge({ monogram, Icon, dim = false }) {
  // Unique-enough gradient ids derived from the monogram (no client hook needed,
  // so the server page can pass the lucide Icon component as a prop).
  const uid = String(monogram).replace(/[^a-zA-Z0-9]/g, "");
  const sheenId = `cb-sheen-${uid}`;
  const ringId = `cb-ring-${uid}`;

  // 48 evenly spaced edge ticks form the fine notched / guilloche border.
  const ticks = Array.from({ length: 48 }, (_, i) => (i / 48) * Math.PI * 2);
  const cx = 50;
  const cy = 50;
  const tickOuter = 46;
  const tickInner = 42.5;

  return (
    <span
      className={`relative inline-flex h-20 w-20 items-center justify-center transition-opacity duration-300 ${
        dim ? "opacity-[0.62]" : "opacity-100"
      }`}
    >
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full text-accent"
        aria-hidden="true"
      >
        <defs>
          {/* Subtle radial sheen in brand blue, brightest toward the top. */}
          <radialGradient id={sheenId} cx="50%" cy="34%" r="68%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.26" />
            <stop offset="48%" stopColor="currentColor" stopOpacity="0.08" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={ringId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.55" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.22" />
          </linearGradient>
        </defs>

        {/* Sheen fill behind the rings */}
        <circle cx={cx} cy={cy} r="47" fill={`url(#${sheenId})`} />

        {/* Concentric hairline rings */}
        <circle
          cx={cx}
          cy={cy}
          r="47"
          fill="none"
          stroke={`url(#${ringId})`}
          strokeWidth="1"
        />
        <circle
          cx={cx}
          cy={cy}
          r="39.5"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.32"
          strokeWidth="0.75"
        />
        <circle
          cx={cx}
          cy={cy}
          r="30"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeWidth="0.75"
        />

        {/* Fine notched / guilloche edge ticks between the two outer rings */}
        <g stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.75">
          {ticks.map((a, i) => {
            const sin = Math.sin(a);
            const cos = Math.cos(a);
            return (
              <line
                key={i}
                x1={(cx + tickInner * sin).toFixed(2)}
                y1={(cy - tickInner * cos).toFixed(2)}
                x2={(cx + tickOuter * sin).toFixed(2)}
                y2={(cy - tickOuter * cos).toFixed(2)}
              />
            );
          })}
        </g>
      </svg>

      {/* Center label: monogram + glyph, layered over the medallion */}
      <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-0.5">
        <span
          className={`font-mono text-[11px] font-medium uppercase leading-none tracking-[0.04em] ${
            dim ? "text-text/90" : "text-text"
          }`}
        >
          {monogram}
        </span>
        <Icon
          aria-hidden="true"
          className="h-3.5 w-3.5 text-accent"
          strokeWidth={1.6}
        />
      </span>
    </span>
  );
}
