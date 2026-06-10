"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

// The shader is heavy and WebGL-only, so it loads lazily client-side.
const GrainGradient = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.GrainGradient),
  { ssr: false },
);

// Brand-recolored grain gradient. The reference palette was orange/yellow/pink;
// the LabGenie guideline is brand blue on ink, so this runs three brand blues
// (accent #0066FF, azure #5AA0FF, a deep blue for depth) over the ink
// background. Frozen under prefers-reduced-motion.
export default function GradientBackground({ className = "" }) {
  const reduce = useReducedMotion();
  return (
    <div className={className}>
      <GrainGradient
        style={{ height: "100%", width: "100%" }}
        colorBack="hsl(214, 33%, 8%)"
        softness={0.76}
        intensity={0.42}
        noise={0}
        shape="corners"
        offsetX={0}
        offsetY={0}
        scale={1}
        rotation={0}
        speed={reduce ? 0 : 1}
        colors={["hsl(216, 100%, 50%)", "hsl(214, 100%, 68%)", "hsl(218, 85%, 30%)"]}
      />
    </div>
  );
}
