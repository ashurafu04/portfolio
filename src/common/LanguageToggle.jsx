import { useTranslation } from "../i18n";
import { LOCALES } from "../i18n/config";
import styles from "./LanguageToggleStyles.module.css";

// Real links between the prerendered language pages, so crawlers can follow
// them. Plain clicks switch in place; modified clicks (new tab, etc.) and
// no-JS visits fall back to normal navigation.
function LanguageLink({ lang, className, children, ...props }) {
  const { language, setLanguage } = useTranslation();

  const handleClick = (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    setLanguage(lang);
  };

  return (
    <a
      href={LOCALES[lang].path}
      hrefLang={LOCALES[lang].htmlLang}
      lang={LOCALES[lang].htmlLang}
      className={className}
      aria-current={lang === language ? "true" : undefined}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
}

export function LanguageToggle({ variant = "desktop" }) {
  const { language, t } = useTranslation();

  if (variant === "mobile") {
    const targetLang = language === "en" ? "fr" : "en";
    return (
      <LanguageLink lang={targetLang} className={styles.mobileBtn} aria-label={t.nav.langToggleAria}>
        {targetLang.toUpperCase()}
      </LanguageLink>
    );
  }

  return (
    <div className={styles.desktopPill} role="group" aria-label={t.nav.languageGroupAria}>
      {Object.keys(LOCALES).map((lang) => (
        <LanguageLink
          key={lang}
          lang={lang}
          className={`${styles.pillSegment} ${
            lang === language ? styles.pillSegmentActive : ""
          }`}
          aria-label={lang === "en" ? "English" : "Français"}
        >
          {lang.toUpperCase()}
        </LanguageLink>
      ))}
    </div>
  );
}

export default LanguageToggle;
