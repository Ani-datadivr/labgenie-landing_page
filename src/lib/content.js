// =============================================================================
// LabGenie — content source of truth.
// Edit copy here; components read from this file.
// =============================================================================

export const site = {
  name: "LabGenie",
  domain: "labgenie.ai",
  tagline: "The operating system for F&B manufacturing",
  email: "hello@labgenie.ai",
};

export const nav = [
  { label: "Platform", href: "/platform" },
  { label: "For Manufacturers", href: "/manufacturers" },
  { label: "Integrations", href: "/integrations" },
  { label: "Security", href: "/security" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
];

export const buyer = {
  eyebrow: "For F&B manufacturers",
  title: "Built for the suppliers of the world's biggest brands.",
  sub: "B2B food and beverage manufacturers of every kind: dairy, beverage, ingredients, flavors, spices, and specialty products.",
  economic: [
    { role: "COO", pain: "Operations run on email threads and tribal knowledge across disconnected stations." },
    { role: "Head of Quality", pain: "Every batch burns days checking quality certificates against three different customer spec formats." },
    { role: "Head of Procurement", pain: "Buying decisions lag the market because data lives in silos." },
  ],
  daily: [
    { role: "QA analyst", win: "Reconciles three spec formats in minutes, not days." },
    { role: "Sales ops", win: "Inbound inquiries arrive pre-triaged and routed." },
    { role: "Procurement manager", win: "Asks one question and gets a cross-functional answer." },
  ],
};

export const designPartner = {
  name: "Synthite",
  descriptor: "the world's largest oleoresin producer",
  quote:
    "LabGenie collapses the quality-document checking that defines our quality and sales operations from days into minutes.",
};

export const integrations = {
  eyebrow: "Integrations",
  title: "Sits on top of the systems you already run.",
  sub: "LabGenie connects to your ERP and document systems. It reads your spec sheets and quality certificates where they already live, and writes back compliance paperwork you can trust.",
  erps: ["SAP", "Oracle NetSuite", "Microsoft Dynamics 365", "Infor", "Sage", "Odoo"],
  categories: [
    { name: "ERP & MRP", note: "SAP, Oracle, Dynamics, Infor, Sage, Odoo." },
    { name: "Lab & quality systems", note: "Read lab results and quality records." },
    { name: "Documents", note: "Quality certificates and spec sheets in any format: PDF, Excel, email." },
    { name: "Email & CRM", note: "Ingest and route inbound inquiries." },
  ],
};

export const finalCta = {
  title: "See your quality documents checked in minutes.",
  sub: "We're onboarding a small group of design partners who'll shape the platform as we build it. If you manufacture food or beverage products at scale, let's talk.",
  primary: { label: "Request a demo", href: "/contact" },
  secondary: { label: "Become a design partner", href: "/contact?type=partner" },
};
