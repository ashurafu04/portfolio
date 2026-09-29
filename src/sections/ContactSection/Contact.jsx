import styles from "./ContactStyles.module.css";
import { useReveal } from "../../hooks/useReveal";
import { useTranslation } from "../../i18n";

function Contact() {
  const ref = useReveal({ threshold: 0.08 });
  const { t } = useTranslation();

  return (
    <section id="contact" ref={ref} data-will-reveal className={styles.container}>
      <h2 className="sectionTitle">{t.contact.sectionTitle}</h2>
      <form action="https://formspree.io/f/mwplkrol" method="post">
        <div className="formGroup">
          <label htmlFor="name" className="sr-only">
            {t.contact.nameLabel}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder={t.contact.namePlaceholder}
            required
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
            required
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
            required
          ></textarea>
        </div>
        <input type="submit" className="hover btn" value={t.contact.submit} />
      </form>
    </section>
  );
}

export default Contact;
