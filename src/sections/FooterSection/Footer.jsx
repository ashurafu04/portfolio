import styles from "./FooterStyles.module.css";
import { useTranslation } from "../../i18n";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer id="footer" className={styles.container}>
      <p>
        &copy; 2026 {t.footer.copyright}. <br />
        {t.footer.rights}
      </p>
    </footer>
  );
}

export default Footer;
