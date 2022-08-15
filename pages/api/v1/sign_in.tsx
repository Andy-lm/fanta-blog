import { withSession } from "lib/withSession";
import { NextApiHandler, NextApiResponse } from "next";
import { NextIronSessionRequest } from "session-request";
import { SignInModel } from "src/model/SignInModel";

const SignIn: NextApiHandler = async (
  request: NextIronSessionRequest,
  response: NextApiResponse
) => {
  const { username, password } = request.body;
  response.setHeader("Content-Type", "application/json;charset=utf-8");
  const signInModel = new SignInModel();
  signInModel.password = password;
  signInModel.username = username;
  await signInModel.validate();
  if (signInModel.hasErrors()) {
    response.statusCode = 422;
    response.write(JSON.stringify(signInModel.errors));
    response.end();
  } else {
    request.session.set("currentUser", signInModel.user);
    await request.session.save();
    response.statusCode = 200;
    response.write(JSON.stringify(signInModel.user));
    response.end();
  }
};

export default withSession(SignIn);
