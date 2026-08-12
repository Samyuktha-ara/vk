import { ArrowRight, MapPin } from "lucide-react";

import Media from "./Media";
import { useChrome } from "../hooks/useChrome";
import { formatINR, formatRange } from "../utils/format";
import styles from "./ProjectCard.module.css";

/**
 * Large editorial project card.
 *
 * `layout="wide"`  — full-width alternating row
 * `layout="grid"`  — column card
 *
 * On a single-page site there is nowhere to navigate to, so the whole card is
 * one button that opens the enquiry with this development already selected —
 * one tab stop, one target, and the shortest path to a conversation.
 * Hover work happens in CSS: the photograph drifts, a gold datum draws across
 * the frame, the arrow steps forward.
 */
export default function ProjectCard({
  project,
  index = 0,
  layout = "wide",
  reversed = false,
  priority = false,
}) {
  const { openEnquiry } = useChrome();
  const price = formatINR(project.priceFrom);
  const area = formatRange(project.area?.min, project.area?.max, project.area?.unit);

  return (
    <article
      className={[
        styles.card,
        styles[layout],
        reversed ? styles.reversed : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        type="button"
        className={styles.link}
        onClick={() => openEnquiry(project.name)}
        aria-label={`${project.name} — ${project.type} in ${project.locality}, ${project.city}. Request details.`}
      >
        <div className={styles.visual}>
          <Media
            image={project.cover}
            ratio={layout === "wide" ? 4 / 3 : 3 / 2}
            sizes={
              layout === "wide"
                ? "(max-width: 900px) 100vw, 52vw"
                : "(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 33vw"
            }
            priority={priority}
            className={styles.frame}
            imgClassName={styles.img}
          />
          <span className={styles.index} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <Status status={project.status} />
        </div>

        <div className={styles.body}>
          <p className={styles.type}>{project.type}</p>

          <h3 className={styles.name}>{project.name}</h3>

          <p className={styles.location}>
            <MapPin size={13} aria-hidden="true" />
            {project.locality}, {project.city}
          </p>

          <p className={styles.tagline}>{project.tagline}</p>

          <dl className={styles.facts}>
            {price && (
              <div className={styles.fact}>
                <dt>From</dt>
                <dd>{price}</dd>
              </div>
            )}
            {area && (
              <div className={styles.fact}>
                <dt>Sizes</dt>
                <dd>{area}</dd>
              </div>
            )}
            {project.scale && (
              <div className={styles.fact}>
                <dt>Extent</dt>
                <dd>
                  {project.scale.value} {project.scale.unit}
                </dd>
              </div>
            )}
          </dl>

          <span className={styles.cta}>
            <span className={styles.ctaLabel}>Request Details</span>
            <ArrowRight size={16} aria-hidden="true" />
            <span className={styles.ctaRule} aria-hidden="true" />
          </span>
        </div>
      </button>
    </article>
  );
}

export function Status({ status }) {
  const tone =
    status === "Ongoing" ? "ongoing" : status === "Upcoming" ? "upcoming" : "done";

  return (
    <span className={`${styles.status} ${styles[tone]}`}>
      <span className={styles.statusDot} aria-hidden="true" />
      {status}
    </span>
  );
}
