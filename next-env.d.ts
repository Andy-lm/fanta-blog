/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "*.png" {
  const value: string;
  export default value;
}

type Post = {
  id: string;
  date: string;
  title: string;
  content: string;
  htmlContent: string;
};

type FormFields = {
  label: string;
  type: "text" | "password" | "textarea";
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  errors: string[];
};

import { Session } from "next-iron-session";
import { NextApiRequest } from "next";
interface NextIronSessionRequest extends NextApiRequest {
  session:Session
}
