"use client";

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

  return (
    <>
      {/* Logo — fixed top-left */}
      <Link
        href="/"
        aria-label="LabGenie home"
        className="fixed left-4 top-3 z-50 flex min-h-[44px] items-center rounded-xl bg-bg/60 px-2.5 backdrop-blur-md sm:left-6"
      >
        {/* Mark-only between sm and lg: the labeled center pill needs the
            width there; the full lockup returns at lg and below sm (where the
            pill drops to the bottom of the screen). */}
        <span className="hidden max-sm:block lg:block">
          <Logo />
        </span>
        <span className="hidden sm:max-lg:block">
          <Logo showWordmark={false} />
        </span>
      </Link>

      {/* Primary CTA — fixed top-right */}
      <Link
        href="/contact"
        className="btn btn-primary fixed right-4 top-3 z-50 min-h-[44px] !px-4 text-[13px] sm:right-6"
      >
        Request a demo
      </Link>

      {/* Tubelight pill nav. transform-gpu pins it to its own compositor layer so
          it can't drop out during scroll on mobile; the bg is more opaque on
          mobile (lighter blur) so it stays legible even if backdrop-filter is
          throttled, then takes the full glass treatment from sm: up. */}
      <nav className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform-gpu sm:bottom-auto sm:top-4">
        <div className="flex items-center gap-1 rounded-full border border-border bg-bg/90 px-1 py-1 shadow-panel backdrop-blur-md sm:bg-bg/60 sm:backdrop-blur-xl">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.name;
            return (
              <Link
                key={item.name}
                href={item.url}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full px-1.5 py-1.5 text-[13px] font-medium transition-colors sm:px-4 sm:py-2 lg:px-5 ${
                  isActive ? "text-accent-text" : "text-muted hover:text-text"
                }`}
              >
                {/* Below lg the label stays visible under the icon: six bare
                    icons (factory vs briefcase vs building) are guesswork. */}
                <span className="flex flex-col items-center gap-0.5 lg:hidden">
                  <Icon size={17} strokeWidth={2.25} aria-hidden="true" />
                  <span className="text-[9px] leading-none tracking-tight">{item.name}</span>
                </span>
                <span className="hidden lg:inline">{item.name}</span>
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
