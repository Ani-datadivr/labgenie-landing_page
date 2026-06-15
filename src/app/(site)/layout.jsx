import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AmbientBackground from "@/components/AmbientBackground";
import MotionProvider from "@/components/MotionProvider";
import SmoothScroll from "@/components/SmoothScroll";
import { readSections } from "@/lib/cms";

// Marketing chrome for the public site. Lives here (not in the root layout) so
// the /keystatic admin route, which sits outside this route group, renders
// without the fixed nav, footer, ambient backdrop, or Lenis smooth scroll.
// Nav, footer, and site settings copy are read (server-side) from Keystatic.
export default async function SiteLayout({ children }) {
  const { navbar, footer, siteSettings } = await readSections([
    "navbar",
    "footer",
    "siteSettings",
  ]);
  return (
    <MotionProvider>
      <SmoothScroll>
        <AmbientBackground />
        <Navbar links={navbar?.links} ctaLabel={navbar?.ctaLabel} ctaHref={navbar?.ctaHref} />
        <main className="relative">{children}</main>
        <Footer data={footer} site={siteSettings} />
      </SmoothScroll>
    </MotionProvider>
  );
}
