import { useState } from "react";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import useUser from "hooks/useUser";
import { useRouter } from "next/router";
import Axios from "axios";
import styles from "./Widgets.module.scss";
import { Post } from "src/entity/Post";

type Props = {
  post: Post;
};

const Widgets = (props: Props) => {
  const { post } = props;
  const router = useRouter();
  const [agreed, setAgreed] = useState(props.post.isAgree ? true : false);
  const [agreeCount, setAgreeCount] = useState(props.post.agreeCount);
  const [count, setCount] = useState(0);
  const { data: userData } = useUser();
  const user = userData?.user;
  const isLoggedIn = userData?.isLoggedIn;

  const toggleAgreeStatus = () => {
    if (agreed) {
      setAgreeCount(agreeCount - 1);
    } else {
      setAgreeCount(agreeCount + 1);
    }
    setAgreed(!agreed);
  };

  const agreePost = (postId: number) => {
    if (!isLoggedIn) {
      router.push("/sign_in");
      return;
    }
    Axios.post("api/v1/post/agreePost", {
      postId,
    }).then(
      (response) => {
        toggleAgreeStatus();
        console.log(response.data);
      },
      (error) => {
        console.log(error.response);
      }
    );
  };

  return (
    <div className={styles.action}>
      <span className={styles.action_wrapper}>
        <span
          className={styles.agree}
          onClick={(e) => {
            e.preventDefault();
            agreePost(post.id);
          }}
        >
          {agreed ? (
            <ThumbUpIcon className={styles.action_icon_agreed} />
          ) : (
            <ThumbUpOutlinedIcon className={styles.action_icon} />
          )}
          <span className={agreed ? styles.count_agreed : styles.count}>
            {agreeCount > 0 ? agreeCount : "点赞"}
          </span>
        </span>
      </span>
      <span className={styles.action_wrapper}>
        <span>
          <ModeCommentOutlinedIcon
            className={styles.action_icon}
            style={{
              fontSize: "16px",
            }}
          />
          <span className={styles.count}>
            {post.comments.length ? post.comments.length : "评论"}
          </span>
        </span>
      </span>
    </div>
  );
};

export default Widgets;
