import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import styles from "./Button.module.css";

/**
 * One button, four registers.
 *
 *   solid   — navy fill, the single strongest action on a screen
 *   outline — hairline border, the considered secondary
 *   gold    — reserved for the enquiry action on dark surfaces
 *   quiet   — a text action with a gold rule that draws on hover
 *
 * Renders as <Link>, <a> or <button> depending on the props given, so the
 * right element always reaches the accessibility tree.
 */
export default function Button({
  children,
  to,
  href,
  variant = "solid",
  size = "md",
  arrow = false,
  full = false,
  className = "",
  ...rest
}) {
  const classes = [
    styles.base,
    styles[variant],
    styles[size],
    full ? styles.full : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      <span className={styles.label}>{children}</span>
      {arrow && (
        <ArrowRight className={styles.arrow} size={16} aria-hidden="true" />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {inner}
      </Link>
    );
  }

  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {inner}
    </button>
  );
}
