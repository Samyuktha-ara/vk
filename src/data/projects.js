import media from "./media.js";

/* ==========================================================================
   PROJECTS  —  PLACEHOLDER CATALOGUE
   --------------------------------------------------------------------------
   ⚠  Every project below is illustrative sample data with the shape a real
      CMS / backend would return. Names, localities, prices, unit counts and
      approvals are NOT real. Replace wholesale before launch.

   The shape is deliberately CMS-friendly: swapping this file for a fetch()
   against Strapi / Sanity / a REST API requires no component changes.
   ========================================================================== */

export const PROJECTS_ARE_PLACEHOLDER = true;

export const PROJECT_STATUS = {
  ONGOING: "Ongoing",
  UPCOMING: "Upcoming",
  COMPLETED: "Completed",
};

export const PROPERTY_TYPES = [
  "Residential Plots",
  "Villas",
  "Apartments",
  "Premium Residences",
  "Commercial",
  "Agricultural Land",
];

export const projects = [
  {
    id: "prj-001",
    slug: "vasantham-enclave",
    name: "Vasantham Enclave",
    isPlaceholder: true,
    type: "Residential Plots",
    status: PROJECT_STATUS.ONGOING,
    locality: "Vallam Road",
    city: "Thanjavur",
    region: "Tamil Nadu",
    coordinates: { lat: 10.7402, lng: 79.0741 },
    priceFrom: 2450000,
    priceNote: "per plot, indicative",
    area: { min: 1200, max: 2400, unit: "sq.ft" },
    scale: { value: 14, unit: "acres" },
    totalUnits: 128,
    availableUnits: 41,
    possession: "Phase II handover in progress",
    approvals: [], // e.g. ["DTCP approved", "RERA registered"] — only when true
    tagline: "A gated plotted development shaped around light, air and long horizons.",
    summary:
      "Vasantham Enclave is planned as a low-density plotted community — wide internal roads, generous setbacks and a landscaped spine that runs the full length of the site. Every plot is oriented to hold a home that breathes.",
    description: [
      "The masterplan begins with restraint. Rather than maximising plot count, the layout gives away land to movement and greenery: a 30-foot primary avenue, 23-foot internal roads, and a continuous planted edge that softens the boundary on all four sides.",
      "Plots are laid out on a north–south grain wherever the site allows, so that homes built here can be planned with cross-ventilation and shaded western elevations — the two decisions that matter most in this climate.",
      "Infrastructure is delivered before handover, not after. Underground drainage, storm water channels, street lighting and avenue planting are part of the phase completion, so an owner can build the week they receive possession.",
    ],
    highlights: [
      { label: "Gated, single-entry community with a 24×7 manned gatehouse" },
      { label: "30 ft avenue and 23 ft internal roads, black-topped" },
      { label: "Underground drainage and storm water management" },
      { label: "Landscaped central spine with a walking loop" },
      { label: "Individual water and electricity provisions per plot" },
      { label: "Compound-ready plots with marked corner stones" },
    ],
    amenities: [
      "Manned gatehouse",
      "Avenue planting",
      "Walking loop",
      "Children's play lawn",
      "Street lighting",
      "Underground drainage",
      "Rainwater harvesting",
      "Compound wall",
    ],
    cover: media.aerialNeighbourhood,
    gallery: [
      media.aerialNeighbourhood,
      media.villaGarden,
      media.villaLawn,
      media.villaGardenDetail,
      media.editorialTall,
      media.villaCourtyard,
    ],
    masterPlan: {
      image: media.aerialNeighbourhood,
      caption:
        "Indicative masterplan — Phase I and II. Replace with the sanctioned layout drawing.",
      breakdown: [
        { label: "Total extent", value: "14 acres" },
        { label: "Plots", value: "128" },
        { label: "Open + landscaped area", value: "18%" },
        { label: "Plot sizes", value: "1,200 – 2,400 sq.ft" },
      ],
    },
    units: [
      { name: "Standard Plot", size: "1,200 sq.ft", facing: "East / West", price: 2450000, available: 22 },
      { name: "Premium Plot", size: "1,800 sq.ft", facing: "North / East", price: 3690000, available: 13 },
      { name: "Corner Plot", size: "2,400 sq.ft", facing: "Corner", price: 5150000, available: 6 },
    ],
    investment: {
      lead: "Land in a planned, approved layout behaves differently from unplanned land.",
      points: [
        "Vallam Road connects to the Thanjavur–Trichy corridor, one of the district's most consistently developed axes.",
        "Plotted land carries no depreciation on the structure, because there is no structure — the asset is the land itself.",
        "Owners can hold, build, or build in stages, which keeps the entry decision and the construction decision separate.",
      ],
    },
    faqs: [
      {
        q: "What approvals does the layout hold?",
        a: "Approval details for this project will be published here with the sanction numbers and issuing authority. Please request the current approval file from our team before committing to a purchase.",
      },
      {
        q: "Can I build immediately after registration?",
        a: "Plots in completed phases are handed over with roads, drainage and utility provisions in place, so construction can begin once your building plan approval is issued.",
      },
      {
        q: "Is bank funding available?",
        a: "Plot loans are offered by most nationalised and private banks against approved layouts. Our team can share the documentation set your lender will ask for.",
      },
    ],
    seo: {
      title: "Vasantham Enclave — Gated Residential Plots on Vallam Road, Thanjavur",
      description:
        "Vasantham Enclave is a gated plotted development on Vallam Road, Thanjavur — 1,200 to 2,400 sq.ft plots with black-topped roads, underground drainage and landscaped open space.",
    },
  },

  {
    id: "prj-002",
    slug: "marutham-villas",
    name: "Marutham Villas",
    isPlaceholder: true,
    type: "Villas",
    status: PROJECT_STATUS.ONGOING,
    locality: "Nanjikottai Road",
    city: "Thanjavur",
    region: "Tamil Nadu",
    coordinates: { lat: 10.7719, lng: 79.1523 },
    priceFrom: 8900000,
    priceNote: "indicative, all-inclusive of land and construction",
    area: { min: 1850, max: 2650, unit: "sq.ft" },
    scale: { value: 6.2, unit: "acres" },
    totalUnits: 34,
    availableUnits: 9,
    possession: "Rolling handover, Phase I complete",
    approvals: [],
    tagline: "Thirty-four houses, each planned around a private courtyard.",
    summary:
      "A compact community of independent villas where every home turns inward to a courtyard and outward to a garden. Built for shade, cross-ventilation and the way families actually use a house.",
    description: [
      "Marutham is a study in the courtyard house — a typology this region has understood for centuries. Each villa is planned around a small open-to-sky court that pulls daylight into the centre of the plan and moves warm air up and out.",
      "Elevations are quiet: rendered masonry, deep-set openings, timber screens where the western sun needs breaking. The intention is a house that ages well rather than one that photographs loudly on the day it is handed over.",
      "Structural work, waterproofing and services are executed by a single contracted team under our own site supervision, with stage-wise checks documented and shared with the buyer.",
    ],
    highlights: [
      { label: "Independent villas on individual titled plots" },
      { label: "Private open-to-sky courtyard in every home" },
      { label: "Covered car parking with charging provision" },
      { label: "Vitrified and natural stone flooring" },
      { label: "Solar water heating provision" },
      { label: "Stage-wise construction reporting to every buyer" },
    ],
    amenities: [
      "Community lawn",
      "Covered parking",
      "EV charging provision",
      "Solar water heating",
      "Rainwater harvesting",
      "Perimeter security",
      "Landscaped entry court",
      "Backup power for common areas",
    ],
    cover: media.villaGarden,
    gallery: [
      media.villaGarden,
      media.villaGardenDetail,
      media.villaCourtyard,
      media.interiorLiving,
      media.interiorKitchen,
      media.interiorLight,
    ],
    masterPlan: {
      image: media.villaLawn,
      caption:
        "Indicative site plan. Replace with the sanctioned layout and villa typologies.",
      breakdown: [
        { label: "Total extent", value: "6.2 acres" },
        { label: "Villas", value: "34" },
        { label: "Typologies", value: "3 BHK / 4 BHK" },
        { label: "Built-up range", value: "1,850 – 2,650 sq.ft" },
      ],
    },
    units: [
      { name: "Type A — 3 BHK", size: "1,850 sq.ft", facing: "East", price: 8900000, available: 5, bedrooms: 3 },
      { name: "Type B — 3 BHK + Study", size: "2,180 sq.ft", facing: "North", price: 10400000, available: 3, bedrooms: 3 },
      { name: "Type C — 4 BHK", size: "2,650 sq.ft", facing: "North-East", price: 13250000, available: 1, bedrooms: 4 },
    ],
    investment: {
      lead: "A villa serves two purposes at once — a home to live in and an asset with an independent title.",
      points: [
        "Independent titles mean the land component is owned outright rather than as an undivided share.",
        "Nanjikottai Road sits within the established residential belt of the city, close to schools and healthcare.",
        "Well-built independent houses in this segment see steady rental interest from professional families relocating to Thanjavur.",
      ],
    },
    faqs: [
      {
        q: "Do I own the land under the villa?",
        a: "Yes. Each villa sits on an individually titled plot, registered in the buyer's name, rather than on an undivided share of a larger parcel.",
      },
      {
        q: "Can the internal layout be customised?",
        a: "Non-structural changes — joinery, finishes, kitchen configuration — can be discussed before the relevant construction stage. Structural changes are not permitted.",
      },
      {
        q: "How is construction quality monitored?",
        a: "Work proceeds against a stage-wise checklist, and each completed stage is documented and shared with the buyer before the next payment milestone.",
      },
    ],
    seo: {
      title: "Marutham Villas — Courtyard Villas on Nanjikottai Road, Thanjavur",
      description:
        "Marutham Villas offers 3 and 4 BHK independent courtyard villas on Nanjikottai Road, Thanjavur, on individually titled plots with covered parking and landscaped common areas.",
    },
  },

  {
    id: "prj-003",
    slug: "kaveri-residences",
    name: "Kaveri Residences",
    isPlaceholder: true,
    type: "Apartments",
    status: PROJECT_STATUS.UPCOMING,
    locality: "Medical College Road",
    city: "Thanjavur",
    region: "Tamil Nadu",
    coordinates: { lat: 10.7594, lng: 79.1121 },
    priceFrom: 5400000,
    priceNote: "indicative launch pricing",
    area: { min: 1050, max: 1720, unit: "sq.ft" },
    scale: { value: 1.4, unit: "acres" },
    totalUnits: 48,
    availableUnits: 48,
    possession: "Announcement stage — register for first release",
    approvals: [],
    tagline: "Apartment living, planned with the generosity of a house.",
    summary:
      "Forty-eight apartments across a single low-rise block, with wide balconies, cross-ventilated plans and a landscaped ground plane that belongs to residents rather than to cars.",
    description: [
      "Most apartments in smaller cities are drawn to a spreadsheet. Kaveri is drawn to a plan: every unit has two external walls, a balcony deep enough to sit in, and a kitchen with a window.",
      "Parking is pushed to the perimeter and below, freeing the ground for a garden court, a shaded seating deck and a play lawn — the parts of a building people actually use.",
      "The block is deliberately low-rise, which keeps structural cost, maintenance burden and long-run service charges proportionate for owners.",
    ],
    highlights: [
      { label: "Every apartment cross-ventilated with two external walls" },
      { label: "Deep balconies to every living room" },
      { label: "Landscaped ground plane, parking at perimeter and basement" },
      { label: "Passenger and service lifts" },
      { label: "Backup power for common areas and lifts" },
      { label: "Dedicated visitor parking" },
    ],
    amenities: [
      "Garden court",
      "Play lawn",
      "Residents' lounge",
      "Fitness room",
      "Passenger + service lift",
      "Power backup",
      "Visitor parking",
      "CCTV to common areas",
    ],
    cover: media.apartmentBalconies,
    gallery: [
      media.apartmentBalconies,
      media.apartmentTower,
      media.interiorCalm,
      media.interiorPlants,
      media.interiorKitchen,
      media.interiorStair,
    ],
    masterPlan: {
      image: media.apartmentTower,
      caption: "Indicative massing. Replace with sanctioned floor plates and elevations.",
      breakdown: [
        { label: "Site extent", value: "1.4 acres" },
        { label: "Apartments", value: "48" },
        { label: "Configuration", value: "2 & 3 BHK" },
        { label: "Carpet range", value: "1,050 – 1,720 sq.ft" },
      ],
    },
    units: [
      { name: "2 BHK", size: "1,050 sq.ft", facing: "East", price: 5400000, available: 20, bedrooms: 2 },
      { name: "3 BHK", size: "1,380 sq.ft", facing: "North-East", price: 7150000, available: 22, bedrooms: 3 },
      { name: "3 BHK Corner", size: "1,720 sq.ft", facing: "Corner", price: 9100000, available: 6, bedrooms: 3 },
    ],
    investment: {
      lead: "Proximity to healthcare and education tends to hold rental demand steady through cycles.",
      points: [
        "Medical College Road draws a consistent tenant base of medical staff, faculty and postgraduate residents.",
        "Smaller, well-managed blocks carry lower common-area costs than large towers, which protects net yield.",
        "Launch-stage entry gives buyers the widest choice of floor and orientation.",
      ],
    },
    faqs: [
      {
        q: "When does construction begin?",
        a: "This project is at announcement stage. Registered enquirers are contacted first when approvals are in place and the initial release opens.",
      },
      {
        q: "What does registering interest commit me to?",
        a: "Nothing. It records your preferred configuration so we can contact you in order when the first release is announced.",
      },
    ],
    seo: {
      title: "Kaveri Residences — 2 & 3 BHK Apartments on Medical College Road, Thanjavur",
      description:
        "Kaveri Residences is an upcoming low-rise apartment development on Medical College Road, Thanjavur, with cross-ventilated 2 and 3 BHK homes and a landscaped ground plane.",
    },
  },

  {
    id: "prj-004",
    slug: "ponni-fields",
    name: "Ponni Fields",
    isPlaceholder: true,
    type: "Residential Plots",
    status: PROJECT_STATUS.COMPLETED,
    locality: "Thanjavur – Kumbakonam Road",
    city: "Thanjavur",
    region: "Tamil Nadu",
    coordinates: { lat: 10.8134, lng: 79.2015 },
    priceFrom: 1850000,
    priceNote: "resale market, indicative",
    area: { min: 1200, max: 2000, unit: "sq.ft" },
    scale: { value: 9.5, unit: "acres" },
    totalUnits: 96,
    availableUnits: 0,
    possession: "Delivered — fully handed over",
    approvals: [],
    tagline: "Delivered, occupied, and growing into itself.",
    summary:
      "A completed plotted development on the Kumbakonam road where the avenue planting has matured and homes are lived in. The clearest evidence of how we build is a project we finished.",
    description: [
      "Ponni Fields was handed over in full, with every road laid, every drain connected and every avenue tree planted before the last plot was registered.",
      "Several years on, the layout reads the way it was drawn: shaded internal roads, consistent setbacks, and a community that has built at its own pace without the site turning into a construction yard.",
      "We keep this project on the website not because it is available, but because it is the most honest thing we can show a prospective buyer.",
    ],
    highlights: [
      { label: "Fully delivered and handed over" },
      { label: "Mature avenue planting" },
      { label: "All internal infrastructure complete" },
      { label: "Site visits welcome — see a finished layout" },
    ],
    amenities: [
      "Black-topped roads",
      "Underground drainage",
      "Street lighting",
      "Avenue planting",
      "Rainwater harvesting",
      "Compound wall",
    ],
    cover: media.villaLawn,
    gallery: [
      media.villaLawn,
      media.aerialNeighbourhood,
      media.villaCourtyard,
      media.editorialWide,
    ],
    masterPlan: {
      image: media.aerialNeighbourhood,
      caption: "As-built layout. Replace with the delivered site drawing.",
      breakdown: [
        { label: "Total extent", value: "9.5 acres" },
        { label: "Plots", value: "96" },
        { label: "Status", value: "Fully delivered" },
        { label: "Plot sizes", value: "1,200 – 2,000 sq.ft" },
      ],
    },
    units: [],
    investment: {
      lead: "A finished project is the only reliable prospectus.",
      points: [
        "Ponni Fields is sold out. Units occasionally return to the market through resale.",
        "The Kumbakonam road corridor has seen steady residential formation over the last decade.",
        "We are happy to arrange a visit here before you consider an ongoing project.",
      ],
    },
    faqs: [
      {
        q: "Is anything still available here?",
        a: "No plots remain with us. Resale units come to market occasionally and we are glad to point you toward owners who have listed with us.",
      },
      {
        q: "Can I visit even though it is sold out?",
        a: "Please do. Walking a delivered layout tells you more about a developer than any brochure.",
      },
    ],
    seo: {
      title: "Ponni Fields — Completed Residential Plots, Thanjavur–Kumbakonam Road",
      description:
        "Ponni Fields is a fully delivered 9.5-acre plotted development on the Thanjavur–Kumbakonam road, with completed roads, drainage and mature avenue planting.",
    },
  },

  {
    id: "prj-005",
    slug: "thanjai-square",
    name: "Thanjai Square",
    isPlaceholder: true,
    type: "Commercial",
    status: PROJECT_STATUS.UPCOMING,
    locality: "Trichy Main Road",
    city: "Thanjavur",
    region: "Tamil Nadu",
    coordinates: { lat: 10.7654, lng: 79.0982 },
    priceFrom: 7800000,
    priceNote: "per unit, indicative",
    area: { min: 600, max: 3200, unit: "sq.ft" },
    scale: { value: 1.1, unit: "acres" },
    totalUnits: 26,
    availableUnits: 26,
    possession: "Announcement stage",
    approvals: [],
    tagline: "Retail and workspace on a road the whole district uses.",
    summary:
      "A compact commercial address on the Trichy corridor — ground-floor retail with clean frontage, upper-floor workspace, and the parking depth that decides whether a commercial building actually works.",
    description: [
      "Commercial property lives or dies on two things: visibility and parking. Thanjai Square is planned around both, with a deep setback that keeps customer parking off the highway shoulder.",
      "Retail units are drawn with generous frontage-to-depth ratios rather than maximum count, so that a tenant can display, store and serve without compromise.",
      "Upper floors are delivered as flexible shells — a clinic, a studio, a back office or a training centre can each take a floor plate without structural change.",
    ],
    highlights: [
      { label: "Frontage on the Trichy corridor" },
      { label: "Deep off-highway customer parking" },
      { label: "Ground-floor retail with high ceilings" },
      { label: "Flexible upper-floor shells" },
      { label: "Passenger lift and service access" },
      { label: "Three-phase power provision" },
    ],
    amenities: [
      "Customer parking",
      "Passenger lift",
      "Service access",
      "Three-phase power",
      "Backup power",
      "CCTV to common areas",
      "Signage zone",
    ],
    cover: media.commercialOffice,
    gallery: [media.commercialOffice, media.commercialShell, media.glassGeometry, media.towersDramatic],
    masterPlan: {
      image: media.commercialShell,
      caption: "Indicative floor plates. Replace with sanctioned commercial drawings.",
      breakdown: [
        { label: "Site extent", value: "1.1 acres" },
        { label: "Units", value: "26" },
        { label: "Unit range", value: "600 – 3,200 sq.ft" },
        { label: "Levels", value: "Ground + 2" },
      ],
    },
    units: [
      { name: "Retail — Small", size: "600 sq.ft", facing: "Road", price: 7800000, available: 10 },
      { name: "Retail — Anchor", size: "1,450 sq.ft", facing: "Corner", price: 18500000, available: 4 },
      { name: "Office Floor Plate", size: "3,200 sq.ft", facing: "Full floor", price: 36000000, available: 2 },
    ],
    investment: {
      lead: "Commercial space is bought for the tenant it can hold, not the picture it makes.",
      points: [
        "The Trichy corridor carries district-wide traffic, which is what retail frontage is actually paying for.",
        "Flexible upper floors widen the tenant pool beyond a single use class.",
        "Commercial leases typically run longer than residential tenancies, which reduces turnover cost.",
      ],
    },
    faqs: [
      {
        q: "Can units be combined?",
        a: "Adjacent units can be combined at shell stage subject to structural review. Speak to us before booking if you need a larger contiguous area.",
      },
      {
        q: "Is leasing assistance available?",
        a: "We introduce owners to tenants where we can, but we do not guarantee occupancy, rent levels or returns.",
      },
    ],
    seo: {
      title: "Thanjai Square — Retail & Office Space on Trichy Main Road, Thanjavur",
      description:
        "Thanjai Square is an upcoming commercial development on Trichy Main Road, Thanjavur, with ground-floor retail units and flexible upper-floor office plates.",
    },
  },

  {
    id: "prj-006",
    slug: "aranmanai-court",
    name: "Aranmanai Court",
    isPlaceholder: true,
    type: "Premium Residences",
    status: PROJECT_STATUS.COMPLETED,
    locality: "Old Housing Unit",
    city: "Thanjavur",
    region: "Tamil Nadu",
    coordinates: { lat: 10.7852, lng: 79.1301 },
    priceFrom: 16500000,
    priceNote: "resale market, indicative",
    area: { min: 2900, max: 3800, unit: "sq.ft" },
    scale: { value: 2.3, unit: "acres" },
    totalUnits: 12,
    availableUnits: 0,
    possession: "Delivered",
    approvals: [],
    tagline: "Twelve houses. One long garden. No repetition.",
    summary:
      "Our most restrained project: twelve large residences arranged along a single shared garden, each drawn individually rather than stamped from one type.",
    description: [
      "Aranmanai Court was an experiment in doing less. Twelve houses on 2.3 acres, arranged along one continuous garden, with each residence given its own plan and elevation.",
      "Material choices were made for longevity rather than effect — load-bearing masonry where it made sense, natural stone underfoot, deep verandahs on the west.",
      "It sold out before completion and remains the benchmark we measure new work against.",
    ],
    highlights: [
      { label: "Twelve individually designed residences" },
      { label: "Shared 0.6-acre garden" },
      { label: "Natural stone and hardwood specification" },
      { label: "Deep verandahs to western elevations" },
      { label: "Delivered and fully occupied" },
    ],
    amenities: [
      "Shared garden",
      "Gated entry",
      "Covered parking",
      "Rainwater harvesting",
      "Solar water heating",
      "Perimeter security",
    ],
    cover: media.villaPoolWhite,
    gallery: [
      media.villaPoolWhite,
      media.villaTerrace,
      media.interiorLiving,
      media.interiorLight,
      media.villaPoolside,
      media.editorialTall,
    ],
    masterPlan: {
      image: media.villaTerrace,
      caption: "As-built arrangement. Replace with the delivered site drawing.",
      breakdown: [
        { label: "Site extent", value: "2.3 acres" },
        { label: "Residences", value: "12" },
        { label: "Built-up range", value: "2,900 – 3,800 sq.ft" },
        { label: "Status", value: "Delivered" },
      ],
    },
    units: [],
    investment: {
      lead: "Scarcity that is real: twelve houses, none of which we can build again.",
      points: [
        "Low-density projects in established residential pockets rarely come back to market.",
        "Resale enquiries are handled directly through us when owners choose to list.",
      ],
    },
    faqs: [
      {
        q: "Is anything available at Aranmanai Court?",
        a: "Not currently. Register your interest and we will contact you if an owner lists a resale through us.",
      },
    ],
    seo: {
      title: "Aranmanai Court — Premium Residences, Old Housing Unit, Thanjavur",
      description:
        "Aranmanai Court is a completed low-density development of twelve individually designed premium residences around a shared garden in Thanjavur.",
    },
  },
];

/* ---- Selectors ---------------------------------------------------------- */

export const getProjectBySlug = (slug) =>
  projects.find((project) => project.slug === slug);

export const featuredProjects = projects.filter((p) =>
  ["vasantham-enclave", "marutham-villas", "kaveri-residences", "aranmanai-court"].includes(
    p.slug,
  ),
);

export const projectLocalities = [
  ...new Set(projects.map((p) => p.locality)),
].sort();

export default projects;
