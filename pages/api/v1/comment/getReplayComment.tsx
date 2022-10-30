import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { NextApiHandler, NextApiResponse } from "next";
import { NextIronSessionRequest } from "session-request";
import { Comment } from "src/entity/Comment";
import getComment from "./getComment";

/**
 * 将从数据库获取来的comment进行再次组装为嵌套格式
 * @param commentList
 * @returns
 */
function formatCommentList(commentList: Comment[]) {
  const replayToPostComment = [];
  for (let i = 0; i < commentList.length; i++) {
    if (commentList[i].parentId === 0) {
      replayToPostComment.push(commentList.splice(i, 1).pop());
      i--;
    }
  }

  for (let i = 0; i < replayToPostComment.length; i++) {
    for (let j = 0; j < commentList.length; j++) {
      if (commentList[j].parentId === replayToPostComment[i].id) {
        if (replayToPostComment[i].children) {
          replayToPostComment[i].children.push(commentList.splice(j, 1).pop());
        } else {
          replayToPostComment[i].children = commentList.splice(j, 1);
        }
        j--;
      }
    }
  }

  return replayToPostComment;
}

const getReplayComment: NextApiHandler = async (
  request: NextIronSessionRequest,
  response: NextApiResponse
) => {
  const { postId, parentId } = request.query;
  const connection = await getDatabaseConnection();
  const replayComments = await connection.manager.find(Comment, {
    where: {
      postId: parseInt(postId as string),
      parentId: parseInt(parentId as string),
    },
    order: {
      updatedAt: "ASC",
    },
  });

  response.statusCode = 200;
  response.json({
    data: replayComments,
    status: "success",
    message: "OK",
    errors: [],
  });
};

export default getReplayComment;
