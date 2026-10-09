import { prerenderToNodeStream } from "react-dom/static";
import Root from "./Root.jsx";
import { DICTIONARIES, LOCALES } from "./i18n/config";
import { renderHead, renderSitemap } from "./seo/head";

// Build-time only, consumed by scripts/prerender.mjs.

// Every prerendered page. Adding a route (e.g. a case study) means adding it
// here and making the client render it from the same URL.
export const pages = Object.entries(LOCALES).map(([language, locale]) => ({
  language,
  path: locale.path,
  htmlLang: locale.htmlLang,
}));

export async function render(language) {
  const { prelude } = await prerenderToNodeStream(<Root language={language} />);

  let appHtml = "";
  for await (const chunk of prelude) {
    appHtml += chunk;
  }
  return { appHtml, headHtml: renderHead(language, DICTIONARIES[language]) };
}

export { renderSitemap };
