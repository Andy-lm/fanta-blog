import Axios, { AxiosResponse } from "axios";
import useForm from "hooks/useForm";
import { withSession } from "lib/withSession";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useEffect, useState } from "react";
import { User } from "src/entity/User";

type Props = {
  user: User | null;
};

const SignIn: NextPage<Props> = (props) => {
  const { user } = props;
  const [currentUser, setCurrentUser] = useState(user);

  const initFormData = {
    username: "",
    password: "",
  };

  const buttons = (
    <div>
      <button type="submit">登录</button>
    </div>
  );

  /**
   * 处理数据提交
   */
  const onSubmit = (formData: typeof initFormData) => {
    // 发送请求前将上一次错误置空
    setErrors({
      username: [],
      password: [],
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
  };

  const { form, setErrors } = useForm({
    initFormData,
    fields: [
      {
        label: "用户名",
        type: "text",
        key: "username",
      },
      {
        label: "密码",
        type: "password",
        key: "password",
      },
    ],
    onSubmit,
    buttons,
  });

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return (
    <div>
      {currentUser ? (
        <div>当前登录用户为 {currentUser?.username}</div>
      ) : (
        <div>未登录</div>
      )}
      <h1>登录</h1>
      {form}
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
