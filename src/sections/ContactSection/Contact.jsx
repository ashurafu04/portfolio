import { useState } from "react";
import styles from "./ContactStyles.module.css";
import { useReveal } from "../../hooks/useReveal";
import { useTranslation } from "../../i18n";

const FORM_ENDPOINT = "https://formspree.io/f/mwplkrol";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const REQUEST_TIMEOUT_MS = 12000;
const COOLDOWN_MS = 45000;
const COOLDOWN_KEY = "last_contact_ts";

// Per-tab cooldown after a successful send, to stop accidental double submits.
function isInCooldown() {
  try {
    const last = Number(sessionStorage.getItem(COOLDOWN_KEY));
    return Date.now() - last < COOLDOWN_MS;
  } catch {
    return false;
  }
}

function startCooldown() {
  try {
    sessionStorage.setItem(COOLDOWN_KEY, String(Date.now()));
  } catch {
    // Storage unavailable: no cooldown
  }
}

function Contact() {
  const ref = useReveal({ threshold: 0.08 });
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    _gotcha: "",
  });

  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

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
    });
    setStatus("idle");
    setErrorMessage("");
  };

  // Client-side checks are UX only (fast feedback, fewer wasted requests);
  // they are bypassable. Spam filtering and rate limiting are enforced by
  // Formspree, which also honours the _gotcha honeypot below.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isInCooldown()) {
      setStatus("error");
      setErrorMessage(t.contact.rateLimitMessage);
      return;
    }

    const name = formData.name.trim().slice(0, 100);
    const email = formData.email.trim().slice(0, 120);
    const message = formData.message.trim().slice(0, 3000);

    if (/[\r\n]/.test(name) || !EMAIL_REGEX.test(email)) {
      setStatus("error");
      setErrorMessage(t.contact.invalidEmail);
      return;
    }

    if (message.length < 10) {
      setStatus("error");
      setErrorMessage(t.contact.tooShortMessage);
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message, _gotcha: formData._gotcha }),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });

      if (response.ok) {
        startCooldown();
        setStatus("success");
        return;
      }

      const data = await response.json().catch(() => ({}));
      setStatus("error");
      if (response.status === 429) {
        setErrorMessage(t.contact.rateLimitMessage);
      } else if (data.errors?.length > 0) {
        setErrorMessage(data.errors.map((err) => err.message).join(", "));
      } else {
        setErrorMessage(t.contact.errorMessage);
      }
    } catch {
      // Network failure or timeout
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

          {/* Honeypot: hidden from people, filled by naive bots; Formspree drops those submissions */}
          <div className={styles.honeypot} aria-hidden="true">
            <input
              type="text"
              name="_gotcha"
              id="_gotcha"
              value={formData._gotcha}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div>
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

          <div>
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

          <div>
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
            className={styles.submitBtn}
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
