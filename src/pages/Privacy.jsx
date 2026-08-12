import { TriangleAlert } from "lucide-react";

import Seo, { JsonLd } from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import { Reveal } from "../components/Reveal";
import { business, fullAddress, mailHref } from "../data/business";
import { breadcrumbSchema } from "../utils/seo";
import styles from "./Legal.module.css";

const TRAIL = [
  { label: "Home", to: "/" },
  { label: "Privacy Policy", to: "/privacy-policy" },
];

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description={`How ${business.brand.name} collects, uses and protects the personal information you share through this website.`}
        path="/privacy-policy"
      />
      <JsonLd schema={breadcrumbSchema(TRAIL)} />

      <article className={styles.page}>
        <div className="container-narrow">
          <header className={styles.head}>
            <Breadcrumbs trail={TRAIL} tone="dark" />
            <h1 className={styles.title}>Privacy Policy</h1>
            <p className={styles.updated}>Last updated — to be confirmed on publication</p>

            <div className={styles.notice}>
              <TriangleAlert size={16} aria-hidden="true" />
              <p>
                <strong>Template — requires legal review.</strong> This policy
                is a starting draft written to describe how the site actually
                behaves. It has not been reviewed by a lawyer and must be
                checked against the Digital Personal Data Protection Act, 2023
                and any other applicable law before the site goes live.
              </p>
            </div>
          </header>

          <div className={styles.body}>
            <Reveal as="section" className={styles.section}>
              <h2 data-index="01">Who we are</h2>
              <p>
                {business.brand.legalName} operates this website and is
                responsible for personal information collected through it. Our
                registered contact address is {fullAddress}.
              </p>
            </Reveal>

            <Reveal as="section" className={styles.section}>
              <h2 data-index="02">What we collect</h2>
              <p>We collect only what you choose to give us:</p>
              <ul>
                <li>Your name, phone number and, if you provide it, your email address.</li>
                <li>The project or property you enquired about, and any budget range you selected.</li>
                <li>Anything you write in the message field of an enquiry form.</li>
              </ul>
              <p>
                We do not require you to create an account, and we do not ask
                for identity documents or financial information through this
                website.
              </p>
            </Reveal>

            <Reveal as="section" className={styles.section}>
              <h2 data-index="03">Why we use it</h2>
              <p>
                Your details are used to respond to your enquiry, to send the
                project information you asked for, and to arrange a site visit
                or consultation. If you go on to purchase, we use them for the
                transaction and the statutory documentation it requires.
              </p>
              <p>
                We do not sell your information, and we do not share it with
                third parties for their own marketing.
              </p>
            </Reveal>

            <Reveal as="section" className={styles.section}>
              <h2 data-index="04">WhatsApp and calls</h2>
              <p>
                If you contact us through WhatsApp, that conversation is carried
                on WhatsApp&apos;s infrastructure and is subject to their privacy
                terms as well as ours. If you submit an enquiry form while our
                server endpoint is not configured, the form composes a WhatsApp
                message for you to send — nothing is transmitted until you send
                it yourself.
              </p>
            </Reveal>

            <Reveal as="section" className={styles.section}>
              <h2 data-index="05">Cookies and analytics</h2>
              <p>
                This website sets no advertising or tracking cookies of its own.
                If analytics are added later, this section must be updated to
                name the provider, what it records and how to opt out.
              </p>
            </Reveal>

            <Reveal as="section" className={styles.section}>
              <h2 data-index="06">How long we keep it</h2>
              <p>
                Enquiry records are kept only as long as they are useful for the
                conversation you started, and for as long as any resulting
                transaction requires us to retain them by law. Ask us to delete
                your details and we will, unless a statutory obligation prevents
                it.
              </p>
            </Reveal>

            <Reveal as="section" className={styles.section}>
              <h2 data-index="07">Your rights</h2>
              <p>
                You may ask us what we hold about you, ask us to correct it, ask
                us to delete it, or withdraw your consent to being contacted. We
                will act on any such request within a reasonable period.
              </p>
            </Reveal>

            <Reveal as="section" className={styles.section}>
              <h2 data-index="08">External links</h2>
              <p>
                This site links to third-party services including Google Maps,
                WhatsApp and — while placeholder photography remains in place —
                an external image host. Those services have their own privacy
                practices, which we do not control.
              </p>
            </Reveal>

            <div className={styles.contactBlock}>
              <p>
                Questions about this policy, or a request about your data?
                Write to <a href={mailHref}>{business.contact.email}</a> or call{" "}
                <a href={`tel:${business.contact.phoneHref}`}>
                  {business.contact.phoneDisplay}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
