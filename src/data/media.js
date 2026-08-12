/* ==========================================================================
   MEDIA LIBRARY
   --------------------------------------------------------------------------
   PLACEHOLDER PHOTOGRAPHY.
   Every image below is a licensed-free Unsplash architectural photograph used
   purely as art direction placeholder. Replace with the company's own project
   photography before launch.

   HOW TO REPLACE
   1. Drop your optimised images (WebP/AVIF preferred) into `src/assets/photos/`
   2. `import villaExterior from "../assets/photos/villa-exterior.webp"`
   3. Swap the `src` value below. Nothing else in the codebase needs to change.

   Each entry carries an `alt` written for accessibility + image SEO. Rewrite
   the alt text to describe the real photograph once swapped.
   ========================================================================== */

const UNSPLASH = "https://images.unsplash.com/";

/** Build an Unsplash delivery URL. Remove this helper once self-hosting. */
const u = (id, w = 1600, extra = "") =>
  `${UNSPLASH}${id}?auto=format&fit=crop&q=72&w=${w}${extra}`;

/**
 * Responsive srcset for a placeholder image.
 * When self-hosting, generate real widths at build time and return them here.
 */
export const srcSetFor = (image, widths = [640, 960, 1280, 1800, 2400]) => {
  if (!image?.id) return undefined;
  return widths.map((w) => `${u(image.id, w)} ${w}w`).join(", ");
};

const image = (id, alt, ratio = 3 / 2) => ({
  id,
  src: u(id),
  alt,
  ratio,
});

