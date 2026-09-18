import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

import Media from "../components/Media";
import Button from "../components/Button";
import { Reveal, LineReveal } from "../components/Reveal";
import { SectionLabel } from "../components/SectionHeading";
import principles from "../data/principles";
import media from "../data/media";
import styles from "./WhyUs.module.css";

/**
 * Why us — as an editorial spread, not an icon grid.
 * A single statement holds the left; the right is a stack of principles that
 * open one at a time. Pointer users open on hover, everyone else on click or
 * keyboard focus, and the open state is announced properly either way.
 */
export default function WhyUs() {
  const [openId, setOpenId] = useState(principles[0].id);
  const reduced = useReducedMotion();

  return (
    <section
      id="why-us"
      className={`section ${styles.section}`}
      aria-labelledby="why-heading"
    >
      <div className="container">
        <div className={styles.layout}>
          {/* ---- Statement -------------------------------------------- */}
          <div className={styles.statement}>
            <Reveal>
              <SectionLabel index="05">Why Us</SectionLabel>
            </Reveal>

            <LineReveal
              as="h2"
              id="why-heading"
              lines={["We don't just", "develop land.", "We develop", "confidence."]}
              className={styles.heading}
            />

            <Reveal delay={0.15}>
              <p className={styles.body}>
                Anyone can sell an acre. What a buyer is actually paying for is
                the certainty that the roads will be laid, the title will be
                clean, and the person who sold it will still take the call two
                years later.
              </p>
            </Reveal>

            <Reveal delay={0.22} className={styles.visual}>
              <Media
                image={media.architectAtWork}
                ratio={4 / 3}
                sizes="(max-width: 1000px) 100vw, 34vw"
              />
              <span className={styles.visualRule} aria-hidden="true" />
            </Reveal>
          </div>

          {/* ---- Principles ------------------------------------------- */}
          <ul className={styles.list}>
            {principles.map((principle, index) => {
              const isOpen = openId === principle.id;

              return (
                <Reveal
                  key={principle.id}
                  as="li"
                  delay={index * 0.05}
                  className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
                  onMouseEnter={() => setOpenId(principle.id)}
                >
                  <h3 className={styles.itemHead}>
                    <button
                      type="button"
                      className={styles.trigger}
                      aria-expanded={isOpen}
                      aria-controls={`principle-${principle.id}`}
                      onClick={() => setOpenId(isOpen ? null : principle.id)}
                      onFocus={() => setOpenId(principle.id)}
                    >
                      <span className={styles.index}>{principle.index}</span>
                      <span className={styles.titleGroup}>
                        <span className={styles.title}>{principle.title}</span>
                        <span className={styles.summary}>{principle.summary}</span>
                      </span>
                      <span className={styles.plus} aria-hidden="true">
                        <span />
                        <span />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`principle-${principle.id}`}
                        className={styles.detailWrap}
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className={styles.detail}>{principle.detail}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}

            <Reveal as="li" className={styles.cta}>
              <Button to="/#about" variant="outline" arrow>
                How We Work
              </Button>
            </Reveal>
          </ul>
        </div>
      </div>
    </section>
  );
}
