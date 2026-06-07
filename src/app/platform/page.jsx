import StationFeature from "@/components/stations/StationFeature";
import StationMap from "@/components/StationMap";
import FinalCTA from "@/components/FinalCTA";
import QaMockup from "@/components/stations/mockups/QaMockup";
import SalesMockup from "@/components/stations/mockups/SalesMockup";
import ProcurementMockup from "@/components/stations/mockups/ProcurementMockup";
import ProductionMockup from "@/components/stations/mockups/ProductionMockup";
import FormulationMockup from "@/components/stations/mockups/FormulationMockup";
import MarketIntelMockup from "@/components/stations/mockups/MarketIntelMockup";

export const metadata = {
  title: "Platform",
  description:
    "An AI agent across every operational station: quality, sales, procurement, production, formulation, and market intelligence. LabGenie reads your specs and acts on them, on top of the ERP you already run.",
};

const STATIONS = [
  {
    name: "Quality Assurance",
    status: "Live",
    headline: "Match every customer RFP to what you already make.",
    body: "A customer sends an RFP or spec sheet in their own format. LabGenie compares it line by line against the product information (PI sheets) already in your ERP, and shows exactly where you comply and where you diverge. A compliance check that took your team days takes minutes.",
    Mockup: QaMockup,
    flip: false,
  },
  {
    name: "Sales",
    status: "Live",
    headline: "Turn inquiry overload into a pipeline.",
    body: "Every incoming customer request gets sorted, qualified, and routed instantly. LabGenie matches the customer's specs against your existing catalog before anyone touches the lab.",
    Mockup: SalesMockup,
    flip: true,
  },
  {
    name: "Procurement",
    status: "In build",
    headline: "Buy smarter on volatile inputs.",
    body: "Live price feeds, demand signals, and forward risk scores on spices, oleoresins, and naturals. Reverse auctions run directly over WhatsApp and email.",
    Mockup: ProcurementMockup,
    flip: false,
  },
  {
    name: "Production",
    status: "In build",
    headline: "Connect demand to the factory floor.",
    body: "Shift planning, one shared production plan, and live equipment-effectiveness visibility, so what sales commits and what the plant delivers are finally the same number.",
    Mockup: ProductionMockup,
    flip: true,
  },
  {
    name: "Formulation",
    status: "In build",
    headline: "Protect your formulation IP.",
    body: "Reverse engineer formulations, capture reformulation reasoning, and track samples to commercial conversion. Your flavorists' knowledge stays in the system.",
    Mockup: FormulationMockup,
    flip: false,
  },
  {
    name: "Market Intelligence",
    status: "Roadmap",
    headline: "Know what's coming before your competition does.",
    body: "Trend signals, competitive tracking, and ingredient market shifts, surfaced automatically as a morning briefing instead of a data dump.",
    Mockup: MarketIntelMockup,
    flip: true,
  },
];

export default function PlatformPage() {
  return (
    <>
      <section className="container-x grid-frame pb-10 pt-32 sm:pt-36 lg:pt-44">
        <div className="flex items-center justify-between border-b border-border pb-5">
          <span className="kicker kicker-accent">
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-accent" />
            The platform
          </span>
          <span className="mono-label hidden sm:block">GTM · Factory · Innovation</span>
        </div>

        <div className="max-w-3xl pt-12">
          <h1 className="display">Every station. One operating layer.</h1>
          <p className="lead mt-6">
            LabGenie puts an AI agent across every operational station, reading your specs and acting
            on them, on top of the ERP you already run.
          </p>
        </div>

        <div className="mt-12">
          <StationMap />
        </div>
      </section>

      <section className="container-x grid-frame">
        {STATIONS.map(({ Mockup, ...s }) => (
          <StationFeature key={s.name} {...s}>
            <Mockup />
          </StationFeature>
        ))}
      </section>

      <FinalCTA
        eyebrow="Get started"
        title="See every station working on your data."
        sub="Start with one workflow, quality or sales, and watch LabGenie run on top of the ERP you already use within weeks."
      />
    </>
  );
}
