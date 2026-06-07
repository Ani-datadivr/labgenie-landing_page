import { Beaker, Inbox, LineChart } from "lucide-react";
import ScrollRevealText from "../ScrollRevealText";

// The pain, stated before the product appears. Stark numbers, muted icons, no
// screenshots. Dark surface (brand-committed) kept stark so the numbers land.
const CARDS = [
  {
    icon: Beaker,
    area: "Quality",
    stat: "3–5 days",
    body: "Per batch. Just to check quality certificates against internal and customer specs.",
  },
  {
    icon: Inbox,
    area: "Sales",
    stat: "Thousands of requests",
    body: "Manually sorted. Slowly routed. Most never reach the lab in time.",
  },
  {
    icon: LineChart,
    area: "Procurement",
    stat: "Volatile inputs",
    body: "No live prices. Buying decisions on spices and oleoresins made on gut feel.",
  },
];

export default function Problem() {
  return (
    <section className="container-x grid-frame border-t border-border py-20 lg:py-28">
      <h2 className="max-w-4xl text-4xl leading-[1.06] sm:text-5xl lg:text-[3.2rem]">
        Your ERP stores the data. Your team still does the work by hand.
      </h2>

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
        {CARDS.map(({ icon: Icon, area, stat, body }) => (
          <div key={area} className="bg-bg p-7 lg:p-8">
            <Icon size={22} strokeWidth={1.5} className="text-dim" aria-hidden="true" />
            <div className="mono-label mt-6">{area}</div>
            <div className="mt-2 font-display text-3xl font-semibold tracking-tight text-text">
              {stat}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
          </div>
        ))}
      </div>

      <ScrollRevealText
        as="p"
        className="mx-auto mt-16 max-w-3xl text-center font-display text-2xl font-medium leading-snug tracking-tight text-text sm:text-3xl"
      >
        This is the gap between your ERP and your operation. LabGenie closes it.
      </ScrollRevealText>
    </section>
  );
}
