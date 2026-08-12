/* ==========================================================================
   ARTIFACT PREVIEW — ASSEMBLER
   --------------------------------------------------------------------------
   Folds the preview build into a single HTML fragment for the share host.

   The host wraps whatever we emit in its own <!doctype>/<html>/<head>/<body>
   skeleton, so this file must contain page CONTENT only — no document tags of
   our own. Everything the browser needs is inline: fonts, stylesheet, script.

   Usage:  node scripts/artifact/build-artifact.mjs
           (run fetch-assets.mjs and the artifact vite build first —
            `npm run preview:share` does all three)
   ========================================================================== */

import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const BUILD = path.join(HERE, ".build");
const OUT = path.join(HERE, "vk-preview.html");

const assets = await readdir(path.join(BUILD, "assets"));
const jsFile = assets.find((f) => f.endsWith(".js"));
const cssFile = assets.find((f) => f.endsWith(".css"));

if (!jsFile || !cssFile) {
  throw new Error(
    `[artifact] expected one .js and one .css in ${BUILD}/assets, found: ${assets.join(", ")}`,
  );
}

const [fonts, css, js] = await Promise.all([
  readFile(path.join(HERE, ".cache/fonts.css"), "utf8"),
  readFile(path.join(BUILD, "assets", cssFile), "utf8"),
  readFile(path.join(BUILD, "assets", jsFile), "utf8"),
]);

/* A module script is parsed as a unit, so an unescaped `</script>` anywhere in
   the bundle — including inside a string literal — would close the tag early. */
const escape = (code) => code.replace(/<\/script/gi, "<\\/script");

const html = `<title>VK Real Estate &amp; Promoters</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#071a3d" />

<!-- Typography, normally streamed from Google Fonts. -->
<style>
${fonts}
</style>

<!-- The site's own stylesheet, built from src/styles + CSS modules. -->
<style>
${css}
</style>

<div id="root"></div>

<noscript>
  <div style="padding: 3rem 1.5rem; font-family: system-ui, sans-serif">
    <h1>VK Real Estate &amp; Promoters — property development in Thanjavur</h1>
    <p>This preview needs JavaScript to run.</p>
  </div>
</noscript>

<script type="module">
${escape(js)}
</script>
`;

await writeFile(OUT, html);

const mb = (n) => `${(n / 1e6).toFixed(2)} MB`;
console.log(`Wrote ${path.relative(process.cwd(), OUT)} — ${mb(Buffer.byteLength(html))}`);
console.log(`  fonts ${mb(fonts.length)} · css ${mb(css.length)} · js ${mb(js.length)}`);
if (Buffer.byteLength(html) > 16e6) {
  console.warn("  ! over the 16 MB share limit — re-fetch photos at a smaller width");
}
