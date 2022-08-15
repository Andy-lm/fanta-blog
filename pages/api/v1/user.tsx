import { withSession } from "lib/withSession";
import { NextApiResponse } from "next";
import { NextIronSessionRequest } from "session-request";


async function UserState(
  request: NextIronSessionRequest,
  response: NextApiResponse
) {
  const user = request.session.get("currentUser");
  if (user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    response.json({
      user,
      isLoggedIn: true,
    });
  } else {
    response.json({
      isLoggedIn: false,
    });
  }
}

export default withSession(UserState);
