import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./ProjectsStyles.module.css";
import magmaLogo from "../../assets/nortis_logo.jpg";
import chamiongLogo from "../../assets/logo-chamiong-500.png";
import qodeepLogo from "../../assets/qodeep_logo.png";
import previzmaLogo from "../../assets/previzma_logo.png";
import dxcLogo from "../../assets/dxc_logo.svg";
import sggLogo from "../../assets/sgg-logo.png";
import ProjectCard from "../../common/ProjectCard";
import { useReveal } from "../../hooks/useReveal";

function Projects() {
  const ref = useReveal();
  const trackRef = useRef(null);
  const slideRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const engineeringCases = [
    {
      src: magmaLogo,
      alt: "Nortis Studio logo for the MAGMA enterprise AI case study",
      width: 200,
      height: 200,
      h3: "MAGMA (Nortis Studio)",
      subtitle: "Enterprise AI Orchestration & Anti-Hallucination Engine",
      description:
        "Architected the Portier/Worker orchestration model, strict idempotence rules, PostgreSQL RLS, and Zero PII lifecycle. Integrated structural validation and anti-hallucination controls for dependable B2B intelligence.",
      logoType: "square",
    },
    {
      src: chamiongLogo,
      alt: "CHAMIONG logo for the hybrid headless commerce case study",
      width: 500,
      height: 500,
      h3: "CHAMIONG",
      subtitle: "Headless ERP Decoupling & B2B Commerce",
      description:
        "Led the digital decoupling of an industrial leader from its core Odoo ERP. Engineered a decoupled Next.js + Sanity presentation layer via resilient JSON-RPC connectors with trilingual RTL catalog management.",
      logoType: "square",
    },
    {
      src: qodeepLogo,
      alt: "QODEEP IT Engineering and Architecture Consulting logo",
      width: 500,
      height: 500,
      h3: "QODEEP",
      subtitle: "Independent Architecture Consultancy & Digital Products",
      description:
        "Delivering resilient B2B architectures, contextual AI workflows, and digital transformations. Directing technical audits, enterprise migrations, and end-to-end client handovers.",
      logoType: "circle",
    },
    {
      src: previzmaLogo,
      alt: "Previzma Java Spring Boot microservices platform logo",
      width: 500,
      height: 500,
      h3: "PREVIZMA",
      subtitle: "Decoupled B2B Sales Intelligence Platform & ML Engine",
      description:
        "Engineered an open-architecture sales intelligence platform with Java 21, Spring Boot, and PostgreSQL. Decoupled predictive ML forecasting via a dedicated FastAPI microservice and Angular frontend.",
      logoType: "prism",
    },
    {
      src: dxcLogo,
      alt: "DXC Technology enterprise systems and BI engineering logo",
      width: 860,
      height: 240,
      h3: "DXC Technology",
      subtitle: "Business Intelligence & Business Applications — RUN Teams",
      description:
        "Engineered a competency coverage management platform for production RUN teams across the Insurance Service Line. Built the data pipeline, Dataverse application layer, and executive Power BI dashboards.",
      logoType: "dxc",
    },
    {
      src: sggLogo,
      alt: "Secrétariat Général du Gouvernement (SGG) ERP architecture logo",
      width: 425,
      height: 84,
      h3: "Secrétariat Général du Gouvernement (SGG)",
      subtitle: "Public Sector Enterprise ERP & Process Automation",
      description:
        "Contributed to an end-to-end Odoo implementation for the Direction of the Official Printing Office. Engineered custom Python modules, BPMN approval workflows, and strict RBAC across core operations.",
      logoType: "sgg",
    },
  ];

  const isNavigatingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  const scrollToSlide = useCallback((index) => {
    const track = trackRef.current;
    const targetSlide = slideRefs.current[index];
    if (!track || !targetSlide) return;

    // Lock programmatic navigation so intermediate scroll events don't fight the target index
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

    // Release lock when smooth scrolling settles
    scrollTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 450);
  }, []);

  const handleScroll = useCallback(() => {
    // Ignore intermediate scroll events during animated navigation to avoid indicator stutter
    if (isNavigatingRef.current) return;

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
  }, []);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
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
        Engineering Cases
      </h2>

      <div
        className={styles.carouselWrapper}
        data-reveal-item
        style={{ "--reveal-delay": "120ms" }}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Engineering Cases Carousel"
      >
        <div
          ref={trackRef}
          className={styles.carouselTrack}
          onScroll={handleScroll}
        >
          {engineeringCases.map((item, index) => (
            <div
              key={item.h3}
              ref={(el) => (slideRefs.current[index] = el)}
              className={styles.slide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${engineeringCases.length}: ${item.h3}`}
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
            aria-label="Previous engineering case"
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

          <div className={styles.pagination}>
            <span className={styles.counter} aria-live="polite">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(engineeringCases.length).padStart(2, "0")}
            </span>
            <div
              className={styles.dots}
              role="tablist"
              aria-label="Engineering cases selector"
            >
              {engineeringCases.map((item, index) => (
                <button
                  key={item.h3}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  className={`${styles.dot} ${
                    index === activeIndex ? styles.activeDot : ""
                  }`}
                  onClick={() => scrollToSlide(index)}
                  aria-label={`Go to ${item.h3}`}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            className={styles.navBtn}
            onClick={() => scrollToSlide(activeIndex + 1)}
            disabled={activeIndex === engineeringCases.length - 1}
            aria-label="Next engineering case"
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
