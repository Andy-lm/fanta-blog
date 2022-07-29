import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { withSession } from "lib/withSession";
import { NextApiHandler, NextApiResponse} from "next";
import { Post } from "src/entity/Post";
import { NextIronSessionRequest } from "next-env";


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
    post.authorId = user.id;
    const connection = await getDatabaseConnection();
    await connection.manager.save(post);
    response.json(post);
  }
};
export default withSession(Posts);
