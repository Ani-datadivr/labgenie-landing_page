"use client";

// Fixed, GPU-cheap ambient backdrop: hairline grid + two slowly drifting
// gradient orbs. Pure CSS animation so it costs almost nothing and is
// automatically frozen by the global prefers-reduced-motion rule.

export default function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-backdrop opacity-60" />

      <div
        className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(60,231,192,0.16), transparent 70%)",
          animation: "floatA 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -right-40 top-1/3 h-[560px] w-[560px] rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(77,124,254,0.14), transparent 70%)",
          animation: "floatB 26s ease-in-out infinite",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />

      <style>{`
        @keyframes floatA {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(60px, 40px); }
        }
        @keyframes floatB {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-50px, 30px); }
        }
      `}</style>
    </div>
  );
}
