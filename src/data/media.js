/* ==========================================================================
   MEDIA LIBRARY
   --------------------------------------------------------------------------
   Every image is the company's own site photography, served from
   `/public/photos`. `scripts/make-photos.ps1` generates them from the
   originals in `/photos-src`: a "wide" 3:2 art-directed crop and a "tall"
   full-frame portrait of each, at several widths for `srcset`.

   To add a photo: drop the original in `/photos-src`, add a job to the
   script, run it, then add a `photo()` entry below.

   Each entry carries an `alt` written for accessibility + image SEO.
   ========================================================================== */

/** Responsive srcset — photos carry their own pre-generated widths. */
export const srcSetFor = (image) => image?.srcSet;

const WIDE_WIDTHS = [640, 960, 1280, 1980];
const TALL_WIDTHS = [480, 720, 1080];

/**
 * Self-hosted photo. `name` matches the file stem in `/public/photos`,
 * `variant` is "wide" (3:2) or "tall" (9:16 full frame).
 */
const photo = (name, variant, alt) => {
  const widths = variant === "wide" ? WIDE_WIDTHS : TALL_WIDTHS;
  const file = (w) => `/photos/${name}-${variant}-${w}.jpg`;
  return {
    src: file(widths[widths.length - 1]),
    srcSet: widths.map((w) => `${file(w)} ${w}w`).join(", "),
    alt,
    ratio: variant === "wide" ? 3 / 2 : 9 / 16,
  };
};

/* ---- Real photography ------------------------------------------------- */
const ALT = {
  house1:
    "Completed single-storey home with a cream and brown elevation, laser-cut gold gate panels and a covered front verandah",
  house2:
    "Completed compact home with a blue and mint geometric elevation and an external staircase to the terrace",
  house3:
    "Completed home with a textured brown feature wall, terracotta jali screen and a slatted steel gate, a young tree planted at the entrance",
  land: "Levelled residential plot with a boundary marker in the foreground, palmyra trees and a site office along the far edge",
};

const house1 = photo("house-1", "wide", ALT.house1);
const house1Tall = photo("house-1", "tall", ALT.house1);
const house2 = photo("house-2", "wide", ALT.house2);
const house2Tall = photo("house-2", "tall", ALT.house2);
const house3 = photo("house-3", "wide", ALT.house3);
const house3Tall = photo("house-3", "tall", ALT.house3);
const land = photo("land-1", "wide", ALT.land);
const landTall = photo("land-1", "tall", ALT.land);

export const media = {
  /* ---- Real photography ------------------------------------------------ */
  house1,
  house1Tall,
  house2,
  house2Tall,
  house3,
  house3Tall,
  land,
  landTall,

  /* ---- Hero / brand ---------------------------------------------------- */
  heroPrimary: house1,
  heroSecondary: house3Tall,

  /* ---- Editorial / intro ----------------------------------------------- */
  editorialTall: house3Tall,
  editorialWide: house2,
  architectAtWork: house2,
};

export default media;
