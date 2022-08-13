import Axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import React, { useEffect, useRef, useState } from "react";
import styles from "./new.module.scss";

const New = () => {
  const editorRef = useRef({});
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
  const router = useRouter();
  // @ts-ignore
  const { CKEditor, CustomEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      CustomEditor: require("ckeditor5-custom-build/build/ckeditor"),
    };
    setEditorLoaded(true);
  }, []);

  const submit = () => {
    const formData = formatPostData(data);
    if (formData) {
      Axios.post("/api/v1/posts", formData).then(
        (response) => {
          console.log(response.data);
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
    }
  };

  const formatPostData = (data: string) => {
    let fromData = null;
    if (!/^#\s/.test(data)) {
      alert("请输入文章标题！");
    } else if (!/^#\s.*\n\n[\s\S]*/.test(data)) {
      alert("请输入文章内容！");
    } else {
      let [all, identifier, title, n, content] =
        /^(#\s)(.*)(\n\n)([\s\S]*)/.exec(data.trim());
      fromData = {
        title,
        content,
      };
    }
    return fromData;
  };

  return (
    <div className={styles.wrapper}>
      {/* {form} */}
      <div className={styles.post_actions}>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          className={styles.publish}
          onClick={submit}
        >
          发布
        </Button>
      </div>
      <div className={styles.rich_text_wrapper}>
        {editorLoaded ? (
          <CKEditor
            editor={CustomEditor}
            data={data}
            // @ts-ignore
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            // @ts-ignore
            onChange={(event, editor) => {
              const data = editor.getData();
              setData(data);
            }}
          />
        ) : (
          <p>loading...</p>
        )}
      </div>
    </div>
  );
};

export default New;
