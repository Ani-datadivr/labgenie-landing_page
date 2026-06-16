"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// The breadth of F&B categories LabGenie has worked across. The type cycles at
// the END of the sentence so nothing follows it: the slot is left-anchored and
// short words simply end early, with no reserved gap mid-line. Reduced-motion
// users get a static umbrella phrase. Copy is editable via Keystatic (singleton
// "mfSegments"); these defaults keep it working if a field is blank.
const DEFAULT_LEAD = "Years of domain knowledge with manufacturers of";
const DEFAULT_UMBRELLA = "food & beverage";
const DEFAULT_TYPES = [
  "Flavors",
  "Spices",
  "Oleoresins",
  "Specialty ingredients",
  "Dairy",
  "Beverages",
  "Baked goods",
  "Confectionery",
  "Nutraceuticals",
  "Snacks",
  "Seasonings",
  "Sauces & condiments",
  "Plant-based proteins",
];

export default function RotatingSegments({ leadIn, umbrella, segments }) {
  const lead = leadIn || DEFAULT_LEAD;
  const fallbackWord = umbrella || DEFAULT_UMBRELLA;
  const TYPES = segments?.length ? segments : DEFAULT_TYPES;
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return undefined;
    const id = setTimeout(() => setIndex((i) => (i + 1) % TYPES.length), 1600);
    return () => clearTimeout(id);
  }, [index, reduce, TYPES.length]);

  if (reduce) {
    return (
      <p className="font-display text-2xl leading-tight tracking-tight text-muted sm:text-3xl">
        {lead}{" "}
        <span className="font-semibold text-accent-text">{fallbackWord}</span>.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-x-2 font-display text-2xl leading-tight tracking-tight sm:text-3xl">
      <span className="text-muted">{lead}</span>
      {/* Last element: left-anchored grid slot. All words share one cell so it
          sizes to the widest and never reflows; overflow clips the spring. */}
      <span className="relative grid h-[1.25em] items-center justify-items-start overflow-hidden">
        {TYPES.map((type, i) => (
          <motion.span
            key={type}
            className="col-start-1 row-start-1 whitespace-nowrap font-semibold leading-none text-accent-text"
            initial={false}
            animate={
              index === i
                ? { y: "0%", opacity: 1 }
                : { y: index > i ? "-115%" : "115%", opacity: 0 }
            }
            transition={{ type: "spring", stiffness: 90, damping: 18 }}
            aria-hidden={index === i ? undefined : "true"}
          >
            {type}
          </motion.span>
        ))}
      </span>
    </div>
  );
}
