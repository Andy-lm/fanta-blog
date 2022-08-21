import { withSession } from "lib/withSession";
import { NextApiHandler, NextApiResponse } from "next";
import { NextIronSessionRequest } from "session-request";

const signOut: NextApiHandler = async (
  request: NextIronSessionRequest,
  response: NextApiResponse
) => {
  request.session.destroy();
  response.json({
    isLoggedIn: false,
  });
};

export default withSession(signOut);
