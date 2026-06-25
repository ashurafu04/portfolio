import styles from "./SkillsStyles.module.css";
import checkMarkIconDark from "../../assets/checkmark-dark.svg";
import checkMarkIconLight from "../../assets/checkmark-light.svg";
import SkillList from "../../common/SkillList";
import { useTheme } from "../../common/ThemeContext";
import { useReveal } from "../../hooks/useReveal";

function Skills() {
  const { theme } = useTheme();
  const ref = useReveal();
  const checkMarkIcon =
    theme === "dark" ? checkMarkIconDark : checkMarkIconLight;

  const skillPillars = [
    {
      title: "Backend",
      items: [
        "Microservices",
        "Java (Spring, JEE)",
        "C# (ASP.NET Core)",
        "Node.js",
        "Python (FastAPI, Django)",
        "Laravel",
      ],
    },
    {
      title: "Frontend",
      items: ["Angular", "React / Next.js", "TypeScript", "React Native (Expo)"],
    },
    {
      title: "Data & ERP",
      items: [
        "Odoo (Tech & Functional)",
        "PostgreSQL (RLS, Tuning)",
        "SQL Server",
        "Oracle",
        "Redis",
        "MongoDB",
      ],
    },
    {
      title: "Cloud & AI",
      items: [
        "AWS (Certified)",
        "CI/CD (GitHub Actions)",
        "Docker",
        "LLM/RAG Pipelines",
        "n8n",
        "k6",
      ],
    },
  ];

  return (
    <section id="skills" ref={ref} data-stagger-parent className={styles.container}>
      <h1
        className="sectionTitle"
        data-reveal-item
        style={{ "--reveal-delay": "0ms" }}
      >
        Skills
      </h1>
      <div className={styles.pillarGrid}>
        {skillPillars.map((pillar, index) => (
          <article
            key={pillar.title}
            className={styles.pillar}
            data-reveal-item
            style={{ "--reveal-delay": `${(index + 1) * 80}ms` }}
          >
            <h2 className={styles.pillarTitle}>{pillar.title}</h2>
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
