/* ==========================================================================
   ARTIFACT PREVIEW — VITE CONFIG
   --------------------------------------------------------------------------
   Builds the site as ONE self-contained file for a shareable client preview.
   The preview host serves a single HTML document and blocks every cross-origin
   request, which forces three departures from the production build:

     1. no code splitting  — a lazy chunk would be a fetch that never resolves
     2. no asset URLs      — images and fonts ride along as data URIs
     3. no history routing — the page is not served from /, so BrowserRouter
                             would match the artifact's own path and 404

   Production `vite build` is untouched; nothing here is imported by the app.
   ========================================================================== */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../..");

const images = JSON.parse(
  readFileSync(path.join(HERE, ".cache/images.json"), "utf8"),
);

/** Files in public/ are served by URL, which the single-file preview has no
    server for. The brand marks are the only ones the app reads at runtime. */
const publicAsset = (name) =>
  `data:image/png;base64,${readFileSync(path.join(ROOT, "public", name)).toString("base64")}`;

/**
 * Replace `find` in `code` exactly once, or fail the build.
 *
 * These patches are pinned to source that lives elsewhere in the repo, so a
 * silent no-match would ship a preview with broken images or a blank router.
 * Loud failure is the only safe outcome.
 */
function patch(code, find, replace, what) {
  const hits = code.split(find).length - 1;
  if (hits !== 1) {
    throw new Error(
      `[artifact] expected exactly 1 match for ${what}, found ${hits}. ` +
        `The source has changed — update scripts/artifact/vite.artifact.config.mjs.`,
    );
  }
  return code.replace(find, replace);
}

const inlineForPreview = () => ({
  name: "vk-artifact-inline",
  enforce: "pre",

  transform(code, id) {
    const file = id.split("?")[0].replace(/\\/g, "/");

    /* Hash routing: the artifact lives at /artifacts/<id>, so a path router
       would evaluate that path against the app's routes and render the 404. */
    if (file.endsWith("/src/App.jsx")) {
      let out = patch(
        code,
        "BrowserRouter, Route, Routes, useLocation",
        "HashRouter, Route, Routes, useLocation",
        "the react-router import",
      );
      out = patch(out, "<BrowserRouter>", "<HashRouter>", "the opening router tag");
      out = patch(out, "</BrowserRouter>", "</HashRouter>", "the closing router tag");
      return { code: out, map: null };
    }

    /* Photography: `u()` builds an Unsplash delivery URL and `srcSetFor()`
       fans it out across five widths. Both become lookups into the baked-in
       map — one resolution per photo is all a preview needs. */
    if (file.endsWith("/src/data/media.js")) {
      let out = patch(
        code,
        "const u = (id, w = 1600, extra = \"\") =>\n  `${UNSPLASH}${id}?auto=format&fit=crop&q=72&w=${w}${extra}`;",
        "const u = (id) => INLINE_IMAGES[id] ?? `${UNSPLASH}${id}`;",
        "the Unsplash URL builder",
      );
      out = patch(
        out,
        "  if (!image?.id) return undefined;\n  return widths.map((w) => `${u(image.id, w)} ${w}w`).join(\", \");",
        "  return undefined;",
        "the srcset builder",
      );
      /* `widths` is now unused; keep the signature so callers stay valid. */
      return {
        code: `const INLINE_IMAGES = ${JSON.stringify(images)};\n${out}`,
        map: null,
      };
    }

    /* Brand marks: the navbar, footer and preloader read these paths straight
       from the business record, so they have to become data URIs too. */
    if (file.endsWith("/src/data/business.js")) {
      let out = patch(
        code,
        '"/vk-mark.png",\n    logoSrcLight: "/vk-mark.png",',
        `${JSON.stringify(publicAsset("vk-mark.png"))},\n    logoSrcLight: ${JSON.stringify(publicAsset("vk-mark.png"))},`,
        "the navbar logo pair",
      );
      out = patch(
        out,
        '"/vk-logo.png"',
        JSON.stringify(publicAsset("vk-logo.png")),
        "the full logo",
      );
      return { code: out, map: null };
    }

    return null;
  },
});

export default defineConfig({
  root: ROOT,
  plugins: [inlineForPreview(), react()],
  build: {
    outDir: path.join(HERE, ".build"),
    emptyOutDir: true,
    cssCodeSplit: false,
    modulePreload: false,
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
    reportCompressedSize: false,
    rollupOptions: {
      output: { codeSplitting: false },
    },
  },
});
