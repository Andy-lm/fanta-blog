import getRelativeTime from "utils/getRelativeTime";
import styles from "./Item.module.scss";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Axios, { AxiosResponse } from "axios";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import { useEffect, useState } from "react";
import { Comment } from "src/entity/Comment";

const Item = (props: { comment: Comment; parentId: number }) => {
  const { comment, parentId } = props;
  const [isReplayOpen, setIsReplayOpen] = useState(false);
  const [replayContent, setReplayContent] = useState("");
  const [replayList, setReplayList] = useState([]);

  useEffect(() => {
    if (comment.children) {
      setReplayList([...comment.children]);
    }
  }, []);

  const getReplayComment = () => {
    Axios.get(
      `/api/v1/comment/getReplayComment?postId=${comment.postId}&parentId=${parentId}`
    ).then(
      (response: AxiosResponse) => {
        if (response.status === 200) {
          const { data: replayCommentList } = response.data;
          setReplayList([...replayCommentList]);
          setIsReplayOpen(false);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const submitReplayComment = () => {
    Axios.post("/api/v1/comment/addComment", {
      content: replayContent,
      postId: comment.postId,
      replayId: comment.id,
      parentId:
        parentId === 0 && comment.parentId === 0 ? comment.id : parentId,
      replayUsername: comment.commentUsername,
    }).then(
      async (data) => {
        console.log(data, "-----");
        setReplayContent("");
        getReplayComment();
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
    <div className={styles.item_wrapper}>
      <div className={styles.item}>
        <div className={styles.item_username}>
          {comment.commentUsername}
          {comment.parentId !== 0 && comment.parentId !== comment.replayId ? (
            <span>
              <div className={styles.right_triangle}></div>
              <span>{comment.replayUsername}</span>
            </span>
          ) : (
            ""
          )}
        </div>
        <div className={styles.item_date}>
          {getRelativeTime(comment.updatedAt.toString())}
        </div>
        <div className={styles.item_content}>{comment.content}</div>
        <div className={styles.item_actions}>
          <div className={styles.agree_and_reply}>
            <span>
              <ThumbUpOutlinedIcon className={styles.comment_agree} />
            </span>
            <span>
              <ModeCommentOutlinedIcon className={styles.comment_replays} />
            </span>
          </div>
          <div className={styles.comment_relay}>
            <Button
              color="primary"
              variant="text"
              size="small"
              onClick={() => {
                setIsReplayOpen((isOpen) => !isOpen);
              }}
            >
              回复
            </Button>
          </div>
        </div>
        {isReplayOpen || replayList.length ? (
          <div className={styles.child_comment}>
            {isReplayOpen ? (
              <div className={styles.replay_textarea}>
                <TextField
                  onChange={(e) => {
                    setReplayContent(e.target.value);
                  }}
                  id="outlined-multiline-static"
                  label={`回复给${comment.commentUsername}`}
                  multiline
                  minRows={4}
                  value={replayContent}
                  variant="outlined"
                  style={{
                    width: "100%",
                  }}
                />
                <div className={styles.replay_actions}>
                  <Button variant="text" size="small">
                    取消
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    style={{
                      fontSize: "12px",
                      marginLeft: "5px",
                      minWidth: "54px",
                    }}
                    onClick={() => {
                      submitReplayComment();
                    }}
                  >
                    确认
                  </Button>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className={styles.replay_list}>
              {replayList.length
                ? replayList.map((item) => {
                    return (
                      <Item
                        comment={item}
                        key={item.id}
                        parentId={item.parentId}
                      ></Item>
                    );
                  })
                : ""}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Item;
