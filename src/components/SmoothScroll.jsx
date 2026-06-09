"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";

// Inertial smooth scrolling (the buttery feel and the single continuous scroll
// surface). Lenis drives the real document scroll, so framer-motion's useScroll
// still tracks progress and the pinned section pins normally. Anchor links are
// handled by Lenis. Fully disabled under prefers-reduced-motion.
export default function SmoothScroll({ children }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        anchors: { offset: -80 },
      }}
    >
      <LenisBridge />
      {children}
    </ReactLenis>
  );
}

// Exposes the live Lenis instance on window for programmatic scrolling
// (anchor jumps, "back to top", etc.).
function LenisBridge() {
  const lenis = useLenis();
  useEffect(() => {
    if (lenis) window.lenis = lenis;
  }, [lenis]);
  return null;
}
