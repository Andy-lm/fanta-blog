import Axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React from "react";
import styles from "./new.module.scss";
import useCKEdit from "hooks/useCKEdit";

const New = () => {
  const router = useRouter();
  const { CKEdit, getCKEditData } = useCKEdit({
    initData: "",
  });

  const submit = (formData: { title: string; content: string } | null) => {
    if (!formData) return;
    Axios.post("/api/v1/posts", formData).then(
      (response) => {
        alert("发布成功！");
        router.push("/posts");
      },
      (error) => {
        const response: AxiosResponse = error.response;
        if (response.status === 422) {
          console.log("response.data");
          console.log(response.data);
        } else if (response.status === 401) {
          window.alert("请先登录！");
          window.location.href = `/sign_in?return_to=${encodeURIComponent(
            window.location.pathname
          )}`;
        }
      }
    );
  };

  return (
    <div className={styles.wrapper}>
      {/* {form} */}
      <div className={styles.post_actions}>
        {/* <Button
          variant="outlined"
          color="primary"
          size="small"
          className={styles.publish}
          onClick={() => {
            const formData = getCKEditData();
            submit(formData);
          }}
        >
          发布
        </Button> */}
      </div>
      {CKEdit}
    </div>
  );
};

export default New;
