import styles from "./SkillsStyles.module.css";
import checkMarkIconDark from "../../assets/checkmark-dark.svg";
import checkMarkIconLight from "../../assets/checkmark-light.svg";
import SkillList from "../../common/SkillList";
import { useTheme } from "../../common/ThemeContext";

function Skills() {
  const { theme, toggleTheme } = useTheme();
  const checkMarkIcon = theme == 'dark' ? checkMarkIconDark : checkMarkIconLight;
  return (
    <section id="skills" className={styles.container}>
      <h1 className="sectionTitle">Skills</h1>
      <div className={styles.skillList}>
        <SkillList src={checkMarkIcon} skill="Java" />
        <SkillList src={checkMarkIcon} skill="Python" />
        <SkillList src={checkMarkIcon} skill="C, C++" />
        <SkillList src={checkMarkIcon} skill="SQL, PL/SQL, SQL Server" />
      </div>
      <hr />
      <div className={styles.skillList}>
        <SkillList src={checkMarkIcon} skill="HTML, CSS" />
        <SkillList src={checkMarkIcon} skill="JavaScript, TypeScript" />
        <SkillList src={checkMarkIcon} skill="PHP" />
      </div>
      <hr />
      <div className={styles.skillList}>
        <SkillList
          src={checkMarkIcon}
          skill="React, Node.js, Express, MongoDB"
        />
        <SkillList src={checkMarkIcon} skill="Laravel" />
        <SkillList src={checkMarkIcon} skill="Git, Linux" />
      </div>
    </section>
  );
}

export default Skills;
