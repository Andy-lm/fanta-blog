import { Button } from "@material-ui/core";
import useUser from "hooks/useUser";
import Link from "next/link";
import styles from "./index.module.scss";

const Home = () => {
  const { data: userData } = useUser();
  const isLoggedIn = userData?.isLoggedIn;
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}></div>
        <h1 className={styles.main_title}>
          <span style={{ color: "#00b96b" }}>南橘</span>，分享有趣的知识
        </h1>
        <h4 className={styles.sub_title}>一个小而美的博客网站</h4>
        <Link href="/posts">
          <a>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              style={{ marginRight: "20px" }}
            >
              进入南橘
            </Button>
          </a>
        </Link>
        {!isLoggedIn && (
          <Link href="/sign_in">
            <a>
              <Button variant="outlined" color="primary" size="medium">
                登录
              </Button>
            </a>
          </Link>
        )}
        {/* <img className={styles.home_png} src="/home_bg.png"></img> */}
      </div>
    </>
  );
};

export default Home;