import styles from "./ProjectCardStyles.module.css";

const logoClasses = {
  square: styles.logoSquare,
  circle: styles.logoCircle,
  prism: styles.logoPrism,
  dxc: styles.logoDxc,
  sgg: styles.logoSgg,
};

function ProjectCard({
  src,
  alt,
  width,
  height,
  h3,
  subtitle,
  description,
  logoType = "square",
}) {
  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          className={`${styles.logo} ${logoClasses[logoType] || styles.logoSquare}`}
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
    </article>
  );
}

export default ProjectCard;
