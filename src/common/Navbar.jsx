import { useState, useEffect } from "react";
import moon from "../assets/moon.svg";
import sun from "../assets/sun.svg";
import { useTheme } from "./ThemeContext";
import styles from "./NavbarStyles.module.css";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const themeIcon = theme === "light" ? sun : moon;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile && isMenuOpen) {
      document.documentElement.style.overflowY = "hidden";
      document.body.style.overflowY = "hidden";
    } else {
      document.documentElement.style.overflowY = "";
      document.body.style.overflowY = "";
    }

    return () => {
      document.documentElement.style.overflowY = "";
      document.body.style.overflowY = "";
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""} ${
        isMenuOpen ? styles.menuOpen : ""
      }`}
    >
      <div className={styles.navInner}>
        <button
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          type="button"
        >
          <span
            className={`${styles.menuBar} ${isMenuOpen ? styles.menuBarOpenTop : ""}`}
          />
          <span
            className={`${styles.menuBar} ${
              isMenuOpen ? styles.menuBarOpenMiddle : ""
            }`}
          />
          <span
            className={`${styles.menuBar} ${
              isMenuOpen ? styles.menuBarOpenBottom : ""
            }`}
          />
        </button>

        <div
          id="primary-navigation"
          className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksOpen : ""}`}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setIsMenuOpen(false);
            }
          }}
        >
          <button onClick={() => handleNavClick("hero")}>Home</button>
          <button onClick={() => handleNavClick("projects")}>
            Engineering Cases
          </button>
          <button onClick={() => handleNavClick("skills")}>Skills</button>
          <button onClick={() => handleNavClick("contact")}>Contact</button>
          <button
            type="button"
            className={styles.mobileThemeButton}
            onClick={() => {
              toggleTheme();
              setIsMenuOpen(false);
            }}
          >
            <img src={themeIcon} alt="Theme icon" />
            <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
