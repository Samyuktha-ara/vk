import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

import Logo from "./Logo";
import { Instagram, Facebook, Youtube, Linkedin } from "./SocialIcons";
import { footerNav } from "../data/navigation";
import { business, fullAddress, telHref, mailHref } from "../data/business";
import { whatsappLink } from "../utils/whatsapp";
import styles from "./Footer.module.css";

const SOCIAL_ICONS = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
};

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = Object.entries(business.social).filter(([, url]) => url);

  return (
    <footer className={`on-dark grain ${styles.footer}`}>
      <div className={`container ${styles.inner}`}>
        {/* ---- Brand ------------------------------------------------- */}
        <div className={styles.brand}>
          <Link to="/" aria-label={`${business.brand.name} — home`}>
            <Logo variant="light" withTagline />
          </Link>

          <p className={styles.about}>
            {business.brand.legalName} develops residential plots, villas,
            apartments and commercial property in Thanjavur, Tamil Nadu — built
            around long-term value rather than the fastest possible sale.
          </p>

          {socials.length > 0 && (
            <ul className={styles.social}>
              {socials.map(([key, url]) => {
                const Icon = SOCIAL_ICONS[key];
                return (
                  <li key={key}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${business.brand.name} on ${key}`}
                    >
                      <Icon size={16} aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* ---- Navigation -------------------------------------------- */}
        <nav className={styles.nav} aria-label="Footer">
          {footerNav.map((group) => (
            <div key={group.heading} className={styles.navGroup}>
              <h2 className={styles.navHeading}>{group.heading}</h2>
              <ul className={styles.navList}>
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className={styles.navLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* ---- Contact ------------------------------------------------ */}
        <div className={styles.contact}>
          <h2 className={styles.navHeading}>Get in touch</h2>

          <ul className={styles.contactList}>
            <li>
              <a href={telHref} className={styles.contactLink}>
                <Phone size={15} aria-hidden="true" />
                {business.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink()}
                className={styles.contactLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={15} aria-hidden="true" />
                WhatsApp
              </a>
            </li>
            <li>
              <a href={mailHref} className={styles.contactLink}>
                <Mail size={15} aria-hidden="true" />
                {business.contact.email}
              </a>
            </li>
            <li>
              <a
                href={business.address.mapsUrl}
                className={styles.contactLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin size={15} aria-hidden="true" />
                <address className={styles.address}>{fullAddress}</address>
              </a>
            </li>
          </ul>

          <p className={styles.hours}>{business.contact.officeHours}</p>
        </div>
      </div>

      {/* ---- Base bar ------------------------------------------------ */}
      <div className={styles.baseWrap}>
        <div className={`container ${styles.base}`}>
          <p className={styles.copy}>
            © {year} {business.brand.legalName}. All rights reserved.
          </p>

          <ul className={styles.legal}>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms of Use</Link>
            </li>
            {business.credentials.reraNumber && (
              <li>
                <a
                  href={business.credentials.reraUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  RERA {business.credentials.reraNumber}
                </a>
              </li>
            )}
          </ul>

          <p className={styles.origin}>Thanjavur, Tamil Nadu</p>
        </div>
      </div>

      {/* The final gold line — the last thing on the page. */}
      <span className={styles.goldLine} aria-hidden="true" />
    </footer>
  );
}
