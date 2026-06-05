import "./globals.css";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AmbientBackground from "@/components/AmbientBackground";
import MotionProvider from "@/components/MotionProvider";

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

export const metadata = {
  metadataBase: new URL("https://labgenie.ai"),
  title: {
    default: "LabGenie — The AI operating system for F&B manufacturers",
    template: "%s · LabGenie",
  },
  description:
    "LabGenie reads messy COAs and spec sheets, reconciles them across raw-material, internal, and customer standards, and orchestrates quality, sales, and procurement from a single chat interface. Built for flavors, spices, oleoresins, and specialty ingredient manufacturers.",
  keywords: [
    "F&B manufacturing software",
    "COA reconciliation",
    "ingredient manufacturers",
    "oleoresins",
    "spices",
    "AI quality compliance",
    "RFP matching",
  ],
  openGraph: {
    title: "LabGenie — The AI operating system for F&B manufacturers",
    description:
      "Reconcile COAs against customer specs in minutes, not days. Quality, sales, and procurement in one AI-native interface.",
    url: "https://labgenie.ai",
    siteName: site.name,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport = {
  themeColor: "#06070a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}
    >
      <body>
        <MotionProvider>
          <AmbientBackground />
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
