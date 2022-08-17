import Axios from "axios";
import useForm from "hooks/useForm";
import { withSession } from "lib/withSession";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useEffect, useState } from "react";
import { User } from "src/entity/User";
import queryString from "query-string";

type Props = {
  user: User | null;
};

const SignIn: NextPage<Props> = (props) => {
  const { user } = props;
  const [currentUser, setCurrentUser] = useState(user);
  const { form } = useForm({
    initFormData: {
      username: "",
      password: "",
    },
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
    submit: {
      request: (formData) => Axios.post("/api/v1/signIn", formData),
      message: "登录成功！",
      successCallback: (response) => {
        const search = queryString.parse(window.location.search);
        const returnTo = search["return_to"]?.toString();
        if (returnTo) {
          window.location.href = returnTo;
        } else {
          window.location.href = "/posts";
        }
      },
    },
    buttons: (
      <div>
        <button type="submit">登录</button>
      </div>
    ),
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
