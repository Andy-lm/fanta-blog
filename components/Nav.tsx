import Link from "next/link";
import styles from "./Nav.module.scss";

const Nav = () => {
  const itemList:any = [
    // { title: "文章列表", key: "posts", url: "/posts" },
    // { title: "新增文章", key: "new", url: "/posts/new" },
  ];

  return (
    <nav className={styles.nav_wrapper}>
      <div className={styles.nav_left}>
        <Link href="/">
          <a>
            <div className={styles.logo_wrapper}>
              <img src="/logo.png" className={styles.logo} />
              <span className={styles.title}>FANTA Blog</span>
            </div>
          </a>
        </Link>
        {itemList.length > 0 &&
          itemList.map((item:any) => {
            return (
              <span key={item.key} style={{ paddingLeft: "10%" }}>
                <Link href={item.url}>
                  <a>{item.title}</a>
                </Link>
              </span>
            );
          })}
      </div>
      <div className={styles.nav_right}>
        
      </div>
    </nav>
  );
};

export default Nav;
