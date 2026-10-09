import styles from "./HeroStyles.module.css";
import xLight from "../../assets/twitter-light.svg";
import xDark from "../../assets/twitter-dark.svg";
import githubLight from "../../assets/github-light.svg";
import githubDark from "../../assets/github-dark.svg";
import linkedinLight from "../../assets/linkedin-light.svg";
import linkedinDark from "../../assets/linkedin-dark.svg";
import CV from "../../assets/cv.pdf";
import ThemedImage from "../../common/ThemedImage";
import { PORTRAIT, PROFILES } from "../../seo/site";
import { useTranslation } from "../../i18n";

function Hero() {
  const { t } = useTranslation();

  return (
    <section id="hero" className={styles.container}>
      <div className={styles.colorModeContainer}>
        {/* Stable public/ URL shared with Person.image and the sitemap (see
            seo/site.js). Never import it through Vite: that fingerprints it. */}
        <img
          className={styles.hero}
          src={PORTRAIT.path}
          alt={t.hero.portraitAlt}
          width={PORTRAIT.width}
          height={PORTRAIT.height}
          fetchPriority="high"
          decoding="async"
        />
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
          <a className="hover" href={CV} target="_blank" rel="noopener noreferrer">
            {t.hero.viewResume}
          </a>
          <a className={`hover ${styles.downloadBtn}`} href={CV} download>
            {t.hero.downloadResume}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
