import { Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react";

import SectionHeading from "../components/SectionHeading";
import ContactForm from "../components/ContactForm";
import { Reveal } from "../components/Reveal";
import { business, fullAddress, telHref, mailHref } from "../data/business";
import { whatsappLink } from "../utils/whatsapp";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  const channels = [
    {
      icon: Phone,
      label: "Call",
      value: business.contact.phoneDisplay,
      href: telHref,
      note: "Straight through to an advisor, not a call centre.",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Message us",
      href: whatsappLink(),
      external: true,
      note: "Fastest for site photographs and quick questions.",
    },
    {
      icon: Mail,
      label: "Email",
      value: business.contact.email,
      href: mailHref,
      note: "Best for documentation requests.",
    },
    {
      icon: MapPin,
      label: "Office",
      value: fullAddress,
      href: business.address.mapsUrl,
      external: true,
      note: "Visits welcome — call ahead so someone is free for you.",
    },
  ];

  return (
    <section
      id="contact"
      className={`section ${styles.section}`}
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <SectionHeading
          id="contact-heading"
          index="07"
          label="Contact"
          lines={["Start a", "conversation."]}
          standfirst="No obligation, no follow-up campaign. Tell us what you are looking for and we will send the details — including when the honest answer is that we do not have it."
        />

        <div className={styles.grid}>
          <div className={styles.channels}>
            <ul className={styles.channelList}>
              {channels.map((channel, index) => {
                const Icon = channel.icon;
                return (
                  <Reveal
                    as="li"
                    key={channel.label}
                    delay={index * 0.06}
                    className={styles.channel}
                  >
                    <a
                      href={channel.href}
                      className={styles.channelLink}
                      {...(channel.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      <span className={styles.channelIcon}>
                        <Icon size={16} aria-hidden="true" />
                      </span>
                      <span className={styles.channelBody}>
                        <span className={styles.channelLabel}>
                          {channel.label}
                        </span>
                        <span className={styles.channelValue}>
                          {channel.value}
                        </span>
                        <span className={styles.channelNote}>{channel.note}</span>
                      </span>
                    </a>
                  </Reveal>
                );
              })}
            </ul>

            <Reveal delay={0.28}>
              <p className={styles.hours}>
                <Clock size={14} aria-hidden="true" />
                {business.contact.officeHours}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12} className={styles.formPanel}>
            <p className={styles.formLabel}>
              <span className={styles.formRule} aria-hidden="true" />
              Request a consultation
            </p>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
