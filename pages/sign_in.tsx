import Axios, { AxiosResponse } from "axios";
import { useCallback, useState } from "react";

const SignUp = () => {
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

export default SignUp;
