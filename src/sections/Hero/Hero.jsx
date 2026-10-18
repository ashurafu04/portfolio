import styles from "./HeroStyles.module.css";
import xLight from "../../assets/twitter-light.svg";
import xDark from "../../assets/twitter-dark.svg";
import githubLight from "../../assets/github-light.svg";
import githubDark from "../../assets/github-dark.svg";
import linkedinLight from "../../assets/linkedin-light.svg";
import linkedinDark from "../../assets/linkedin-dark.svg";
import cvEnglish from "../../assets/cv_eng.pdf";
import cvFrench from "../../assets/cv_fr.pdf";
import portrait400 from "../../assets/portrait-400.webp";
import portrait800 from "../../assets/portrait-800.webp";
import ThemedImage from "../../common/ThemedImage";
import { PORTRAIT, PROFILES } from "../../seo/site";
import { useTranslation } from "../../i18n";

// The resume follows the page language: /fr/ serves the French CV. fileName
// names the download (the served URL is fingerprinted by Vite).
const RESUMES = {
  en: { url: cvEnglish, fileName: "Achraf-Malki-CV-EN.pdf" },
  fr: { url: cvFrench, fileName: "Achraf-Malki-CV-FR.pdf" },
};

function Hero() {
  const { language, t } = useTranslation();
  const cv = RESUMES[language];

  return (
    <section id="hero" className={styles.container}>
      <div className={styles.portrait}>
        {/* <img src> is the canonical portrait Google indexes (stable public/
            URL shared with Person.image and the sitemap; never import it
            through Vite, which fingerprints it). Browsers download the small
            WebP sources instead. Regenerate both: scripts/generate-portrait.py */}
        <picture>
          <source
            type="image/webp"
            srcSet={`${portrait400} 400w, ${portrait800} 800w`}
            sizes="(min-width: 1400px) 400px, (min-width: 800px) 350px, (min-width: 769px) 200px, 140px"
          />
          <img
            className={styles.hero}
            src={PORTRAIT.path}
            alt={t.hero.portraitAlt}
            width={PORTRAIT.width}
            height={PORTRAIT.height}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>
      <div className={styles.info}>
        <h1>{t.hero.name}</h1>
        <p className={styles.role}>{t.hero.role}</p>
        <p className={styles.tagline}>{t.hero.tagline}</p>
        <span>
          <a
            href={PROFILES.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.hero.xAria}
          >
            <ThemedImage light={xLight} dark={xDark} />
          </a>
          <a
            href={PROFILES.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.hero.githubAria}
          >
            <ThemedImage light={githubLight} dark={githubDark} />
          </a>
          <a
            href={PROFILES.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.hero.linkedinAria}
          >
            <ThemedImage light={linkedinLight} dark={linkedinDark} />
          </a>
        </span>
        <p className={styles.description}>{t.hero.description}</p>
        <div className={styles.cvButtons}>
          <a href={cv.url} target="_blank" rel="noopener noreferrer">
            {t.hero.viewResume}
          </a>
          <a className={styles.downloadBtn} href={cv.url} download={cv.fileName}>
            {t.hero.downloadResume}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
