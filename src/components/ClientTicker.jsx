// Infinite right-to-left marquee of customer logos. Duplicates the list so the
// CSS translateX(-50%) loop is seamless; pauses on hover. Logos are normalized
// to soft white silhouettes for a uniform, premium "trusted by" row on the dark
// surface.
const CLIENTS = [
  { name: "Synthite", file: "synthite.svg" },
  { name: "Mane Kancor", file: "mane-kancor.png" },
  { name: "Abad", file: "abad.png" },
  { name: "Choice Canning", file: "choice-canning.png" },
  { name: "Kitchen Treasures", file: "kitchen-treasures.png" },
  { name: "Arab India Spices", file: "arab-india-spices.png" },
  { name: "Nandu's", file: "nandus.png" },
  { name: "Nellara", file: "nellara.png" },
  { name: "Mercely", file: "mercely.png" },
];

export default function ClientTicker({ label = "Building with F&B manufacturers across the industry" }) {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <section className="border-y border-border bg-bg-elev/40 py-10">
      <div className="container-x">
        <p className="mb-7 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-dim">
          {label}
        </p>
        <div className="marquee-mask group relative">
          <div className="marquee-track items-center gap-14 group-hover:[animation-play-state:paused]">
            {row.map((c, i) => (
              <img
                key={`${c.name}-${i}`}
                src={`/logos/clients/${c.file}`}
                alt={c.name}
                loading="lazy"
                className="h-8 w-auto max-w-[150px] shrink-0 object-contain opacity-65 transition-opacity duration-300 hover:opacity-100 [filter:brightness(0)_invert(1)]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
