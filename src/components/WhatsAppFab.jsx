import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { MessageCircle } from "lucide-react";

import { useScrollState } from "../hooks/useScrollState";
import { useChrome } from "../hooks/useChrome";
import { whatsappLink } from "../utils/whatsapp";
import styles from "./WhatsAppFab.module.css";

/**
 * Floating WhatsApp action.
 *
 * Held back deliberately — a small navy disc with a gold hairline that only
 * appears once the visitor is past the hero, and only widens into a label on
 * hover. On an Indian property site this is the highest-intent channel there
 * is; it should be findable, not shouted.
 */
export default function WhatsAppFab({ context }) {
  const { scrolled } = useScrollState(560);
  const { sticky } = useChrome();
  const reduced = useReducedMotion();

  return (
    <AnimatePresence>
      {scrolled && !sticky && (
        <motion.a
          href={whatsappLink(context)}
          className={`${styles.fab} no-print`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={
            context
              ? `Enquire about ${context} on WhatsApp`
              : "Enquire on WhatsApp"
          }
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <MessageCircle size={19} aria-hidden="true" />
          <span className={styles.label}>
            {context ? "Enquire on WhatsApp" : "WhatsApp"}
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
