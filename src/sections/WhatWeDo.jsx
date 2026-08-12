import SectionHeading from "../components/SectionHeading";
import { Stagger, StaggerItem } from "../components/Reveal";
import { useChrome } from "../hooks/useChrome";
import styles from "./WhatWeDo.module.css";

/**
 * What the company actually does — the answer a first-time visitor is looking
 * for, in four lines rather than four pages.
 */
const OFFERINGS = [
  {
    index: "01",
    title: "Residential Plots",
    body: "Gated, approved layouts with roads, drainage and planting delivered before handover. For buyers who want to own the land and build in their own time.",
  },
  {
    index: "02",
    title: "Villas",
    body: "Independent houses on individually titled plots, planned around courtyards, shade and cross-ventilation. Built to a written specification, checked stage by stage.",
  },
  {
    index: "03",
    title: "Apartments",
    body: "Low-rise blocks where every home has two external walls and a balcony deep enough to use. Smaller buildings, lower running costs, better-managed common areas.",
  },
  {
    index: "04",
    title: "Commercial",
    body: "Retail frontage and flexible upper floors on the corridors that carry district traffic. Bought for the tenant it can hold, not the picture it makes.",
  },
];

export default function WhatWeDo() {
  const { openEnquiry } = useChrome();

  return (
    <section
      id="services"
      className={`section ${styles.section}`}
      aria-labelledby="services-heading"
    >
      <div className="container">
        <SectionHeading
          id="services-heading"
          index="03"
          label="What We Do"
          lines={["Four ways to own", "in Thanjavur."]}
          standfirst="We develop and sell land and property across Thanjavur — and we will tell you plainly which of these suits what you are actually trying to do."
        />

        <Stagger className={styles.grid} step={0.07}>
          {OFFERINGS.map((item) => (
            <StaggerItem as="article" key={item.index} className={styles.item}>
              <p className={styles.index}>{item.index}</p>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.body}>{item.body}</p>
              <button
                type="button"
                className={styles.link}
                onClick={() => openEnquiry(item.title)}
              >
                Enquire
                <span className={styles.linkRule} aria-hidden="true" />
              </button>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
