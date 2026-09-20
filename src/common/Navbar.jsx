import { useState, useEffect } from "react";
import moon from "../assets/moon.svg";
import sun from "../assets/sun.svg";
import { useTheme } from "./ThemeContext";
import styles from "./NavbarStyles.module.css";

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "projects", label: "Engineering Cases" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { theme, toggleTheme } = useTheme();
  const themeIcon = theme === "light" ? sun : moon;

  // Scroll spy to detect active section dynamically
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Top of the page
      if (window.scrollY < 120) {
        setActiveSection("hero");
        return;
      }

      // Bottom of the page (ensure contact lights up)
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 70
      ) {
        setActiveSection("contact");
        return;
      }

      // Check section offsets
      const scrollPosition = window.scrollY + 180;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle escape key and window resize
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

  // Prevent background scroll when mobile drawer is open
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

  const handleNavClick = (id) => {
    setActiveSection(id);
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.navbarWrapper}>
      <nav
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
        aria-label="Main Navigation"
      >
        {/* Desktop Floating Navigation Dock */}
        <div className={styles.desktopNav}>
          {NAV_ITEMS.map(({ id, label }) => {
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                aria-current={isActive ? "page" : undefined}
                onClick={() => handleNavClick(id)}
              >
                {label}
                {isActive && <span className={styles.activeIndicator} />}
              </a>
            );
          })}

          <div className={styles.navDivider} aria-hidden="true" />

          <button
            type="button"
            className={styles.themeButton}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            <img src={themeIcon} alt="" width="16" height="16" />
          </button>
        </div>

        {/* Mobile Header Island */}
        <div className={styles.mobileNavIsland}>
          <a
            href="#hero"
            className={styles.mobileBrand}
            onClick={() => handleNavClick("hero")}
            aria-label="Achraf Malki - Home"
          >
            AM
          </a>

          <div className={styles.mobileRightControls}>
            <button
              type="button"
              className={styles.mobileQuickTheme}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              <img src={themeIcon} alt="" width="16" height="16" />
            </button>

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
                className={`${styles.menuBar} ${
                  isMenuOpen ? styles.menuBarOpenTop : ""
                }`}
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
          </div>
        </div>

        {/* Mobile Full-Screen Drawer */}
        <div
          id="primary-navigation"
          className={`${styles.mobileDrawer} ${
            isMenuOpen ? styles.mobileDrawerOpen : ""
          }`}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setIsMenuOpen(false);
            }
          }}
          aria-hidden={!isMenuOpen}
        >
          <div className={styles.mobileDrawerContent}>
            {NAV_ITEMS.map(({ id, label }) => {
              const isActive = activeSection === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`${styles.mobileNavLink} ${
                    isActive ? styles.mobileActive : ""
                  }`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => handleNavClick(id)}
                >
                  {label}
                </a>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
