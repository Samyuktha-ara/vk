import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { connectivity } from "../data/locations";
import styles from "./ThanjavurMap.module.css";

/* ==========================================================================
   THANJAVUR CONNECTIVITY RAIL
   --------------------------------------------------------------------------
   Every destination around Thanjavur lies either west or north-east, so a
   radial diagram spends most of its area on empty quadrants and reads as
   decoration. This says the same thing as a rail: compass bearing, name,
   what it is, distance, and a bar for relative distance.

   The bar is scaled logarithmically — 40 km and 350 km have to share one
   axis — and is explicitly labelled as not to scale.
   ========================================================================== */

const COMPASS = [
  "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
  "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW",
];

const compassFor = (bearing) => COMPASS[Math.round(bearing / 22.5) % 16];

const MIN_KM = 35;
const MAX_KM = 360;

const barWidth = (km) => {
  const clamped = Math.min(Math.max(km, MIN_KM), MAX_KM);
  const t =
    (Math.log(clamped) - Math.log(MIN_KM)) /
    (Math.log(MAX_KM) - Math.log(MIN_KM));
  return 10 + t * 90; // never vanishes, never fills entirely
};

export default function ThanjavurMap({ className = "" }) {
  const reduced = useReducedMotion();

  return (
    <div className={`${styles.wrap} ${className}`}>
      <header className={styles.head}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowRule} aria-hidden="true" />
          Connectivity
        </p>
        <p className={styles.title}>
          What lies within reach of the city, and how far
        </p>
      </header>

      {/* ---- Origin ---------------------------------------------------- */}
      <div className={styles.origin}>
        <span className={styles.originMark} aria-hidden="true" />
        <span className={styles.originName}>Thanjavur</span>
        <span className={styles.originMeta}>Tamil Nadu</span>
      </div>

      {/* ---- Destinations ---------------------------------------------- */}
      <ul className={styles.rail}>
        {connectivity.map((place, index) => (
          <li key={place.name} className={styles.row}>
            <span className={styles.dir} aria-hidden="true">
              {compassFor(place.bearing)}
            </span>

            <div className={styles.body}>
              <p className={styles.name}>{place.name}</p>
              <p className={styles.note}>{place.note}</p>
            </div>

            <p className={styles.distance}>
              <span className={styles.approx} aria-hidden="true">
                &asymp;
              </span>
              <span className={styles.km}>{place.distanceKm}</span>
              <abbr title="kilometres">km</abbr>
              <span className="visually-hidden">
                , {compassFor(place.bearing)} of Thanjavur
              </span>
            </p>

            <span className={styles.track} aria-hidden="true">
              <motion.span
                className={`${styles.fill} ${
                  place.tier === 1 ? styles.fillNear : ""
                }`}
                initial={reduced ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 1,
                  delay: 0.06 * index,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ width: `${barWidth(place.distanceKm)}%` }}
              />
            </span>
          </li>
        ))}
      </ul>

      <p className={styles.legend}>
        <span className={styles.legendKey}>
          <span className={`${styles.swatch} ${styles.swatchGold}`} />
          Under an hour
        </span>
        <span className={styles.legendKey}>
          <span className={`${styles.swatch} ${styles.swatchBlue}`} />
          Wider region
        </span>
        <span className={styles.footnote}>
          Approximate road distances — verify before relying on them
        </span>
      </p>
    </div>
  );
}
