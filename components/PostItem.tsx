import getRelativeTime from "utils/getRelativeTime";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import { Post } from "src/entity/Post";
import filterHtml from "utils/filterHtml";
import styles from "./PostItem.module.scss";
import Link from "next/link";

const PostItem = (props: { post: Post }) => {
  const { post } = props;

  return (
    <Link href={`/posts/${post.id}`}>
      <a>
        <div className={styles.post_item}>
          <div className={styles.tips}>
            <span className={styles.author}>{post.author.username}</span>
            <span className={styles.dividing}></span>
            <span className={styles.duration}>
              {getRelativeTime(post.updatedAt.toString())}
            </span>
          </div>
          <div>
            <h3 className={styles.title}>{post.title}</h3>
          </div>
          <div className={styles.article}>{filterHtml(post.content)}</div>
          <div className={styles.action}>
            <span className={styles.comment}>
              <span>
                <ModeCommentOutlinedIcon
                  style={{
                    fontSize: 16,
                    color: "#86909c",
                  }}
                />
                <span className={styles.count}>
                  {post.comments.length ? post.comments.length : "去看看"}
                </span>
              </span>
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default PostItem;
