import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import Button from "../components/Button";
import { Reveal } from "../components/Reveal";
import { projects } from "../data/projects";
import { useChrome } from "../hooks/useChrome";
import styles from "./FeaturedProjects.module.css";

export default function FeaturedProjects() {
  const { openEnquiry } = useChrome();

  return (
    <section
      id="projects"
      className={`section ${styles.section}`}
      aria-labelledby="projects-heading"
    >
      <div className="container">
        <SectionHeading
          id="projects-heading"
          index="04"
          label="Our Developments"
          lines={["Spaces worth", "coming home to."]}
          standfirst="What is on the market right now — completed houses ready to move into, and plots in a serviced layout. Prices are as quoted and slightly negotiable."
        />

        {/* A compact grid rather than full-width rows: the whole inventory
            should be scannable in one screen. */}
        <div className={styles.grid}>
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={(index % 3) * 0.07} amount={0.2}>
              <ProjectCard
                project={project}
                index={index}
                layout="grid"
                priority={index < 3}
              />
            </Reveal>
          ))}
        </div>

        <div className={styles.foot}>
          <p className={styles.footNote}>
            Ask about any listing and we will send photographs, documents and
            arrange a site visit.
          </p>
          <Button variant="outline" onClick={() => openEnquiry("")} arrow>
            Request Project Details
          </Button>
        </div>
      </div>
    </section>
  );
}
