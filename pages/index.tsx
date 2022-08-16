import Nav from "components/Nav";
import styles from "./index.module.scss";

const Home = () => {
  return (
    <>
      <Nav />
      <div className={styles.wrapper}>
        <h1 className={styles.main_title}>
          <span style={{ color: "#00b96b" }}>南橘</span>，认识有趣的人
        </h1>
        <h4 className={styles.sub_title}>一个小而美的博客网站</h4>
        <div className={styles.bg}></div>
      </div>
    </>
  );
};

export default Home;
