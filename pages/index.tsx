import styles from "./index.module.scss";

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.main_title}>
        <span style={{ color: "#00b96b" }}>南橘</span>，认识有趣的人
      </h1>
      <h4 className={styles.sub_title}>一个小而美的博客网站</h4>
      <img src="/home_bg.png" style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default Home;
