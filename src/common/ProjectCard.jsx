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
  logoType = "square",
}) {
  const logoClasses = {
    square: styles.logoSquare,
    circle: styles.logoCircle,
    prism: styles.logoPrism,
    dxc: styles.logoDxc,
    sgg: styles.logoSgg,
  };

  const specificLogoClass = logoClasses[logoType] || styles.logoSquare;

  const cardContent = (
    <>
      <div className={styles.imageContainer}>
        <img
          className={`${styles.logo} ${specificLogoClass}`}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
      </div>
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
