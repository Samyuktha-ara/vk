/* ==========================================================================
   PROPERTIES  —  ENQUIRY VOCABULARY
   --------------------------------------------------------------------------
   Individual unit listings live in `projects.js` (each real house / plot is
   its own entry there). This file keeps only the shared vocabularies the
   enquiry form needs.
   ========================================================================== */

export const PROPERTIES_ARE_PLACEHOLDER = false;

export const propertyStatuses = ["Ongoing", "Upcoming", "Completed", "Ready to Move"];

export const budgetBands = [
  { id: "any", label: "Any budget", min: 0, max: Infinity },
  { id: "under-30", label: "Under ₹30 L", min: 0, max: 3000000 },
  { id: "30-60", label: "₹30 L – ₹60 L", min: 3000000, max: 6000000 },
  { id: "60-100", label: "₹60 L – ₹1 Cr", min: 6000000, max: 10000000 },
  { id: "above-100", label: "Above ₹1 Cr", min: 10000000, max: Infinity },
];

export const bedroomOptions = [2, 3, 4];
