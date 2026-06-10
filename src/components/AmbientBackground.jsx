"use client";

import { useEffect, useRef } from "react";

// Living backdrop: drifting aurora light, two slow sweeping light beams, a
// rotating conic sheen, and fine grain. Premium and alive without competing
// with content. Frozen to a static composition under prefers-reduced-motion.
//
// This layer is fixed full-viewport, so it's always visible while the tab is
// focused — but its six large blurred layers keep compositing on the GPU even
// when the tab is backgrounded. We pause every animation on `visibilitychange`
// so a hidden tab costs nothing; resume is instant and visually identical.
export default function AmbientBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sync = () => el.classList.toggle("lg-paused", document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* drifting aurora blobs */}
      <div className="lg-aurora lg-aurora-a" />
      <div className="lg-aurora lg-aurora-b" />
      <div className="lg-aurora lg-aurora-c" />

      {/* sweeping light beams */}
      <div className="lg-beam lg-beam-1" />
      <div className="lg-beam lg-beam-2" />

      {/* rotating conic sheen */}
      <div className="lg-sheen" />

      {/* fine grain */}
      <div
        className="lg-grain absolute inset-0 opacity-[0.045] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* settle to base ink toward the bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />

      <style>{`
        .lg-aurora {
          position: absolute;
          border-radius: 9999px;
          filter: blur(120px);
          will-change: transform;
          opacity: 0.55;
        }
        .lg-aurora-a {
          top: -16%; left: 6%;
          width: 48vw; height: 48vw; max-width: 760px; max-height: 760px;
          background: radial-gradient(circle at center, rgba(0,102,255,0.6), transparent 70%);
          animation: lg-drift-a 24s ease-in-out infinite alternate;
        }
        .lg-aurora-b {
          top: -8%; right: 0%;
          width: 42vw; height: 42vw; max-width: 680px; max-height: 680px;
          background: radial-gradient(circle at center, rgba(90,160,255,0.5), transparent 70%);
          animation: lg-drift-b 30s ease-in-out infinite alternate;
        }
        .lg-aurora-c {
          top: 20%; left: 36%;
          width: 38vw; height: 38vw; max-width: 600px; max-height: 600px;
          background: radial-gradient(circle at center, rgba(99,102,241,0.45), transparent 70%);
          animation: lg-drift-c 36s ease-in-out infinite alternate;
        }
        .lg-beam {
          position: absolute;
          top: -40%;
          height: 180%;
          width: 22vw;
          filter: blur(46px);
          opacity: 0.5;
          will-change: transform, opacity;
        }
        .lg-beam-1 {
          left: 12%;
          background: linear-gradient(180deg, transparent, rgba(0,102,255,0.5), transparent);
          transform: rotate(14deg);
          animation: lg-beam-sweep-1 18s ease-in-out infinite;
        }
        .lg-beam-2 {
          right: 14%;
          background: linear-gradient(180deg, transparent, rgba(125,184,255,0.42), transparent);
          transform: rotate(-12deg);
          animation: lg-beam-sweep-2 22s ease-in-out infinite;
        }
        .lg-sheen {
          position: absolute;
          inset: -25% -25% auto -25%;
          height: 75%;
          background: conic-gradient(from 200deg at 50% 0%, transparent 0deg, rgba(0,102,255,0.12) 60deg, transparent 140deg, rgba(125,184,255,0.1) 230deg, transparent 320deg);
          filter: blur(40px);
          opacity: 0.7;
          transform-origin: 50% 0%;
          animation: lg-spin 64s linear infinite;
        }
        @keyframes lg-drift-a { 0% { transform: translate3d(0,0,0) scale(1); } 100% { transform: translate3d(9vw,7vh,0) scale(1.14); } }
        @keyframes lg-drift-b { 0% { transform: translate3d(0,0,0) scale(1.06); } 100% { transform: translate3d(-8vw,6vh,0) scale(0.9); } }
        @keyframes lg-drift-c { 0% { transform: translate3d(0,0,0) scale(0.95); } 100% { transform: translate3d(5vw,-5vh,0) scale(1.18); } }
        @keyframes lg-beam-sweep-1 {
          0%, 100% { transform: translateX(-30%) rotate(14deg); opacity: 0.25; }
          50% { transform: translateX(40%) rotate(14deg); opacity: 0.6; }
        }
        @keyframes lg-beam-sweep-2 {
          0%, 100% { transform: translateX(30%) rotate(-12deg); opacity: 0.22; }
          50% { transform: translateX(-40%) rotate(-12deg); opacity: 0.55; }
        }
        @keyframes lg-spin { to { transform: rotate(360deg); } }
        /* Backgrounded tab: stop compositing the blurred layers entirely. */
        .lg-paused .lg-aurora,
        .lg-paused .lg-sheen,
        .lg-paused .lg-beam { animation-play-state: paused; }
        /* Mobile: the sweeping beams, conic sheen and blend-mode grain are the
           expensive compositor work that makes touch scroll jank and fixed
           layers (incl. the nav) drop. Drop them and freeze the aurora to a
           static, still-premium gradient. */
        @media (max-width: 768px) {
          .lg-beam, .lg-sheen, .lg-grain { display: none; }
          .lg-aurora { animation: none !important; opacity: 0.4; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lg-aurora, .lg-sheen, .lg-beam { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
