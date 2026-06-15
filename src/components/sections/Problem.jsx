import { Beaker, Inbox, LineChart } from "lucide-react";
import ScrollRevealText from "../ScrollRevealText";
import CountUp from "../CountUp";
import Reveal, { Stagger, StaggerItem } from "../Reveal";

// The pain, stated before the product appears. Stark numbers, muted icons, no
// screenshots. Dark surface (brand-committed) kept stark so the numbers land.
// Text is editable via Keystatic (singleton "problem"); icons stay in code,
// mapped to each card by position.
const ICONS = [Beaker, Inbox, LineChart];

const DEFAULTS = {
  title: "Your ERP stores the data. Your team still does the work by hand.",
  cards: [
    { area: "Quality", stat: "1.5–2 days", body: "Per request. Matching each customer spec against your product information sheets, by hand." },
    { area: "Sales", countTo: 1000, countSuffix: "+ requests", body: "Manually sorted. Slowly routed. Most never reach the lab in time." },
    { area: "Procurement", stat: "Volatile inputs", body: "No live prices. Buying decisions on spices and oleoresins made on gut feel." },
  ],
  closing: "This is the gap between your ERP and your operation. LabGenie closes it.",
};

export default function Problem({ copy }) {
  const c = { ...DEFAULTS, ...(copy || {}) };
  const cards = c.cards?.length ? c.cards : DEFAULTS.cards;

  return (
    <section className="container-x py-20 lg:py-28">
      <Reveal as="h2" variant="blur" className="max-w-4xl text-4xl leading-[1.06] sm:text-5xl lg:text-[3.2rem]">
        {c.title}
      </Reveal>

      <Stagger gap={0.12} className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
        {cards.map(({ area, stat, countTo, countSuffix, body }, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <StaggerItem key={area || i} variant="scale" className="group bg-bg p-7 transition-colors duration-300 hover:bg-surface/40 lg:p-8">
              <Icon size={22} strokeWidth={1.5} className="text-dim transition-colors duration-300 group-hover:text-accent" aria-hidden="true" />
              <div className="mono-label mt-6">{area}</div>
              <div className="mt-2 font-display text-3xl font-semibold tracking-tight text-text">
                {countTo ? <CountUp to={countTo} suffix={countSuffix} /> : stat}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
            </StaggerItem>
          );
        })}
      </Stagger>

      <ScrollRevealText
        as="p"
        className="mx-auto mt-16 max-w-3xl text-center font-display text-2xl font-medium leading-snug tracking-tight text-text sm:text-3xl"
      >
        {c.closing}
      </ScrollRevealText>
    </section>
  );
}
