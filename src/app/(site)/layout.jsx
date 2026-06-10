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
        <AmbientBackground />
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
      </SmoothScroll>
    </MotionProvider>
  );
}
