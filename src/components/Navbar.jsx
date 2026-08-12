import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Phone, MessageCircle, ArrowUpRight } from "lucide-react";

import Logo from "./Logo";
import Button from "./Button";
import { primaryNav } from "../data/navigation";
import { business, telHref } from "../data/business";
import { whatsappLink } from "../utils/whatsapp";
import { useScrollState } from "../hooks/useScrollState";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { useChrome } from "../hooks/useChrome";
import { EASE } from "../utils/motion";
import styles from "./Navbar.module.css";

const SECTION_IDS = primaryNav.map((item) => item.id);

export default function Navbar() {
  const { scrolled, direction } = useScrollState(20);
  const { immersive } = useChrome();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const toggleRef = useRef(null);
  const reduced = useReducedMotion();

  /* Section highlighting only means anything on the single page itself. */
  const onHome = location.pathname === "/";
  const activeSection = useScrollSpy(SECTION_IDS);

  /* Close the panel whenever the route changes — adjusted during render
     rather than in an effect, so there is no extra commit with the menu
     still open. Covers back/forward navigation as well as link taps. */
  const [menuRoute, setMenuRoute] = useState(location.key);
  if (location.key !== menuRoute) {
    setMenuRoute(location.key);
    if (menuOpen) setMenuOpen(false);
  }

  useLockBodyScroll(menuOpen);

  /* Escape closes and returns focus to the trigger. */
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const overHero = immersive && !scrolled;
  const hidden = direction === "down" && scrolled && !menuOpen;

  return (
    <>
      <motion.header
        className={[
          styles.nav,
          overHero ? styles.transparent : styles.solid,
          scrolled ? styles.compact : "",
          menuOpen ? styles.menuOpen : "",
        ]
          .filter(Boolean)
          .join(" ")}
        initial={false}
        animate={{ y: hidden && !reduced ? "-102%" : "0%" }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <div className={styles.inner}>
          <Link
            to="/"
            className={styles.brand}
            aria-label={`${business.brand.name} — home`}
          >
            <Logo
              variant={overHero || menuOpen ? "light" : "dark"}
              compact={scrolled}
            />
          </Link>

          <nav className={styles.links} aria-label="Primary">
            <ul className={styles.linkList}>
              {primaryNav.map((item) => {
                const isActive = onHome && activeSection === item.id;
                return (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className={`${styles.link} ${isActive ? styles.active : ""}`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={styles.actions}>
            <a
              href={telHref}
              className={styles.phone}
              aria-label={`Call ${business.contact.phoneDisplay}`}
            >
              <Phone size={14} aria-hidden="true" />
              <span>{business.contact.phoneDisplay}</span>
            </a>

            <Button
              to="/#properties"
              variant={overHero ? "gold" : "solid"}
              size="sm"
              className={styles.cta}
            >
              Explore Properties
            </Button>

            <button
              ref={toggleRef}
              type="button"
              className={styles.toggle}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className={styles.toggleLabel}>
                {menuOpen ? "Close" : "Menu"}
              </span>
              <span className={styles.bars} aria-hidden="true">
                <span className={styles.bar} />
                <span className={styles.bar} />
              </span>
            </button>
          </div>
        </div>

        <span className={styles.hairline} aria-hidden="true" />
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <MobileMenu
            onClose={() => setMenuOpen(false)}
            reduced={reduced}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ==========================================================================
   MOBILE PANEL
   A full-height navy composition — large serif wayfinding, a gold datum line
   and the two things a mobile visitor actually wants: call and WhatsApp.
   ========================================================================== */

function MobileMenu({ onClose, reduced }) {
  const panelRef = useRef(null);

  useEffect(() => {
    /* Move focus into the panel for keyboard and screen-reader users. */
    const first = panelRef.current?.querySelector("a, button");
    first?.focus({ preventScroll: true });
  }, []);

  return (
    <motion.div
      id="mobile-menu"
      ref={panelRef}
      className={`${styles.panel} on-dark grain`}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
      animate={reduced ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
      exit={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className={styles.panelInner}>
        <p className={styles.panelLabel}>
          <span>Thanjavur</span>
          <span className={styles.dot} aria-hidden="true" />
          <span>Real Estate &amp; Development</span>
        </p>

        <nav aria-label="Site">
          <ul className={styles.panelList}>
            {primaryNav.map((item, index) => (
              <motion.li
                key={item.label}
                initial={reduced ? false : { opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.65,
                  delay: 0.16 + index * 0.055,
                  ease: EASE,
                }}
              >
                <Link to={item.to} className={styles.panelLink} onClick={onClose}>
                  <span className={styles.panelIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.panelText}>{item.label}</span>
                  <ArrowUpRight size={20} aria-hidden="true" />
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        <motion.div
          className={styles.panelFoot}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a href={telHref} className={styles.panelAction}>
            <Phone size={15} aria-hidden="true" />
            <span>{business.contact.phoneDisplay}</span>
          </a>
          <a
            href={whatsappLink()}
            className={styles.panelAction}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={15} aria-hidden="true" />
            <span>WhatsApp</span>
          </a>
          <Button to="/#contact" variant="gold" size="sm" full onClick={onClose}>
            Request a Consultation
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
