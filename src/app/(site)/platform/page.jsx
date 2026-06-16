import dynamic from "next/dynamic";
import StationFeature from "@/components/stations/StationFeature";
import FinalCTA from "@/components/FinalCTA";
import { readSections, isVisible, buildMetadata } from "@/lib/cms";

// Heaviest interactive component (graph logic + framer + icon set). Its own chunk
// so it doesn't weigh down the rest of the platform page; still SSR'd.
const OperationsCanvas = dynamic(() => import("@/components/OperationsCanvas/OperationsCanvas"));
import QaMockup from "@/components/stations/mockups/QaMockup";
import SalesMockup from "@/components/stations/mockups/SalesMockup";
import ProcurementMockup from "@/components/stations/mockups/ProcurementMockup";
import ProductionMockup from "@/components/stations/mockups/ProductionMockup";
import FormulationMockup from "@/components/stations/mockups/FormulationMockup";
import MarketIntelMockup from "@/components/stations/mockups/MarketIntelMockup";

// Station visuals stay in code, matched to the CMS stations by order. If an
// editor adds a station beyond these, it simply renders without a mockup.
const MOCKUPS = [
  QaMockup,
  SalesMockup,
  ProcurementMockup,
  ProductionMockup,
  FormulationMockup,
  MarketIntelMockup,
];

const DEFAULT_STATIONS = [
  {
    name: "Quality Agent",
    status: "Live",
    headline: "RFP specification matching",
    body: "Customer specs come in. LabGenie reads them, matches them against your product sheets, and flags what doesn't fit.",
    points: [
      "Matches RFP specs against your entire product catalog automatically",
      "Catches non-conformities and gaps before they reach the customer",
      "What used to take your QC team two days now takes five minutes",
    ],
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
  },
  {
    name: "Procurement",
    status: "In build",
    headline: "Buy smarter on volatile inputs.",
    body: "Live price feeds, demand signals, and forward risk scores on spices, oleoresins, and naturals. Reverse auctions run directly over WhatsApp and email.",
  },
  {
    name: "Production",
    status: "In build",
    headline: "Connect demand to the factory floor.",
    body: "Shift planning, one shared production plan, and live equipment-effectiveness visibility, so what sales commits and what the plant delivers are finally the same number.",
  },
  {
    name: "Formulation",
    status: "In build",
    headline: "Protect your formulation IP.",
    body: "Reverse engineer formulations, capture reformulation reasoning, and track samples to commercial conversion. Your flavorists' knowledge stays in the system.",
  },
  {
    name: "Market Intelligence",
    status: "Roadmap",
    headline: "Know what's coming before your competition does.",
    body: "Trend signals, competitive tracking, and ingredient market shifts, surfaced automatically as a morning briefing instead of a data dump.",
  },
];

const SEO_FALLBACK = {
  title: "Platform",
  description:
    "An AI agent across every operational station: quality, sales, procurement, production, formulation, and market intelligence. LabGenie reads your specs and acts on them, on top of the ERP you already run.",
};

export async function generateMetadata() {
  const { platformIntro } = await readSections(["platformIntro"]);
  return buildMetadata(platformIntro?.seo, {
    fallbackTitle: SEO_FALLBACK.title,
    fallbackDescription: SEO_FALLBACK.description,
  });
}

export default async function PlatformPage() {
  const { platformIntro, platformStations, platformCta } = await readSections([
    "platformIntro",
    "platformStations",
    "platformCta",
  ]);

  const stations =
    platformStations?.items?.length ? platformStations.items : DEFAULT_STATIONS;

  return (
    <>
      {/* Hero: the live operations console — "One agent. Every station." */}
      <OperationsCanvas title={platformIntro?.title} sub={platformIntro?.sub} />

      {isVisible(platformStations) && (
        <section className="container-x">
          {stations.map((s, i) => {
            const Mockup = MOCKUPS[i];
            return (
              <StationFeature
                key={s.name || i}
                name={s.name}
                status={s.status}
                headline={s.headline}
                body={s.body}
                points={s.points?.length ? s.points : undefined}
              >
                {Mockup ? <Mockup /> : null}
              </StationFeature>
            );
          })}
        </section>
      )}

      {isVisible(platformCta) && (
        <FinalCTA
          eyebrow={platformCta?.eyebrow || "Get started"}
          title={platformCta?.title || "See every station working on your data."}
          sub={platformCta?.sub ?? ""}
        />
      )}
    </>
  );
}
