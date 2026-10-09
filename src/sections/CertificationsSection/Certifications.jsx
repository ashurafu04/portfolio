import styles from "./CertificationsStyles.module.css";
import { certifications } from "./certificationsData";
import { useReveal } from "../../hooks/useReveal";
import { useTranslation } from "../../i18n";

function CertificationCard({ cert, t }) {
  const meta = [cert.issuer, cert.platform, cert.date].filter(Boolean);

  return (
    <a
      href={cert.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      aria-label={`${cert.title} — ${meta.join(", ")}. ${t.certifications.verifyCredential}`}
    >
      <div className={styles.cardTop}>
        <div className={styles.logoBadge}>
          <img
            src={cert.logo}
            alt=""
            className={styles.issuerLogo}
            loading="lazy"
            decoding="async"
          />
        </div>
        <span
          className={`${styles.kindBadge} ${
            cert.kind === "professional" ? styles.kindProfessional : ""
          }`}
        >
          {t.certifications.kinds[cert.kind]}
        </span>
      </div>

      <h3 className={styles.certTitle}>{cert.title}</h3>

      <p className={styles.certMeta}>{meta.join(" · ")}</p>

      <p className={styles.certSkills}>{cert.skills}</p>

      <div className={styles.cardFooter}>
        <span className={styles.idCode}>
          {t.certifications.credentialId}: {cert.credentialId}
        </span>
        <span className={styles.verifyLink} aria-hidden="true">
          {t.certifications.verifyCredential}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </span>
      </div>
    </a>
  );
}

function Certifications() {
  const ref = useReveal({ threshold: 0.05 });
  const { t } = useTranslation();

  return (
    <section
      id="certifications"
      ref={ref}
      data-stagger-parent
      className={styles.container}
    >
      <h2
        className="sectionTitle"
        data-reveal-item
        style={{ "--reveal-delay": "0ms", marginBottom: 0 }}
      >
        {t.certifications.sectionTitle}
      </h2>

      <p
        className={styles.subtitle}
        data-reveal-item
        style={{ "--reveal-delay": "80ms" }}
      >
        {t.certifications.subtitle}
      </p>

      <ul className={styles.grid}>
        {certifications.map((cert, index) => (
          <li
            key={cert.id}
            data-reveal-item
            style={{ "--reveal-delay": `${160 + index * 50}ms` }}
          >
            <CertificationCard cert={cert} t={t} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Certifications;
