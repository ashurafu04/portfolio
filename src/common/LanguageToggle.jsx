import { useTranslation } from "../i18n";
import styles from "./LanguageToggleStyles.module.css";

export function LanguageToggle({ variant = "desktop" }) {
  const { language, setLanguage, toggleLanguage, t } = useTranslation();

  if (variant === "mobile") {
    const targetLang = language === "en" ? "fr" : "en";
    const label = targetLang.toUpperCase();
    return (
      <button
        type="button"
        className={styles.mobileBtn}
        onClick={toggleLanguage}
        aria-label={t.nav?.langToggleAria || `Switch to ${targetLang === "fr" ? "French" : "English"}`}
        title={`Switch to ${targetLang === "fr" ? "French" : "English"}`}
      >
        {label}
      </button>
    );
  }

  // Desktop segmented dual pill (clean, elegant, matches portfolio aesthetic)
  return (
    <div
      className={styles.desktopPill}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        className={`${styles.pillSegment} ${
          language === "en" ? styles.pillSegmentActive : ""
        }`}
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        aria-label="English"
      >
        EN
      </button>
      <button
        type="button"
        className={`${styles.pillSegment} ${
          language === "fr" ? styles.pillSegmentActive : ""
        }`}
        onClick={() => setLanguage("fr")}
        aria-pressed={language === "fr"}
        aria-label="Français"
      >
        FR
      </button>
    </div>
  );
}

export default LanguageToggle;
