import styles from "./HeroStyles.module.css";
import heroImg from "../../assets/hero-img.png";
import sun from "../../assets/sun.svg";
import moon from "../../assets/moon.svg";
import xLight from "../../assets/twitter-light.svg";
import xDark from "../../assets/twitter-dark.svg";
import githubLight from "../../assets/github-light.svg";
import githubDark from "../../assets/github-dark.svg";
import linkedinLight from "../../assets/linkedin-light.svg";
import linkedinDark from "../../assets/linkedin-dark.svg";
import CV from "../../assets/cv.pdf";
import { useTheme } from "../../common/ThemeContext";

function Hero() {
  const { theme, toggleTheme } = useTheme();

  const themeIcon = theme === "light" ? sun : moon;
  const xIcon = theme === "light" ? xLight : xDark;
  const githubIcon = theme === "light" ? githubLight : githubDark;
  const linkedinIcon = theme === "light" ? linkedinLight : linkedinDark;

  return (
    <section id="hero" className={styles.container}>
      <div className={styles.colorModeContainer}>
        <img
          className={styles.hero}
          src={heroImg}
          alt="Portrait of Achraf Malki"
          width="500"
          height="500"
          fetchPriority="high"
          decoding="async"
        />
        <button
          type="button"
          className={styles.colorMode}
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          <img src={themeIcon} alt="" />
        </button>
      </div>
      <div className={styles.info}>
        <h1>ACHRAF MALKI</h1>
        <p className={styles.role}>Software Engineer & IT Consultant</p>
        <p className={styles.tagline}>
          Enterprise AI | Headless Commerce | Cloud Infrastructure
        </p>
        <span>
          <a
            href="https://x.com/AchrafMalkiEng"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Achraf Malki on X"
          >
            <img src={xIcon} alt="" />
          </a>
          <a
            href="https://github.com/ashurafu04"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Achraf Malki on GitHub"
          >
            <img src={githubIcon} alt="" />
          </a>
          <a
            href="https://www.linkedin.com/in/achraf-malki/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Achraf Malki on LinkedIn"
          >
            <img src={linkedinIcon} alt="" />
          </a>
        </span>
        <p className={styles.description}>
          I engineer backend systems that don't break under pressure, and
          architectures that drive tangible business autonomy. Specialized in
          multi-tenant AI orchestration, Hybrid Headless architectures, and
          secure B2B integrations.
        </p>
        <div className={styles.cvButtons}>
          <a className="hover" href={CV} target="_blank" rel="noopener noreferrer">
            View Resume
          </a>
          <a className={`hover ${styles.downloadBtn}`} href={CV} download>
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
