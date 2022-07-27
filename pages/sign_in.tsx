import Axios, { AxiosResponse } from "axios";
import { withSession } from "lib/withSession";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { User } from "src/entity/User";

type Props = {
  user: User | null;
};

const SignIn: NextPage<Props> = (props) => {
  const { user } = props;

  const [currentUser, setCurrentUser] = useState(user);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState({
    username: [],
    password: [],
    passwordConfirmation: [],
  });

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      // 发送请求前将上一次错误置空
      setErrors({
        username: [],
        password: [],
        passwordConfirmation: [],
      });
      Axios.post("/api/v1/sessions", formData).then(
        (data) => {
          alert("登录成功！");
          window.location.reload();
        },
        (error) => {
          const response: AxiosResponse = error.response;
          if (response.status === 422) {
            console.log("response.data");
            console.log(response.data);
            setErrors({ ...response.data });
          }
        }
      );
    },
    [formData]
  );

  return (
    <div>
      {currentUser ? (
        <div>当前登录用户为 {currentUser?.username}</div>
      ) : (
        <div>未登录</div>
      )}
      <h1>登录</h1>
      <form onSubmit={onSubmit} autoComplete={"on"}>
        <div>
          <label>
            用户名
            <input
              type="text"
              value={formData.username}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
              }}
            />
          </label>
          {errors.username?.length > 0 && (
            <div>{errors.username.join(",")}</div>
          )}
        </div>
        <div>
          <label>
            密码
            <input
              type="password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
            />
          </label>
          {errors.password?.length > 0 && (
            <div>{errors.password.join(",")}</div>
          )}
        </div>
        <div>
          <button type="submit">登录</button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = withSession(
  async (context: GetServerSidePropsContext) => {
    // @ts-ignore
    const user = context.req.session.get("currentUser") || "";
    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
      },
    };
  }
);
