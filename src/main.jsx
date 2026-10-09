import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import Root from "./Root.jsx";

const container = document.getElementById("root");

// Production HTML is prerendered at build time (scripts/prerender.mjs), so
// attach to the existing markup. The dev server serves the bare template.
if (container.firstElementChild) {
  hydrateRoot(container, <Root />);
} else {
  createRoot(container).render(<Root />);
}
