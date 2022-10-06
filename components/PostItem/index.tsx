import getRelativeTime from "utils/getRelativeTime";
import { Post } from "src/entity/Post";
import filterHtml from "utils/filterHtml";
import Widgets from "./Widgets";
import Link from "next/link";
import styles from "./index.module.scss";

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
          <div className={styles.article}>
            {filterHtml(post.content).slice(0, 150)}
          </div>
          <Widgets post={post} />
        </div>
      </a>
    </Link>
  );
};

export default PostItem;
