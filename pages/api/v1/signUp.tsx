import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "src/entity/User";

const SignUp = async (request: NextApiRequest, response: NextApiResponse) => {
  const body = request.body;
  const { username, password, passwordConfirmation } = body;
  // 连接数据库
  const connection = await getDatabaseConnection();
  response.setHeader("Content-Type", "application/json");
  const user = new User();
  user.username = username;
  user.password = password;
  user.passwordConfirmation = passwordConfirmation;
  await user.validate(connection);
  if (user.hasErrors()) {
    response.statusCode = 422; // 422 状态码表示服务器理解请求实体的内容类型，并且请求实体的语法是正确的，但是服务器无法处理所包含的指令，用于密码不一致很适合
    response.write(JSON.stringify(user.errors));
  } else {
    await connection.manager.save(user);
    response.statusCode = 200;
    // 这里出于保密考虑用户的密码、passwordDigest不会返回给前端，同样可以使用lodash的_omit方法实现
    response.write(JSON.stringify(user));
  }
  response.end();
};

export default SignUp;
