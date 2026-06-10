import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Problem from "@/components/sections/Problem";
import ProductVision from "@/components/sections/ProductVision";
import Differentiation from "@/components/sections/Differentiation";

// Heaviest below-the-fold component (graph logic + framer + icon set). Split it
// into its own chunk so it doesn't weigh down initial hydration; still SSR'd.
const OperationsCanvas = dynamic(() => import("@/components/OperationsCanvas/OperationsCanvas"));
import SocialProof from "@/components/sections/SocialProof";
import Faq from "@/components/sections/Faq";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { getHomeHero, getFaqs } from "@/lib/cms";

// Distilled to two product moments: a compact station map for scope, then the
// interactive Operations Canvas as the one full "see it work" proof. (The pinned
// OperationsStory was retired here to cut redundancy and the scroll-jacking;
// its per-station story now lives on /platform.)
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
      {/* See it live: the platform working across stations */}
      <OperationsCanvas />
      <Differentiation />
      <SocialProof />
      <Faq items={faqs} />
      <ClosingCTA />
    </>
  );
}
