import Link from "next/link";
import styles from "./Nav.module.scss";
import { ReactChild, useEffect, useState } from "react";
import FormatIndentIncreaseIcon from "@material-ui/icons/FormatIndentIncrease";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import Drawer from "@material-ui/core/Drawer";
import Menu from "./Menu";
import Logo from "./Logo";

const navLeftItems = [
  <Link href="/posts">
    <a>
      <span
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <HomeOutlinedIcon
          style={{
            fontSize: 22,
            fontWeight:300
          }}
        />
        <span className={styles.add_tips}>推荐</span>
      </span>
    </a>
  </Link>,
  <Link href="/posts/new">
    <a>
      <span
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <CreateOutlinedIcon
          style={{
            fontSize: 22,
          }}
        />
        <span className={styles.add_tips}>创作</span>
      </span>
    </a>
  </Link>,
];

const navRightItems: ReactChild[] = [
  <Link href="/about">
    <a className={styles.about}>关于南橘</a>
  </Link>,
];

type Props = {
  extraLeft?: ReactChild[];
  extraRight?: ReactChild[];
  alignLeft?: string[];
  alignRight?: string[];
};

const Nav = (props: Props) => {
  const { extraLeft, extraRight, alignLeft, alignRight } = props;
  const [rightItem, setRightItem] = useState([...navRightItems]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (extraRight) {
      setRightItem([...navRightItems.concat(...extraRight)]);
    }
  }, [extraRight]);

  return (
    <nav className={styles.nav_wrapper}>
      <div className={styles.nav_left}>
        <Logo />
        {navLeftItems.map((item, index) => {
          return (
            <div key={index} className={styles.item}>
              {item}
            </div>
          );
        })}
      </div>
      <div className={styles.nav_right}>
        {rightItem.map((item, index) => {
          return (
            <div key={index} className={styles.item}>
              {item}
            </div>
          );
        })}
      </div>
      <div className={styles.content}>
        <FormatIndentIncreaseIcon
          style={{ fontSize: 20, color: "#262626", marginRight: "10px" }}
          onClick={() => {
            setOpen(true);
          }}
        />
        <Logo />
      </div>
      <Drawer
        anchor="left"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Menu></Menu>
      </Drawer>
    </nav>
  );
};

export default Nav;
