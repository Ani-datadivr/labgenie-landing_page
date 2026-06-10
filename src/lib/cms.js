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
