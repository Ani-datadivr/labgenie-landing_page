// Inline brand logo sized to the surrounding text. tone="light" (default)
// renders a white silhouette for the ink surface; tone="dark" keeps it dark for
// light surfaces. Used wherever a partner is named so the brand is shown, not
// just spelled out. (mane.svg / mccormick.svg / intergrow.svg are clean
// placeholder wordmarks — swap in official artwork when available.)
export default function BrandMark({ src, alt, className = "", tone = "light" }) {
  const filter = tone === "dark" ? "[filter:brightness(0)]" : "[filter:brightness(0)_invert(1)]";
  return (
    <img
      src={src}
      alt={alt}
      className={`inline-block w-auto translate-y-[0.06em] select-none ${filter} ${className}`}
    />
  );
}
