import Link from "next/link";
import styles from "./Logo.module.scss";

const Logo = (props: { size?: string }) => {
  const { size = "middle" } = props;
  return (
    <Link href="/">
      <a>
        <div className={styles.logo_content}>
          <img
            src="/logo_pure.png"
            className={
              size === "large" ? styles.logo_img_large : styles.logo_img
            }
          />
          <img
            src="/logo_font_color.png"
            className={
              size === "large" ? styles.logo_font_large : styles.logo_font
            }
          />
        </div>
      </a>
    </Link>
  );
};

export default Logo;
