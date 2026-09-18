import { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

import Media from "../components/Media";
import media from "../data/media";
import styles from "./ArchitecturalReveal.module.css";

/* ==========================================================================
   THE ARCHITECTURAL REVEAL  —  the site's signature interaction
   --------------------------------------------------------------------------
   A drafting sheet that draws itself.

   As the visitor scrolls the introduction, evenly spaced hairlines descend
   like the setting-out grid of an elevation, a gold datum travels down the
   sheet the way a level line is struck on site, and the photograph rises into
   the frame beneath it.

   Deliberate constraint: every vertical is the SAME height and the SAME
   spacing. Varying heights along a baseline read as a chart, not as
   architecture — that is the difference between a drawing and a graph.

   Cost: one scroll listener, transforms and clip-path only, and a static
   composition under prefers-reduced-motion.
   ========================================================================== */

const GRID_LINES = 13;
/* Which verticals are struck in gold — the setting-out lines. */
const GOLD_LINES = new Set([3, 9]);

export default function ArchitecturalReveal() {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  /* The photograph rises out of the ground plane. */
  const revealInset = useTransform(progress, [0.16, 0.72], [100, 0], {
    clamp: true,
  });
  const clipPath = useMotionTemplate`inset(${revealInset}% 0% 0% 0%)`;

  /* The datum — a level line struck across the sheet. */
  const datumTop = useTransform(progress, [0.05, 0.95], [14, 88], {
    clamp: true,
  });
  const datumY = useMotionTemplate`${datumTop}%`;
  const datumOpacity = useTransform(
    progress,
    [0, 0.06, 0.9, 1],
    [0, 1, 1, 0],
  );

  /* Type drifts a little, but never loses contrast. */
  const copyY = useTransform(progress, [0, 1], [0, -54]);

  return (
    <section
      id="introduction"
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="introduction-heading"
    >
      <div className={styles.sticky}>
        {/* ---- Setting-out grid ---------------------------------------- */}
        <div className={styles.grid} aria-hidden="true">
          {Array.from({ length: GRID_LINES }).map((_, index) => (
            <GridLine
              key={index}
              index={index}
              gold={GOLD_LINES.has(index)}
              progress={progress}
              reduced={reduced}
            />
          ))}
        </div>

        {/* ---- Datum ---------------------------------------------------- */}
        {!reduced && (
          <motion.span
            className={styles.datum}
            aria-hidden="true"
            style={{ top: datumY, opacity: datumOpacity }}
          />
        )}

        {/* ---- Composition ---------------------------------------------- */}
        <div className={styles.frame}>
          <motion.div
            className={styles.copy}
            style={reduced ? undefined : { y: copyY }}
          >
            <p className={styles.label}>
              <span className={styles.labelIndex}>01</span>
              <span className={styles.labelRule} aria-hidden="true" />
              The Idea
            </p>

            <h2 id="introduction-heading" className={styles.heading}>
              Property is more
              <br />
              than four walls.
            </h2>

            <p className={styles.body}>
              It is where life takes shape. Where decisions become legacies.
              Where the right address becomes an investment in tomorrow.
            </p>
          </motion.div>

          <div className={styles.visual} aria-hidden="true">
            <motion.div
              className={styles.visualClip}
              style={reduced ? undefined : { clipPath }}
            >
              <Media
                image={media.editorialTall}
                ratio={3 / 4}
                sizes="(max-width: 900px) 70vw, 34vw"
                className={styles.visualFrame}
              />
            </motion.div>
            <span className={styles.visualRule} />
          </div>
        </div>

        <span className={styles.ground} aria-hidden="true" />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function GridLine({ index, gold, progress, reduced }) {
  /* Lines are struck left to right, as they would be set out. */
  const start = 0.02 + (index / GRID_LINES) * 0.5;
  const end = start + 0.34;

  const scaleY = useTransform(progress, [start, end], [0, 1], { clamp: true });

  return (
    <motion.span
      className={`${styles.line} ${gold ? styles.lineGold : ""}`}
      style={reduced ? undefined : { scaleY }}
    />
  );
}
