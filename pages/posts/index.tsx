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
import { EntityManager } from "typeorm";
import { Agree } from "src/entity/Agree";
import { AgreeCount } from "src/entity/AgreeCount";

type Props = {
  posts: Post[];
  pageSize: number;
  currentPage: number;
  total: number;
  totalPage: number;
  times: number;
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
 * 生成分页参数
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
const getPosts = async (
  currentPage: number,
  pageSize: number,
  manager: EntityManager
) => {
  return await manager.findAndCount(Post, {
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

/**
 * 遍历从表中取出的posts增加isAgree以及agreeCount字段
 * @param posts
 * @param context
 * @param manager
 */
const wrapperPostData = async (
  posts: Post[],
  context: GetServerSidePropsContext,
  manager: EntityManager
) => {
  // @ts-ignore
  const currentUser = context.req.session.get("currentUser");
  const userId = currentUser?.id;
  for (let post of posts) {
    // 获取当前用户对文章的点赞状态，post增加isAgree字段
    if (currentUser) {
      const agreeStatus = await manager.findOneBy(Agree, {
        userIdToPostId: `${userId}::${post.id}`,
      });
      if (agreeStatus) {
        post.isAgree = true;
      }
    }
    // 获取当前文章的点赞总数，post增加agreeCount字段
    const currentAgreeCount = await manager.findOneBy(AgreeCount, {
      postId: post.id,
    });
    post.agreeCount = currentAgreeCount ? currentAgreeCount.count : 0;
  }
};

/**
 * getServerSideProps会在请求来的时候运行一次
 */
export const getServerSideProps: GetServerSideProps = withSession(
  async (context: GetServerSidePropsContext) => {
    const start = new Date().valueOf();
    const { currentPage, pageSize } = getPageOptions(context);
    let connection = await getDatabaseConnection();
    const [posts, count] = await getPosts(
      currentPage,
      pageSize,
      connection.manager
    );
    await wrapperPostData(posts, context, connection.manager);
    const end = new Date().valueOf();
    return {
      props: {
        posts: JSON.parse(JSON.stringify(posts)),
        pageSize,
        currentPage,
        total: count,
        totalPage: Math.ceil(count / pageSize),
        times: end - start,
      },
    };
  }
);
