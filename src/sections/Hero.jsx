import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { ArrowUpRight } from "lucide-react";

import Media from "../components/Media";
import Button from "../components/Button";
import media from "../data/media";
import { projects } from "../data/projects";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { EASE } from "../utils/motion";
import styles from "./Hero.module.css";

/* The width at which the hero recomposes onto the photograph. Kept in step
   with the @media block in Hero.module.css — below this the type column is
   no longer on white, so anything that colours itself for a light surface
   (the buttons) has to be told otherwise. */
const COMPACT = "(max-width: 1024px)";

/**
 * The hero.
 *
 * Desktop: an asymmetric split — editorial type on white, a full-height
 * photograph bleeding off the right edge, a gold datum line on the seam.
 * Mobile: recomposed entirely as a full-bleed image with the type layered
 * over it, because a stacked desktop layout reads as a compromise.
 */
export default function Hero() {
  const reduced = useReducedMotion();
  const compact = useMediaQuery(COMPACT);
  const spotlight = projects.find((p) => p.status === "Ongoing");

  const headline = ["Built for the way", "you envision", "tomorrow."];

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      {/* ---- Photograph ------------------------------------------------- */}
      <div className={styles.visual}>
        <motion.div
          className={styles.visualInner}
          initial={reduced ? false : { scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: EASE }}
        >
          <Media
            image={media.heroPrimary}
            ratio={16 / 10}
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className={styles.visualFrame}
            imgClassName={styles.visualImg}
          />
        </motion.div>
        <span className={styles.scrim} aria-hidden="true" />
      </div>

      {/* ---- Type ------------------------------------------------------- */}
      <div className={`${styles.content} ${compact ? "on-dark" : ""}`}>
        <motion.p
          className={styles.eyebrow}
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
        >
          <span className={styles.eyebrowRule} aria-hidden="true" />
          Thanjavur
          <span className={styles.eyebrowDot} aria-hidden="true" />
          Real Estate &amp; Development
        </motion.p>

        <h1 id="hero-heading" className={styles.headline}>
          {headline.map((line, index) => (
            <span key={line} className={styles.lineMask}>
              <motion.span
                className={styles.line}
                initial={reduced ? false : { y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 1.25,
                  delay: 0.35 + index * 0.12,
                  ease: EASE,
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className={styles.lead}
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85, ease: EASE }}
        >
          Premium properties and thoughtfully developed spaces in Thanjavur,
          designed around lasting value, distinctive living and confident
          investment.
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: EASE }}
        >
          <Button to="/#properties" variant="solid" size="lg" arrow>
            Explore Properties
          </Button>
          <Button
            to="/#contact"
            variant="outline"
            size="lg"
            className={styles.ctaGhost}
          >
            Talk to an Advisor
          </Button>
        </motion.div>

      </div>

      {/* Scroll cue lives over the photograph, clear of the spotlight strip. */}
      <motion.a
        href="#introduction"
        className={styles.scroll}
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
      >
        Scroll to discover
        <span className={styles.scrollTrack} aria-hidden="true">
          <span className={styles.scrollThumb} />
        </span>
      </motion.a>

      {/* ---- Spotlight strip -------------------------------------------- */}
      {spotlight && (
        <motion.div
          className={styles.spotlight}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.25, ease: EASE }}
        >
          <Link to="/#projects" className={styles.spotlightLink}>
            <span className={styles.spotlightLabel}>Now Developing</span>
            <span className={styles.spotlightName}>{spotlight.name}</span>
            <span className={styles.spotlightMeta}>
              {[spotlight.locality, spotlight.city].filter(Boolean).join(", ")}
            </span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </motion.div>
      )}

      {/* Gold datum — the logo's geometry, drawn once, very quietly. */}
      <span className={styles.datum} aria-hidden="true" />
    </section>
  );
}
