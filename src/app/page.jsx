import Hero from "@/components/Hero";
import Problem from "@/components/sections/Problem";
import ProductVision from "@/components/sections/ProductVision";
import OperationsCanvas from "@/components/OperationsCanvas/OperationsCanvas";
import Differentiation from "@/components/sections/Differentiation";
import SocialProof from "@/components/sections/SocialProof";
import ClosingCTA from "@/components/sections/ClosingCTA";

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
      <ClosingCTA />
    </>
  );
}
