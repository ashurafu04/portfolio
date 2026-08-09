function SkillList({ src, skill }) {
  return (
    <span>
      <img src={src} alt="" />
      <p>{skill}</p>
    </span>
  );
}

export default SkillList;
