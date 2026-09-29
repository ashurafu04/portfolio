import styles from "./HeroStyles.module.css";
import heroImg from "../../assets/hero-img.png";
import xLight from "../../assets/twitter-light.svg";
import xDark from "../../assets/twitter-dark.svg";
import githubLight from "../../assets/github-light.svg";
import githubDark from "../../assets/github-dark.svg";
import linkedinLight from "../../assets/linkedin-light.svg";
import linkedinDark from "../../assets/linkedin-dark.svg";
import CV from "../../assets/cv.pdf";
import { useTheme } from "../../common/ThemeContext";
import { useTranslation } from "../../i18n";

function Hero() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const xIcon = theme === "light" ? xLight : xDark;
  const githubIcon = theme === "light" ? githubLight : githubDark;
  const linkedinIcon = theme === "light" ? linkedinLight : linkedinDark;

  return (
    <section id="hero" className={styles.container}>
      <div className={styles.colorModeContainer}>
        <img
          className={styles.hero}
          src={heroImg}
          alt={t.hero.portraitAlt}
          width="500"
          height="500"
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
            href="https://x.com/AchrafMalkiEng"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.hero.xAria}
          >
            <img src={xIcon} alt="" />
          </a>
          <a
            href="https://github.com/ashurafu04"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.hero.githubAria}
          >
            <img src={githubIcon} alt="" />
          </a>
          <a
            href="https://www.linkedin.com/in/achraf-malki/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.hero.linkedinAria}
          >
            <img src={linkedinIcon} alt="" />
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
