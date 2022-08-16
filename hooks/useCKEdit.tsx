import React, { useCallback, useEffect, useRef, useState } from "react";
import filterHtml from "utils/filterHtml";
import styles from "./useCKEdit.module.scss";

type Options = {
  initData: string;
};

type CKEditData = {
  title: string;
  content: string;
} | null;

const useCKEdit = (options: Options) => {
  const { initData } = options;
  const editorRef = useRef({});
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState(initData);
  // @ts-ignore
  const { CKEditor, CustomEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      CustomEditor: require("ckeditor5-custom-build/build/ckeditor"),
    };
    setEditorLoaded(true);
  }, []);

  const getCKEditData = (): CKEditData => {
    const execArr = /^(<h1>[\s\S]*<\/h1>)([\s\S]*)/g.exec(data);
    let fromData = null;
    if (execArr) {
      let title = execArr[1];
      let content = execArr[2];
      // 过滤所有标签和空格
      title = filterHtml(title);
      let _content = filterHtml(content);
      if (!title) {
        alert("请输入文章标题！");
      } else if (!_content) {
        alert("请输入文章内容！");
      } else {
        fromData = { title, content };
      }
    } else {
      alert("请输入文章标题！");
    }
    return fromData;
  };

  const CKEdit = (
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
  );

  return {
    CKEdit,
    getCKEditData,
  };
};

export default useCKEdit;
