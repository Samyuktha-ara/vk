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
          standfirst="Ongoing, upcoming and delivered. We keep the finished ones here on purpose — a completed layout tells you more about a developer than a brochure ever will."
        />

        {/* A compact grid rather than full-width rows: six developments should
            be scannable in one screen, not six. */}
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
            Ask for any project&apos;s masterplan, specification, availability
            and approval file — we will send the whole set.
          </p>
          <Button variant="outline" onClick={() => openEnquiry("")} arrow>
            Request Project Details
          </Button>
        </div>
      </div>
    </section>
  );
}
