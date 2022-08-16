import Link from "next/link";
import styles from "./Logo.module.scss"

const Logo = () => {
    return (
      <Link href="/">
        <a>
          <div className={styles.logo_content}>
            <img src="/logo_pure.png" className={styles.logo_img} />
            <img src="/logo_font_color.png" className={styles.logo_font} />
          </div>
        </a>
      </Link>
    );
  };

export default Logo;
