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
};

const PostsIndex: NextPage<Props> = (props) => {
  const { posts, total, curPage } = props;

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
            <Link href={`?curPage=${curPage - 1}`}>
              <a>上一页</a>
            </Link>
            <span>第{curPage}页</span>
            <Link href={`?curPage=${curPage + 1}`}>
              <a>下一页</a>
            </Link>
            共{total}篇博客
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
  const p1 = await connection.manager.findAndCount(Post, {
    skip: pageSize * curPage - 1,
    take: pageSize,
  });

  return {
    props: {
      posts: JSON.parse(JSON.stringify(p1[0])),
      pageSize,
      curPage,
      total: p1[1],
    },
  };
};
