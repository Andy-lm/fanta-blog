import { withIronSession } from "next-iron-session";
import { NextApiHandler } from "next";

export function withSession(handler: NextApiHandler) {
  return withIronSession(handler, {
    // password: process.env.SECRET_COOKIE_PASSWORD,
    password: "35e25519-d518-4468-8d9e-47d87ff0f812",
    cookieName: "blog",
    cookieOptions: { secure: false },
  });
}
