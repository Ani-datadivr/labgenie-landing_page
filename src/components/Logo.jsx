// Placeholder wordmark — swap for the official brand logo (drop an SVG in /public
// and replace the mark below). Uses currentColor so it inherits text color.

export default function Logo({ className = "", showWordmark = true }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative inline-flex h-7 w-7 items-center justify-center">
        <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
          <defs>
            <linearGradient id="lg-mark" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--accent)" />
              <stop offset="1" stopColor="var(--accent-2)" />
            </linearGradient>
          </defs>
          <rect x="1.5" y="1.5" width="29" height="29" rx="8" stroke="url(#lg-mark)" strokeWidth="1.5" fill="rgba(60,231,192,0.06)" />
          {/* three converging spec lines -> single point */}
          <path d="M8 11 H16" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M8 16 H20" stroke="var(--accent-2)" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M8 21 H16" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
          <circle cx="23" cy="16" r="2.4" fill="url(#lg-mark)" />
        </svg>
      </span>
      {showWordmark && (
        <span className="font-display text-[17px] font-semibold tracking-tight text-text">
          Lab<span className="text-accent">Genie</span>
        </span>
      )}
    </span>
  );
}
