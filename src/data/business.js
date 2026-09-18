/* ==========================================================================
   BUSINESS CONFIGURATION  —  SINGLE SOURCE OF TRUTH
   --------------------------------------------------------------------------
   Everything the real company must supply lives here. No component hardcodes
   a phone number, address, statistic or credential.

   ⚠  FIELDS MARKED `null` ARE INTENTIONALLY EMPTY.
      The UI hides any credential, statistic or award that has no real value,
      rather than inventing one. Fill them in and the section appears.
   ========================================================================== */

export const business = {
  /* ---- Brand ----------------------------------------------------------- */
  brand: {
    name: "VK Real Estate & Promoters",
    legalName: "VK Real Estate & Promoters",
    shortName: "VK",
    /* What the navigation lockup prints beside the mark. The supplied logo
       already carries "REAL ESTATE & PROMOTERS", but at navigation size that
       text is only a few pixels tall, so it is set typographically instead. */
    wordmark: "VK",
    tagline: "Real Estate & Promoters",
    motto: "Building Trust, Creating Futures.",

    /* Generated from the supplied artwork: background keyed out to alpha and
       resized. `logoMark` is the monogram alone — used everywhere in the UI,
       because it stays legible on both white and navy. `logoFull` is the
       complete lockup, whose wordmark is near-black and therefore only safe
       on light backgrounds (search results, sharing previews). */
    logoSrc: "/vk-mark.png",
    logoSrcLight: "/vk-mark.png",
    logoFull: "/vk-logo.png",

    established: null, // e.g. 2009 — shown in the footer + About when set
  },

  /* ---- Contact --------------------------------------------------------- */
  contact: {
    /* TODO(client): replace with live numbers before launch. */
    phoneDisplay: "+91 80154 31488",
    phoneHref: "+918015431488",
    whatsappNumber: "918015431488", // country code + number, digits only
    email: "vkrealestateandpromoters@gmail.com",
    officeHours: "Monday – Saturday, 9:30 AM – 7:00 PM",
    /* Web3Forms access key (https://web3forms.com). Enquiries are emailed to
       the address the key was created with. The key is safe to publish — it
       can only send to that one inbox.
       While null, the form hands the enquiry off to WhatsApp instead, so no
       lead is ever silently dropped. */
    web3formsKey: "268f5492-38ed-4f25-a684-68bcca7bdc45",
  },

  /* ---- Address (used for LocalBusiness structured data) ---------------- */
  address: {
    line1: "Site Office, Nanjikottai Road",
    line2: "Thanjavur",
    locality: "Thanjavur",
    region: "Tamil Nadu",
    postalCode: "613006",
    country: "IN",
    countryName: "India",
    /* Thanjavur city centre. Replace with the exact office coordinates. */
    geo: { lat: 10.787, lng: 79.1378 },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Thanjavur",
  },

  /* ---- Social ---------------------------------------------------------- */
  social: {
    instagram: null,
    facebook: null,
    youtube: null,
    linkedin: null,
  },

  /* ---- Credentials — displayed ONLY when a real value is present ------- */
  credentials: {
    reraNumber: null, // e.g. "TN/29/Building/0123/2024"
    reraUrl: "https://rera.tn.gov.in/",
    gstin: null,
    cin: null,
    certifications: [], // [{ label, issuer, year }]
    awards: [], // [{ label, issuer, year }]
  },

  /* ---- Site / SEO ------------------------------------------------------ */
  site: {
    /* TODO(client): set the production origin — used for canonicals,
       Open Graph URLs, sitemap.xml and JSON-LD. No trailing slash. */
    url: "https://www.vkrealestateandpromoters.in",
    locale: "en_IN",
    language: "en-IN",
    twitterHandle: null,
    defaultOgImage: "/photos/house-1-wide-1280.jpg", // real photo; swap for a dedicated 1200×630 crop if desired
    defaultOgImageSize: { width: 1280, height: 853 },
  },

  /* ---- Content switches ------------------------------------------------ */
  content: {
    /* Statistics render as "XX+" until real figures are entered in stats.js */
    showStats: true,
  },
};

/* ---- Derived helpers ---------------------------------------------------- */

export const fullAddress = [
  business.address.line1,
  business.address.line2,
  `${business.address.region} ${business.address.postalCode}`,
]
  .filter(Boolean)
  .join(", ");

export const telHref = `tel:${business.contact.phoneHref}`;
export const mailHref = `mailto:${business.contact.email}`;

export default business;
