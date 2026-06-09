// Inline Synthite wordmark, sized to the surrounding text and rendered as a
// light silhouette so it reads on the ink surface. Use wherever the brand name
// Synthite appears so the partner is shown, not just named.
// tone="light" (default) renders a white silhouette for the dark ink surface;
// tone="dark" keeps the mark dark for the one light proof card.
export default function SynthiteMark({ className = "", tone = "light" }) {
  const filter = tone === "dark" ? "[filter:brightness(0)]" : "[filter:brightness(0)_invert(1)]";
  return (
    <img
      src="/logos/clients/synthite.svg"
      alt="Synthite"
      className={`inline-block w-auto translate-y-[0.06em] select-none ${filter} ${className}`}
    />
  );
}
