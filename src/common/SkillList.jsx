import ThemedImage from "./ThemedImage";

function SkillList({ lightIcon, darkIcon, skill }) {
  return (
    <span>
      <ThemedImage light={lightIcon} dark={darkIcon} />
      <p>{skill}</p>
    </span>
  );
}

export default SkillList;
