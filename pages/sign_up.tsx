import Axios, { AxiosResponse } from "axios";
import useForm from "hooks/useForm";

const SignUp = () => {
  const initFormData = {
    username: "",
    password: "",
    passwordConfirmation: "",
  };

  const onSubmit = (formData: typeof initFormData) => {
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
  };

  const { form, setErrors } = useForm({
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
    onSubmit,
  });

  return (
    <div>
      <h1>注册</h1>
      {form}
    </div>
  );
};

export default SignUp;
