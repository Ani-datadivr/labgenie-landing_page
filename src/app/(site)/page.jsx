import Hero from "@/components/Hero";
import Problem from "@/components/sections/Problem";
import ProductVision from "@/components/sections/ProductVision";
import Differentiation from "@/components/sections/Differentiation";
import ProofShowcase from "@/components/sections/ProofShowcase";
import Faq from "@/components/sections/Faq";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { readSections, isVisible, buildMetadata } from "@/lib/cms";

const SECTIONS = [
  "home",
  "problem",
  "productVision",
  "differentiation",
  "proofShowcase",
  "faqs",
  "closingCta",
];

// Per-page SEO from the Hero section's `seo` field; blank falls back to the
// site-wide default in the root layout (absolute title, no "· LabGenie" suffix).
export async function generateMetadata() {
  const { home } = await readSections(["home"]);
  return buildMetadata(home?.seo, { absoluteTitle: true });
}

// The homepage builds credibility section by section: the pain, the platform
// vision, the lineage that earns the technical buyer, then one combined proof
// showcase. Every section's copy is read (server-side) from Keystatic and each
// renders only when its "Show on the website" toggle is on.
export default async function HomePage() {
  const s = await readSections(SECTIONS);
  return (
    <>
      {isVisible(s.home) && <Hero copy={s.home} />}
      {isVisible(s.problem) && <Problem copy={s.problem} />}
      {isVisible(s.productVision) && <ProductVision copy={s.productVision} />}
      {isVisible(s.differentiation) && <Differentiation copy={s.differentiation} />}
      {isVisible(s.proofShowcase) && <ProofShowcase copy={s.proofShowcase} />}
      {isVisible(s.faqs) && <Faq items={s.faqs?.items} />}
      {isVisible(s.closingCta) && <ClosingCTA copy={s.closingCta} />}
    </>
  );
}
