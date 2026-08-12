/* ==========================================================================
   NAVIGATION
   --------------------------------------------------------------------------
   The site is a single page. Every primary link is an in-page anchor, written
   as "/#id" rather than "#id" so it also works from the legal routes.

   `id` is the section's DOM id — used by the navigation's scroll spy to mark
   the section currently in view.
   ========================================================================== */

export const primaryNav = [
  { label: "What We Do", to: "/#services", id: "services" },
  { label: "Projects", to: "/#projects", id: "projects" },
  { label: "Why Us", to: "/#why-us", id: "why-us" },
  { label: "Location", to: "/#location", id: "location" },
  { label: "Contact", to: "/#contact", id: "contact" },
];

export const footerNav = [
  {
    heading: "Explore",
    links: [
      { label: "What We Do", to: "/#services" },
      { label: "Developments", to: "/#projects" },
      { label: "Why Us", to: "/#why-us" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Thanjavur", to: "/#location" },
      { label: "Contact", to: "/#contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms of Use", to: "/terms" },
    ],
  },
];

export default primaryNav;
