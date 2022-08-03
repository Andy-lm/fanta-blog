import { GetServerSideProps, NextPage } from "next";
import { getDatabaseConnection } from "lib/getDatabaseConnection";
import Link from "next/link";
import { Post } from "src/entity/Post";
import queryString from "query-string";
import usePager from "hooks/usePager";

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
    <div>
      <h1>文章列表</h1>
      {posts.length > 0 &&
        posts.map((post) => {
          return (
            <div key={post.id}>
              <Link href={`posts/${post.id}`}>
                <a>{post.title}</a>
              </Link>
            </div>
          );
        })}
      <br />
      <hr />
      <footer>
        <div>{pager}</div>
      </footer>
    </div>
  );
};
export default PostsIndex;

// getServerSideProps会在请求来的时候运行一次
export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlObj = queryString.parseUrl(context.req.url);
  let currentPage = parseInt(urlObj.query["currentPage"]?.toString() || "1");
  currentPage = currentPage <= 0 ? 1 : currentPage;
  const pageSize = 3;
  let connection = await getDatabaseConnection();
  const [posts, count] = await connection.manager.findAndCount(Post, {
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      pageSize,
      currentPage,
      total: count,
      totalPage: Math.ceil(count / pageSize),
    },
  };
};
