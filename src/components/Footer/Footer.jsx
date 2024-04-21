import styles from "./Footer.module.scss";
import { MoscowTime } from "../MoscowTime/MoscowTime";

export function Footer({ footerStyle, footerSetings }) {
  return (
    <footer className={`${styles.footer} ${footerStyle}`}>
      <div className="container">
        <div className={styles["footer-content"]}>
          {footerSetings ? footerSetings.leftContent : <div></div>}
          <div>
            <MoscowTime></MoscowTime>
          </div>
          {footerSetings ? footerSetings.rightContent : <div></div>}
        </div>
      </div>
    </footer>
  );
}
