// Official LabGenie logo — exact artwork from labgenie-ai__logo-assets.
// Mark: open arc (genie dial) in currentColor + five brand-blue spectrum dots.
// Wordmark: "labgenie" + brand-blue ".ai" set in Manrope (var(--font-brand)).

const BRAND_BLUE = "#0066FF";

export default function Logo({ className = "", showWordmark = true }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="h-7 w-7 shrink-0"
        role="img"
        aria-label="LabGenie"
      >
        <path
          d="M 66 22.29 A 32 32 0 1 0 66 77.71"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        <g fill={BRAND_BLUE}>
          <circle cx="66" cy="22.29" r="4.5" />
          <circle cx="77.71" cy="34" r="4.5" />
          <circle cx="82" cy="50" r="4.5" />
          <circle cx="77.71" cy="66" r="4.5" />
          <circle cx="66" cy="77.71" r="4.5" />
        </g>
      </svg>

      {showWordmark && (
        <span
          className="text-[19px] font-normal leading-none tracking-[-0.02em] text-text"
          style={{ fontFamily: "var(--font-brand), system-ui, sans-serif" }}
        >
          labgenie<span style={{ color: BRAND_BLUE }}>.ai</span>
        </span>
      )}
    </span>
  );
}
