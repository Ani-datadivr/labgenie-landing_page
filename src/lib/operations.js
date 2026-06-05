// Shared F&B operations catalogue — the single source of truth for both the
// OperationsCanvas UI and the /api/labgenie-route Gemini router. Keep station
// ids, accents and module labels here (icons live in the component, since they
// are React components and never need to reach the server).

export const GROUPS = {
  gtm: "Go-to-Market",
  factory: "Factory",
  innovation: "Innovation",
};

export const STATIONS = [
  { id: "qa",    group: "gtm",        short: "Quality Assurance", label: "Quality Assurance Station", accent: "#4ADE80", status: "live",    modules: ["RFP Match", "RFP Filler"] },
  { id: "cs",    group: "gtm",        short: "Customer Service",  label: "Customer Service Station",  accent: "#2DD4BF", status: "planned", modules: ["New onboarding", "Upsell", "Re-order"] },
  { id: "sales", group: "gtm",        short: "Sales",             label: "Sales Station",             accent: "#38BDF8", status: "live",    modules: ["Inquiry Routing"] },
  { id: "proc",  group: "factory",    short: "Procurement",       label: "Procurement Station",       accent: "#A78BFA", status: "planned", modules: ["Demand Planning", "Reverse auction", "Live prices", "Price Forecasts"] },
  { id: "inv",   group: "factory",    short: "Inventory",         label: "Inventory Station",         accent: "#FBBF24", status: "planned", modules: ["Shelf life tracker", "FIFO check", "Vendor Match"] },
  { id: "prod",  group: "factory",    short: "Production",        label: "Production Station",        accent: "#FB923C", status: "planned", modules: ["OEE optimizer", "Shift Ops", "Consensus planning", "Scheduling"] },
  { id: "qc",    group: "factory",    short: "Quality Control",   label: "Quality Control Station",   accent: "#34D399", status: "planned", modules: ["Traceability"] },
  { id: "log",   group: "factory",    short: "Logistics",         label: "Logistics Station",         accent: "#94A3B8", status: "planned", modules: ["Fleet tracking", "Route optimization", "Warehouse management"] },
  { id: "form",  group: "innovation", short: "Formulation",       label: "Formulation Station",       accent: "#22D3EE", status: "planned", modules: ["Reverse engineering formulations"] },
  { id: "mkt",   group: "innovation", short: "Market Intel",      label: "Market Intelligence",       accent: "#E879F9", status: "planned", modules: ["Wild ideas", "Trends", "Competitive"] },
];

export const ALL_MODULES = STATIONS.flatMap((s) => s.modules);

// One-line description of what each module actually does — gives the LLM real
// context so it can explain capabilities and route accurately.
export const MODULE_DESCRIPTIONS = {
  "RFP Match": "match an incoming customer RFP / spec sheet against our product spec library",
  "RFP Filler": "auto-fill an RFP response form from our spec library",
  "New onboarding": "set up the onboarding flow for a new customer",
  "Upsell": "find upsell opportunities across existing accounts",
  "Re-order": "spot SKUs below par level and draft re-order POs",
  "Inquiry Routing": "route an inbound sales inquiry to the right owner",
  "Demand Planning": "forecast product demand for the coming weeks",
  "Reverse auction": "run a reverse auction to source a cheaper supplier",
  "Live prices": "show live commodity / ingredient market prices",
  "Price Forecasts": "forecast ingredient price trends",
  "Shelf life tracker": "track shelf life and expiry of inventory lots",
  "FIFO check": "verify FIFO (first-in-first-out) pick-order compliance",
  "Vendor Match": "match and rank approved vendors for an ingredient",
  "OEE optimizer": "improve overall equipment effectiveness and cut downtime",
  "Shift Ops": "plan shifts and line staffing",
  "Consensus planning": "align sales and operations on a single consensus plan",
  "Scheduling": "sequence and schedule production jobs",
  "Traceability": "trace a lot / batch through the supply chain",
  "Fleet tracking": "track delivery vehicles and shipments in transit",
  "Route optimization": "optimize delivery routes",
  "Warehouse management": "manage warehouse bins and slotting",
  "Reverse engineering formulations": "reverse-engineer or optimize a product formulation",
  "Wild ideas": "brainstorm novel product concepts",
  "Trends": "surface category and market trends",
  "Competitive": "benchmark competitors and find white-space gaps",
};

export function stationIdForModule(label) {
  const s = STATIONS.find((st) => st.modules.includes(label));
  return s ? s.id : null;
}
