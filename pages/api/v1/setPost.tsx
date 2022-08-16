import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { withSession } from "lib/withSession";
import { NextApiHandler, NextApiResponse } from "next";
import { Post } from "src/entity/Post";
import { NextIronSessionRequest } from "session-request";
import { User } from "src/entity/User";

const setPost: NextApiHandler = async (
  request: NextIronSessionRequest,
  response: NextApiResponse
) => {
  if (request.method === "POST") {
    const user = request.session.get("currentUser");
    if (!user) {
      // 401没登录
      // 403没权限
      response.statusCode = 401;
      response.end();
      return;
    }
    const { title, content, id } = request.body;
    const connection = await getDatabaseConnection();
    if (!id) {
      console.log(id);
      const post = new Post();
      post.title = title;
      post.content = content;
      post.authorId = user.id;
      const currentUser = await connection.manager.findOne(User, {
        where: {
          id: user.id,
        },
      });
      post.author = currentUser;
      await connection.manager.save(post);
      response.json(post);
    } else {
      const post = await connection.manager.findOne(Post, {
        where: id,
      });
      if (!post) {
        response.statusCode = 404;
        response.write(JSON.stringify({ post: ["修改资源未找到"] }));
        response.end();
      } else {
        post.title = title;
        post.content = content;
        await connection.manager.save(post);
        response.json(post);
      }
    }
  }
};
export default withSession(setPost);
