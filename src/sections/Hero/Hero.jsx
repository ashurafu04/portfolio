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
          alt="Picture of Achraf MALKI"
        />
        <img
          className={styles.colorMode}
          src={themeIcon}
          alt="Color mode icon"
          onClick={toggleTheme}
        />
      </div>
      <div className={styles.info}>
        <h1>
          Achraf
          <br />
          Malki
        </h1>
        <h2>Computer Engineering Student</h2>
        <span>
          <a href="https://x.com/AchrafMalkiEng" target="_blank">
            <img src={xIcon} alt="X icon" />
          </a>
          <a href="https://github.com/ashurafu04" target="_blank">
            <img src={githubIcon} alt="Github icon" />
          </a>
          <a href="https://www.linkedin.com/in/achraf-malki/" target="_blank">
            <img src={linkedinIcon} alt="LinkedIn icon" />
          </a>
        </span>
        <p className={styles.description}>
          Computer engineering student and aspiring full-stack developer. <br />
          HarvardX, Meta, IBM Certified,
          passionate about building innovative software solutions.
        </p>
        <div className={styles.cvButtons}>
          <a href={CV} target="_blank" rel="noopener noreferrer">
            <button className="hover">View Resume</button>
          </a>
          <a href={CV} download>
            <button className={`hover ${styles.downloadBtn}`}>Download Resume</button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
