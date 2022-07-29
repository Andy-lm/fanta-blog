import Axios, { AxiosResponse } from "axios";
import Form from "components/Form";
import useForm from "hooks/useForm";
import { NextPage } from "next";
import { ChangeEventHandler, useCallback, useMemo, useState } from "react";

const NewPosts: NextPage = () => {
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

  // const [formData, setFormData] = useState({
  //   title: "",
  //   content: "",
  // });

  // const [errors, setErrors] = useState({
  //   title: [],
  //   content: [],
  // });

  // /**
  //  * Form组件的fields
  //  */
  // const formFields: FormFields[] = useMemo(() => {
  //   return [
  //     {
  //       label: "文章标题",
  //       type: "text",
  //       value: formData.title,
  //       onChange: (e: ChangeEventHandler) => {
  //         onChange("title", e);
  //       },
  //       errors: errors.title,
  //     },
  //     {
  //       label: "内容",
  //       type: "textarea",
  //       value: formData.content,
  //       onChange: (e: ChangeEventHandler) => {
  //         onChange("content", e);
  //       },
  //       errors: errors.content,
  //     },
  //   ];
  // }, [formData, errors]);

  // /**
  //  * 处理表单数据变动
  //  */
  // const onChange = useCallback(
  //   (type, e) => {
  //     setFormData({ ...formData, [type]: e.target.value });
  //   },
  //   [formData]
  // );

  // /**
  //  * 处理数据提交
  //  */
  // const onSubmit = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     // 发送请求前将上一次错误置空
  //     setErrors({
  //       title: [],
  //       content: [],
  //     });
  //     Axios.post("/api/v1/poste", formData).then(
  //       () => {
  //         alert("发布成功！");
  //       },
  //       (error) => {
  //         const response: AxiosResponse = error.response;
  //         if (response.status === 422) {
  //           console.log("response.data");
  //           console.log(response.data);
  //           setErrors({ ...response.data });
  //         }
  //       }
  //     );
  //   },
  //   [formData]
  // );

  return (
    <div>
      <h1>发布文章</h1>
      {/* <Form
        fields={formFields}
        onSubmit={onSubmit}
        Buttons={
          <div>
            <button type="submit">提交</button>
          </div>
        }
      ></Form> */}
      {form}
    </div>
  );
};

export default NewPosts;
