"use client";

import { MotionConfig } from "framer-motion";

// Globally honor the user's OS-level reduced-motion preference for all
// Framer Motion animations.
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
