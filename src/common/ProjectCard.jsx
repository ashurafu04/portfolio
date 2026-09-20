import React from "react";
import styles from "./ProjectCardStyles.module.css";

function ProjectCard({
  src,
  alt,
  width,
  height,
  link,
  h3,
  subtitle,
  description,
  highlights,
  tags,
}) {
  const cardContent = (
    <>
      <div className={styles.imageContainer}>
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className={styles.cardBody}>
        <h3>{h3}</h3>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {description && <p className={styles.description}>{description}</p>}

        {highlights && highlights.length > 0 && (
          <ul className={styles.highlightsList}>
            {highlights.map((item, idx) => (
              <li key={idx} className={styles.highlightItem}>
                <span className={styles.highlightBullet}>▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {tags && tags.length > 0 && (
          <div className={styles.tagsRow}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
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
