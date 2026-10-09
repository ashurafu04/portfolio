// Build step 3/3: write one prerendered HTML file per page, plus sitemap.xml.
//
//   vite build                                               -> dist/ (client)
//   vite build --ssr src/entry-server.jsx --outDir dist-ssr  -> render()
//   node scripts/prerender.mjs                               -> dist/**/index.html
//
// Crawlers must find the portrait and the page copy in the HTML the server
// sends, not only in the JS-rendered DOM. The build fails if any page breaks
// that invariant.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const serverEntry = path.join(root, "dist-ssr", "entry-server.js");

const HEAD_PLACEHOLDER = "<!--app-head-->";
const APP_PLACEHOLDER = "<!--app-html-->";
const HTML_LANG = '<html lang="en">';

function fail(message) {
  console.error(`[prerender] ${message}`);
  process.exit(1);
}

function expectOnce(template, token) {
  const count = template.split(token).length - 1;
  if (count !== 1) fail(`expected exactly one ${token} in dist/index.html, found ${count}`);
}

const template = await readFile(path.join(distDir, "index.html"), "utf8");
[HEAD_PLACEHOLDER, APP_PLACEHOLDER, HTML_LANG].forEach((token) => expectOnce(template, token));

const { pages, render, renderSitemap } = await import(pathToFileURL(serverEntry).href);

for (const page of pages) {
  const { appHtml, headHtml } = await render(page.language);

  const required = [
    ["portrait <img>", /<img[^>]+src="\/achraf-malki\.png"/, appHtml],
    ["hero <h1>", /<h1[^>]*>[^<]+<\/h1>/, appHtml],
    ["#projects section", /<section[^>]+id="projects"/, appHtml],
    ["#contact section", /<section[^>]+id="contact"/, appHtml],
    ["<title>", /<title>[^<]+<\/title>/, headHtml],
    ["canonical link", /<link rel="canonical"/, headHtml],
    ["JSON-LD", /<script type="application\/ld\+json">/, headHtml],
  ];
  for (const [label, pattern, html] of required) {
    if (!pattern.test(html)) fail(`${page.path}: prerendered HTML is missing the ${label}`);
  }

  const html = template
    .replace(HTML_LANG, `<html lang="${page.htmlLang}">`)
    .replace(HEAD_PLACEHOLDER, () => headHtml)
    .replace(APP_PLACEHOLDER, () => appHtml);

  const outDir = path.join(distDir, page.path);
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "index.html"), html);
  console.log(`[prerender] ${page.path} -> ${path.relative(root, path.join(outDir, "index.html"))} (${(html.length / 1024).toFixed(1)} KiB)`);
}

await writeFile(path.join(distDir, "sitemap.xml"), renderSitemap());
console.log("[prerender] sitemap.xml written");
