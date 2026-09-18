/* ==========================================================================
   COMPANY STATISTICS
   --------------------------------------------------------------------------
   Figures supplied by the company. `value: null` renders the placeholder
   "XX+" and is NOT counted or animated — never enter a figure the company
   cannot evidence.
   ========================================================================== */

export const stats = [
  {
    id: "experience",
    value: 2,
    suffix: "+",
    label: "Years in Thanjavur",
    caption: "Building in one city, continuously.",
  },
  {
    id: "projects",
    value: 50,
    suffix: "+",
    label: "Successful Projects",
    caption: "Houses set up, families moved in, acres sold.",
  },
];

/** True when at least one real figure has been supplied. */
export const hasRealStats = stats.some((stat) => typeof stat.value === "number");

export default stats;
