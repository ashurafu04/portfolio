import React from "react";
import styles from "./ProjectCardStyles.module.css";

function ProjectCard({ src, link, h3, subtitle, description }) {
  const cardContent = (
    <>
      <img className="hover" src={src} alt={`${h3} visual`} />
      <h3>{h3}</h3>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {description && <p className={styles.description}>{description}</p>}
    </>
  );

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.card}
      >
        {cardContent}
      </a>
    );
  }

  return <article className={styles.card}>{cardContent}</article>;
}

export default ProjectCard;
