/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg-rgb) / <alpha-value>)",
        "bg-elev": "rgb(var(--bg-elev-rgb) / <alpha-value>)",
        surface: "rgb(var(--surface-rgb) / <alpha-value>)",
        "surface-2": "rgb(var(--surface-2-rgb) / <alpha-value>)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        text: "rgb(var(--text-rgb) / <alpha-value>)",
        muted: "rgb(var(--text-muted-rgb) / <alpha-value>)",
        dim: "rgb(var(--text-dim-rgb) / <alpha-value>)",
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        "accent-2": "rgb(var(--accent-2-rgb) / <alpha-value>)",
        warm: "rgb(var(--accent-warm-rgb) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        container: "1200px",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "20px",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(0,102,255,0.30), 0 0 40px -8px rgba(0,102,255,0.40)",
        panel: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 60px -30px rgba(0,0,0,0.8)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
