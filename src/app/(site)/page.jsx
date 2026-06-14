import Hero from "@/components/Hero";
import Problem from "@/components/sections/Problem";
import ProductVision from "@/components/sections/ProductVision";
import Differentiation from "@/components/sections/Differentiation";
import ProofShowcase from "@/components/sections/ProofShowcase";
import Faq from "@/components/sections/Faq";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { getHomeHero, getFaqs } from "@/lib/cms";

// The homepage builds credibility section by section: the pain, the platform
// vision, the lineage that earns the technical buyer, then one combined proof
// showcase (Synthite + Mane Kancor). The interactive Operations Canvas now lives
// on /platform, where the station detail is.
//
// Hero + FAQ copy is read (server-side) from Keystatic-managed content and
// passed down; everything else still renders its built-in copy for now.
export default async function HomePage() {
  const [hero, faqs] = await Promise.all([getHomeHero(), getFaqs()]);
  return (
    <>
      <Hero copy={hero} />
      <Problem />
      <ProductVision />
      <Differentiation />
      <ProofShowcase />
      <Faq items={faqs} />
      <ClosingCTA />
    </>
  );
}
