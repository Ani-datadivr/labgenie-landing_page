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

export const hero = {
  eyebrow: "AI operating system · Flavors · Spices · Oleoresins",
  title: "The operating system for ingredient manufacturers.",
  highlight: "ingredient manufacturers",
  sub: "LabGenie reads messy COAs and spec sheets, reconciles them across raw-material, internal, and customer standards, and orchestrates quality, sales, and procurement from a single chat interface.",
  primaryCta: { label: "Request a demo", href: "/contact" },
  secondaryCta: { label: "Explore the platform", href: "/platform" },
  metric: {
    from: 5,
    fromUnit: "days per batch",
    to: "minutes",
    caption:
      "Reconciling COAs against customer specs once took 3–5 days per batch. LabGenie cuts it to minutes.",
  },
};

// Three streams the AI reconciles — drives the hero animation + copy.
export const reconciliation = {
  columns: [
    { key: "raw", label: "Raw material spec", source: "Incoming / supplier" },
    { key: "internal", label: "Internal standard", source: "Your QA baseline" },
    { key: "customer", label: "Customer spec", source: "Outgoing / per-buyer" },
  ],
  rows: [
    { param: "Moisture", raw: "8.2%", internal: "≤ 9.0%", customer: "≤ 8.5%", match: true },
    { param: "Total ash", raw: "5.1%", internal: "≤ 6.0%", customer: "≤ 6.0%", match: true },
    { param: "Curcumin", raw: "3.4%", internal: "≥ 3.0%", customer: "≥ 3.2%", match: true },
    { param: "Lead (Pb)", raw: "1.1 ppm", internal: "≤ 2.0 ppm", customer: "≤ 1.0 ppm", match: false },
    { param: "Volatile oil", raw: "4.8 ml", internal: "≥ 4.0 ml", customer: "≥ 4.5 ml", match: true },
  ],
};

export const stats = [
  { value: "3–5 days", label: "of COA reconciliation, before", mono: "→ minutes with LabGenie" },
  { value: "3 specs", label: "reconciled at once", mono: "raw · internal · customer" },
  { value: "1000s", label: "of inbound inquiries triaged", mono: "auto-routed" },
  { value: "1 interface", label: "across every station", mono: "chat-native" },
];

// Platform modules, grouped by maturity.
export const modules = {
  live: {
    label: "Live today",
    tone: "accent",
    items: [
      {
        name: "RFP matching",
        blurb:
          "Instantly answer the question that gates every deal: does this incoming customer spec match something we already make?",
        detail:
          "LabGenie parses an inbound spec sheet and matches it against your existing product catalog and historical batches — surfacing the closest fit and exactly where it diverges.",
      },
      {
        name: "RFP auto-fill",
        blurb:
          "Auto-populate compliance comparisons against a customer's spec sheet — no more manual cell-by-cell reconciliation.",
        detail:
          "It reconciles the incoming raw-material spec, your internal standard, and the customer's outgoing spec simultaneously, then fills the compliance documentation for review.",
      },
      {
        name: "Inquiry routing",
        blurb:
          "Triage and route thousands of inbound sales inquiries to the right desk, automatically.",
        detail:
          "Messy, non-standardized inbound emails are read, classified, and routed — so sales ops stops drowning and nothing falls through the cracks.",
      },
    ],
  },
  building: {
    label: "In active build",
    tone: "blue",
    items: [
      { name: "Formulation reverse-engineering", blurb: "Work backward from a target spec to a viable formulation." },
      { name: "Production shift ops", blurb: "Coordinate the floor across shifts with shared context." },
      { name: "Consensus planning", blurb: "Align demand, supply, and commercial on one plan." },
      { name: "Quality traceability", blurb: "Trace every parameter from raw material to shipped batch." },
    ],
  },
  roadmap: {
    label: "On the roadmap",
    tone: "muted",
    items: [
      { name: "Procurement intelligence", blurb: "Live prices, demand planning, reverse auctions." },
      { name: "Inventory management", blurb: "Shelf life, FIFO, vendor matching." },
      { name: "Logistics", blurb: "Movement and fulfillment, orchestrated." },
      { name: "Market intelligence", blurb: "Trends and competitive tracking." },
    ],
  },
};

// The orchestration story — the chat that pulls across stations.
export const orchestration = {
  eyebrow: "One interface, every station",
  title: "Ask a question that used to take three people and a week.",
  prompt:
    "Can we fulfil this RFQ with current cardamom stock at acceptable margin?",
  steps: [
    { station: "Quality", action: "Confirms incoming lots meet the customer spec." },
    { station: "Inventory", action: "Checks on-hand cardamom and shelf life by lot." },
    { station: "Procurement", action: "Prices the top-up against live market rates." },
  ],
  answer:
    "Yes — 4.2 MT on hand clears the customer spec; topping up 0.8 MT holds margin at 21%.",
};

