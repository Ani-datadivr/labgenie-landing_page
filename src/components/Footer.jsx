import Link from "next/link";
import Logo from "./Logo";
import { site, nav } from "@/lib/content";

const groups = [
  {
    title: "Product",
    links: [
      { label: "Platform", href: "/platform" },
      { label: "For Manufacturers", href: "/manufacturers" },
      { label: "Integrations", href: "/integrations" },
      { label: "Security", href: "/security" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Request a demo", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            The AI operating system for F&amp;B ingredient manufacturers — quality,
            sales, and procurement in one interface.
          </p>
          <p className="mt-4 font-mono text-xs text-dim">{site.domain}</p>
        </div>

        {groups.map((group) => (
          <div key={group.title}>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
              {group.title}
            </h4>
            <ul className="mt-4 space-y-3">
              {group.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-text"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-dim sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="font-mono">Built for flavors · spices · oleoresins · specialty ingredients</p>
        </div>
      </div>
    </footer>
  );
}
