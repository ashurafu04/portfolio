import { useState, useEffect, useRef, useMemo } from "react";
import moon from "../assets/moon.svg";
import sun from "../assets/sun.svg";
import { useTheme } from "./ThemeContext";
import { useTranslation } from "../i18n";
import LanguageToggle from "./LanguageToggle";
import styles from "./NavbarStyles.module.css";

const SECTION_IDS = ["hero", "projects", "skills", "contact"];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const hideTimerRef = useRef(null);
  const isNavClickRef = useRef(false);
  const navClickTimeoutRef = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const themeIcon = theme === "light" ? sun : moon;

  const navItems = useMemo(
    () => [
      { id: "hero", label: t.nav.home },
      { id: "projects", label: t.nav.projects },
      { id: "skills", label: t.nav.skills },
      { id: "contact", label: t.nav.contact },
    ],
    [t]
  );

  // Show navbar when scrolling, hide when scrolling stops after delay
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      setIsVisible(true);

      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }

      // Hide after 1.8s of no scrolling (unless hovered or mobile menu open)
      hideTimerRef.current = setTimeout(() => {
        if (!isHovered && !isMenuOpen) {
          setIsVisible(false);
        }
      }, 1800);

      setIsScrolled(window.scrollY > 30);

      if (isNavClickRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Top of the page
          if (window.scrollY < 100) {
            setActiveSection((prev) => (prev !== "hero" ? "hero" : prev));
            ticking = false;
            return;
          }

          // Bottom of the page (ensure contact lights up)
          if (
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 60
          ) {
            setActiveSection((prev) => (prev !== "contact" ? "contact" : prev));
            ticking = false;
            return;
          }

          // Robust viewport threshold detection (active when section is in top 35% of viewport)
          const viewportThreshold = window.innerHeight * 0.35;
          for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
            const id = SECTION_IDS[i];
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= viewportThreshold && rect.bottom > 0) {
                setActiveSection((prev) => (prev !== id ? id : prev));
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (navClickTimeoutRef.current) clearTimeout(navClickTimeoutRef.current);
    };
  }, [isHovered, isMenuOpen]);

  // Reveal navbar if mouse moves near the top edge of the viewport
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (event.clientY <= 60) {
        setIsVisible(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
    isNavClickRef.current = true;
    setActiveSection(id);
    setIsMenuOpen(false);

    if (navClickTimeoutRef.current) {
      clearTimeout(navClickTimeoutRef.current);
    }
    // Lock scrollspy from overriding during the smooth scroll animation
    navClickTimeoutRef.current = setTimeout(() => {
      isNavClickRef.current = false;
    }, 850);
  };

  const isBarShown = isVisible || isHovered || isMenuOpen;

  return (
    <header
      className={`${styles.navbarWrapper} ${
        isBarShown ? styles.visible : styles.hidden
      }`}
      onMouseEnter={() => {
        setIsHovered(true);
        setIsVisible(true);
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        hideTimerRef.current = setTimeout(() => {
          if (!isMenuOpen) {
            setIsVisible(false);
          }
        }, 1200);
      }}
      onFocusCapture={() => {
        setIsVisible(true);
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      }}
    >
      <nav
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
        aria-label="Main Navigation"
      >
        {/* Desktop Floating Navigation Dock */}
        <div className={styles.desktopNav}>
          {navItems.map(({ id, label }) => {
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

          <LanguageToggle variant="desktop" />

          <button
            type="button"
            className={styles.themeButton}
            onClick={toggleTheme}
            aria-label={theme === "light" ? t.nav.themeDark : t.nav.themeLight}
            title={theme === "light" ? t.nav.themeDark : t.nav.themeLight}
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
            aria-label={t.nav.homeAria}
          >
            AM
          </a>

          <div className={styles.mobileRightControls}>
            <LanguageToggle variant="mobile" />

            <button
              type="button"
              className={styles.mobileQuickTheme}
              onClick={toggleTheme}
              aria-label={theme === "light" ? t.nav.themeDark : t.nav.themeLight}
            >
              <img src={themeIcon} alt="" width="16" height="16" />
            </button>

            <button
              className={styles.menuToggle}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-expanded={isMenuOpen}
              aria-controls="primary-navigation"
              aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
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
          {/* Mobile Drawer Header with Exit/Close button */}
          <div className={styles.mobileDrawerHeader}>
            <span className={styles.mobileBrand}>AM</span>

            <div className={styles.mobileRightControls}>
              <LanguageToggle variant="mobile" />

              <button
                type="button"
                className={styles.mobileQuickTheme}
                onClick={toggleTheme}
                aria-label={theme === "light" ? t.nav.themeDark : t.nav.themeLight}
              >
                <img src={themeIcon} alt="" width="16" height="16" />
              </button>

              <button
                type="button"
                className={styles.mobileCloseBtn}
                onClick={() => setIsMenuOpen(false)}
                aria-label={t.nav.closeMenu}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          <div className={styles.mobileDrawerContent}>
            {navItems.map(({ id, label }) => {
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
