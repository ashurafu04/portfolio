import { useState, useRef } from "react";
import styles from "./ContactStyles.module.css";
import { useReveal } from "../../hooks/useReveal";
import { useTranslation } from "../../i18n";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SUBMISSION_COOLDOWN_MS = 45000; // 45s between submissions per session
const BOT_MIN_TIME_MS = 2500; // Human typing threshold

function Contact() {
  const ref = useReveal({ threshold: 0.08 });
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    _gotcha: "",
    _trap_city: "",
  });

  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const mountTimeRef = useRef(Date.now());
  const abortControllerRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      message: "",
      _gotcha: "",
      _trap_city: "",
    });
    setStatus("idle");
    setErrorMessage("");
    mountTimeRef.current = Date.now();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ── Layer 1: Anti-Bot Honeypots ─────────────────────────────────────────
    // If hidden trap fields contain any content, silently fake success
    if (formData._gotcha || formData._trap_city) {
      console.warn("Honeypot triggered. Request dropped.");
      setStatus("success");
      return;
    }

    // ── Layer 2: Behavioral Time-Trap ───────────────────────────────────────
    // Humans take at least 2.5s to fill a 3-field form; automated bots submit instantly
    const elapsed = Date.now() - mountTimeRef.current;
    if (elapsed < BOT_MIN_TIME_MS) {
      console.warn("Rapid submission threshold triggered. Request dropped.");
      setStatus("success");
      return;
    }

    // ── Layer 3: Session-Based Rate Limiting ─────────────────────────────────
    const lastSubmitTime = sessionStorage.getItem("last_contact_ts");
    if (lastSubmitTime && Date.now() - Number(lastSubmitTime) < SUBMISSION_COOLDOWN_MS) {
      setStatus("error");
      setErrorMessage(t.contact.rateLimitMessage);
      return;
    }

    // ── Layer 4: Input Sanitization & Boundary Constraints ─────────────────
    const name = formData.name.trim().slice(0, 100);
    const email = formData.email.trim().slice(0, 120);
    const message = formData.message.trim().slice(0, 3000);

    // Prevent Header Injection (newlines in single-line headers)
    if (/[\r\n]/.test(name) || /[\r\n]/.test(email)) {
      setStatus("error");
      setErrorMessage(t.contact.invalidEmail);
      return;
    }

    // Strict Email Format Validation
    if (!EMAIL_REGEX.test(email)) {
      setStatus("error");
      setErrorMessage(t.contact.invalidEmail);
      return;
    }

    // Minimum Content Depth Check
    if (message.length < 10) {
      setStatus("error");
      setErrorMessage(t.contact.tooShortMessage);
      return;
    }

    // ── Layer 5: Secure Asynchronous JSON Request ───────────────────────────
    setStatus("submitting");
    setErrorMessage("");

    try {
      abortControllerRef.current = new AbortController();
      const timeoutId = setTimeout(() => abortControllerRef.current?.abort(), 12000);

      const response = await fetch("https://formspree.io/f/mwplkrol", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _gotcha: "",
        }),
        signal: abortControllerRef.current.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        sessionStorage.setItem("last_contact_ts", String(Date.now()));
        setStatus("success");
      } else {
        const data = await response.json().catch(() => ({}));
        setStatus("error");
        if (response.status === 429) {
          setErrorMessage(t.contact.rateLimitMessage);
        } else if (data.errors && data.errors.length > 0) {
          setErrorMessage(data.errors.map((err) => err.message).join(", "));
        } else {
          setErrorMessage(t.contact.errorMessage);
        }
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(t.contact.errorMessage);
    }
  };

  return (
    <section id="contact" ref={ref} data-will-reveal className={styles.container}>
      <h2 className="sectionTitle">{t.contact.sectionTitle}</h2>

      {status === "success" ? (
        <div className={styles.successCard} role="status" aria-live="polite">
          <div className={styles.successIcon}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 className={styles.successTitle}>{t.contact.successTitle}</h3>
          <p className={styles.successText}>{t.contact.successMessage}</p>
          <button
            type="button"
            className={styles.resetBtn}
            onClick={handleReset}
          >
            {t.contact.sendAnother}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {status === "error" && errorMessage && (
            <div className={styles.errorBanner} role="alert" aria-live="assertive">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* ── Multi-Layer Honeypots (Traps Bots Silently) ────────────────── */}
          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="_gotcha">Leave this field blank</label>
            <input
              type="text"
              name="_gotcha"
              id="_gotcha"
              value={formData._gotcha}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
            <label htmlFor="_trap_city">City</label>
            <input
              type="text"
              name="_trap_city"
              id="_trap_city"
              value={formData._trap_city}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="formGroup">
            <label htmlFor="name" className="sr-only">
              {t.contact.nameLabel}
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder={t.contact.namePlaceholder}
              value={formData.name}
              onChange={handleChange}
              maxLength={100}
              required
              disabled={status === "submitting"}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="email" className="sr-only">
              {t.contact.emailLabel}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder={t.contact.emailPlaceholder}
              value={formData.email}
              onChange={handleChange}
              maxLength={120}
              required
              disabled={status === "submitting"}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="message" className="sr-only">
              {t.contact.messageLabel}
            </label>
            <textarea
              name="message"
              id="message"
              placeholder={t.contact.messagePlaceholder}
              value={formData.message}
              onChange={handleChange}
              maxLength={3000}
              required
              disabled={status === "submitting"}
            ></textarea>
          </div>

          <button
            type="submit"
            className={`${styles.submitBtn} hover`}
            disabled={status === "submitting"}
          >
            {status === "submitting" ? (
              <span className={styles.submittingState}>
                <span>{t.contact.sending}</span>
                <span className={styles.pulseDots} aria-hidden="true">
                  <span className={styles.pulseDot} />
                  <span className={styles.pulseDot} />
                  <span className={styles.pulseDot} />
                </span>
              </span>
            ) : (
              <span>{t.contact.submit}</span>
            )}
          </button>
        </form>
      )}
    </section>
  );
}

export default Contact;
