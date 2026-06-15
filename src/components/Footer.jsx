import Link from "next/link";
import Logo from "./Logo";
import { site as siteDefaults } from "@/lib/content";

// Tagline, columns, and the bottom note are editable via Keystatic (singleton
// "footer"); the site name + domain come from Site settings. These defaults keep
// the footer intact if a field is blank.
const DEFAULT_GROUPS = [
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
const DEFAULT_TAGLINE = "The F&B manufacturing platform that actually speaks your language.";
const DEFAULT_LEGAL = "Dairy · Beverage · Ingredients · Flavors · Specialty F&B";

export default function Footer({ data, site }) {
  const groups = data?.groups?.length ? data.groups : DEFAULT_GROUPS;
  const tagline = data?.tagline || DEFAULT_TAGLINE;
  const legalNote = data?.legalNote || DEFAULT_LEGAL;
  const siteName = site?.siteName || siteDefaults.name;
  const domain = site?.domain || siteDefaults.domain;

  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {tagline}
          </p>
          <p className="mt-4 font-mono text-xs text-dim">{domain}</p>
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
        {/* extra bottom padding on phones so this bar clears the fixed bottom
            nav pill (which only floats at the bottom below sm) */}
        <div className="container-x flex flex-col items-center justify-between gap-3 pt-6 pb-28 text-xs text-dim sm:flex-row sm:py-6">
          <p>© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          <p className="font-mono">{legalNote}</p>
        </div>
      </div>
    </footer>
  );
}
