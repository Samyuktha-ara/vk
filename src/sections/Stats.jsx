import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { ShieldCheck } from "lucide-react";

import { Reveal, GoldRule } from "../components/Reveal";
import { SectionLabel } from "../components/SectionHeading";
import stats, { hasRealStats } from "../data/stats";
import { business } from "../data/business";
import styles from "./Stats.module.css";

/**
 * Trust figures.
 *
 * A figure only animates — and only counts as a claim — when a real number
 * has been entered in `data/stats.js`. Until then it renders as "XX+", which
 * is honest, and which nobody will mistake for a track record.
 */
export default function Stats() {
  if (!business.content.showStats) return null;

  const { reraNumber, certifications, awards } = business.credentials;
  const hasCredentials = Boolean(reraNumber || certifications.length || awards.length);

  return (
    <section className={`section-tight ${styles.section}`} aria-labelledby="stats-heading">
      <div className="container">
        <div className={styles.head}>
          <Reveal>
            <SectionLabel index="02">In Numbers</SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="stats-heading" className={styles.statement}>
              A record measured in delivered projects,
              <span> not in advertising.</span>
            </h2>
          </Reveal>
        </div>

        <GoldRule className={styles.topRule} />

        <dl className={styles.grid}>
          {stats.map((stat, index) => (
            <Reveal
              key={stat.id}
              delay={index * 0.07}
              className={styles.item}
              as="div"
            >
              <dt className={styles.label}>{stat.label}</dt>
              <dd className={styles.valueWrap}>
                <Figure value={stat.value} suffix={stat.suffix} />
              </dd>
              <p className={styles.caption}>{stat.caption}</p>
            </Reveal>
          ))}
        </dl>

        {!hasRealStats && (
          <p className={styles.note}>
            Figures are shown as placeholders until verified company data is
            supplied. We would rather show nothing than a number we cannot
            evidence.
          </p>
        )}

        {hasCredentials && (
          <Reveal delay={0.1}>
            <div className={styles.credentials}>
              <ShieldCheck size={16} aria-hidden="true" />
              <ul className={styles.credentialList}>
                {reraNumber && (
                  <li>
                    <span className={styles.credLabel}>RERA</span>
                    <a
                      href={business.credentials.reraUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {reraNumber}
                    </a>
                  </li>
                )}
                {certifications.map((item) => (
                  <li key={item.label}>
                    <span className={styles.credLabel}>{item.issuer}</span>
                    {item.label}
                  </li>
                ))}
                {awards.map((item) => (
                  <li key={item.label}>
                    <span className={styles.credLabel}>{item.year}</span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function Figure({ value, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  /* Starts at the real figure so the prerendered HTML (what crawlers read)
     carries the number; the count-up from zero begins once it scrolls into view. */
  const [counted, setCounted] = useState(value);

  useEffect(() => {
    if (typeof value !== "number" || !inView || reduced) return undefined;
    const controls = animate(0, value, {
      duration: 2.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setCounted(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value, reduced]);

  if (typeof value !== "number") {
    return (
      <span ref={ref} className={`${styles.value} ${styles.placeholder}`}>
        XX
        <span className={styles.suffix}>{suffix}</span>
      </span>
    );
  }

  /* Reduced motion skips the count entirely and shows the real figure. */
  const display = reduced ? value : counted;

  return (
    <span ref={ref} className={styles.value}>
      {display.toLocaleString("en-IN")}
      <span className={styles.suffix}>{suffix}</span>
    </span>
  );
}
