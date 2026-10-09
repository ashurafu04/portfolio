import { cases } from "../sections/ProjectSection/casesData";
import { LOCALES } from "../i18n/config";
import { SITE_URL, PORTRAIT, PROFILES, KNOWS_ABOUT, CONTENT_UPDATED } from "./site";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const PORTRAIT_ID = `${SITE_URL}/#portrait`;
const portraitUrl = `${SITE_URL}${PORTRAIT.path}`;

// schema.org graph for one localized page. Entity @ids (person, portrait,
// cases) are shared across languages so both pages describe the same
// entities; page-level nodes get per-URL @ids.
export function buildStructuredData(language, t) {
  const pageUrl = `${SITE_URL}${LOCALES[language].path}`;
  const inLanguage = LOCALES[language].htmlLang;
  const profileId = `${pageUrl}#profile`;

  const caseNodes = cases.map(({ id, keywords }) => {
    const copy = t.projects.cases[id];
    return {
      "@type": "CreativeWork",
      "@id": `${SITE_URL}/#${id}`,
      name: `${copy.h3} — ${copy.subtitle}`,
      description: copy.description,
      keywords,
      creator: { "@id": PERSON_ID },
      url: `${pageUrl}#projects`,
      inLanguage,
    };
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: "Achraf Malki",
        url: `${SITE_URL}/`,
        image: {
          "@type": "ImageObject",
          "@id": PORTRAIT_ID,
          url: portraitUrl,
          contentUrl: portraitUrl,
          width: PORTRAIT.width,
          height: PORTRAIT.height,
          caption: "Achraf Malki",
        },
        jobTitle: t.hero.role,
        description: t.hero.description,
        knowsAbout: KNOWS_ABOUT,
        sameAs: [PROFILES.x, PROFILES.github, PROFILES.linkedin],
        mainEntityOfPage: { "@id": profileId },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: "Achraf Malki",
        author: { "@id": PERSON_ID },
        inLanguage: Object.values(LOCALES).map((locale) => locale.htmlLang),
      },
      {
        "@type": "ProfilePage",
        "@id": profileId,
        url: pageUrl,
        name: t.meta.title,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": PERSON_ID },
        primaryImageOfPage: { "@id": PORTRAIT_ID },
        dateModified: CONTENT_UPDATED,
        inLanguage,
      },
      ...caseNodes,
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#projects`,
        name: t.projects.sectionTitle,
        numberOfItems: caseNodes.length,
        itemListElement: caseNodes.map((node, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: { "@id": node["@id"] },
        })),
      },
    ],
  };
}
