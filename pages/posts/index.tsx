import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { Post } from "src/entity/Post";
import { withSession } from "lib/withSession";
import queryString from "query-string";
import usePager from "hooks/usePager";
import styles from "./index.module.scss";
import PostItem from "components/PostItem";
import Nav from "components/Nav";
import Users from "components/Users";

type Props = {
  posts: Post[];
  pageSize: number;
  currentPage: number;
  total: number;
  totalPage: number;
};

const PostsIndex: NextPage<Props> = (props) => {
  const { posts, total, currentPage, totalPage } = props;
  const { pager } = usePager({ currentPage, totalPage, total });

  return (
    <>
      <Nav extraRight={[<Users />]} />
      <div className={styles.wrapper}>
        <div style={{ height: "10px" }}></div>
        <div className={styles.content}>
          {posts.length > 0 &&
            posts.map((post) => {
              return <PostItem post={post} key={post.id}></PostItem>;
            })}
          <br />
          <hr />
          <footer>
            <div>{pager}</div>
          </footer>
        </div>
      </div>
    </>
  );
};
export default PostsIndex;

/**
 * 获取分页参数
 * @param context
 * @returns
 */
const getPageOptions = (context: GetServerSidePropsContext) => {
  const urlObj = queryString.parseUrl(context.req.url);
  let currentPage = parseInt(urlObj.query["currentPage"]?.toString() || "1");
  currentPage = currentPage <= 0 ? 1 : currentPage;
  // 分页数量
  const pageSize = 999;
  return {
    pageSize,
    currentPage,
  };
};

/**
 * 分页获取博客
 * @param currentPage
 * @param pageSize
 * @returns
 */
const getPosts = async (currentPage: number, pageSize: number) => {
  let connection = await getDatabaseConnection();
  return await connection.manager.findAndCount(Post, {
    relations: {
      author: true,
      comments: true,
    },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
    order: {
      updatedAt: "DESC", // 按时间升序排列
    },
  });
};

// getServerSideProps会在请求来的时候运行一次
export const getServerSideProps: GetServerSideProps = withSession(
  async (context: GetServerSidePropsContext) => {
    const { currentPage, pageSize } = getPageOptions(context);
    const [posts, count] = await getPosts(currentPage, pageSize);

    return {
      props: {
        posts: JSON.parse(JSON.stringify(posts)),
        pageSize,
        currentPage,
        total: count,
        totalPage: Math.ceil(count / pageSize),
      },
    };
  }
);
