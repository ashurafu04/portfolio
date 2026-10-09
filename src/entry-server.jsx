import { prerenderToNodeStream } from "react-dom/static";
import Root from "./Root.jsx";

// Build-time only: renders the app to static HTML for scripts/prerender.mjs.
export async function render() {
  const { prelude } = await prerenderToNodeStream(<Root />);

  let html = "";
  for await (const chunk of prelude) {
    html += chunk;
  }
  return html;
}
