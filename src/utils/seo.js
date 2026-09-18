import { business, fullAddress } from "../data/business";
import { formatINRExact } from "./format";

const SITE = business.site.url.replace(/\/$/, "");

export const absoluteUrl = (path = "/") =>
  `${SITE}${path.startsWith("/") ? path : `/${path}`}`;

/* ==========================================================================
   JSON-LD BUILDERS
   Every builder omits fields the business has not supplied, so no structured
   data is emitted for information that does not exist.
   ========================================================================== */

const postalAddress = () => ({
  "@type": "PostalAddress",
  streetAddress: business.address.line1,
  addressLocality: business.address.locality,
  addressRegion: business.address.region,
  postalCode: business.address.postalCode,
  addressCountry: business.address.country,
});

const socialProfiles = () =>
  Object.values(business.social).filter(Boolean);

export const organizationSchema = () => {
  const sameAs = socialProfiles();
  return prune({
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": absoluteUrl("/#organization"),
    name: business.brand.name,
    legalName: business.brand.legalName,
    url: absoluteUrl("/"),
    logo: absoluteUrl(business.brand.logoFull),
    image: absoluteUrl(business.site.defaultOgImage),
    description: `${business.brand.name} develops and sells residential plots, agricultural land and houses in Thanjavur, Tamil Nadu.`,
    telephone: business.contact.phoneHref,
    email: business.contact.email,
    address: postalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.address.geo.lat,
      longitude: business.address.geo.lng,
    },
    areaServed: {
      "@type": "City",
      name: "Thanjavur",
      containedInPlace: { "@type": "State", name: "Tamil Nadu" },
    },
    foundingDate: business.brand.established
      ? String(business.brand.established)
      : undefined,
    sameAs: sameAs.length ? sameAs : undefined,
    knowsLanguage: ["en", "ta"],
  });
};

export const websiteSchema = () =>
  prune({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: absoluteUrl("/"),
    name: business.brand.name,
    inLanguage: business.site.language,
    publisher: { "@id": absoluteUrl("/#organization") },
  });

export const breadcrumbSchema = (trail = []) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.label,
    item: absoluteUrl(crumb.to),
  })),
});

export const faqSchema = (faqs = []) => {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
};

/** Development (plots, farmland or houses) → Product with an Offer. */
export const projectSchema = (project) => {
  const rate = project.priceRate;
  const price = project.priceFrom ?? rate?.value;
  const priceDescription = [
    rate ? `₹${rate.value.toLocaleString("en-IN")} per ${rate.unit}` : "Quoted price",
    project.priceNote,
  ]
    .filter(Boolean)
    .join(" — ");

  return prune({
    "@context": "https://schema.org",
    "@type": "Product",
    name: project.name,
    description: project.summary,
    image: project.gallery?.slice(0, 4).map((img) => absoluteUrl(img.src)),
    category: project.type,
    brand: { "@type": "Brand", name: business.brand.name },
    offers: price
      ? prune({
          "@type": "Offer",
          price,
          priceCurrency: "INR",
          /* Everything listed is for sale unless it explicitly says otherwise. */
          availability:
            project.available === 0
              ? "https://schema.org/SoldOut"
              : "https://schema.org/InStock",
          /* Single-page site: every listing lives in the projects section. */
          url: absoluteUrl("/#projects"),
          seller: { "@id": absoluteUrl("/#organization") },
          priceSpecification: rate
            ? {
                "@type": "UnitPriceSpecification",
                price: rate.value,
                priceCurrency: "INR",
                unitText: rate.unit,
                valueAddedTaxIncluded: false,
                description: priceDescription,
              }
            : {
                "@type": "PriceSpecification",
                price,
                priceCurrency: "INR",
                valueAddedTaxIncluded: false,
                description: priceDescription,
              },
        })
      : undefined,
  });
};

export const propertySchema = (property) =>
  prune({
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${property.name} — ${property.projectName}`,
    description: property.summary,
    image: property.gallery?.map((img) => img.src),
    category: property.type,
    brand: { "@type": "Brand", name: business.brand.name },
    offers: prune({
      "@type": "Offer",
      price: property.price,
      priceCurrency: "INR",
      availability:
        property.available > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
      url: absoluteUrl(`/properties/${property.slug}`),
      seller: { "@id": absoluteUrl("/#organization") },
      description: formatINRExact(property.price)
        ? `${formatINRExact(property.price)} — indicative`
        : undefined,
    }),
    additionalProperty: [
      property.area && {
        "@type": "PropertyValue",
        name: "Area",
        value: `${property.area} ${property.areaUnit}`,
      },
      property.bedrooms && {
        "@type": "PropertyValue",
        name: "Bedrooms",
        value: property.bedrooms,
      },
      property.facing && {
        "@type": "PropertyValue",
        name: "Facing",
        value: property.facing,
      },
    ].filter(Boolean),
  });

export const localBusinessSchema = () =>
  prune({
    ...organizationSchema(),
    "@id": absoluteUrl("/locations#localbusiness"),
    "@type": "RealEstateAgent",
    priceRange: "₹₹₹",
    openingHours: business.contact.officeHours,
    hasMap: business.address.mapsUrl,
    address: { ...postalAddress(), name: fullAddress },
  });

/** Recursively drop undefined / null / empty values. */
function prune(value) {
  if (Array.isArray(value)) {
    const cleaned = value.map(prune).filter((v) => v !== undefined);
    return cleaned.length ? cleaned : undefined;
  }
  if (value && typeof value === "object") {
    const out = {};
    for (const [key, val] of Object.entries(value)) {
      const cleaned = prune(val);
      if (cleaned !== undefined) out[key] = cleaned;
    }
    return Object.keys(out).length ? out : undefined;
  }
  return value === null || value === "" ? undefined : value;
}
