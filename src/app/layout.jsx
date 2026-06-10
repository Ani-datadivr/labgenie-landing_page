import "./globals.css";
import { Inter, Space_Grotesk, JetBrains_Mono, Manrope } from "next/font/google";
import { site } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});
// Brand wordmark face (official logo lockup uses Manrope).
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-brand",
});

export const metadata = {
  metadataBase: new URL("https://labgenie.ai"),
  title: {
    default: "LabGenie: The AI operating system for F&B manufacturers",
    template: "%s · LabGenie",
  },
  description:
    "LabGenie reads your quality documents and spec sheets, checks them against your raw-material, internal, and customer requirements, and runs quality, sales, and procurement from a single chat interface. Built for flavors, spices, oleoresins, and specialty ingredient manufacturers.",
  keywords: [
    "F&B manufacturing software",
    "quality certificate software",
    "ingredient manufacturers",
    "oleoresins",
    "spices",
    "AI quality compliance",
    "quote matching",
  ],
  openGraph: {
    title: "LabGenie: The AI operating system for F&B manufacturers",
    description:
      "Check your quality documents against every customer's specs in minutes, not days. Quality, sales, and procurement in one AI-native interface.",
    url: "https://labgenie.ai",
    siteName: site.name,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport = {
  themeColor: "#0E141C",
  width: "device-width",
  initialScale: 1,
};

// Root layout is intentionally minimal: just <html>/<body> + font variables.
// The marketing chrome (nav, footer, smooth scroll, ambient backdrop) lives in
// the (site) route group's layout, so the /keystatic admin renders clean.
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable} ${manrope.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
