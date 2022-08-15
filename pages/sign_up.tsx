import Axios from "axios";
import useForm from "hooks/useForm";

const SignUp = () => {
  const initFormData = {
    username: "",
    password: "",
    passwordConfirmation: "",
  };

  const { form } = useForm({
    initFormData,
    fields: [
      { label: "用户名", type: "text", key: "username" },
      { label: "密码", type: "password", key: "password" },
      { label: "确认密码", type: "password", key: "passwordConfirmation" },
    ],
    buttons: (
      <div>
        <button>注册</button>
      </div>
    ),
    submit: {
      request: (formData) => Axios.post("/api/v1/sign_up", formData),
      message: "注册成功！",
      successCallback: (response) => {
        window.location.href = "/sign_in";
      },
    },
  });

  return (
    <div>
      <h1>注册</h1>
      {form}
    </div>
  );
};

export default SignUp;
