/* ==========================================================================
   ARTIFACT PREVIEW — ASSET FETCHER
   --------------------------------------------------------------------------
   The share-preview build runs on a host that blocks every cross-origin
   request, so anything the site normally streams from a CDN has to travel
   inside the HTML file. This script pulls those two dependencies down once and
   caches them next to the build output:

     1. Google Fonts (Cormorant Garamond + Inter) -> @font-face with base64 woff2
     2. Unsplash placeholder photography          -> id -> data URI map

   Run it again to refresh the cache; delete the cache dir to force a re-fetch.
   ========================================================================== */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../..");
const CACHE = path.join(HERE, ".cache");

/* Wide enough for the hero on a laptop, small enough that 36 of them still
   fit comfortably inside the page budget. */
const IMAGE_WIDTH = 1200;
const IMAGE_QUALITY = 60;

const FONT_CSS =
  "https://fonts.googleapis.com/css2" +
  "?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400" +
  "&family=Inter:wght@300;400;500;600;700&display=swap";

/* Google serves woff2 only to browsers that advertise support. */
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/126.0 Safari/537.36";

async function get(url, headers = {}) {
  const res = await fetch(url, { headers: { "user-agent": UA, ...headers } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  return res;
}

const dataUri = (mime, buf) => `data:${mime};base64,${buf.toString("base64")}`;

/* -- fonts ---------------------------------------------------------------- */

/**
 * Fetch the Google Fonts stylesheet and swap every woff2 URL for a base64
 * payload. Non-latin subsets are dropped: the site is English + Tamil place
 * names in latin script, and shipping cyrillic/greek would double the weight.
 */
async function buildFontCss() {
  const css = await (await get(FONT_CSS)).text();

  const blocks = css.match(/@font-face\s*{[^}]*}/g) ?? [];
  const latin = blocks.filter((b) => {
    const range = b.match(/unicode-range:\s*([^;]+);/)?.[1] ?? "";
    return range.includes("U+0000") || range.includes("U+0-");
  });

  console.log(`  fonts: ${latin.length} latin faces of ${blocks.length} total`);

  const inlined = [];
  for (const block of latin) {
    const url = block.match(/url\((https:\/\/[^)]+\.woff2)\)/)?.[1];
    if (!url) continue;
    const buf = Buffer.from(await (await get(url)).arrayBuffer());
    inlined.push(
      block.replace(url, dataUri("font/woff2", buf)).replace(/\s+/g, " "),
    );
    process.stdout.write(".");
  }
  process.stdout.write("\n");
  return inlined.join("\n");
}

/* -- photography ---------------------------------------------------------- */

/** Every Unsplash photo id referenced anywhere under src/. */
async function collectPhotoIds() {
  const { globSync } = await import("node:fs");
  const files = globSync("src/**/*.{js,jsx,css,html}", { cwd: ROOT });
  const ids = new Set();

  for (const file of files) {
    const text = await readFile(path.join(ROOT, file), "utf8");
    for (const match of text.matchAll(/photo-[0-9a-f]+-[0-9a-f]+/g)) {
      ids.add(match[0]);
    }
  }
  return [...ids].sort();
}

async function buildImageMap(ids) {
  const map = {};
  let bytes = 0;

  /* Six at a time: fast enough, polite enough that Unsplash does not throttle. */
  const queue = [...ids];
  const workers = Array.from({ length: 6 }, async () => {
    for (let id = queue.shift(); id; id = queue.shift()) {
      const url =
        `https://images.unsplash.com/${id}` +
        `?auto=format&fit=crop&q=${IMAGE_QUALITY}&w=${IMAGE_WIDTH}`;
      try {
        const res = await get(url);
        const buf = Buffer.from(await res.arrayBuffer());
        const mime = res.headers.get("content-type")?.split(";")[0] ?? "image/jpeg";
        map[id] = dataUri(mime, buf);
        bytes += buf.length;
        process.stdout.write(".");
      } catch (err) {
        console.warn(`\n  ! skipped ${id}: ${err.message}`);
      }
    }
  });
  await Promise.all(workers);
  process.stdout.write("\n");

  console.log(
    `  photos: ${Object.keys(map).length}/${ids.length} — ${(bytes / 1e6).toFixed(1)} MB raw`,
  );
  return map;
}

/* -- main ----------------------------------------------------------------- */

const force = process.argv.includes("--force");
await mkdir(CACHE, { recursive: true });

const fontPath = path.join(CACHE, "fonts.css");
const imagePath = path.join(CACHE, "images.json");

if (force || !existsSync(fontPath)) {
  console.log("Fetching fonts…");
  await writeFile(fontPath, await buildFontCss());
} else {
  console.log("Fonts cached.");
}

if (force || !existsSync(imagePath)) {
  const ids = await collectPhotoIds();
  console.log(`Fetching ${ids.length} photographs…`);
  await writeFile(imagePath, JSON.stringify(await buildImageMap(ids)));
} else {
  console.log("Photographs cached.");
}

console.log("Assets ready in scripts/artifact/.cache/");
