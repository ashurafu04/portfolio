import styles from "./ExperienceStyles.module.css";
import qodeepLogo from "../../assets/qodeep_logo.svg";
import nortisLogo from "../../assets/nortis_logo.jpg";
import chamiongLogo from "../../assets/logo-chamiong-500.png";
import dxcLogo from "../../assets/dxc_logo.svg";
import sggLogo from "../../assets/sgg_logo.svg";
import { useReveal } from "../../hooks/useReveal";

function Experience() {
  const ref = useReveal();

  const engagements = [
    {
      company: "QODEEP",
      role: "Founder & Principal Consultant — Critical B2B Systems & AI",
      period: "Dec. 2025 – Present",
      type: "Consulting Practice · Strategic Engagements",
      logo: qodeepLogo,
      logoAlt: "QODEEP IT Engineering & Architecture Consulting logo",
      description:
        "Founded an independent engineering consultancy specializing in resilient B2B architectures, AI orchestration, and headless digital transformations. Directed comprehensive technical audits aligning business strategy with production execution while systematically eliminating technical debt.",
      highlights: [
        "Conducted in-depth architectural audits and system resiliency benchmarks",
        "Enforced enterprise-grade code quality, modularity, and Zero-PII compliance",
        "Consulted on headless decoupled architectures and high-throughput B2B systems",
      ],
      tags: [
        "Architecture Audit",
        "B2B Systems",
        "AI Orchestration",
        "Technical Governance",
        "Zero-PII",
      ],
    },
    {
      company: "Nortis Studio",
      role: "Software Engineer — AI Architecture & Cloud",
      period: "Jan. 2026 – Present",
      type: "Belgium · Remote Contract",
      logo: nortisLogo,
      logoAlt: "Nortis Studio logo",
      description:
        "Engineered the foundational architecture of Magma, an enterprise SaaS platform powered by multi-tenant AI. Designed an asynchronous, highly concurrent Portier/Worker execution model with strict idempotence guarantees, deployed on sovereign EU cloud infrastructure.",
      highlights: [
        "Asynchronous workflow orchestration leveraging FastAPI, Node.js, and n8n",
        "Multi-tenant data isolation using PostgreSQL Row-Level Security (RLS)",
        "Production LLM/RAG pipelines with pgvector under strict GDPR and Zero-PII constraints",
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
      company: "Chamiong",
      role: "Lead Full Stack Engineer — Headless ERP Integration",
      period: "Nov. 2025 – Present",
      type: "Rabat · Remote Contract",
      logo: chamiongLogo,
      logoAlt: "Chamiong industrial group logo",
      description:
        "Architected and deployed a decoupled Hybrid Headless e-commerce ecosystem around Odoo 17, Next.js 16, and Sanity CMS for an industrial market leader. Engineered resilient JSON-RPC middleware connecting public portals to core ERP with zero business interruption.",
      highlights: [
        "Decoupled Next.js 16 presentation layer from Odoo 17 backend via custom JSON-RPC middleware",
        "Delivered 95% operational autonomy to commercial and catalog administration teams",
        "Integrated Sanity CMS and full trilingual localization (FR, EN, AR) with zero-downtime cutover",
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
      company: "DXC Technology Morocco",
      role: "BI & Enterprise Applications Intern",
      period: "Jul. 2026 – Sep. 2026",
      type: "Technopolis, Salé · Hybrid",
      logo: dxcLogo,
      logoAlt: "DXC Technology logo",
      description:
        "Designed and shipped an end-to-end skills governance and monitoring platform for the RUN Assurance division. Managed operational takeover and reverse engineering of three critical legacy services to guarantee uninterrupted business continuity.",
      highlights: [
        "Engineered automated ETL pipelines with Power Query, a structured DAX data model, and Power BI dashboards",
        "Implemented standardized transactional input layer via Microsoft Dataverse and custom Power Apps",
        "Executed reverse engineering, root-cause anomaly diagnostics, and seamless operational handover",
      ],
      tags: [
        "Power BI / DAX",
        "Power Query",
        "Dataverse",
        "Power Apps",
        "System Diagnostics",
        "Legacy Reverse-Engineering",
      ],
    },
    {
      company: "Secrétariat Général du Gouvernement (SGG)",
      role: "ERP Systems Developer Intern",
      period: "Jul. – Aug. 2025",
      type: "Rabat · Public Sector",
      logo: sggLogo,
      logoAlt: "Secrétariat Général du Gouvernement du Maroc logo",
      description:
        "Contributed to deploying Odoo 17 across core governmental administrative workflows. Developed tailored Python modules for MRP, procurement, inventory, sales, accounting, and HR with strict role-based access control.",
      highlights: [
        "Engineered custom Python business modules for MRP, inventory, accounting, and HR workflows",
        "Authored comprehensive gap analyses, technical specifications, and BPMN process models",
        "Configured fine-grained RBAC security matrices and delivered comprehensive user manuals",
      ],
      tags: [
        "Odoo 17",
        "Python",
        "MRP / Supply Chain",
        "BPMN Modeling",
        "RBAC Security",
        "Public Sector ERP",
      ],
    },
  ];

  return (
    <section
      id="experience"
      ref={ref}
      data-stagger-parent
      className={styles.container}
    >
      <h2
        className="sectionTitle"
        data-reveal-item
        style={{ "--reveal-delay": "0ms" }}
      >
        Selected Engagements
      </h2>
      <p
        className={styles.leadText}
        data-reveal-item
        style={{ "--reveal-delay": "60ms" }}
      >
        Track record across enterprise AI orchestration, hybrid headless systems,
        and high-stakes public sector infrastructure.
      </p>

      <div className={styles.timeline}>
        {engagements.map((item, index) => (
          <article
            key={item.company}
            className={styles.card}
            data-reveal-item
            style={{ "--reveal-delay": `${(index + 1) * 80}ms` }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.companyRow}>
                <div className={styles.logoAndName}>
                  <div className={styles.logoWrapper}>
                    <img
                      src={item.logo}
                      alt={item.logoAlt}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className={styles.companyInfo}>
                    <h3>{item.company}</h3>
                    <span className={styles.companyMeta}>{item.type}</span>
                  </div>
                </div>
                <span className={styles.periodBadge}>{item.period}</span>
              </div>
              <p className={styles.roleTitle}>{item.role}</p>
            </div>

            <p className={styles.description}>{item.description}</p>

            <ul className={styles.highlightsList}>
              {item.highlights.map((highlight, hIdx) => (
                <li key={hIdx} className={styles.highlightItem}>
                  <span className={styles.highlightBullet}>▸</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <div className={styles.tagsRow}>
              {item.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Experience;
