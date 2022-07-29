import Axios, { AxiosResponse } from "axios";
import useForm from "hooks/useForm";
import { NextPage } from "next";

const New: NextPage = () => {
  const initFormData = {
    title: "",
    content: "",
  };

  const onSubmit = (formData: typeof initFormData) => {
    Axios.post("/api/v1/posts", formData).then(
      (response) => {
        console.log(response.data, "-------");
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

  const buttons = (
    <div>
      <button type="submit">提交</button>
    </div>
  );

  const { form, setErrors } = useForm({
    initFormData,
    fields: [
      {
        label: "文章标题",
        type: "text",
        key: "title",
      },
      {
        label: "内容",
        type: "textarea",
        key: "content",
      },
    ],
    onSubmit,
    buttons,
  });

  return (
    <div>
      <h1>发布文章</h1>
      {form}
    </div>
  );
};

export default New;
