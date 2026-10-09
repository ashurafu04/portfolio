import en from "./locales/en";
import fr from "./locales/fr";

export const DICTIONARIES = { en, fr };

// Each language is its own prerendered URL; the URL is the source of truth
// for the active language (no storage, no browser-language guessing), so
// crawlers and visitors always get the language the address promises.
export const LOCALES = {
  en: { path: "/", htmlLang: "en", ogLocale: "en_US" },
  fr: { path: "/fr/", htmlLang: "fr", ogLocale: "fr_FR" },
};

export const DEFAULT_LANGUAGE = "en";

export function languageFromPath(pathname) {
  return /^\/fr(\/|$)/.test(pathname) ? "fr" : DEFAULT_LANGUAGE;
}
