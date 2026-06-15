import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

// Server-only content reader. Reads the committed JSON under src/content via
// Keystatic's schema (works regardless of storage kind — storage only governs
// where the *admin* writes). Every getter falls back to null so a missing or
// malformed file never breaks the render; components keep their own defaults.
const reader = createReader(process.cwd(), keystaticConfig);

export async function getHomeHero() {
  try {
    return (await reader.singletons.home.read()) ?? null;
  } catch {
    return null;
  }
}

export async function getFaqs() {
  try {
    const data = await reader.singletons.faqs.read();
    return data?.items?.length ? data.items : null;
  } catch {
    return null;
  }
}

// Generic single-section reader: returns the singleton's data or null so a
// missing/malformed file never breaks render (components keep their defaults).
async function readSingleton(name) {
  try {
    return (await reader.singletons[name].read()) ?? null;
  } catch {
    return null;
  }
}

export const getProblem = () => readSingleton("problem");
export const getProductVision = () => readSingleton("productVision");
export const getDifferentiation = () => readSingleton("differentiation");
export const getProofShowcase = () => readSingleton("proofShowcase");
export const getClosingCta = () => readSingleton("closingCta");
