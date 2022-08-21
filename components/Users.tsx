import { Button } from "@material-ui/core";
import useUser from "hooks/useUser";
import Link from "next/link";
import Axios, { AxiosResponse } from "axios";
import { Popover } from "antd";
import styles from "./Users.module.scss";

const content = (
  <div>
    <span
      className={styles.user_action}
      onClick={() => {
        Axios.get("/api/v1/signOut").then(
          (response) => {
            console.log(response.data);
            alert("退出成功！");
            window.location.href = "/sign_in";
          },
          (error) => {
            const response: AxiosResponse = error.response;
            console.error("response.data");
            console.error(response.data);
          }
        );
      }}
    >
      退出登录
    </span>
  </div>
);

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
        <Popover content={content} trigger="hover" placement="bottomRight">
          <div className={styles.username}>{user.username}</div>
        </Popover>
      )}
    </>
  );
};

export default Users;
