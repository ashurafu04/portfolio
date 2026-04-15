import styles from "./ProjectsStyles.module.css";
import magmaLogo from "../../assets/nortis_logo.jpg";
import chamiongLogo from "../../assets/logo-chamiong-desktop.png";
import ProjectCard from "../../common/ProjectCard";

function Projects() {
  const engineeringCases = [
    {
      src: magmaLogo,
      h3: "MAGMA (Nortis Studio)",
      subtitle: "Enterprise AI Orchestration & Anti-Hallucination Engine",
      description:
        "Architected the core AI engine for a B2B intelligence Business Unit. Designed a highly concurrent Portier/Worker architecture with strict idempotence guarantees and Zero-PII data compliance.",
    },
    {
      src: chamiongLogo,
      h3: "CHAMIONG",
      subtitle: "Hybrid Headless B2B E-commerce & ERP Decoupling",
      description:
        "Led the digital transformation for an industrial leader. Engineered a decoupled Next.js + Odoo architecture via resilient JSON-RPC connectors, delivering 95% operational autonomy to the client.",
    },
  ];

  return (
    <section id="projects" className={styles.container}>
      <h1 className="sectionTitle">Engineering Cases</h1>
      <div className={styles.projectsContainer}>
        {engineeringCases.map((item) => (
          <ProjectCard
            key={item.h3}
            src={item.src}
            h3={item.h3}
            subtitle={item.subtitle}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}

export default Projects;
