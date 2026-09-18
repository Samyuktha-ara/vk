/**
 * Prerenders every route to static HTML after `vite build`.
 *
 * Why: the app is a client-rendered SPA, so the raw index.html is an empty
 * <div id="root">. Search engines and link-preview bots (WhatsApp, LinkedIn,
 * Bing) either render JavaScript late or not at all. Shipping the rendered
 * markup — title, meta, JSON-LD and the page itself — means every crawler
 * sees the real content on the first request, and visitors see the page
 * before the bundle has even loaded. React then hydrates on top.
 *
 * Steps
 *   1. `vite build --ssr` compiles src/entry-server.jsx for Node.
 *   2. Each route is rendered with React's static `prerender`.
 *   3. React hoists <title>/<meta>/<link> to the top of its output; they are
 *      moved into <head>, replacing the baseline tags in index.html.
 *   4. The result is written to dist/<route>/index.html (and dist/404.html).
 *
 * Runs automatically after every build (see the `postbuild` script).
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { execSync } from "node:child_process";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const dist = resolve(root, process.env.PRERENDER_DIST ?? "dist");
const serverDir = resolve(dist, "server");

/* Route → output files. Each route is written both as <route>/index.html
   (what "/terms/" resolves to on any static host) and <route>.html (what
   "/terms" resolves to on Netlify, GitHub Pages and vite preview), so the
   prerendered page is served whichever form the request takes. The last
   entry is the 404 page; Netlify serves /404.html for any path with no
   matching file (see public/_redirects). */
const routes = [
  { path: "/", files: ["index.html"] },
  { path: "/privacy-policy", files: ["privacy-policy/index.html", "privacy-policy.html"] },
  { path: "/terms", files: ["terms/index.html", "terms.html"] },
  { path: "/this-page-does-not-exist", files: ["404.html"] },
];

execSync(
  `npx vite build --ssr src/entry-server.jsx --outDir ${JSON.stringify(serverDir)} --logLevel warn`,
  { cwd: root, stdio: "inherit" },
);

const template = readFileSync(resolve(dist, "index.html"), "utf8");
const { render } = await import(pathToFileURL(resolve(serverDir, "entry-server.js")).href);

/* React 19 emits hoistable head elements at the start of the stream. */
const HOISTED =
  /^(?:<(?:title|meta|link)\b[^>]*>(?:[^<]*<\/title>)?)+/;

/* index.html carries a baseline <title> and description for the dev server;
   the rendered page supplies the real ones, so drop the baseline pair. */
const stripBaseline = (head) =>
  head
    .replace(/\s*<title>[\s\S]*?<\/title>/, "")
    .replace(/\s*<meta\s+name="description"[\s\S]*?\/>/, "");

for (const route of routes) {
  const rendered = await render(route.path);
  const hoisted = rendered.match(HOISTED)?.[0] ?? "";
  const body = rendered.slice(hoisted.length);

  const html = template
    .replace(/<head>([\s\S]*?)<\/head>/, (_, head) => `<head>${stripBaseline(head)}\n    ${hoisted}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  for (const file of route.files) {
    const out = resolve(dist, file);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, html, "utf8");
  }
  console.log(`prerendered ${route.path.padEnd(24)} → ${route.files.join(", ")}  (${(html.length / 1024).toFixed(0)} kB)`);
}

rmSync(serverDir, { recursive: true, force: true });
