// Keystatic provides its own full-screen app shell; this layout just passes
// children through so the admin doesn't inherit any site-level wrappers.
export default function KeystaticLayout({ children }: { children: React.ReactNode }) {
  return children;
}
