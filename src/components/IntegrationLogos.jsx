// IntegrationLogos — the "works with your stack" grid for the Integrations page.
//
// At rest every brand renders as a calm white silhouette so the grid reads as
// one deliberate index against the ink surface. On hover the real logo blooms
// into its true brand color, so the wall feels alive without shouting at rest.
// Niche ERPs we don't hold a logo for render as monochrome wordmarks in the
// same cell, so the grid never ships a broken image.
//
// Mobile keeps the grid short on purpose: the first 6 ERP systems and first 3
// CRM / communication tools (the most recognizable of each), the rest revealed
// from `sm:` up.
import { Stagger, StaggerItem } from "@/components/Reveal";

// Every brand has a real logo. Sources were trimmed of their baked-in padding
// (and the Dynamics white background keyed out) so one CSS size renders them at
// a uniform optical scale. First 6 are the mobile slice.
const ERP_LOGOS = [
  { name: "SAP", src: "/logos/erp/sap.webp" },
  { name: "Sage", src: "/logos/erp/sage.webp" },
  { name: "Oracle NetSuite", src: "/logos/erp/netsuite.png" },
  { name: "Infor", src: "/logos/erp/infor.png" },
  { name: "Epicor", src: "/logos/erp/epicor.png" },
  { name: "Microsoft Dynamics 365", src: "/logos/erp/dynamics365.png" },
  { name: "Odoo", src: "/logos/erp/odoo.png" },
  { name: "Ramco", src: "/logos/erp/ramco.png" },
  { name: "BatchMaster", src: "/logos/erp/batchmaster.svg" },
  { name: "ECI Deacom", src: "/logos/erp/eci.png" },
  { name: "Zoho", src: "/logos/erp/zoho.png" },
  { name: "Aptean", src: "/logos/erp/aptean.png" },
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
        // Rest: white silhouette, dimmed. Hover: real brand color blooms in.
        // Both states are brightness()+invert() so the filter interpolates
        // smoothly (you can't transition to/from `filter: none`).
        <img
          src={item.src}
          alt={item.name}
          loading="lazy"
          className="max-h-9 w-auto max-w-[148px] select-none object-contain opacity-60 [filter:brightness(0)_invert(1)] transition-[filter,opacity] duration-500 group-hover:opacity-100 group-hover:[filter:brightness(1)_invert(0)] md:max-h-10"
        />
      ) : (
        <span className="select-none text-center font-display text-base font-semibold tracking-tight text-muted transition-colors duration-300 group-hover:text-text md:text-lg">
          {item.name}
        </span>
      )}
    </div>
  );
}

function LogoBand({ label, items, cols, mobileLimit, mobileCols }) {
  return (
    <div>
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-dim">{label}</p>
      <Stagger
        className={`grid ${mobileCols} gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 ${cols}`}
      >
        {items.map((item, i) => (
          <StaggerItem
            key={item.name}
            // Mobile shows only the first `mobileLimit`; the rest return at sm:.
            className={i >= mobileLimit ? "hidden sm:block" : undefined}
          >
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
      <LogoBand
        label="ERP & operations"
        items={ERP_LOGOS}
        mobileCols="grid-cols-2"
        mobileLimit={6}
        cols="lg:grid-cols-4"
      />
      <LogoBand
        label="CRM & communication"
        items={CRM_LOGOS}
        mobileCols="grid-cols-3"
        mobileLimit={3}
        cols="lg:grid-cols-5"
      />
    </div>
  );
}
