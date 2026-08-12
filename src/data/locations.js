/* ==========================================================================
   THANJAVUR  —  LOCATION INTELLIGENCE
   --------------------------------------------------------------------------
   FACT DISCIPLINE
   Only verifiable, publicly documented information about Thanjavur appears
   here. No growth forecasts, appreciation figures or demand projections.

   Road distances are approximate and marked as such. Verify against current
   route data before publishing, and update `lastReviewed`.
   ========================================================================== */

export const lastReviewed = "2026-08";

export const cityProfile = {
  name: "Thanjavur",
  region: "Tamil Nadu",
  country: "India",
  /* Documented, non-promotional description. */
  standfirst:
    "A district headquarters in the Cauvery delta, with a thousand-year architectural record and the everyday infrastructure of a working Tamil Nadu city.",
  paragraphs: [
    "Thanjavur is the administrative headquarters of Thanjavur district in Tamil Nadu, set in the Cauvery delta — the agricultural belt long known as the rice bowl of the state.",
    "It is also one of the few cities in India where monumental architecture is part of ordinary daily life. The Brihadeeswarar Temple, completed under Rajaraja Chola I in the early 11th century, is inscribed by UNESCO as part of the Great Living Chola Temples.",
    "For a buyer, what matters is more prosaic: a city with established schools and hospitals, a university presence, a railway junction, and highway connections in four directions. Thanjavur has all of it inside a footprint you can still cross in twenty minutes.",
  ],
};

/* ---- Connectivity — schematic bearings for the map diagram --------------- */
/* `bearing` is degrees clockwise from north; used only to place labels on a
   stylised, explicitly not-to-scale diagram. */
export const connectivity = [
  {
    name: "Tiruchirappalli",
    distanceKm: 58,
    bearing: 285,
    note: "Nearest major city and commercial hub",
    tier: 1,
  },
  {
    /* Bearing pulled round to WSW so its label clears Tiruchirappalli's on
       the diagram. Both sit west of the city; the diagram is schematic. */
    name: "Trichy International Airport",
    distanceKm: 65,
    bearing: 256,
    note: "Nearest airport with international services",
    tier: 1,
  },
  {
    name: "Kumbakonam",
    distanceKm: 40,
    bearing: 45,
    note: "Temple town and delta trade centre",
    tier: 2,
  },
  {
    name: "Pudukkottai",
    distanceKm: 50,
    bearing: 225,
    note: "District headquarters to the south-west",
    tier: 2,
  },
  {
    name: "Nagapattinam",
    distanceKm: 85,
    bearing: 100,
    note: "Coastal district and port town",
    tier: 2,
  },
  {
    name: "Madurai",
    distanceKm: 190,
    bearing: 240,
    note: "Southern metropolitan centre",
    tier: 3,
  },
  {
    name: "Chennai",
    distanceKm: 350,
    bearing: 20,
    note: "State capital",
    tier: 3,
  },
];

/* ---- What actually exists in and around the city ------------------------ */
export const advantages = [
  {
    id: "connectivity",
    index: "01",
    title: "Connectivity",
    body: "Thanjavur Junction sits on the Southern Railway network, and national highway corridors run out of the city toward Tiruchirappalli, Kumbakonam, Pudukkottai and the coast. Trichy International Airport is roughly an hour away by road.",
    facts: [
      "Thanjavur Junction — Southern Railway",
      "Highway corridors in four directions",
      "Trichy International Airport ≈ 65 km",
    ],
  },
  {
    id: "education",
    index: "02",
    title: "Education",
    body: "The city carries a genuine university presence. Tamil University is located in Thanjavur, SASTRA Deemed University sits just outside at Thirumalaisamudram, and PRIST University is near Vallam — alongside long-established government and aided schools.",
    facts: [
      "Tamil University, Thanjavur",
      "SASTRA Deemed University, Thirumalaisamudram",
      "PRIST University, near Vallam",
    ],
  },
  {
    id: "healthcare",
    index: "03",
    title: "Healthcare",
    body: "Thanjavur Medical College and its attached government hospital serve as a tertiary referral centre for the surrounding districts, supported by a spread of private hospitals and specialist clinics within the city.",
    facts: [
      "Thanjavur Medical College & Hospital",
      "Tertiary referral centre for the delta districts",
      "Private multi-speciality hospitals within the city",
    ],
  },
  {
    id: "economy",
    index: "04",
    title: "Economy & Culture",
    body: "The delta economy is agricultural at its base, with trade, education, healthcare and a substantial tourism draw layered on top. Thanjavur's craft traditions — Tanjore painting, bronze work, and the Thanjavur veena, which carries a Geographical Indication — remain active industries, not museum pieces.",
    facts: [
      "Cauvery delta agricultural belt",
      "Year-round heritage tourism",
      "Thanjavur veena — GI registered craft",
    ],
  },
  {
    id: "heritage",
    index: "05",
    title: "Heritage",
    body: "The Brihadeeswarar Temple, completed in the early 11th century under Rajaraja Chola I, is inscribed on the UNESCO World Heritage List as part of the Great Living Chola Temples. It is the reason the city is on the map, and the standard anyone building here is quietly measured against.",
    facts: [
      "Brihadeeswarar Temple — completed c. 1010 CE",
      "UNESCO World Heritage — Great Living Chola Temples",
      "Continuous living temple, not a ruin",
    ],
  },
];

/* ---- Where we build ------------------------------------------------------ */
export const corridors = [
  {
    name: "Vallam Road",
    bearing: 215,
    character:
      "The south-western approach, running toward Vallam and the university belt.",
  },
  {
    name: "Nanjikottai Road",
    bearing: 120,
    character: "Established residential belt with schools and healthcare close by.",
  },
  {
    name: "Medical College Road",
    bearing: 300,
    character: "Institutional corridor anchored by the medical college.",
  },
  {
    name: "Thanjavur – Kumbakonam Road",
    bearing: 45,
    character: "The north-eastern delta corridor toward Kumbakonam.",
  },
  {
    name: "Trichy Main Road",
    bearing: 280,
    character: "The primary commercial axis out of the city toward Tiruchirappalli.",
  },
];

export default { cityProfile, connectivity, advantages, corridors, lastReviewed };
