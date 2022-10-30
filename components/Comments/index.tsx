import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import ClientOnly from "../ClientOnly";
import Item from "./Item";

const PostComments = (props: { postId: Number }) => {
  const { postId } = props;
  const [curCommentContent, setCurCommentContent] = useState("");
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    getComment();
  }, [postId]);

  const getComment = () => {
    Axios.get(`/api/v1/comment/getComment?postId=${postId}`).then(
      (response: AxiosResponse) => {
        if (response.status === 200) {
          const { data: commentList } = response.data;
          setCommentList([...commentList]);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const submitComment = () => {
    const parentId = 0;
    const replayId = 0;
    Axios.post("/api/v1/comment/addComment", {
      content: curCommentContent,
      postId,
      replayId,
      parentId,
      replayUsername: "",
    }).then(
      async (data) => {
        console.log(data, "-----");
        setCurCommentContent("");
        await getComment();
      },
      (error) => {
        const response: AxiosResponse = error.response;
        if (response.status === 400) {
          console.log("response.data");
          console.log(response.data);
        } else if (response.status === 401) {
          window.alert("请先登录！");
          window.location.href = `/sign_in?return_to=${encodeURIComponent(
            window.location.pathname
          )}`;
        } else if (response.status === 400) {
          throw new Error("删除出错！");
        }
      }
    );
  };

  return (
    <>
      <div className={styles.post_comment}>
        <ClientOnly>
          <div className={styles.comment_write}>
            <div className={styles.write_wrapper}>
              <TextField
                onChange={(e) => {
                  setCurCommentContent(e.target.value);
                }}
                id="outlined-multiline-static"
                label="我的想法是..."
                multiline
                minRows={5}
                value={curCommentContent}
                variant="outlined"
                style={{
                  width: "350px",
                }}
              />
              <div className={styles.write_publish}>
                <Button
                  variant="text"
                  size="small"
                  style={{ marginRight: "5px" }}
                  onClick={() => {
                    setCurCommentContent("");
                  }}
                >
                  取消
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={submitComment}
                >
                  发布
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.comment_list}>
            {commentList.length &&
              commentList.map((item) => {
                return <Item comment={item} key={item.id} parentId={0}></Item>;
              })}
          </div>
        </ClientOnly>
      </div>
    </>
  );
};

export default PostComments;
