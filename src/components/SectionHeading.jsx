import { Reveal, LineReveal } from "./Reveal";
import styles from "./SectionHeading.module.css";

/** Editorial section marker — "01 — OUR DEVELOPMENTS". */
export function SectionLabel({ index, children, className = "", tone = "dark" }) {
  return (
    <p className={`${styles.label} ${styles[tone]} ${className}`}>
      {index && <span className={styles.index}>{index}</span>}
      {index && <span className={styles.dash} aria-hidden="true" />}
      <span>{children}</span>
    </p>
  );
}

/**
 * Section header: micro-label, masked display heading, optional standfirst
 * and an aside slot for a link or note.
 */
export default function SectionHeading({
  index,
  label,
  lines = [],
  standfirst,
  aside,
  align = "left",
  tone = "dark",
  as = "h2",
  id,
  className = "",
}) {
  return (
    <header
      id={id}
      className={`${styles.header} ${styles[align]} ${styles[`t-${tone}`]} ${className}`}
    >
      <div className={styles.main}>
        {label && (
          <Reveal>
            <SectionLabel index={index} tone={tone}>
              {label}
            </SectionLabel>
          </Reveal>
        )}

        <LineReveal
          as={as}
          lines={lines}
          className={styles.heading}
          delay={label ? 0.08 : 0}
        />

        {standfirst && (
          <Reveal delay={0.16}>
            <p className={styles.standfirst}>{standfirst}</p>
          </Reveal>
        )}
      </div>

      {aside && (
        <Reveal delay={0.22} className={styles.aside}>
          {aside}
        </Reveal>
      )}
    </header>
  );
}
