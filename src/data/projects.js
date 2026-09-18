import media from "./media.js";

/* ==========================================================================
   PROJECTS  —  LIVE CATALOGUE
   --------------------------------------------------------------------------
   Real inventory supplied by the company (photographs in /photos-src, prices
   as quoted). Every figure here was given by the company; nothing is
   invented. Fields still marked `null` are simply not known yet — the UI
   hides them rather than guessing.

   TODO(client): supply for each listing — a name (if the house / layout has
   one), the locality, built-up area / plot size, bedrooms and approvals.

   The shape is deliberately CMS-friendly: swapping this file for a fetch()
   against Strapi / Sanity / a REST API requires no component changes.
   ========================================================================== */

export const PROJECTS_ARE_PLACEHOLDER = false;

export const PROJECT_STATUS = {
  ONGOING: "Ongoing",
  UPCOMING: "Upcoming",
  COMPLETED: "Completed",
  READY: "Ready to Move",
};

export const PROPERTY_TYPES = ["Residential Plots", "Independent Houses"];

const CITY = "Thanjavur";
const REGION = "Tamil Nadu";
const NEGOTIABLE = "Slightly negotiable";

export const projects = [
  {
    id: "prj-001",
    slug: "residential-plot",
    name: "Residential Plot",
    type: "Residential Plots",
    status: PROJECT_STATUS.ONGOING,
    locality: null,
    city: CITY,
    region: REGION,
    /* Land is quoted per square foot, not as a lump sum. */
    priceFrom: null,
    priceRate: { value: 3000, unit: "sq.ft" },
    priceNote: NEGOTIABLE,
    area: null,
    scale: null,
    approvals: [],
    tagline: "Levelled, road-fronted plots in a serviced layout — own the land and build in your own time.",
    summary:
      "Residential plots in Thanjavur at ₹3,000 per sq.ft, slightly negotiable. Levelled ground, internal roads and a site office on the layout.",
    cover: media.land,
    gallery: [media.land, media.landTall],
    seo: {
      title: "Residential Plots, Thanjavur — ₹3,000 per sq.ft",
      description:
        "Serviced residential plots in Thanjavur from VK Real Estate & Promoters at ₹3,000 per sq.ft, slightly negotiable.",
    },
  },

  {
    id: "prj-002",
    slug: "independent-house-1",
    name: "Independent House I",
    type: "Independent Houses",
    status: PROJECT_STATUS.READY,
    locality: null,
    city: CITY,
    region: REGION,
    priceFrom: 6800000,
    priceLabel: "Price",
    priceNote: NEGOTIABLE,
    area: null,
    scale: null,
    approvals: [],
    tagline: "A completed single-storey home with a covered front verandah and a laser-cut gate.",
    summary:
      "Completed independent house in Thanjavur, ready to move in — ₹68 lakh, slightly negotiable.",
    cover: media.house1,
    gallery: [media.house1, media.house1Tall],
    seo: {
      title: "Independent House for Sale, Thanjavur — ₹68 L",
      description:
        "Ready-to-move independent house in Thanjavur from VK Real Estate & Promoters at ₹68 lakh, slightly negotiable.",
    },
  },

  {
    id: "prj-003",
    slug: "independent-house-2",
    name: "Independent House II",
    type: "Independent Houses",
    status: PROJECT_STATUS.READY,
    locality: null,
    city: CITY,
    region: REGION,
    priceFrom: 6500000,
    priceLabel: "Price",
    priceNote: NEGOTIABLE,
    area: null,
    scale: null,
    approvals: [],
    tagline: "A compact completed home with an external stair to a usable terrace.",
    summary:
      "Completed independent house in Thanjavur, ready to move in — ₹65 lakh, slightly negotiable.",
    cover: media.house2,
    gallery: [media.house2, media.house2Tall],
    seo: {
      title: "Independent House for Sale, Thanjavur — ₹65 L",
      description:
        "Ready-to-move independent house in Thanjavur from VK Real Estate & Promoters at ₹65 lakh, slightly negotiable.",
    },
  },

  {
    id: "prj-004",
    slug: "independent-house-3",
    name: "Independent House III",
    type: "Independent Houses",
    status: PROJECT_STATUS.READY,
    locality: null,
    city: CITY,
    region: REGION,
    priceFrom: 7300000,
    priceLabel: "Price",
    priceNote: NEGOTIABLE,
    area: null,
    scale: null,
    approvals: [],
    tagline: "A completed home with a textured feature wall, terracotta jali screen and a planted entrance.",
    summary:
      "Completed independent house in Thanjavur, ready to move in — ₹73 lakh, slightly negotiable.",
    cover: media.house3,
    gallery: [media.house3, media.house3Tall],
    seo: {
      title: "Independent House for Sale, Thanjavur — ₹73 L",
      description:
        "Ready-to-move independent house in Thanjavur from VK Real Estate & Promoters at ₹73 lakh, slightly negotiable.",
    },
  },
];

/* ---- Selectors ---------------------------------------------------------- */

export const getProjectBySlug = (slug) =>
  projects.find((project) => project.slug === slug);

export const featuredProjects = projects;

export const projectLocalities = [
  ...new Set(projects.map((p) => p.locality).filter(Boolean)),
].sort();

export default projects;
