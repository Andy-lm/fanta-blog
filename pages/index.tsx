import { Button } from "@material-ui/core";
import Nav from "components/Nav";
import useUser from "hooks/useUser";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./index.module.scss";

const Home = () => {
  const router = useRouter();
  const { data: userData } = useUser();
  const isLoggedIn = userData?.isLoggedIn;
  return (
    <>
      <Nav />
      <div className={styles.wrapper}>
        <h1 className={styles.main_title}>
          <span style={{ color: "#00b96b" }}>南橘</span>，认识有趣的人
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
        <img className={styles.home_png} src="/home_bg.png"></img>
      </div>
    </>
  );
};

export default Home;
