import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";

const container = document.getElementById("root");
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

/* Production HTML is prerendered (scripts/prerender.mjs), so the markup is
   already there and only needs hydrating. The dev server serves an empty
   root and mounts from scratch. */
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
