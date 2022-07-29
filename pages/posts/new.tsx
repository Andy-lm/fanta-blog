import Axios, { AxiosResponse } from "axios";
import useForm from "hooks/useForm";
import { NextPage } from "next";

const New: NextPage = () => {
  const initFormData = {
    title: "",
    content: "",
  };

  const buttons = (
    <div>
      <button type="submit">提交</button>
    </div>
  );

  const { form } = useForm({
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
    submit: {
      request: (formData) => Axios.post("/api/v1/posts", formData),
      message: "创建成功",
      successCallback: (response) => {
        console.log(response.data, "====");
      },
    },
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
