import styles from "./SkillsStyles.module.css";
import checkMarkIconDark from "../../assets/checkmark-dark.svg";
import checkMarkIconLight from "../../assets/checkmark-light.svg";
import oracleLogo from "../../assets/oracle_logo.svg";
import awsLogo from "../../assets/aws_logo.svg";
import googleLogo from "../../assets/google_logo.svg";
import metaLogo from "../../assets/meta_logo.svg";
import SkillList from "../../common/SkillList";
import { useTheme } from "../../common/ThemeContext";
import { useReveal } from "../../hooks/useReveal";

function Skills() {
  const { theme } = useTheme();
  const ref = useReveal();
  const checkMarkIcon =
    theme === "dark" ? checkMarkIconDark : checkMarkIconLight;

  const certifications = [
    {
      name: "Java SE 17 Developer (OCP)",
      issuer: "Oracle Certified Professional",
      note: "Core Runtime, Concurrency & Modern Java Architecture",
      logo: oracleLogo,
      logoAlt: "Oracle logo",
    },
    {
      name: "AWS Cloud Technical Essentials",
      issuer: "Amazon Web Services",
      note: "Cloud Infrastructure, Security & Distributed Scalability",
      logo: awsLogo,
      logoAlt: "AWS logo",
    },
    {
      name: "CS50 Computer Science & SQL",
      issuer: "HarvardX (Harvard University)",
      note: "Algorithms, Systems Foundations & Database Design",
      customMark: "CS50",
    },
    {
      name: "Agile Project Management",
      issuer: "Google",
      note: "Scrum Delivery, Value Streams & Release Governance",
      logo: googleLogo,
      logoAlt: "Google logo",
    },
    {
      name: "React & React Native Specialization",
      issuer: "Meta Platforms",
      note: "Modular Component Architecture & Native Development",
      logo: metaLogo,
      logoAlt: "Meta logo",
    },
  ];

  const skillPillars = [
    {
      title: "Core Systems & Backend",
      items: [
        "Java 17 (Spring Boot, JPA, JEE)",
        "Python (FastAPI, Django)",
        "C# (ASP.NET Core)",
        "Node.js (Express, Nest)",
        "Decoupled Microservices",
        "REST & JSON-RPC Protocols",
      ],
    },
    {
      title: "AI & Data Engineering",
      items: [
        "LLM & RAG Pipelines (LangChain, pgvector)",
        "PostgreSQL (Row-Level Security, Index Tuning)",
        "Power BI & DAX Data Modeling",
        "Microsoft Dataverse",
        "Redis In-Memory Caching",
        "Oracle & SQL Server",
      ],
    },
    {
      title: "ERP & Enterprise Integration",
      items: [
        "Odoo 17 (Technical & Functional)",
        "Resilient JSON-RPC Connectors",
        "MRP & Inventory Supply Chain Workflows",
        "BPMN Process Modeling & Gap Analysis",
        "Sanity Headless CMS",
        "Fine-Grained RBAC Security",
      ],
    },
    {
      title: "Cloud, DevOps & Governance",
      items: [
        "AWS Cloud Infrastructure",
        "Docker Containerization",
        "CI/CD Pipelines (GitHub Actions)",
        "n8n Workflow Automation",
        "Zero-PII & GDPR Compliance",
        "k6 Performance & Load Testing",
      ],
    },
  ];

  return (
    <section id="skills" ref={ref} data-stagger-parent className={styles.container}>
      <h2
        className="sectionTitle"
        data-reveal-item
        style={{ "--reveal-delay": "0ms" }}
      >
        Skills &amp; Credentials
      </h2>

      {/* Verified Credentials Strip */}
      <div
        className={styles.certificationsBlock}
        data-reveal-item
        style={{ "--reveal-delay": "60ms" }}
      >
        <div className={styles.certHeader}>
          <h3 className={styles.certSectionTitle}>Verified Certifications</h3>
          <p className={styles.certLead}>
            Industry certifications verifying technical rigor, cloud architecture,
            and systems engineering pedigree.
          </p>
        </div>
        <div className={styles.certGrid}>
          {certifications.map((cert) => (
            <div key={cert.name} className={styles.certCard}>
              <div className={styles.certLogoWrapper}>
                {cert.logo ? (
                  <img src={cert.logo} alt={cert.logoAlt} loading="lazy" />
                ) : (
                  <span className={styles.certHarvardMark}>{cert.customMark}</span>
                )}
              </div>
              <div className={styles.certInfo}>
                <span className={styles.certName}>{cert.name}</span>
                <span className={styles.certIssuer}>{cert.issuer}</span>
                <span className={styles.certNote}>{cert.note}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Pillars Grid */}
      <div className={styles.pillarGrid}>
        {skillPillars.map((pillar, index) => (
          <article
            key={pillar.title}
            className={styles.pillar}
            data-reveal-item
            style={{ "--reveal-delay": `${(index + 1) * 80}ms` }}
          >
            <h3 className={styles.pillarTitle}>{pillar.title}</h3>
            <div className={styles.skillList}>
              {pillar.items.map((skill) => (
                <SkillList key={skill} src={checkMarkIcon} skill={skill} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Skills;
