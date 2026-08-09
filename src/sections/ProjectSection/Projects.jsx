import styles from "./ProjectsStyles.module.css";
import magmaLogo from "../../assets/nortis_logo.jpg";
import chamiongLogo from "../../assets/logo-chamiong-500.png";
import ProjectCard from "../../common/ProjectCard";
import { useReveal } from "../../hooks/useReveal";

function Projects() {
  const ref = useReveal();

  const engineeringCases = [
    {
      src: magmaLogo,
      alt: "Nortis Studio logo for the MAGMA enterprise AI case study",
      width: 200,
      height: 200,
      h3: "MAGMA (Nortis Studio)",
      subtitle: "Enterprise AI Orchestration & Anti-Hallucination Engine",
      description:
        "Architected the core AI engine for a B2B intelligence Business Unit. Designed a highly concurrent Portier/Worker architecture with strict idempotence guarantees and Zero-PII data compliance.",
    },
    {
      src: chamiongLogo,
      alt: "CHAMIONG logo for the hybrid headless commerce case study",
      width: 500,
      height: 500,
      h3: "CHAMIONG",
      subtitle: "Hybrid Headless B2B E-commerce & ERP Decoupling",
      description:
        "Led the digital transformation for an industrial leader. Engineered a decoupled Next.js + Odoo architecture via resilient JSON-RPC connectors, delivering 95% operational autonomy to the client.",
    },
  ];

  return (
    <section id="projects" ref={ref} data-stagger-parent className={styles.container}>
      <h2
        className="sectionTitle"
        data-reveal-item
        style={{ "--reveal-delay": "0ms" }}
      >
        Engineering Cases
      </h2>
      <div className={styles.projectsContainer}>
        {engineeringCases.map((item, index) => (
          <div
            key={item.h3}
            data-reveal-item
            style={{ "--reveal-delay": `${(index + 1) * 130}ms` }}
          >
            <ProjectCard
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              h3={item.h3}
              subtitle={item.subtitle}
              description={item.description}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
