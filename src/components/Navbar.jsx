"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutGrid, Factory, Workflow, ShieldCheck, Building2, Briefcase } from "lucide-react";
import Logo from "./Logo";

// Tubelight pill navigation: a centered glass pill with an animated "lamp"
// indicator under the active item. Labels on desktop, icons on mobile. Logo and
// the primary CTA sit fixed in the top corners; the pill floats top on desktop
// and bottom on mobile.
const NAV = [
  { name: "Platform", url: "/platform", icon: LayoutGrid },
  { name: "Manufacturers", url: "/manufacturers", icon: Factory },
  { name: "Integrations", url: "/integrations", icon: Workflow },
  { name: "Security", url: "/security", icon: ShieldCheck },
  { name: "About", url: "/about", icon: Building2 },
  { name: "Careers", url: "/careers", icon: Briefcase },
];

export default function Navbar() {
  const pathname = usePathname();
  const active =
    NAV.find((i) => i.url === pathname)?.name ??
    NAV.find((i) => pathname?.startsWith(i.url))?.name ??
    null;

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Logo — fixed top-left */}
      <Link
        href="/"
        aria-label="LabGenie home"
        className={`fixed left-4 top-4 z-50 rounded-xl px-2 py-1.5 transition-colors sm:left-6 ${
          scrolled ? "bg-bg/70 backdrop-blur-md" : ""
        }`}
      >
        <Logo />
      </Link>

      {/* Primary CTA — fixed top-right */}
      <Link
        href="/contact"
        className="btn btn-primary fixed right-4 top-4 z-50 !px-4 !py-2 text-[13px] sm:right-6"
      >
        Request a demo
      </Link>

      {/* Tubelight pill nav */}
      <nav className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 sm:bottom-auto sm:top-4">
        <div className="flex items-center gap-1 rounded-full border border-border bg-bg/60 px-1 py-1 shadow-panel backdrop-blur-xl">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.name;
            return (
              <Link
                key={item.name}
                href={item.url}
                aria-current={isActive ? "page" : undefined}
                className={`relative cursor-pointer rounded-full px-4 py-2 text-[13px] font-medium transition-colors sm:px-5 ${
                  isActive ? "text-accent" : "text-muted hover:text-text"
                }`}
              >
                <span className="hidden lg:inline">{item.name}</span>
                <span className="lg:hidden" aria-label={item.name}>
                  <Icon size={18} strokeWidth={2.25} />
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-lamp"
                    className="absolute inset-0 -z-10 w-full rounded-full bg-accent/10"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  >
                    <div className="absolute -top-[7px] left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-accent">
                      <div className="absolute -left-2 -top-2 h-6 w-12 rounded-full bg-accent/25 blur-md" />
                      <div className="absolute -top-1 h-6 w-8 rounded-full bg-accent/20 blur-md" />
                      <div className="absolute left-2 top-0 h-4 w-4 rounded-full bg-accent/20 blur-sm" />
                    </div>
                  </motion.div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
