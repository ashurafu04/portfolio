# achrafmalki.dev

Source for [achrafmalki.dev](https://achrafmalki.dev), the professional site of **Achraf Malki**, Software Engineer & IT Consultant (enterprise AI orchestration, headless commerce, cloud infrastructure).

[![CI](https://github.com/ashurafu04/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/ashurafu04/portfolio/actions/workflows/ci.yml)

## Architecture

A React 19 application, **prerendered to static HTML at build time** and hydrated in the browser. Every URL ships complete, localized markup before any JavaScript runs, then becomes interactive without re-rendering.

```
vite build                                  client bundle            -> dist/
vite build --ssr src/entry-server.jsx       render() for each page   -> dist-ssr/
node scripts/prerender.mjs                  HTML per page + sitemap  -> dist/index.html, dist/fr/index.html, dist/sitemap.xml
```

| Concern | Approach |
|---|---|
| Rendering | `react-dom/static` prerender + `hydrateRoot`. The build fails if a page is missing critical markup (portrait, headings, sections, canonical, JSON-LD). |
| Languages | One URL per language (`/`, `/fr/`). The URL is the only source of truth: no storage, no browser-language guessing. Switching pushes the other URL client-side and keeps the current `#section`. |
| SEO | Per-page `<title>`, description, canonical, `hreflang` (incl. `x-default`), Open Graph locale, and a schema.org graph (`Person`, `ProfilePage`, `CreativeWork` per case) generated from the same data the UI renders. |
| Theming | An inline boot script sets `data-theme` before first paint. Theme-specific images render both variants and CSS selects one, so prerendered HTML is correct for every visitor and hydration never mismatches. |
| Accessibility | WCAG AA contrast enforced by tests in both themes; reduced-motion fallbacks; complete content without JavaScript. |
| Hosting | Netlify. Security headers (CSP, HSTS, frame-ancestors), canonical-domain redirects and cache policy in `netlify.toml`. |

## Project layout

```
src/
  Root.jsx               app tree shared by client and prerender
  main.jsx               client entry: hydrate prerendered HTML (dev: mount)
  entry-server.jsx       build-time entry: pages list, render(), sitemap
  i18n/                  locale config, URL-backed language store, dictionaries
  seo/                   site constants, <head> and sitemap rendering, JSON-LD
  common/                shared components (navigation, cards, themed images)
  sections/              page sections; each owns its styles and data
scripts/
  prerender.mjs          writes one HTML file per page and validates it
  test-e2e.mjs           browser checks against the production build
  generate-og.ps1        regenerates public/og.png from the portrait
public/                  assets served at stable URLs (portrait, og image, icons)
```

Design rationale and tokens: [`PRODUCT.md`](./PRODUCT.md), [`DESIGN.md`](./DESIGN.md).

## Development

Requires Node 22 (see `.nvmrc`).

```sh
npm ci
npm run dev        # dev server at http://localhost:5173 (client-rendered)
npm run lint
npm run build      # client + prerender into dist/
npm test           # end-to-end checks against dist/ (Playwright Chromium)
npm run preview    # serve dist/ locally
```

`npm test` covers prerendered markup and structured data for every language, hydration without DOM replacement (light/dark × EN/FR), client-side language switching and history, AA contrast in both themes, and the no-JavaScript experience. CI runs lint, build and tests on every push and pull request.

## Common changes

- **Copy:** edit `src/i18n/locales/en.js` and `fr.js` (same shape).
- **Engineering cases:** add the entry to `src/sections/ProjectSection/casesData.js` and its copy under `projects.cases` in both locales. It appears in the UI and the structured data.
- **Certifications:** `src/sections/CertificationsSection/certificationsData.js`. `kind` must match how the issuer classifies the credential.
- **Content date:** bump `CONTENT_UPDATED` in `src/seo/site.js` when page content changes (drives `dateModified` and sitemap `lastmod`).
- **Portrait:** run `python scripts/generate-portrait.py path/to/photo.png` (square photo, subject inside an inscribed circle; needs Pillow). It rewrites the canonical `public/achraf-malki.png` at the same URL and the WebP sizes browsers load. Then update `PORTRAIT` in `src/seo/site.js` if the size changed, and run `scripts/generate-og.ps1`.

## Contact

[LinkedIn](https://www.linkedin.com/in/achraf-malki/) · [achrafmalki.dev](https://achrafmalki.dev/#contact)

© 2026 Achraf Malki. All rights reserved.
