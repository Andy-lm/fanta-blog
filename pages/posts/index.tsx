import { GetServerSideProps, NextPage } from "next";
import { getDatabaseConnection } from "lib/getDatabaseConnection";
import Link from "next/link";
import { Post } from "src/entity/Post";
import queryString from "query-string";

type Props = {
  posts: Post[];
  pageSize: number;
  curPage: number;
  total: number;
  totalPage: number;
};

const PostsIndex: NextPage<Props> = (props) => {
  const { posts, total, curPage, totalPage } = props;

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
        <div>
          <span>
            共{total}篇文章，当前是第{curPage}/{totalPage}页
            {curPage > 1 && (
              <Link href={`?curPage=${curPage - 1}`}>
                <a>上一页</a>
              </Link>
            )}
            {curPage !== totalPage && (
              <Link href={`?curPage=${curPage + 1}`}>
                <a>下一页</a>
              </Link>
            )}
          </span>
        </div>
      </footer>
    </div>
  );
};
export default PostsIndex;

// getServerSideProps会在请求来的时候运行一次
export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlObj = queryString.parseUrl(context.req.url);
  let curPage = parseInt(urlObj.query["curPage"]?.toString() || "1");
  curPage = curPage <= 0 ? 1 : curPage;
  const pageSize = 3;
  let connection = await getDatabaseConnection();
  const [posts, count] = await connection.manager.findAndCount(Post, {
    skip: (curPage - 1) * pageSize,
    take: pageSize,
  });

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      pageSize,
      curPage,
      total: count,
      totalPage: Math.ceil(count / pageSize),
    },
  };
};
