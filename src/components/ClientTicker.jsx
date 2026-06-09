// Infinite right-to-left marquee of the partners we've built for. On-brand dark
// cards: each logo sits as a soft white silhouette at rest, and on hover the
// card lightens to white and the logo resolves to its real color. Two stacked
// layers make this work for every asset, including the white-background Mane
// webp (its transparent mark is used for the rest silhouette, the color webp for
// the hover reveal). The row fades at both ends (marquee-mask) and pauses on
// hover. Verified company links open in a new tab.
//   big  — square/portrait marks get a larger size cap
//   rest — silhouette source override when `file` can't be inverted cleanly
const PARTNERS = [
  { name: "Synthite", file: "synthite.svg", url: "https://www.synthite.com" },
  { name: "Mane Kancor", file: "mane.webp", rest: "mane-mark.png", url: "https://manekancor.com", big: true },
  { name: "McCormick", file: "mccormick.png", url: "https://avtmccormick.com", big: true },
  { name: "Abad", file: "abad.png", url: "https://www.abad.in" },
  { name: "Choice Canning", file: "choice-canning.png", url: "https://www.choicecanning.com" },
  { name: "Kitchen Treasures", file: "kitchen-treasures.png", url: "https://www.kitchentreasures.in" },
  { name: "Arab India Spices", file: "arab-india-spices.png", url: "https://www.arabindiaspices.com" },
  { name: "Nandu's", file: "nandus.png", url: "https://www.nandus.in" },
  { name: "Intergrow", file: "intergrow.svg", url: "https://www.intergrowbrands.com" },
  { name: "Mercely", file: "mercely.png", url: "https://mercelys.com" },
];

function Chip({ name, file, rest, big }) {
  const sz = big ? "max-h-[62px] max-w-[152px]" : "max-h-[46px] max-w-[140px]";
  return (
    <span className="grid place-items-center">
      {/* rest: white silhouette on the dark card */}
      <img
        src={`/logos/clients/${rest || file}`}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className={`col-start-1 row-start-1 w-auto object-contain opacity-65 [filter:brightness(0)_invert(1)] transition-opacity duration-300 group-hover/chip:opacity-0 ${sz}`}
      />
      {/* hover: real color on the lightened card */}
      <img
        src={`/logos/clients/${file}`}
        alt={name}
        loading="lazy"
        className={`col-start-1 row-start-1 w-auto object-contain opacity-0 transition-opacity duration-300 group-hover/chip:opacity-100 ${sz}`}
      />
    </span>
  );
}

export default function ClientTicker({ label = "Partners we've built for" }) {
  const row = [...PARTNERS, ...PARTNERS];
  const chip =
    "group/chip flex h-20 w-[200px] shrink-0 items-center justify-center rounded-2xl border border-border bg-surface/70 px-6 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-white hover:shadow-[0_16px_44px_-20px_rgba(0,102,255,0.55)]";

  return (
    <section className="py-12">
      <div className="container-x">
        <p className="mb-8 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-dim">
          {label}
        </p>
      </div>
      <div className="marquee-mask group relative">
        <div className="marquee-track items-center gap-5 group-hover:[animation-play-state:paused]">
          {row.map((c, i) =>
            c.url ? (
              <a
                key={`${c.name}-${i}`}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${c.name} (opens in a new tab)`}
                className={chip}
              >
                <Chip name={c.name} file={c.file} rest={c.rest} big={c.big} />
              </a>
            ) : (
              <div key={`${c.name}-${i}`} className={chip} role="img" aria-label={c.name}>
                <Chip name={c.name} file={c.file} rest={c.rest} big={c.big} />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
