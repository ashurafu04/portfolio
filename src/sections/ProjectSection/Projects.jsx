import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import styles from "./ProjectsStyles.module.css";
import magmaLogo from "../../assets/nortis_logo.jpg";
import chamiongLogo from "../../assets/logo-chamiong-500.png";
import qodeepLogo from "../../assets/qodeep_logo.png";
import previzmaLogo from "../../assets/previzma_logo.png";
import dxcLogo from "../../assets/dxc_logo.svg";
import sggLogo from "../../assets/sgg-logo.png";
import ProjectCard from "../../common/ProjectCard";
import { useReveal } from "../../hooks/useReveal";
import { useTranslation } from "../../i18n";

function Projects() {
  const ref = useReveal();
  const { t } = useTranslation();
  const trackRef = useRef(null);
  const slideRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const engineeringCases = useMemo(
    () => [
      {
        id: "magma",
        src: magmaLogo,
        alt: t.projects.cases.magma.alt,
        width: 200,
        height: 200,
        h3: t.projects.cases.magma.h3,
        subtitle: t.projects.cases.magma.subtitle,
        description: t.projects.cases.magma.description,
        logoType: "square",
      },
      {
        id: "chamiong",
        src: chamiongLogo,
        alt: t.projects.cases.chamiong.alt,
        width: 500,
        height: 500,
        h3: t.projects.cases.chamiong.h3,
        subtitle: t.projects.cases.chamiong.subtitle,
        description: t.projects.cases.chamiong.description,
        logoType: "square",
      },
      {
        id: "dxc",
        src: dxcLogo,
        alt: t.projects.cases.dxc.alt,
        width: 860,
        height: 240,
        h3: t.projects.cases.dxc.h3,
        subtitle: t.projects.cases.dxc.subtitle,
        description: t.projects.cases.dxc.description,
        logoType: "dxc",
      },
      {
        id: "qodeep",
        src: qodeepLogo,
        alt: t.projects.cases.qodeep.alt,
        width: 500,
        height: 500,
        h3: t.projects.cases.qodeep.h3,
        subtitle: t.projects.cases.qodeep.subtitle,
        description: t.projects.cases.qodeep.description,
        logoType: "circle",
      },
      {
        id: "previzma",
        src: previzmaLogo,
        alt: t.projects.cases.previzma.alt,
        width: 500,
        height: 500,
        h3: t.projects.cases.previzma.h3,
        subtitle: t.projects.cases.previzma.subtitle,
        description: t.projects.cases.previzma.description,
        logoType: "prism",
      },
      {
        id: "sgg",
        src: sggLogo,
        alt: t.projects.cases.sgg.alt,
        width: 425,
        height: 84,
        h3: t.projects.cases.sgg.h3,
        subtitle: t.projects.cases.sgg.subtitle,
        description: t.projects.cases.sgg.description,
        logoType: "sgg",
      },
    ],
    [t]
  );

  const isNavigatingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const rafRef = useRef(null);

  const scrollToSlide = useCallback((index) => {
    const track = trackRef.current;
    const targetSlide = slideRefs.current[index];
    if (!track || !targetSlide) return;

    isNavigatingRef.current = true;
    setActiveIndex(index);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    const targetOffset = targetSlide.offsetLeft - track.offsetLeft;
    track.scrollTo({
      left: targetOffset,
      behavior: "smooth",
    });

    scrollTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 450);
  }, []);

  // Throttled scroll listener using RAF to prevent layout thrashing
  const handleScroll = useCallback(() => {
    if (isNavigatingRef.current) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const track = trackRef.current;
      if (!track) return;

      const scrollCenter = track.scrollLeft + track.clientWidth / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      slideRefs.current.forEach((slide, idx) => {
        if (!slide) return;
        const slideCenter = slide.offsetLeft - track.offsetLeft + slide.offsetWidth / 2;
        const distance = Math.abs(scrollCenter - slideCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = idx;
        }
      });

      setActiveIndex((prev) => (prev !== closestIndex ? closestIndex : prev));
    });
  }, []);

  // Free wheel vertical scrolling pass-through
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Passive wheel handler ensures vertical delta is never blocked
    const handleWheel = (e) => {
      // If user scrolls predominantly vertically, let the page scroll naturally
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        // Do nothing to let browser scroll window naturally
        return;
      }
    };

    track.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      track.removeEventListener("wheel", handleWheel);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Keep track aligned on window resize
  useEffect(() => {
    const handleResize = () => {
      const track = trackRef.current;
      const targetSlide = slideRefs.current[activeIndex];
      if (!track || !targetSlide) return;
      track.scrollTo({
        left: targetSlide.offsetLeft - track.offsetLeft,
        behavior: "auto",
      });
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (activeIndex > 0) scrollToSlide(activeIndex - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (activeIndex < engineeringCases.length - 1) scrollToSlide(activeIndex + 1);
    }
  };

  return (
    <section
      id="projects"
      ref={ref}
      data-stagger-parent
      className={styles.container}
    >
      <h2
        className="sectionTitle"
        data-reveal-item
        style={{ "--reveal-delay": "0ms" }}
      >
        {t.projects.sectionTitle}
      </h2>

      <div
        className={styles.carouselWrapper}
        data-reveal-item
        style={{ "--reveal-delay": "120ms" }}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={t.projects.carouselAria}
      >
        <div
          ref={trackRef}
          className={styles.carouselTrack}
          onScroll={handleScroll}
        >
          {engineeringCases.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (slideRefs.current[index] = el)}
              className={styles.slide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} ${t.projects.of} ${engineeringCases.length}: ${item.h3}`}
            >
              <ProjectCard
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                h3={item.h3}
                subtitle={item.subtitle}
                description={item.description}
                logoType={item.logoType}
              />
            </div>
          ))}
        </div>

        {/* Carousel Navigation Controls */}
        <div className={styles.controlsBar}>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => scrollToSlide(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label={t.projects.prevSlide}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            className={styles.indicatorsGroup}
            role="tablist"
            aria-label={t.projects.carouselAria}
          >
            {engineeringCases.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                className={`${styles.indicatorDot} ${
                  index === activeIndex ? styles.indicatorDotActive : ""
                }`}
                onClick={() => scrollToSlide(index)}
                aria-label={`${t.projects.goToSlide} ${index + 1}: ${item.h3}`}
              />
            ))}
          </div>

          <button
            type="button"
            className={styles.navBtn}
            onClick={() => scrollToSlide(activeIndex + 1)}
            disabled={activeIndex === engineeringCases.length - 1}
            aria-label={t.projects.nextSlide}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Projects;
