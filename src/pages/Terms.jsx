import { TriangleAlert } from "lucide-react";

import Seo, { JsonLd } from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import { Reveal } from "../components/Reveal";
import { business, mailHref } from "../data/business";
import { breadcrumbSchema } from "../utils/seo";
import styles from "./Legal.module.css";

const TRAIL = [
  { label: "Home", to: "/" },
  { label: "Terms of Use", to: "/terms" },
];

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms of Use"
        description={`Terms governing the use of the ${business.brand.name} website, including how project information, imagery and pricing on this site should be treated.`}
        path="/terms"
      />
      <JsonLd schema={breadcrumbSchema(TRAIL)} />

      <article className={styles.page}>
        <div className="container-narrow">
          <header className={styles.head}>
            <Breadcrumbs trail={TRAIL} tone="dark" />
            <h1 className={styles.title}>Terms of Use</h1>
            <p className={styles.updated}>Last updated — to be confirmed on publication</p>

            <div className={styles.notice}>
              <TriangleAlert size={16} aria-hidden="true" />
              <p>
                <strong>Template — requires legal review.</strong> These terms
                describe how the site is intended to work. They must be reviewed
                by a lawyer against RERA obligations and consumer law before
                publication.
              </p>
            </div>
          </header>

          <div className={styles.body}>
            <Reveal as="section" className={styles.section}>
              <h2 data-index="01">Information on this site is indicative</h2>
              <p>
                Project descriptions, layouts, unit sizes, availability counts,
                specifications and prices shown here are indicative and subject
                to change without notice. Nothing on this website is an offer or
                a contract.
              </p>
              <p>
                The binding position for any purchase is set out in the written
                agreement, the sanctioned plan and the registered documents —
                not in a web page.
              </p>
            </Reveal>

            <Reveal as="section" className={styles.section}>
              <h2 data-index="02">Imagery</h2>
              <p>
                Photographs, renders and diagrams are shown for design intent.
                They may depict a different project, a different stage of
                construction, or an artist&apos;s impression. Any connectivity
                diagram on this site is schematic and explicitly not to scale.
              </p>
            </Reveal>

            <Reveal as="section" className={styles.section}>
              <h2 data-index="03">No investment advice</h2>
              <p>
                Material describing location advantages or investment
                considerations is general information, not financial or
                investment advice. We do not project returns and we do not
                guarantee appreciation, rental income or resale liquidity.
                Property values depend on infrastructure, demand and timing,
                none of which we control.
              </p>
              <p>
                Take independent legal and financial advice before committing to
                any purchase.
              </p>
            </Reveal>

            <Reveal as="section" className={styles.section}>
              <h2 data-index="04">Prices and charges</h2>
              <p>
                Prices shown exclude stamp duty, registration charges, statutory
                levies and, where applicable, GST. A complete written cost sheet
                is issued before any booking, and that document — not this site
                — governs what is payable.
              </p>
            </Reveal>

            <Reveal as="section" className={styles.section}>
              <h2 data-index="05">Approvals and registration</h2>
              <p>
                Approval and registration details are published on the relevant
                project page only where they exist and can be evidenced. Where a
                field is blank, the approval has not been granted or has not yet
                been verified for publication. Ask us directly for the current
                position on any project, and verify it independently with the
                issuing authority.
              </p>
            </Reveal>

            <Reveal as="section" className={styles.section}>
              <h2 data-index="06">Use of this website</h2>
              <p>
                You may browse this site and download material for your own
                assessment of a purchase. You may not republish, scrape or
                commercially reuse its content, imagery or data without written
                permission.
              </p>
            </Reveal>

            <Reveal as="section" className={styles.section}>
              <h2 data-index="07">Third-party services</h2>
              <p>
                This site links to and relies on third-party services including
                Google Maps and WhatsApp. Their availability and behaviour are
                outside our control.
              </p>
            </Reveal>

            <Reveal as="section" className={styles.section}>
              <h2 data-index="08">Governing law</h2>
              <p>
                These terms are governed by the laws of India, and the courts at
                Thanjavur, Tamil Nadu have jurisdiction over any dispute arising
                from them.
              </p>
            </Reveal>

            <div className={styles.contactBlock}>
              <p>
                Questions about these terms? Write to{" "}
                <a href={mailHref}>{business.contact.email}</a> or call{" "}
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
