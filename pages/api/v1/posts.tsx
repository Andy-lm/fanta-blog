import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { withSession } from "lib/withSession";
import { NextApiHandler, NextApiResponse } from "next";
import { Post } from "src/entity/Post";
import { NextIronSessionRequest } from "session-request";
import { User } from "src/entity/User";

const Posts: NextApiHandler = async (
  request: NextIronSessionRequest,
  response: NextApiResponse
) => {
  if (request.method === "POST") {
    const { title, content } = request.body;
    const post = new Post();
    post.title = title;
    post.content = content;
    const user = request.session.get("currentUser");
    if (!user) {
      // 401没登录
      // 403没权限
      response.statusCode = 401;
      response.end();
      return;
    }
    post.authorId = user.id;
    const connection = await getDatabaseConnection();
    const currentUser = await connection.manager.findOne(User, {
      where: {
        id: user.id,
      },
    });
    post.author = currentUser;
    await connection.manager.save(post);
    response.json(post);
  }
};
export default withSession(Posts);
