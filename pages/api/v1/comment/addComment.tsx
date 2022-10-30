import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { NextApiHandler, NextApiResponse } from "next";
import { NextIronSessionRequest } from "session-request";
import { withSession } from "lib/withSession";
import { Comment } from "src/entity/Comment";

const addComment: NextApiHandler = async (
  request: NextIronSessionRequest,
  response: NextApiResponse
) => {
  const user = request.session.get("currentUser");
  if (!user) {
    // 401没登录
    // 403没权限
    response.statusCode = 401;
    response.end();
    return;
  }
  const { content, postId, replayId, replayUsername, parentId } = request.body;
  const connection = await getDatabaseConnection();
  const newComment = new Comment();
  newComment.commentUsername = user.username;
  newComment.content = content;
  newComment.parentId = parentId;
  newComment.replayId = replayId;
  newComment.postId = postId;
  newComment.userId = user.id;
  newComment.replayUsername = replayUsername;
  await connection.manager.save(newComment);
  response.statusCode = 200;
  response.json({
    data: newComment,
    status: "success",
    message: "OK",
    errors: [],
  });
};

export default withSession(addComment);
