import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

import ContactForm from "./ContactForm";
import { useChrome } from "../hooks/useChrome";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import styles from "./InquiryModal.module.css";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/** Global enquiry dialog. Open it from anywhere with `openEnquiry(context)`. */
export default function InquiryModal() {
  const { enquiry, closeEnquiry } = useChrome();
  const open = Boolean(enquiry);
  const reduced = useReducedMotion();
  const panelRef = useRef(null);
  const returnFocusRef = useRef(null);

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return undefined;

    returnFocusRef.current = document.activeElement;
    const panel = panelRef.current;
    panel?.querySelector(FOCUSABLE)?.focus({ preventScroll: true });

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closeEnquiry();
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      const items = [...panel.querySelectorAll(FOCUSABLE)].filter(
        (node) => node.offsetParent !== null,
      );
      if (!items.length) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      returnFocusRef.current?.focus?.({ preventScroll: true });
    };
  }, [open, closeEnquiry]);

  return (
    <AnimatePresence>
      {open && (
        <div className={styles.root}>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={closeEnquiry}
          />

          <motion.div
            ref={panelRef}
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-title"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              className={styles.close}
              onClick={closeEnquiry}
              aria-label="Close enquiry form"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <p className={styles.label}>
              <span className={styles.labelRule} aria-hidden="true" />
              Enquiry
            </p>

            <h2 id="enquiry-title" className={styles.title}>
              {enquiry.context ? (
                <>
                  Request details
                  <span className={styles.context}>{enquiry.context}</span>
                </>
              ) : (
                "Request a consultation"
              )}
            </h2>

            <p className={styles.intro}>
              Tell us how to reach you. An advisor will respond within one
              working day with availability, pricing and the documentation set.
            </p>

            <ContactForm
              context={enquiry.context}
              compact
              onSuccess={() => {
                window.setTimeout(closeEnquiry, 2600);
              }}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
