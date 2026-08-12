import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Restores scroll position on navigation.
 *
 * A hash scrolls to its section; a plain route change returns to the top.
 * Search-parameter changes are left alone.
 *
 * The target is retried over a few frames because arriving from a legal route
 * mounts the whole single page at once — the section may not exist yet on the
 * frame the hash changes.
 */
const MAX_ATTEMPTS = 30;

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return undefined;
    }

    let frame;
    let attempts = 0;

    const seek = () => {
      const target = document.querySelector(hash);

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      if (attempts < MAX_ATTEMPTS) {
        attempts += 1;
        frame = window.requestAnimationFrame(seek);
        return;
      }

      /* Section genuinely absent — do not strand the visitor mid-page. */
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };

    frame = window.requestAnimationFrame(seek);
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
