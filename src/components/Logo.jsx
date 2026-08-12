import { business } from "../data/business";
import styles from "./Logo.module.css";

/**
 * Brand lockup.
 *
 * If `business.brand.logoSrc` is set, the supplied artwork is rendered
 * untouched — never recoloured, never distorted. Until then this geometric
 * mark stands in, built from the logo's own language: an angular roof apex,
 * a vertical building shaft and a single gold datum line.
 */
export default function Logo({
  variant = "dark", // "dark" = navy type on light, "light" = white type on navy
  compact = false,
  /* Off by default — the navigation only has room for one line beside the
     mark. Switch it on where there is space, such as the footer. */
  withTagline = false,
  className = "",
}) {
  const supplied =
    variant === "light"
      ? business.brand.logoSrcLight ?? business.brand.logoSrc
      : business.brand.logoSrc;

  return (
    <span
      className={`${styles.lockup} ${styles[variant]} ${
        compact ? styles.compact : ""
      } ${className}`}
    >
      {supplied ? (
        <img
          src={supplied}
          /* Decorative: the wordmark beside it carries the name, and every
             link wrapping this lockup has its own aria-label. */
          alt=""
          className={styles.suppliedMark}
          width="42"
          height="44"
        />
      ) : (
        <BrandMark className={styles.mark} />
      )}

      <span className={styles.words}>
        {/* The mark is already a VK monogram, so the wordmark states what the
            company does rather than repeating the initials. */}
        <span className={styles.name}>{business.brand.tagline}</span>
        {withTagline && (
          <span className={styles.tagline}>Thanjavur, Tamil Nadu</span>
        )}
      </span>
    </span>
  );
}

/** The mark alone — used in the footer seal and as a section motif. */
export function BrandMark({ className = "", title }) {
  return (
    <svg
      viewBox="0 0 40 44"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : "true"}
      aria-label={title}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {/* Outer apex — the roof geometry */}
      <path
        d="M2 33.5 L20 4 L38 33.5"
        className={styles.strokeDeep}
        fill="none"
        strokeWidth="3"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* Inner apex — royal blue counter-form */}
      <path
        d="M11 33.5 L20 18.5 L29 33.5"
        className={styles.strokeRoyal}
        fill="none"
        strokeWidth="2.4"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* Gold datum */}
      <path
        d="M0 38.5 H40"
        className={styles.strokeGold}
        fill="none"
        strokeWidth="1.6"
      />
      {/* Gold keystone */}
      <path d="M20 9.5 L24 16 H16 Z" className={styles.fillGold} />
    </svg>
  );
}
