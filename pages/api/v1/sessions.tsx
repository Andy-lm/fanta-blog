import { withSession } from "lib/withSession";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import { SignIn } from "src/model/SignIn";

interface NextIronSessionRequest extends NextApiRequest {
  session:Session
}

const Sessions: NextApiHandler = async (
  request: NextIronSessionRequest,
  response: NextApiResponse
) => {
  const { username, password } = request.body;
  response.setHeader("Content-Type", "application/json;charset=utf-8");
  const signIn = new SignIn();
  signIn.password = password;
  signIn.username = username;
  await signIn.validate();
  if (signIn.hasErrors()) {
    response.statusCode = 422;
    response.write(JSON.stringify(signIn.errors));
    response.end();
  } else {
    request.session.set("currentUser", signIn.user);
    await request.session.save();
    response.statusCode = 200;
    response.write(JSON.stringify(signIn.user));
    response.end();
  }
};

export default withSession(Sessions);
