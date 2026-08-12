import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import Logo from "./Logo";
import { business } from "../data/business";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import { EASE } from "../utils/motion";
import styles from "./Preloader.module.css";

/* ==========================================================================
   BRAND INTRO
   --------------------------------------------------------------------------
   A navy curtain that holds the brand while fonts and the hero image settle,
   then lifts to reveal the site.

   Restraint rules, because a preloader is a tax on the visitor:
   · it waits for the real signals (window load + fonts), not a fixed timer
   · a hard 2.6s cap, so a slow network never traps anyone behind it
   · it never replays on client-side navigation — only on a real page load
   · skipped entirely under prefers-reduced-motion
   · aria-hidden, so assistive tech goes straight to the content
   ========================================================================== */

/** Set true to show the intro only once per browser session. */
const SHOW_ONCE_PER_SESSION = false;
const SESSION_KEY = "vk:intro-shown";
const MIN_VISIBLE_MS = 700;
const MAX_VISIBLE_MS = 2600;

export default function Preloader() {
  const reduced = useReducedMotion();

  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    if (!SHOW_ONCE_PER_SESSION) return true;
    try {
      return window.sessionStorage.getItem(SESSION_KEY) !== "1";
    } catch {
      /* Private mode or blocked storage — show it anyway. */
      return true;
    }
  });

  useLockBodyScroll(visible && !reduced);

  useEffect(() => {
    /* Reduced motion renders nothing at all, so there is no curtain to time. */
    if (!visible || reduced) return undefined;

    const markShown = () => {
      if (!SHOW_ONCE_PER_SESSION) return;
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* Storage unavailable — nothing to remember, nothing to do. */
      }
    };

    let cancelled = false;
    const started = performance.now();
    let timer;

    const finish = () => {
      if (cancelled) return;
      const remaining = MIN_VISIBLE_MS - (performance.now() - started);
      timer = window.setTimeout(
        () => {
          if (cancelled) return;
          markShown();
          setVisible(false);
        },
        Math.max(0, remaining),
      );
    };

    const loaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((resolve) =>
            window.addEventListener("load", resolve, { once: true }),
          );

    const fonts = document.fonts ? document.fonts.ready : Promise.resolve();

    Promise.race([
      Promise.all([loaded, fonts]),
      new Promise((resolve) => window.setTimeout(resolve, MAX_VISIBLE_MS)),
    ]).then(finish);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [visible, reduced]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`${styles.screen} grain`}
          aria-hidden="true"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.95, ease: EASE }}
        >
          <motion.div
            className={styles.inner}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Logo variant="light" className={styles.logo} />

            <p className={styles.motto}>{business.brand.motto}</p>

            <span className={styles.track}>
              <motion.span
                className={styles.bar}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.7, ease: [0.4, 0, 0.2, 1] }}
              />
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
