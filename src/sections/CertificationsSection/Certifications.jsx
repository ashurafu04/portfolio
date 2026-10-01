import { useMemo, useEffect } from "react";
import styles from "./CertificationsStyles.module.css";
import { certificationsRow1, certificationsRow2 } from "./certificationsData";
import { useReveal } from "../../hooks/useReveal";
import { useTranslation } from "../../i18n";

function CertificationCard({ cert, verifyText, idText }) {
  const handleCardClick = (e) => {
    // Defocus immediately so returning from the opened tab leaves the marquee running
    e.currentTarget.blur();
  };

  return (
    <a
      href={cert.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      aria-label={`${cert.title} - ${cert.issuer} (${cert.date})`}
      onClick={handleCardClick}
      onPointerUp={handleCardClick}
    >
      <div className={styles.cardTop}>
        <div className={styles.logoBadge}>
          <img
            src={cert.logo}
            alt={`${cert.issuer} logo`}
            className={styles.issuerLogo}
            loading="lazy"
            decoding="async"
          />
        </div>
        <span className={styles.certBadge}>{cert.badge}</span>
      </div>

      <h3 className={styles.certTitle}>{cert.title}</h3>

      <div className={styles.certMeta}>
        <span>{cert.issuer}</span>
        <span>•</span>
        <span>{cert.date}</span>
      </div>

      <p className={styles.certSkills}>{cert.skills}</p>

      <div className={styles.cardFooter}>
        <span className={styles.idCode} title={`Credential ID: ${cert.credentialId}`}>
          {idText}: {cert.credentialId}
        </span>
        <span className={styles.verifyLink}>
          {verifyText}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
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

  // Duplicate rows to achieve mathematically seamless continuous marquee
  const row1Items = useMemo(
    () => [...certificationsRow1, ...certificationsRow1],
    []
  );
  const row2Items = useMemo(
    () => [...certificationsRow2, ...certificationsRow2],
    []
  );

  // Guarantee that switching back to this tab from an external verification link always keeps the conveyor moving
  useEffect(() => {
    const handleResume = () => {
      if (
        document.activeElement &&
        document.activeElement.tagName === "A" &&
        document.activeElement.closest &&
        document.activeElement.closest(`.${styles.conveyorRow}`)
      ) {
        document.activeElement.blur();
      }
    };

    window.addEventListener("focus", handleResume);
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        handleResume();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("focus", handleResume);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <section
      id="certifications"
      ref={ref}
      data-stagger-parent
      className={styles.container}
    >
      <div className={styles.headerGroup}>
        <h2
          className="sectionTitle"
          data-reveal-item
          style={{ "--reveal-delay": "0ms", marginBottom: 0 }}
        >
          {t.certifications?.sectionTitle || "Certifications"}
        </h2>

        <p
          className={styles.subtitle}
          data-reveal-item
          style={{ "--reveal-delay": "100ms" }}
        >
          {t.certifications?.subtitle ||
            "Enterprise credentials accredited by Oracle, AWS, Google, Meta, IBM & Harvard."}
        </p>
      </div>

      <div
        className={styles.conveyorWrapper}
        data-reveal-item
        style={{ "--reveal-delay": "240ms" }}
      >
        {/* Row 1: Scrolling Left */}
        <div className={styles.conveyorRow}>
          <div className={styles.marqueeTrackLeft}>
            {row1Items.map((cert, index) => (
              <CertificationCard
                key={`r1-${cert.id}-${index}`}
                cert={cert}
                verifyText={t.certifications?.verifyCredential || "Verify"}
                idText={t.certifications?.credentialId || "ID"}
              />
            ))}
          </div>
        </div>

        {/* Row 2: Scrolling Right */}
        <div className={styles.conveyorRow}>
          <div className={styles.marqueeTrackRight}>
            {row2Items.map((cert, index) => (
              <CertificationCard
                key={`r2-${cert.id}-${index}`}
                cert={cert}
                verifyText={t.certifications?.verifyCredential || "Verify"}
                idText={t.certifications?.credentialId || "ID"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Certifications;
