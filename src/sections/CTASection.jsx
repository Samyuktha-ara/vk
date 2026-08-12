import { Phone, MessageCircle } from "lucide-react";

import Button from "../components/Button";
import { Reveal, LineReveal } from "../components/Reveal";
import { business, telHref } from "../data/business";
import { whatsappLink } from "../utils/whatsapp";
import styles from "./CTASection.module.css";

/** The closing statement. One idea, one image, two ways to act. */
export default function CTASection({
  lines = ["Your next address", "could be your", "best decision."],
  body = "Explore our properties in Thanjavur and find a space designed around the future you want to build.",
  primary = { label: "Explore Properties", to: "/#properties" },
  secondary = { label: "Speak With Us", to: "/#contact" },
}) {
  return (
    <section
      className={`on-dark grain ${styles.section}`}
      aria-labelledby="cta-heading"
    >
      {/* Architectural datum lines — the skyline motif, at its quietest */}
      <span className={styles.lines} aria-hidden="true">
        {Array.from({ length: 9 }).map((_, index) => (
          <span key={index} style={{ "--i": index }} />
        ))}
      </span>

      <div className={`container ${styles.inner}`}>
        <LineReveal
          as="h2"
          id="cta-heading"
          lines={lines}
          className={styles.heading}
        />

        <Reveal delay={0.18}>
          <p className={styles.body}>{body}</p>
        </Reveal>

        <Reveal delay={0.26} className={styles.actions}>
          <Button to={primary.to} variant="gold" size="lg" arrow>
            {primary.label}
          </Button>
          <Button to={secondary.to} variant="outline" size="lg">
            {secondary.label}
          </Button>
        </Reveal>

        <Reveal delay={0.34} className={styles.direct}>
          <a href={telHref} className={styles.directLink}>
            <Phone size={14} aria-hidden="true" />
            {business.contact.phoneDisplay}
          </a>
          <span className={styles.divider} aria-hidden="true" />
          <a
            href={whatsappLink()}
            className={styles.directLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={14} aria-hidden="true" />
            Message on WhatsApp
          </a>
          <span className={styles.divider} aria-hidden="true" />
          <span className={styles.hours}>{business.contact.officeHours}</span>
        </Reveal>
      </div>
    </section>
  );
}
