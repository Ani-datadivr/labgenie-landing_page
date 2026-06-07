// Shared section opener in the structural language: optional mono kicker + a
// confident title + optional lead. Used across the rebuilt homepage.
export default function SectionHeader({ kicker, title, sub, align = "left", className = "" }) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-3xl"} ${className}`}>
      {kicker && (
        <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
          <span className="h-px w-7 bg-accent/60" />
          <span className="kicker kicker-accent">{kicker}</span>
        </div>
      )}
      <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.75rem]">{title}</h2>
      {sub && <p className={`lead mt-4 ${centered ? "mx-auto" : ""}`}>{sub}</p>}
    </div>
  );
}
