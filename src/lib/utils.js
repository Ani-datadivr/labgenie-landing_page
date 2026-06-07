// Minimal className joiner. Filters falsy values and joins with spaces.
// (No tailwind-merge dependency — we don't pass conflicting utilities here.)
export function cn(...inputs) {
  return inputs.flat().filter(Boolean).join(" ");
}
