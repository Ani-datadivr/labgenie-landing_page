import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

// Server-only content reader. Reads the committed JSON under src/content via
// Keystatic's schema (works regardless of storage kind — storage only governs
// where the *admin* writes). Every read falls back to null so a missing or
// malformed file never breaks the render; components keep their own DEFAULTS.
const reader = createReader(process.cwd(), keystaticConfig);

// Read one section singleton by its config key. Returns its data or null.
export async function readSingleton(name) {
  try {
    return (await reader.singletons[name].read()) ?? null;
  } catch {
    return null;
  }
}

// Read several section singletons at once → an object keyed by name, e.g.
// `const { mfHeader, mfBuyers } = await readSections(["mfHeader", "mfBuyers"])`.
// Each value is the section's data or null. One call per page keeps pages tidy.
export async function readSections(names) {
  const entries = await Promise.all(
    names.map(async (name) => [name, await readSingleton(name)])
  );
  return Object.fromEntries(entries);
}

// True unless the section's "Show on the website" toggle is explicitly off.
// Missing/old content (no `visible` key) defaults to shown.
export const isVisible = (section) => section?.visible !== false;

// Build a Next.js metadata object from a section's `seo` field, falling back to
// the page's built-in title/description when the editor leaves SEO blank.
// `absoluteTitle` bypasses the "%s · LabGenie" template (used by the homepage).
export function buildMetadata(
  seo,
  { fallbackTitle, fallbackDescription, absoluteTitle = false } = {}
) {
  const title = seo?.title?.trim() || fallbackTitle || undefined;
  const description = seo?.description?.trim() || fallbackDescription || undefined;
  const meta = {};
  if (title) meta.title = absoluteTitle ? { absolute: title } : title;
  if (description) meta.description = description;
  return meta;
}

// ---- Backwards-compatible named getters (home page imports these) -----------
export const getHomeHero = () => readSingleton("home");
export const getProblem = () => readSingleton("problem");
export const getProductVision = () => readSingleton("productVision");
export const getDifferentiation = () => readSingleton("differentiation");
export const getProofShowcase = () => readSingleton("proofShowcase");
export const getClosingCta = () => readSingleton("closingCta");
export const getFaqs = () => readSingleton("faqs");
