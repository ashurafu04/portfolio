import { createContext, useContext, useEffect, useCallback, useMemo, useSyncExternalStore } from "react";
import { DICTIONARIES, LOCALES, languageFromPath } from "./config";

const LanguageContext = createContext();

// The URL is the store: /fr/ is French, everything else English. Switching
// language pushes the other locale's URL (keeping the #section) so the
// address always matches the prerendered page for that language.
const listeners = new Set();
const notify = () => listeners.forEach((listener) => listener());

const subscribe = (listener) => {
  listeners.add(listener);
  window.addEventListener("popstate", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("popstate", listener);
  };
};

const getSnapshot = () => languageFromPath(window.location.pathname);

function navigateToLanguage(language) {
  if (!LOCALES[language] || language === getSnapshot()) return;
  window.history.pushState(null, "", LOCALES[language].path + window.location.hash);
  notify();
}

// `language` is the page being rendered: required for the build-time
// prerender (no window), and must match the URL when hydrating.
export function LanguageProvider({ language: pageLanguage, children }) {
  const getServerSnapshot = useCallback(() => pageLanguage, [pageLanguage]);
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLanguage = useCallback((newLang) => navigateToLanguage(newLang), []);

  // Keep document metadata in sync after client-side language switches
  useEffect(() => {
    const { meta } = DICTIONARIES[language];
    document.documentElement.lang = LOCALES[language].htmlLang;
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage, t: DICTIONARIES[language] }),
    [language, setLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}
