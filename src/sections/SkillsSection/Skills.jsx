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
      items: t.skills.items.backend,
    },
    {
      title: t.skills.pillars.erp,
      items: t.skills.items.erp,
    },
    {
      title: t.skills.pillars.frontend,
      items: t.skills.items.frontend,
    },
    {
      title: t.skills.pillars.platform,
      items: t.skills.items.platform,
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
