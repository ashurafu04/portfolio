// Build step 3/3: inject the server-rendered app into dist/index.html.
//
//   vite build                                         -> dist/ (client)
//   vite build --ssr src/entry-server.jsx --outDir dist-ssr  -> render()
//   node scripts/prerender.mjs                         -> dist/index.html
//
// The portrait <img> must be in the HTML the server sends (not only in the
// JS-rendered DOM) so crawlers discover it on first fetch. This script fails
// the build if that invariant breaks.
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const templatePath = path.join(root, "dist", "index.html");
const serverEntry = path.join(root, "dist-ssr", "entry-server.js");

const PLACEHOLDER = "<!--app-html-->";
const REQUIRED_MARKUP = [
  { label: "portrait <img>", pattern: /<img[^>]+src="\/achraf-malki\.png"/ },
  { label: "hero <h1>", pattern: /<h1[^>]*>ACHRAF MALKI<\/h1>/ },
  { label: "#projects section", pattern: /<section[^>]+id="projects"/ },
  { label: "#contact section", pattern: /<section[^>]+id="contact"/ },
];

function fail(message) {
  console.error(`[prerender] ${message}`);
  process.exit(1);
}

const template = await readFile(templatePath, "utf8");
const occurrences = template.split(PLACEHOLDER).length - 1;
if (occurrences !== 1) {
  fail(`expected exactly one ${PLACEHOLDER} in dist/index.html, found ${occurrences}`);
}

const { render } = await import(pathToFileURL(serverEntry).href);
const appHtml = await render();

for (const { label, pattern } of REQUIRED_MARKUP) {
  if (!pattern.test(appHtml)) fail(`prerendered HTML is missing the ${label}`);
}

await writeFile(templatePath, template.replace(PLACEHOLDER, () => appHtml));
console.log(`[prerender] dist/index.html written (${(appHtml.length / 1024).toFixed(1)} KiB of app markup)`);
