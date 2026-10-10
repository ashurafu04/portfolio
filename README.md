<div align="center">

[![Achraf Malki: Software Engineer & IT Consultant](public/og.png)](https://achrafmalki.dev)

# achrafmalki.dev

Source for the professional site of **Achraf Malki**, Software Engineer & IT Consultant:<br>
enterprise AI orchestration, headless commerce and cloud infrastructure.

[Live site](https://achrafmalki.dev) · [Version française](https://achrafmalki.dev/fr/) · [LinkedIn](https://www.linkedin.com/in/achraf-malki/)

[![CI](https://github.com/ashurafu04/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/ashurafu04/portfolio/actions/workflows/ci.yml)

</div>

## Engineering highlights

A small site, built with the same constraints applied to production systems: every guarantee below is enforced by the build or by tests in CI, not by convention.

- **Static-first rendering with verified hydration.** React 19 prerenders every URL to complete HTML at build time; the browser hydrates that markup instead of re-rendering it. The build fails if a page is missing critical markup, and browser tests prove React reuses the server's DOM nodes rather than silently replacing them.
- **One URL per language.** `/` and `/fr/` are separate prerendered pages with their own `<html lang>`, canonical, `hreflang` (including `x-default`), Open Graph locale and structured data. The URL is the only source of truth for language; switching updates it client-side and keeps the current section.
- **Structured data generated from content.** A schema.org graph (`Person`, `ProfilePage`, `CreativeWork` per engineering case) is built from the same data the UI renders, so it cannot drift. Google validates it as a Profile page.
- **Search-ready identity assets.** The canonical portrait lives at one stable URL shared by the page, `Person.image` and the sitemap; legacy URLs 301 to it. Browsers download 13–28 KB WebP versions through `<picture>`, while crawlers index the full-resolution original.
- **Theming without hydration mismatch.** An inline boot script sets the theme before first paint; theme-specific images render both variants and CSS selects one, so prerendered HTML is correct for every visitor.
- **Accessibility as a test, not a checklist.** WCAG AA contrast is measured in both themes; motion respects `prefers-reduced-motion`; the page is complete with JavaScript disabled.
- **Hardened delivery.** Content Security Policy, HSTS, `frame-ancestors`, canonical-domain redirects and per-asset cache policy, all in `netlify.toml`.

## Build pipeline

```
vite build                                  client bundle            -> dist/
vite build --ssr src/entry-server.jsx       render() for each page   -> dist-ssr/
node scripts/prerender.mjs                  HTML per page + sitemap  -> dist/index.html, dist/fr/index.html, dist/sitemap.xml
```

## Quality gates

CI runs on every push and pull request:

| Gate | What it enforces |
|---|---|
| `npm run lint` | ESLint across the app and the Node build/test scripts |
| `npm run build` | Prerender succeeds and every page contains its portrait, headings, sections, canonical and JSON-LD |
| `npm test` | Playwright against the production build: localized markup and structured data per URL; hydration without DOM replacement (light/dark × EN/FR); language switching and history; AA contrast in both themes; mobile hero fits a 375×667 viewport; marquee accessibility and reduced motion; no-JavaScript rendering |

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
  generate-portrait.py   canonical portrait + WebP sizes
  generate-og.ps1        social card from the portrait
public/                  assets served at stable URLs (portrait, social card, icons)
```

Product and design rationale: [`PRODUCT.md`](./PRODUCT.md) (audience, positioning, principles) and [`DESIGN.md`](./DESIGN.md) (tokens, components, rules).

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

## Content changes

- **Copy:** `src/i18n/locales/en.js` and `fr.js` (same shape).
- **Engineering cases:** add the entry to `src/sections/ProjectSection/casesData.js` and its copy under `projects.cases` in both locales. It appears in the UI and the structured data.
- **Certifications:** `src/sections/CertificationsSection/certificationsData.js`. `featuredCertifications` is the static first row; `learningCertifications` is the moving continuous-learning row. `kind` must match how the issuer classifies the credential.
- **Content date:** bump `CONTENT_UPDATED` in `src/seo/site.js` when page content changes (drives `dateModified` and sitemap `lastmod`).
- **Portrait:** `python scripts/generate-portrait.py path/to/photo.png` (square photo, circular cut-out on a white canvas; needs Pillow). It replaces `public/achraf-malki.png` at the same URL and rebuilds the WebP sizes. Then update `PORTRAIT` in `src/seo/site.js` if the size changed, and run `scripts/generate-og.ps1`.

## Rights

The source is public for transparency and review. Copy, photographs, logos and branding are © 2026 Achraf Malki and are not licensed for reuse.

**Contact:** [LinkedIn](https://www.linkedin.com/in/achraf-malki/) · [achrafmalki.dev](https://achrafmalki.dev/#contact)