export const media = {
  /* ---- Hero / brand ---------------------------------------------------- */
  heroPrimary: image(
    "photo-1600585153490-76fb20a32601",
    "Contemporary residence at dusk, warm interior light spilling through tall vertical openings",
    16 / 10,
  ),
  heroSecondary: image(
    "photo-1600585154340-be6161a56a0c",
    "Modern villa with cantilevered upper floor set among mature trees at twilight",
    4 / 5,
  ),

  /* ---- Editorial / intro ----------------------------------------------- */
  editorialTall: image(
    "photo-1523217582562-09d0def993a6",
    "Minimal white residence with sharp geometric massing against an open sky",
    3 / 4,
  ),
  editorialWide: image(
    "photo-1518005020951-eccb494ad742",
    "Sweeping curved architectural facade viewed from below",
    16 / 9,
  ),
  architectAtWork: image(
    "photo-1503387762-592deb58ef4e",
    "Architect drawing construction plans by hand at a drafting table",
    3 / 2,
  ),
  glassGeometry: image(
    "photo-1487958449943-2429e8be8625",
    "Angular glass facade meeting a pale sky",
    3 / 2,
  ),

  /* ---- Projects -------------------------------------------------------- */
  villaPoolWhite: image(
    "photo-1613490493576-7fde63acd811",
    "White contemporary villa with a full-length swimming pool and landscaped deck",
    3 / 2,
  ),
  villaPoolBlue: image(
    "photo-1600596542815-ffad4c1539a9",
    "Two-storey white villa with pool under a clear blue sky",
    3 / 2,
  ),
  villaGarden: image(
    "photo-1600607688969-a5bfcd646154",
    "Low-rise residence with timber cladding opening onto a wide lawn",
    3 / 2,
  ),
  villaGardenDetail: image(
    "photo-1600607688960-e095ff83135c",
    "Timber and glass residence framed by a mature tree",
    3 / 2,
  ),
  villaCourtyard: image(
    "photo-1600566753190-17f0baa2a6c3",
    "Modern courtyard house with a rendered boundary wall and shaded entry",
    3 / 2,
  ),
  villaLawn: image(
    "photo-1600047509807-ba8f99d2cdde",
    "Contemporary home with mixed stone and timber elevation facing a manicured lawn",
    3 / 2,
  ),
  villaPalms: image(
    "photo-1564013799919-ab600027ffc6",
    "Colonial-modern residence with pool and palm planting",
    3 / 2,
  ),
  villaPoolside: image(
    "photo-1512917774080-9991f1c4c750",
    "Poolside terrace of a modern villa with full-height sliding glazing",
    3 / 2,
  ),
  villaTerrace: image(
    "photo-1580587771525-78b9dba3b914",
    "Contemporary villa with terraced levels and a reflecting pool",
    3 / 2,
  ),

  /* ---- Agricultural land ------------------------------------------------ */
  paddyDelta: image(
    "photo-1574943320219-553eb213f72d",
    "Paddy field being ploughed with bullocks and a tractor, coconut palms along the bund",
    3 / 2,
  ),
  farmlandRows: image(
    "photo-1560493676-04071c5f467b",
    "Cultivated field running in even rows toward the horizon",
    3 / 2,
  ),
  paddyStrips: image(
    "photo-1592982537447-7440770cbfc9",
    "Green and ripening paddy meeting along a field boundary",
    3 / 2,
  ),
  fieldSunset: image(
    "photo-1500382017468-9049fed747ef",
    "Open farmland under a low sun",
    3 / 2,
  ),

  /* ---- Aerial / land / plots ------------------------------------------- */
  aerialNeighbourhood: image(
    "photo-1512699355324-f07e3106dae5",
    "Aerial view of a planned residential neighbourhood with tree-lined internal roads",
    3 / 2,
  ),
  cityGrowth: image(
    "photo-1512453979798-5ea266f8880c",
    "Aerial view of a growing city skyline at sunrise with major road infrastructure",
    3 / 2,
  ),
  cityNight: image(
    "photo-1470723710355-95304d8aece4",
    "Long-exposure night view of an arterial road threading through a city",
    3 / 2,
  ),
  cityLights: image(
    "photo-1444723121867-7a241cacace9",
    "City lights spreading toward the horizon after dusk",
    3 / 2,
  ),

  /* ---- Apartments / vertical ------------------------------------------- */
  apartmentTower: image(
    "photo-1545324418-cc1a3fa10c00",
    "Contemporary apartment tower facade with recessed balconies",
    2 / 3,
  ),
  apartmentBalconies: image(
    "photo-1460317442991-0ec209397118",
    "Apartment building elevation with rhythmic steel balconies",
    3 / 2,
  ),
  towerLookUp: image(
    "photo-1486406146926-c627a92ad1ab",
    "Looking up between tall glass towers",
    2 / 3,
  ),
  towersDramatic: image(
    "photo-1511818966892-d7d671e672a2",
    "Dark glass towers under a heavy sky",
    3 / 2,
  ),

  /* ---- Commercial ------------------------------------------------------ */
  commercialShell: image(
    "photo-1497366216548-37526070297c",
    "Open commercial floor plate ready for fit-out",
    3 / 2,
  ),
  commercialOffice: image(
    "photo-1497366754035-f200968a6e72",
    "Glass-partitioned workspace with polished concrete floors",
    3 / 2,
  ),

  /* ---- Interiors -------------------------------------------------------- */
  interiorLiving: image(
    "photo-1600607687939-ce8a6c25118c",
    "Living room with full-height timber panelling and a low linen sofa",
    3 / 2,
  ),
  interiorLight: image(
    "photo-1600210492486-724fe5c67fb0",
    "Double-height living space filled with daylight",
    3 / 2,
  ),
  interiorKitchen: image(
    "photo-1600585152220-90363fe7e115",
    "Minimal kitchen with a stone island and oak joinery",
    3 / 2,
  ),
  interiorStair: image(
    "photo-1600573472550-8090b5e0745e",
    "Open-tread staircase beside floor-to-ceiling glazing",
    3 / 2,
  ),
  interiorLounge: image(
    "photo-1600566753086-00f18fb6b3ea",
    "Bright open-plan lounge with a timber staircase",
    3 / 2,
  ),
  interiorCalm: image(
    "photo-1493809842364-78817add7ffb",
    "Calm living room with a low console and soft daylight",
    3 / 2,
  ),
  interiorPlants: image(
    "photo-1502672260266-1c1ef2d93688",
    "Compact apartment living area with planting and natural materials",
    3 / 2,
  ),
};

export default media;
