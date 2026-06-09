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
    name: "Quality Agent",
    status: "Live",
    headline: "RFP specification matching",
    body: "The Quality Agent matches customer RFP specifications against your product information sheets in minutes. A two-day review becomes a five-minute task.",
    points: [
      "Instantly compare customer specs against your full product catalog",
      "Surface non-conformities and gaps before they reach the customer",
      "Free senior QC staff from routine document work for higher-value decisions",
    ],
    Mockup: QaMockup,
  },
  {
    name: "Sales Agent",
    status: "Live",
    headline: "Intelligent sales response",
    body: "Match inbound customer queries to the right SKUs using your full ERP history, in minutes.",
    points: [
      "Parse unstructured customer emails and extract product requirements",
      "Match queries against full ERP history with confidence scores",
      "Hand off between sales and quality teams without losing context",
    ],
    Mockup: SalesMockup,
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
      <section className="container-x pb-10 pt-32 sm:pt-36 lg:pt-44">
        <div className="flex items-center justify-between pb-5">
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

      <section className="container-x">
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
