import { Button } from "@material-ui/core";
import useUser from "hooks/useUser";
import Link from "next/link";
import styles from "./Users.module.scss";

const Users = () => {
  const { data: userData } = useUser();
  const user = userData?.user;
  const isLoggedIn = userData?.isLoggedIn;
  return (
    <>
      {!isLoggedIn ? (
        <div>
          <Link href="/sign_in">
            <a style={{ color: "#fff", marginRight: "10px" }}>
              <Button variant="contained" color="primary" size="small">
                登录
              </Button>
            </a>
          </Link>
          <Link href="/sign_up">
            <a style={{ color: "#00b96b" }}>
              <Button variant="outlined" color="primary" size="small">
                注册
              </Button>
            </a>
          </Link>
        </div>
      ) : (
        <div className={styles.username}>{user.username}</div>
      )}
    </>
  );
};

export default Users;
