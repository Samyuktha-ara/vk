/**
 * Generates public/sitemap.xml.
 *
 * The site is a single page, so the sitemap is short by design: the page
 * itself plus the two legal routes. In-page anchors are deliberately not
 * listed — they are not separate documents and search engines treat them as
 * duplicates of the page they sit on.
 *
 * Runs automatically before every build (see the `prebuild` script).
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { business } from "../src/data/business.js";

const here = dirname(fileURLToPath(import.meta.url));
const SITE = business.site.url.replace(/\/$/, "");
const today = new Date().toISOString().slice(0, 10);

const routes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/privacy-policy", priority: "0.2", changefreq: "yearly" },
  { path: "/terms", priority: "0.2", changefreq: "yearly" },
];

const urls = routes
  .map(
    ({ path, priority, changefreq }) => `  <url>
    <loc>${SITE}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(resolve(here, "../public/sitemap.xml"), sitemap, "utf8");

console.log(`sitemap.xml — ${routes.length} URLs written for ${SITE}`);
if (SITE.includes("vkestates.in")) {
  /* stdout, not stderr — a reminder should not look like a build failure. */
  console.log(
    "  !  Placeholder domain in use. Set business.site.url (and robots.txt) before deploying.",
  );
}
