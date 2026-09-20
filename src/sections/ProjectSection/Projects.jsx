import styles from "./ProjectsStyles.module.css";
import magmaLogo from "../../assets/nortis_logo.jpg";
import chamiongLogo from "../../assets/logo-chamiong-500.png";
import previzmaLogo from "../../assets/previzma_logo.svg";
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
        "Architected the core AI orchestration engine for a B2B intelligence Business Unit. Designed a highly concurrent Portier/Worker architecture with strict idempotence guarantees, deployed under sovereign EU cloud requirements.",
      highlights: [
        "Portier/Worker asynchronous concurrency model with automated retry idempotence",
        "Zero-PII data isolation and enterprise-grade GDPR compliance",
        "High-performance vector embeddings pipeline using PostgreSQL pgvector & RLS",
      ],
      tags: [
        "FastAPI",
        "PostgreSQL RLS",
        "pgvector",
        "LLM / RAG",
        "n8n",
        "Docker",
        "Zero-PII",
      ],
    },
    {
      src: chamiongLogo,
      alt: "CHAMIONG logo for the hybrid headless commerce case study",
      width: 500,
      height: 500,
      h3: "CHAMIONG",
      subtitle: "Hybrid Headless B2B E-commerce & ERP Decoupling",
      description:
        "Led the digital transformation for an industrial leader. Engineered a decoupled Next.js 16 + Odoo 17 architecture via resilient JSON-RPC connectors, delivering 95% operational autonomy to commercial and catalog teams.",
      highlights: [
        "Resilient JSON-RPC middleware with intelligent caching and automated fault recovery",
        "Headless decoupling separating high-traffic public storefront from core ERP databases",
        "Full trilingual catalog and order processing (French, English, Arabic) with zero cutover downtime",
      ],
      tags: [
        "Next.js 16",
        "Odoo 17",
        "JSON-RPC",
        "Sanity CMS",
        "TypeScript",
        "B2B E-commerce",
      ],
    },
    {
      src: previzmaLogo,
      alt: "Previzma Java Spring Boot microservices platform logo",
      width: 400,
      height: 120,
      h3: "PREVIZMA",
      subtitle: "Decoupled B2B Microservices Platform & ML Engine",
      description:
        "Conceived and engineered an enterprise B2B operations platform powered by a robust Java 17 and Spring Boot microservices backend, PostgreSQL/JPA persistence layer, and a dedicated decoupled machine learning service.",
      highlights: [
        "Modular Spring Boot REST APIs with fine-grained Spring Security JWT & RBAC access control",
        "Independent predictive ML microservice integrated via asynchronous event messaging",
        "Decoupled Angular presentation layer with reactive state management and sub-second querying",
      ],
      tags: [
        "Java 17",
        "Spring Boot",
        "Microservices",
        "PostgreSQL / JPA",
        "Spring Security",
        "Angular",
        "ML Service",
      ],
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
            style={{ "--reveal-delay": `${(index + 1) * 120}ms` }}
          >
            <ProjectCard
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              h3={item.h3}
              subtitle={item.subtitle}
              description={item.description}
              highlights={item.highlights}
              tags={item.tags}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
