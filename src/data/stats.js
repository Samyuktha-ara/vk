/* ==========================================================================
   COMPANY STATISTICS
   --------------------------------------------------------------------------
   ⚠  `value: null` renders the placeholder "XX+" and is NOT counted or
      animated. Enter a real number and the figure becomes live, animates on
      scroll, and is eligible for structured data.

      Never enter a figure the company cannot evidence.
   ========================================================================== */

export const stats = [
  {
    id: "experience",
    value: null, // e.g. 16
    suffix: "+",
    label: "Years in Thanjavur",
    caption: "Building in one city, continuously.",
  },
  {
    id: "projects",
    value: null, // e.g. 22
    suffix: "",
    label: "Projects Delivered",
    caption: "Handed over, not announced.",
  },
  {
    id: "acres",
    value: null, // e.g. 140
    suffix: "+",
    label: "Acres Developed",
    caption: "Planned, serviced and handed over.",
  },
  {
    id: "families",
    value: null, // e.g. 900
    suffix: "+",
    label: "Families Settled",
    caption: "Owners who took possession.",
  },
];

/** True when at least one real figure has been supplied. */
export const hasRealStats = stats.some((stat) => typeof stat.value === "number");

export default stats;
