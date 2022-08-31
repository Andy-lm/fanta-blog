import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { withSession } from "lib/withSession";
import { NextApiHandler, NextApiResponse } from "next";
import { Post } from "src/entity/Post";
import { NextIronSessionRequest } from "session-request";
import { User } from "src/entity/User";
import { DataSource } from "typeorm";

type FormData = {
  title: string;
  content: string;
};

type OperationType = "add" | "delete" | "update";

const add = async (
  connection: DataSource,
  response: NextApiResponse,
  formData: FormData,
  postId: number,
  user: User
) => {
  const newPost = new Post();
  newPost.title = formData.title;
  newPost.content = formData.content;
  newPost.authorId = user.id;
  const currentUser = await connection.manager.findOne(User, {
    where: {
      id: user.id,
    },
  });
  newPost.author = currentUser;
  await connection.manager.save(newPost);
  response.json(newPost);
};

const update = async (
  connection: DataSource,
  response: NextApiResponse,
  formData: FormData,
  postId: number,
  user: User
) => {
  const targetPost = await connection.manager.findOne(Post, {
    where: {
      id: postId,
    },
  });
  if (!targetPost) {
    response.statusCode = 404;
    response.write(JSON.stringify({ post: ["修改资源未找到"] }));
    response.end();
  } else {
    targetPost.title = formData.title;
    targetPost.content = formData.content;
    await connection.manager.save(targetPost);
    response.json(targetPost);
  }
};

const deletePost = async (
  connection: DataSource,
  response: NextApiResponse,
  formData: FormData,
  postId: number,
  user: User
) => {
  const result = await connection.manager.delete(Post, postId);
  response.statusCode = result.affected >= 0 ? 200 : 400;
  response.end();
};

const mapOperationTypeToHandler = {
  add,
  update,
  delete: deletePost, // delete为关键字不能作为方法名称
};

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
    const { postId, formData } = request.body;
    const operationType: OperationType = request.body.operationType;
    const connection = await getDatabaseConnection();
    const handler = mapOperationTypeToHandler[operationType];
    await handler(connection, response, formData, postId, user);
  }
};
export default withSession(setPost);
