import Axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React from "react";
import styles from "./new.module.scss";
import useCKEdit from "hooks/useCKEdit";
import Nav from "components/Nav";
import { Button } from "@material-ui/core";

const New = () => {
  const router = useRouter();
  const { CKEdit, getCKEditData } = useCKEdit({
    initData: "",
  });

  const submit = (formData: { title: string; content: string } | null) => {
    if (!formData) return;
    Axios.post("/api/v1/setPost", {
      operationType: "add",
      formData,
    }).then(
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
    <>
      <Nav
        extraRight={[
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              const formData = getCKEditData();
              submit(formData);
            }}
          >
            发布
          </Button>,
        ]}
      ></Nav>
      <div className={styles.wrapper}>{CKEdit}</div>
    </>
  );
};

export default New;
