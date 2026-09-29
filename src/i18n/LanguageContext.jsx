import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import en from "./locales/en";
import fr from "./locales/fr";

const dictionaries = { en, fr };

export const LanguageContext = createContext();

const STORAGE_KEY = "portfolio_lang";

function getInitialLanguage() {
  if (typeof window === "undefined") return "en";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (saved === "en" || saved === "fr")) {
      return saved;
    }
    const browserLang = navigator.language || navigator.userLanguage || "";
    if (browserLang.toLowerCase().startsWith("fr")) {
      return "fr";
    }
  } catch {
    // Fallback if localStorage is inaccessible
  }
  return "en";
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage);

  const setLanguage = useCallback((newLang) => {
    if (newLang !== "en" && newLang !== "fr") return;
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // Ignore write errors
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const next = prev === "en" ? "fr" : "en";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Ignore write errors
      }
      return next;
    });
  }, []);

  // Sync document element attributes and meta tags on language change
  useEffect(() => {
    document.documentElement.lang = language;

    const currentDict = dictionaries[language];
    if (currentDict?.meta) {
      if (currentDict.meta.title) {
        document.title = currentDict.meta.title;
      }
      if (currentDict.meta.description) {
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute("content", currentDict.meta.description);
        }
      }
    }
  }, [language]);

  const t = useMemo(() => dictionaries[language] || dictionaries.en, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
      isFrench: language === "fr",
      isEnglish: language === "en",
    }),
    [language, setLanguage, toggleLanguage, t]
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

export default LanguageContext;
