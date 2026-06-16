import Link from "next/link";
import Logo from "./Logo";
import { site as siteDefaults } from "@/lib/content";

// Tagline, columns, and the bottom note are editable via Keystatic (singleton
// "footer"); the site name + domain come from Site settings. These defaults keep
// the footer intact if a field is blank. The footer is a logo/tagline block plus
// four link columns: Product, Company, Resources, Connect.
const DEFAULT_GROUPS = [
  {
    title: "Product",
    links: [
      { label: "Platform", href: "/platform" },
      { label: "Customers", href: "/manufacturers" },
      { label: "Integrations", href: "/integrations" },
      { label: "Security", href: "/security" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQs", href: "/#faq" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/company/datadivr/?viewAsMember=true" },
      { label: "X", href: "https://x.com/datadivr_ai" },
    ],
  },
];
const DEFAULT_TAGLINE = "Built inside the industry. Now powering it.";
const DEFAULT_LEGAL = "Dairy · Beverage · Ingredients · Flavors · Specialty F&B";

// Social handles for the bottom-bar icons. Kept here so the icon row stays in
// sync with the Connect column above.
const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/datadivr/?viewAsMember=true",
    Icon: LinkedInIcon,
  },
  { label: "X", href: "https://x.com/datadivr_ai", Icon: XIcon },
];

const isExternal = (href) => /^https?:\/\//.test(href || "");

// One footer link — internal links route via next/link; absolute URLs open in a
// new tab as a plain anchor.
function FooterLink({ href, label }) {
  const className = "text-sm text-muted transition-colors hover:text-text";
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export default function Footer({ data, site }) {
  const groups = data?.groups?.length ? data.groups : DEFAULT_GROUPS;
  const tagline = data?.tagline || DEFAULT_TAGLINE;
  const legalNote = data?.legalNote || DEFAULT_LEGAL;
  const siteName = site?.siteName || siteDefaults.name;
  const domain = site?.domain || siteDefaults.domain;

  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="container-x grid grid-cols-2 gap-x-8 gap-y-10 py-16 md:grid-cols-[1.5fr_repeat(4,1fr)]">
        <div className="col-span-2 max-w-xs md:col-span-1">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">{tagline}</p>
          <p className="mt-4 font-mono text-xs text-dim">{domain}</p>
        </div>

        {groups.map((group) => (
          <div key={group.title}>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
              {group.title}
            </h4>
            <ul className="mt-4 space-y-3">
              {group.links.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href} label={l.label} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        {/* extra bottom padding on phones so this bar clears the fixed bottom
            nav pill (which only floats at the bottom below sm) */}
        <div className="container-x flex flex-col items-center gap-4 pt-6 pb-28 text-xs text-dim sm:flex-row sm:justify-between sm:py-6">
          <p>© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <p className="font-mono">{legalNote}</p>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-dim transition-colors hover:text-text"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[18px] w-[18px]">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
    </svg>
  );
}
