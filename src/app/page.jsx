import Hero from "@/components/Hero";
import Problem from "@/components/sections/Problem";
import ProductVision from "@/components/sections/ProductVision";
import OperationsCanvas from "@/components/OperationsCanvas/OperationsCanvas";
import Differentiation from "@/components/sections/Differentiation";
import SocialProof from "@/components/sections/SocialProof";
import Faq from "@/components/sections/Faq";
import ClosingCTA from "@/components/sections/ClosingCTA";

// Distilled to two product moments: a compact station map for scope, then the
// interactive Operations Canvas as the one full "see it work" proof. (The pinned
// OperationsStory was retired here to cut redundancy and the scroll-jacking;
// its per-station story now lives on /platform.)
export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <ProductVision />
      {/* See it live: the platform working across stations */}
      <OperationsCanvas />
      <Differentiation />
      <SocialProof />
      <Faq />
      <ClosingCTA />
    </>
  );
}
