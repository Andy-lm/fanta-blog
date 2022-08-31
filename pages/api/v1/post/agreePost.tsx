import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { withSession } from "lib/withSession";
import { NextApiHandler, NextApiResponse } from "next";
import { NextIronSessionRequest } from "session-request";
import { Agree } from "src/entity/Agree";
import { AgreeCount } from "src/entity/AgreeCount";
import { EntityManager } from "typeorm";

/**
 * 更新agreeCount表中文章的点赞数据
 * @param manager
 * @param postId
 * @param type
 */
const updateAgreeCount = async (
  manager: EntityManager,
  postId: number,
  type: "add" | "sub"
) => {
  const currentAgreeCount = await manager.findOneBy(AgreeCount, {
    postId,
  });
  if (!currentAgreeCount) {
    const newCount = new AgreeCount();
    newCount.postId = postId;
    newCount.count = 1;
    await manager.save(newCount);
  } else {
    const updatedCount =
      type === "add"
        ? currentAgreeCount.count * 1 + 1
        : currentAgreeCount.count * 1 - 1;
    // 防止由于更新失误导致点赞数为0
    currentAgreeCount.count = updatedCount > 0 ? updatedCount : 0;
    await manager.save(currentAgreeCount);
  }
};

const agreePost: NextApiHandler = async (
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
  const { postId } = request.body;
  const connection = await getDatabaseConnection();
  const agree = await connection.manager.findOneBy(Agree, {
    userIdToPostId: `${user.id}::${postId}`,
  });
  // 如果没有点赞过则增加一条点赞记录
  if (!agree) {
    const newAgree = new Agree();
    newAgree.postId = postId;
    newAgree.agreeStatus = 1;
    newAgree.userId = user.id;
    newAgree.userIdToPostId = `${user.id}::${postId}`;
    // 保存该条点赞记录
    await connection.manager.save(newAgree);
    await updateAgreeCount(connection.manager, postId, "add");
    response.statusCode = 200;
    response.json({
      data: null,
      status: "success",
      message: "OK",
      errors: [],
    });
  } else {
    const result = await connection.manager.delete(Agree, agree.id);
    if (result.affected >= 0) {
      response.statusCode = 200;
      await updateAgreeCount(connection.manager, postId, "sub");
      response.json({
        data: null,
        status: "success",
        message: "OK",
        errors: [],
      });
    } else {
      response.statusCode = 400;
      response.json({
        data: null,
        status: "error",
        message: "Agree fail",
        errors: [],
      });
    }
  }
};

export default withSession(agreePost);
