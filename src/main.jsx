import { createRoot, hydrateRoot } from "react-dom/client";
import Root from "./Root.jsx";
import { languageFromPath } from "./i18n/config";

const container = document.getElementById("root");
const root = <Root language={languageFromPath(window.location.pathname)} />;

// Production HTML is prerendered at build time (scripts/prerender.mjs), so
// attach to the existing markup. The dev server serves the bare template.
if (container.firstElementChild) {
  hydrateRoot(container, root);
} else {
  createRoot(container).render(root);
}
