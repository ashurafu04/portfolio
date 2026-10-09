import { LOCALES, DEFAULT_LANGUAGE } from "../i18n/config";
import { SITE_URL, PORTRAIT, OG_IMAGE, CONTENT_UPDATED } from "./site";
import { buildStructuredData } from "./structuredData";

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// JSON inside <script> must not be able to close the tag early.
const escapeJsonForScript = (json) => json.replace(/</g, "\\u003c");

const pageUrl = (language) => `${SITE_URL}${LOCALES[language].path}`;

// Language-specific <head> tags for one prerendered page. Language-neutral
// tags (charset, robots, og:image, fonts, boot script) stay in index.html.
export function renderHead(language, t) {
  const { ogLocale } = LOCALES[language];
  const url = pageUrl(language);
  const alternates = Object.keys(LOCALES).map(
    (lang) => `<link rel="alternate" hreflang="${lang}" href="${pageUrl(lang)}" />`
  );
  const ogAlternates = Object.entries(LOCALES)
    .filter(([lang]) => lang !== language)
    .map(([, locale]) => `<meta property="og:locale:alternate" content="${locale.ogLocale}" />`);
  const structuredData = JSON.stringify(buildStructuredData(language, t));

  return [
    `<title>${escapeAttr(t.meta.title)}</title>`,
    `<meta name="description" content="${escapeAttr(t.meta.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    ...alternates,
    `<link rel="alternate" hreflang="x-default" href="${pageUrl(DEFAULT_LANGUAGE)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:locale" content="${ogLocale}" />`,
    ...ogAlternates,
    `<meta property="og:title" content="${escapeAttr(t.meta.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(t.meta.ogDescription)}" />`,
    `<meta property="og:image:alt" content="${escapeAttr(t.meta.title)}" />`,
    `<meta name="twitter:title" content="${escapeAttr(t.meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(t.meta.ogDescription)}" />`,
    `<meta name="twitter:image:alt" content="${escapeAttr(t.meta.title)}" />`,
    `<script type="application/ld+json">${escapeJsonForScript(structuredData)}</script>`,
  ].join("\n    ");
}

export function renderSitemap() {
  const alternates = [
    ...Object.keys(LOCALES).map(
      (lang) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${pageUrl(lang)}" />`
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl(DEFAULT_LANGUAGE)}" />`,
  ].join("\n");

  const urls = Object.keys(LOCALES).map(
    (lang) => `  <url>
    <loc>${pageUrl(lang)}</loc>
    <lastmod>${CONTENT_UPDATED}</lastmod>
${alternates}
    <image:image>
      <image:loc>${SITE_URL}${PORTRAIT.path}</image:loc>
    </image:image>
    <image:image>
      <image:loc>${SITE_URL}${OG_IMAGE.path}</image:loc>
    </image:image>
  </url>`
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join("\n")}
</urlset>
`;
}
