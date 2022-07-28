import Axios, { AxiosResponse } from "axios";
import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import Form from "components/Form";

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
      Axios.post("/api/v1/users", formData).then(
        (data) => {
          alert("注册成功！");
          window.location.href = "/sign_in";
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
      {
        label: "确认密码",
        type: "password",
        value: formData.passwordConfirmation,
        onChange: (e: ChangeEventHandler) => {
          onChange("passwordConfirmation", e);
        },
        errors: errors.passwordConfirmation,
      },
    ];
  }, [formData, errors]);

  const onChange = useCallback(
    (type, e) => {
      setFormData({ ...formData, [type]: e.target.value });
    },
    [formData]
  );

  return (
    <div>
      <h1>注册</h1>
      <Form
        fields={formFields}
        onSubmit={onSubmit}
        Buttons={
          <div>
            <button type="submit">注册</button>
          </div>
        }
      ></Form>
    </div>
  );
};

export default SignUp;
