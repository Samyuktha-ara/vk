import Seo, { JsonLd } from "../components/Seo";

import Hero from "../sections/Hero";
import ArchitecturalReveal from "../sections/ArchitecturalReveal";
import Stats from "../sections/Stats";
import WhatWeDo from "../sections/WhatWeDo";
import FeaturedProjects from "../sections/FeaturedProjects";
import WhyUs from "../sections/WhyUs";
import LocationSection from "../sections/LocationSection";
import ContactSection from "../sections/ContactSection";
import CTASection from "../sections/CTASection";

import { useImmersiveHero } from "../hooks/useChrome";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { projects } from "../data/projects";
import { localBusinessSchema, projectSchema } from "../utils/seo";

/**
 * The site — one page, seven sections.
 *
 * Deliberately short. A visitor should be able to work out who this company
 * is, what it builds, where, why it can be trusted and how to reach it,
 * without a single click. Anything that did not serve one of those five
 * questions was cut.
 */
export default function Home() {
  /* The hero is full-bleed dark only on narrow screens. On desktop it is a
     split composition with a white editorial column, where a transparent
     navigation would wash a scrim across the type. */
  const fullBleedHero = useMediaQuery("(max-width: 1024px)");
  useImmersiveHero(fullBleedHero);

  return (
    <>
      <Seo
        title="Real Estate & Property Developers in Thanjavur"
        description="VK Real Estate & Promoters develops residential plots, villas, apartments and commercial property in Thanjavur, Tamil Nadu. Building trust, creating futures."
        path="/"
      />

      {/* Every development is described on this page, so each one is eligible
          for its own Product entry in the graph. */}
      <JsonLd
        schema={[localBusinessSchema(), ...projects.map(projectSchema)]}
      />

      <Hero />
      <ArchitecturalReveal />
      <Stats />
      <WhatWeDo />
      <FeaturedProjects />
      <WhyUs />
      <LocationSection />
      <ContactSection />
      <CTASection />
    </>
  );
}
