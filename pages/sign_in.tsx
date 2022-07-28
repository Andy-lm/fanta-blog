import Axios, { AxiosResponse } from "axios";
import Form from "components/Form";
import { withSession } from "lib/withSession";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
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

  /**
   * 处理数据提交
   */
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

  /**
   * Form组件的fields
   */
  const formFields: FormFields[] = useMemo(() => {
    return [
      {
        label: "用户名",
        type: "text",
        value: formData.username,
        onChange: (e: ChangeEventHandler) => {
          onChange("username", e);
        },
        errors: errors.username,
      },
      {
        label: "密码",
        type: "password",
        value: formData.password,
        onChange: (e: ChangeEventHandler) => {
          onChange("password", e);
        },
        errors: errors.password,
      },
    ];
  }, [formData, errors]);

  /**
   * 处理表单数据变动
   */
  const onChange = useCallback(
    (type, e) => {
      setFormData({ ...formData, [type]: e.target.value });
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
      <Form
        fields={formFields}
        onSubmit={onSubmit}
        Buttons={
          <div>
            <button type="submit">登录</button>
          </div>
        }
      ></Form>
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
