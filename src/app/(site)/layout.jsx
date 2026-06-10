import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AmbientBackground from "@/components/AmbientBackground";
import MotionProvider from "@/components/MotionProvider";
import SmoothScroll from "@/components/SmoothScroll";

// Marketing chrome for the public site. Lives here (not in the root layout) so
// the /keystatic admin route, which sits outside this route group, renders
// without the fixed nav, footer, ambient backdrop, or Lenis smooth scroll.
export default function SiteLayout({ children }) {
  return (
    <MotionProvider>
      <SmoothScroll>
        {/* Skip link: first focusable element; visible only on keyboard focus. */}
        <a
          href="#main"
          className="btn btn-primary fixed left-4 top-3 z-[60] -translate-y-24 opacity-0 transition-transform focus-visible:translate-y-0 focus-visible:opacity-100"
        >
          Skip to content
        </a>
        <AmbientBackground />
        <Navbar />
        <main id="main" className="relative">{children}</main>
        <Footer />
      </SmoothScroll>
    </MotionProvider>
  );
}
