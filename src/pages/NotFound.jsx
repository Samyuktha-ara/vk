import Seo from "../components/Seo";
import Button from "../components/Button";
import Media from "../components/Media";
import { Reveal, LineReveal } from "../components/Reveal";
import media from "../data/media";
import { projects } from "../data/projects";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found"
        description="The page you were looking for is not here. Browse our projects and available property in Thanjavur instead."
        path="/404"
        noindex
      />

      <section className={`on-dark ${styles.page}`}>
        <div className={styles.visual} aria-hidden="true">
          <Media image={media.land} ratio={16 / 9} priority sizes="100vw" className={styles.frame} />
          <span className={styles.scrim} />
        </div>

        <div className={`container ${styles.inner}`}>
          <p className={styles.code}>404</p>

          <LineReveal
            as="h1"
            lines={["This address", "does not exist."]}
            className={styles.heading}
          />

          <Reveal delay={0.15}>
            <p className={styles.body}>
              The page you were looking for has moved or was never here. Our
              projects, on the other hand, are exactly where we left them.
            </p>
          </Reveal>

          <Reveal delay={0.22} className={styles.actions}>
            <Button to="/#projects" variant="gold" size="lg" arrow>
              View Projects
            </Button>
            <Button to="/" variant="outline" size="lg">
              Back to Home
            </Button>
          </Reveal>

          <Reveal delay={0.3} className={styles.shortcuts}>
            <p className={styles.shortcutsLabel}>Current developments</p>
            <ul>
              {projects.slice(0, 4).map((project) => (
                <li key={project.id}>
                  <Button to="/#projects" variant="quiet" size="sm" arrow>
                    {project.name}
                  </Button>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
