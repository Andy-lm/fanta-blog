import Link from "next/link";
import styles from "./Nav.module.scss";
import Button from "@material-ui/core/Button";
import { ReactChild, useCallback, useState } from "react";
import FormatIndentIncreaseIcon from "@material-ui/icons/FormatIndentIncrease";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Drawer from "@material-ui/core/Drawer";
import Menu from "./Menu";

type NavLeftItems = {
  title: string | ReactChild;
  key: string;
  url: string;
};

const navLeftItems: NavLeftItems[] = [
  { title: "推荐", key: "posts", url: "/posts" },
  {
    title: (
      <span
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <AddCircleIcon
          style={{
            fontSize: 22,
            color: "#00b96b",
          }}
        />
        <span className={styles.add_tips}>创作</span>
      </span>
    ),
    key: "new",
    url: "/posts/new",
  },
];

const navRightItems: ReactChild[] = [
  <Link href="/about">
    <a className={styles.about}>关于南橘</a>
  </Link>,
  <Link href="/sign_in">
    <a style={{ color: "#fff" }}>
      <Button variant="contained" color="primary" size="small">
        登录
      </Button>
    </a>
  </Link>,
  <Link href="/sign_up">
    <a style={{ color: "#00b96b" }}>
      <Button variant="outlined" color="primary" size="small">
        注册
      </Button>
    </a>
  </Link>,
];

const Nav = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = useCallback(
    (open: boolean) => {
      setOpen(open);
    },
    [open]
  );

  return (
    <nav className={styles.nav_wrapper}>
      <div className={styles.nav_left}>
        <Link href="/">
          <a>
            <div className={styles.logo_content}>
              <img src="/logo_pure.png" className={styles.logo} />
              <img
                src="/logo_font_color.png"
                style={{
                  width: "84px",
                  height: "40px",
                }}
              />
            </div>
          </a>
        </Link>
        {navLeftItems.length > 0 &&
          navLeftItems.map((item: any) => {
            return (
              <span key={item.key} className={styles.item}>
                <Link href={item.url}>
                  <a>
                    <span>{item.title}</span>
                  </a>
                </Link>
              </span>
            );
          })}
      </div>
      <div className={styles.nav_right}>
        {navRightItems.map((item, index) => {
          return (
            <div key={index} style={{ marginLeft: "10px" }}>
              {item}
            </div>
          );
        })}
      </div>
      <div className={styles.content}>
        <FormatIndentIncreaseIcon
          style={{ fontSize: 20, color: "#262626", marginRight: "10px" }}
          onClick={() => {
            toggleDrawer(true);
          }}
        />
        <Link href="/">
          <a style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/logo_pure.png"
              style={{
                width: "30px",
                height: "30px",
              }}
            />
            <img
              src="/logo_font_color.png"
              style={{
                width: "66px",
                height: "36px",
              }}
            />
          </a>
        </Link>
      </div>
      <Drawer
        anchor="left"
        open={open}
        onClose={() => {
          toggleDrawer(false);
        }}
      >
        <Menu></Menu>
      </Drawer>
    </nav>
  );
};

export default Nav;
