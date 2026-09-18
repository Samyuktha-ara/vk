import { StrictMode } from "react";
import { prerender as reactPrerender } from "react-dom/static";
import { StaticRouter } from "react-router-dom";

import { AppShell } from "./App.jsx";

/**
 * Build-time renderer used by scripts/prerender.mjs.
 *
 * Two things would otherwise leave the page as its Suspense fallback with the
 * real content in a hidden slot for an inline script to swap in — fine for
 * streaming, wrong for a static file, and it breaks hydration:
 *
 *  · React "outlines" any Suspense boundary larger than its progressive
 *    chunk size (12.8 kB by default). Every route here is larger, so the
 *    limit is lifted.
 *  · The legal routes are `lazy()`; their first render resolves the module,
 *    so a second pass renders them synchronously.
 */
export async function render(url) {
  let html = await renderOnce(url);
  if (html.includes("<!--$?-->")) html = await renderOnce(url);
  return html;
}

async function renderOnce(url) {
  const { prelude } = await reactPrerender(
    <StrictMode>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </StrictMode>,
    { progressiveChunkSize: Number.MAX_SAFE_INTEGER },
  );

  let html = "";
  const decoder = new TextDecoder();
  for await (const chunk of prelude) html += decoder.decode(chunk, { stream: true });
  return html;
}
