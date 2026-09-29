import styles from "./SkillsStyles.module.css";
import checkMarkIconDark from "../../assets/checkmark-dark.svg";
import checkMarkIconLight from "../../assets/checkmark-light.svg";
import SkillList from "../../common/SkillList";
import { useTheme } from "../../common/ThemeContext";
import { useReveal } from "../../hooks/useReveal";
import { useTranslation } from "../../i18n";

function Skills() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const ref = useReveal();
  const checkMarkIcon =
    theme === "dark" ? checkMarkIconDark : checkMarkIconLight;

  const skillPillars = [
    {
      title: t.skills.pillars.backend,
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
      title: t.skills.pillars.frontend,
      items: ["Angular", "React / Next.js", "TypeScript", "React Native (Expo)"],
    },
    {
      title: t.skills.pillars.data,
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
      title: t.skills.pillars.cloud,
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
      <h2
        className="sectionTitle"
        data-reveal-item
        style={{ "--reveal-delay": "0ms" }}
      >
        {t.skills.sectionTitle}
      </h2>
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
