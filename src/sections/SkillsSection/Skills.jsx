import styles from "./SkillsStyles.module.css";
import checkMarkIconDark from "../../assets/checkmark-dark.svg";
import checkMarkIconLight from "../../assets/checkmark-light.svg";
import SkillList from "../../common/SkillList";
import { useTheme } from "../../common/ThemeContext";

function Skills() {
  const { theme } = useTheme();
  const checkMarkIcon =
    theme === "dark" ? checkMarkIconDark : checkMarkIconLight;

  const skillPillars = [
    {
      title: "Backend",
      items: [
        "Microservices",
        "Java (JEE)",
        "C# (ASP.NET Core)",
        "Node.js",
        "Python (FastAPI, Django)",
        "Laravel",
      ],
    },
    {
      title: "Frontend",
      items: ["React / Next.js", "TypeScript", "React Native (Expo)"],
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
    <section id="skills" className={styles.container}>
      <h1 className="sectionTitle">Skills</h1>
      <div className={styles.pillarGrid}>
        {skillPillars.map((pillar) => (
          <article key={pillar.title} className={styles.pillar}>
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
