// IntegrationLogos — the "works with your stack" grid for the Integrations page.
//
// Brands we have a real logo for render as the actual mark, normalized to a soft
// white silhouette so colorful logos stay calm and on-brand against the ink
// surface. Niche F&B ERPs with no logo on hand render as clean monochrome
// wordmarks in the same cell, so the grid never ships a broken image.
import { Stagger, StaggerItem } from "@/components/Reveal";

const ERP_LOGOS = [
  { name: "SAP", src: "/logos/erp/sap.webp" },
  { name: "Sage", src: "/logos/erp/sage.webp" },
  { name: "Oracle NetSuite" },
  { name: "Microsoft Dynamics 365" },
  { name: "Infor" },
  { name: "Epicor" },
  { name: "Odoo" },
  { name: "Ramco" },
  { name: "BatchMaster" },
  { name: "ECI Deacom" },
  { name: "QuickBooks" },
];

const CRM_LOGOS = [
  { name: "Salesforce", src: "/logos/crm/salesforce.png" },
  { name: "Slack", src: "/logos/crm/slack.png" },
  { name: "Microsoft Teams", src: "/logos/crm/teams.png" },
  { name: "Outlook", src: "/logos/crm/outlook.png" },
  { name: "Fireflies", src: "/logos/crm/fireflies.webp" },
];

function LogoCell({ item }) {
  return (
    <div className="group flex h-24 items-center justify-center bg-bg px-4 transition-colors duration-300 hover:bg-surface md:h-28">
      {item.src ? (
        <img
          src={item.src}
          alt={item.name}
          loading="lazy"
          className="h-7 w-auto max-w-[140px] select-none object-contain opacity-65 transition-opacity duration-300 group-hover:opacity-100 md:h-8 [filter:brightness(0)_invert(1)]"
        />
      ) : (
        <span className="select-none text-center font-display text-base font-semibold tracking-tight text-muted transition-colors duration-300 group-hover:text-text md:text-lg">
          {item.name}
        </span>
      )}
    </div>
  );
}

function LogoBand({ label, items, cols }) {
  return (
    <div>
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-dim">{label}</p>
      <Stagger
        className={`grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 ${cols}`}
      >
        {items.map((item) => (
          <StaggerItem key={item.name}>
            <LogoCell item={item} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

export default function IntegrationLogos() {
  return (
    <div className="space-y-10">
      <LogoBand label="ERP & operations" items={ERP_LOGOS} cols="lg:grid-cols-4" />
      <LogoBand label="CRM & communication" items={CRM_LOGOS} cols="lg:grid-cols-5" />
    </div>
  );
}
