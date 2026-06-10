"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Sales Agent screen: an inbound buyer email, then the agent drafting a reply.
// The draft body streams in character by character with a live caret, so the
// screen reads as work happening. Reduced motion shows the full draft at once.

const DRAFT =
  "Thanks for reaching out. Based on your prior order and spec history, SKU-38901 is the closest match.";

export default function SalesMockup() {
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (reduce) {
      setTyped(DRAFT);
      return;
    }
    let i = 0;
    let mode = "typing"; // typing -> holding -> restart
    let timer;
    setTyped("");
    const tick = () => {
      if (mode === "typing") {
        i += 1;
        setTyped(DRAFT.slice(0, i));
        if (i >= DRAFT.length) {
          mode = "holding";
          timer = setTimeout(tick, 2400); // hold the finished draft
          return;
        }
        timer = setTimeout(tick, 38);
      } else {
        i = 0;
        setTyped("");
        mode = "typing";
        timer = setTimeout(tick, 600); // brief blank, then redraft
      }
    };
    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [reduce]);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0e14] p-4 shadow-panel sm:p-5">
      {/* inbound email */}
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-mono text-[11px] text-text">
            <span className="text-dim">FROM&nbsp;&nbsp;</span>buyer@nomadfoods.co.uk
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-dim">Tue 10:42</span>
        </div>
        <div className="mt-1.5 font-mono text-[11px]">
          <span className="text-dim">RE&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="font-semibold text-text">Urgent, oleoresin paprika quote for Q3</span>
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-muted">
          Need 2 MT food-grade paprika oleoresin, 40k SHU equivalent, kosher certified. Previous PO
          18-2241. Please quote FOB Rotterdam, lead time under 6 weeks.
        </p>
      </div>

      {/* agent draft */}
      <div className="mt-4 rounded-xl border border-accent/30 bg-accent/[0.06] p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent-text">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Sales Agent · 05s
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
            Drafting
            <Dots />
          </span>
        </div>

        <div className="mt-3 font-mono text-[11px] text-dim">Draft · sales@yourco.com</div>
        <div className="mt-1 text-[13px] font-semibold text-text">
          Quote attached · SKU-38901 · matches 91% to PO 18-2241
        </div>
        <p className="mt-2 min-h-[2.6em] text-[13px] leading-relaxed text-muted">
          {typed}
          <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.18em] animate-pulse bg-accent align-baseline" />
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-accent px-3.5 py-1.5 text-[12px] font-semibold text-white shadow-[0_8px_30px_-12px_rgba(0,102,255,0.75)]">
              Send
            </span>
            <span className="rounded-lg border border-border-strong px-3.5 py-1.5 text-[12px] font-medium text-text">
              Edit
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
            Confidence <span className="font-semibold text-accent-text">91%</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// Three dots that pulse in sequence, the "drafting" tell.
function Dots() {
  return (
    <span className="inline-flex gap-0.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-[3px] w-[3px] rounded-full bg-dim animate-pulse"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </span>
  );
}
