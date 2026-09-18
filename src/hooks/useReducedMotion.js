import { useMediaQuery } from "./useMediaQuery";

/**
 * Drop-in for framer-motion's `useReducedMotion`, but hydration-safe.
 *
 * Framer seeds its hook from `matchMedia` on the client, so a visitor with
 * reduced motion enabled would hydrate the prerendered HTML with a different
 * tree than the server produced. Reading the media query through
 * `useSyncExternalStore` gives the server snapshot (false) during hydration
 * and the real value immediately after, with no mismatch.
 */
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export default useReducedMotion;
