import styles from "./CertificationsStyles.module.css";
import { featuredCertifications, learningCertifications } from "./certificationsData";
import { useReveal } from "../../hooks/useReveal";
import { useTranslation } from "../../i18n";

function CertificationCard({ cert, t, compact = false, tabIndex }) {
  const meta = [cert.issuer, cert.platform, cert.date].filter(Boolean);

  return (
    <a
      href={cert.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.card} ${compact ? styles.compact : ""}`}
      aria-label={`${cert.title} — ${meta.join(", ")}. ${t.certifications.verifyCredential}`}
      tabIndex={tabIndex}
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
        {featuredCertifications.map((cert, index) => (
          <li
            key={cert.id}
            data-reveal-item
            style={{ "--reveal-delay": `${160 + index * 50}ms` }}
          >
            <CertificationCard cert={cert} t={t} />
          </li>
        ))}
      </ul>

      {/* CSS-only marquee: the list is rendered twice for a seamless loop.
          The second copy is hidden from assistive tech and the tab order, so
          each credential is announced and focusable once. Pauses on hover and
          keyboard focus; reduced motion turns it into a scrollable row. */}
      <div
        className={styles.learning}
        data-reveal-item
        style={{ "--reveal-delay": "400ms" }}
      >
        <h3 id="certifications-learning" className={styles.learningTitle}>
          {t.certifications.learningTitle}
        </h3>
        <div className={styles.marquee} role="region" aria-labelledby="certifications-learning">
          <ul
            className={styles.marqueeTrack}
            style={{ "--marquee-duration": `${learningCertifications.length * 7}s` }}
          >
            {learningCertifications.map((cert) => (
              <li key={cert.id}>
                <CertificationCard cert={cert} t={t} compact />
              </li>
            ))}
            {learningCertifications.map((cert) => (
              <li key={`${cert.id}-loop`} className={styles.loopCopy} aria-hidden="true">
                <CertificationCard cert={cert} t={t} compact tabIndex={-1} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Certifications;