export const buyer = {
  eyebrow: "For F&B manufacturers",
  title: "Built for the people who supply the world's brands — not the brands themselves.",
  sub: "Mid-to-large B2B ingredient manufacturers: flavors, spices, oleoresins, and specialty ingredients.",
  economic: [
    { role: "COO", pain: "Operations run on email threads and tribal knowledge across disconnected stations." },
    { role: "Head of Quality", pain: "Every batch burns days reconciling COAs against three different spec formats." },
    { role: "Head of Procurement", pain: "Buying decisions lag the market because data lives in silos." },
  ],
  daily: [
    { role: "QA analyst", win: "Reconciles three spec formats in minutes, not days." },
    { role: "Sales ops", win: "Inbound inquiries arrive pre-triaged and routed." },
    { role: "Procurement manager", win: "Asks one question and gets a cross-functional answer." },
  ],
};

export const clients = [
  "Synthite",
  "Oleoresin Co.",
  "Cardamom Valley",
  "Spice Origin",
  "Flavour Labs",
  "Essentia",
  "Capsicum & Co.",
  "Verde Extracts",
];

export const designPartner = {
  name: "Synthite",
  descriptor: "the world's largest oleoresin producer",
  quote:
    "LabGenie collapses the spec-reconciliation work that defines our quality and sales operations from days into minutes.",
};

export const integrations = {
  eyebrow: "Integrations",
  title: "Sits on top of the systems you already run.",
  sub: "LabGenie connects to your ERP and document systems — it reads your spec sheets and COAs where they already live, and writes back compliance documentation you can trust.",
  erps: ["SAP", "Oracle NetSuite", "Microsoft Dynamics 365", "Infor", "Sage", "Odoo"],
  categories: [
    { name: "ERP & MRP", note: "SAP, Oracle, Dynamics, Infor, Sage, Odoo." },
    { name: "LIMS & QMS", note: "Read lab results and quality records." },
    { name: "Documents", note: "COAs and spec sheets in any format — PDF, Excel, email." },
    { name: "Email & CRM", note: "Ingest and route inbound inquiries." },
  ],
};

export const security = {
  eyebrow: "Data security",
  title: "Your specifications are your edge. We treat them that way.",
  sub: "Enterprise-grade controls from day one. Detailed documentation available under NDA — placeholder content below, to be finalized with your security team.",
  pillars: [
    { name: "Encryption", note: "Encrypted in transit and at rest." },
    { name: "Tenant isolation", note: "Your data is never used to train shared models." },
    { name: "Access control", note: "Role-based access and full audit trails." },
    { name: "Compliance", note: "Built toward SOC 2 and industry standards." },
  ],
};

export const about = {
  eyebrow: "About",
  title: "We're building the operating system for an industry that runs on spreadsheets.",
  body: [
    "F&B ingredient manufacturing is one of the largest, most quality-critical industries on earth — and it still runs on email, PDFs, and tribal knowledge spread across disconnected stations.",
    "LabGenie started with the most painful, most universal problem: reconciling certificates of analysis against customer specifications. From that wedge, we're building outward — quality, sales, procurement, inventory, logistics — into a single AI-native operating system.",
    "We're early, and we're building it hand-in-hand with the manufacturers who'll run on it.",
  ],
  values: [
    { name: "Ship to the floor", note: "We build with people doing the work, not above them." },
    { name: "Earn the spec", note: "Quality data is sacred. Accuracy is non-negotiable." },
    { name: "One system", note: "Every station, one interface, one source of truth." },
  ],
};

export const careers = {
  eyebrow: "Careers",
  title: "Help us build the system an industry will run on.",
  sub: "We're a small, senior team building deep-tech AI for a category that has never had real software. If reconciling the messy real world into something elegant excites you, talk to us.",
  perks: [
    "Work directly with design partners like Synthite",
    "Senior, low-ego team — ownership from day one",
    "Deep, unsolved problems in AI + manufacturing",
    "Remote-friendly with deliberate in-person time",
  ],
  roles: [
    { title: "Founding Engineer, AI", team: "Engineering", location: "Remote / Hybrid", type: "Full-time" },
    { title: "Forward-Deployed Engineer", team: "Engineering", location: "Remote / On-site", type: "Full-time" },
    { title: "Product Designer", team: "Design", location: "Remote", type: "Full-time" },
    { title: "Founding Account Executive", team: "Go-to-market", location: "Remote", type: "Full-time" },
  ],
};

export const finalCta = {
  title: "See your COAs reconciled in minutes.",
  sub: "We're onboarding a small group of design partners who'll shape the platform as we build it. If you manufacture flavors, spices, oleoresins, or specialty ingredients, let's talk.",
  primary: { label: "Request a demo", href: "/contact" },
  secondary: { label: "Become a design partner", href: "/contact?type=partner" },
};
