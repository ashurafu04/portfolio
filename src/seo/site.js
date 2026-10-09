export const SITE_URL = "https://achrafmalki.dev";

// Canonical portrait: served from public/ at a stable, non-fingerprinted URL
// and referenced by the hero image, Person.image and the sitemap.
export const PORTRAIT = { path: "/achraf-malki.png", width: 500, height: 500 };

export const OG_IMAGE = { path: "/og.png", width: 1200, height: 630 };

export const PROFILES = {
  x: "https://x.com/AchrafMalkiEng",
  github: "https://github.com/ashurafu04",
  linkedin: "https://www.linkedin.com/in/achraf-malki/",
};

export const KNOWS_ABOUT = [
  "Enterprise AI Orchestration",
  "Hybrid Headless Commerce",
  "Cloud Infrastructure",
  "B2B Software Integration",
  "Backend Engineering",
  "ERP Systems",
  "Multi-tenant Architecture",
  "Zero-PII Data Compliance",
  "Odoo",
  "Next.js",
  "Python",
  "Node.js",
];

// Bump when page content changes; drives ProfilePage.dateModified and
// sitemap <lastmod>. Not derived from build time, which would claim a
// content change on every deploy.
export const CONTENT_UPDATED = "2026-10-09";
