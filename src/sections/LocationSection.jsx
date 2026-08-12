import SectionHeading from "../components/SectionHeading";
import ThanjavurMap from "../components/ThanjavurMap";
import Button from "../components/Button";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import { advantages, cityProfile } from "../data/locations";
import styles from "./LocationSection.module.css";

export default function LocationSection() {
  return (
    <section
      id="location"
      className={`section ${styles.section}`}
      aria-labelledby="location-heading"
    >
      <div className="container">
        <SectionHeading
          id="location-heading"
          index="06"
          label="The Location"
          lines={["Rooted in Thanjavur.", "Built for tomorrow."]}
          standfirst={cityProfile.standfirst}
          aside={
            <Button to="/#contact" variant="quiet" arrow>
              Ask About a Corridor
            </Button>
          }
        />

        <div className={styles.layout}>
          <Reveal className={styles.mapColumn} amount={0.2}>
            <ThanjavurMap />
          </Reveal>

          <Stagger className={styles.advantages} step={0.08}>
            {advantages.slice(0, 3).map((advantage) => (
              <StaggerItem
                key={advantage.id}
                as="article"
                className={styles.advantage}
              >
                <p className={styles.advIndex}>{advantage.index}</p>
                <h3 className={styles.advTitle}>{advantage.title}</h3>
                <p className={styles.advBody}>{advantage.body}</p>
                <ul className={styles.facts}>
                  {advantage.facts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.1}>
          <p className={styles.foot}>
            We build along five corridors out of the city — Vallam Road,
            Nanjikottai Road, Medical College Road, the Kumbakonam road and
            Trichy Main Road — chosen because each already carries the schools,
            hospitals and daily traffic that make an address work.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
