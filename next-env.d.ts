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


// 注意：一旦当我们在这个文件里有引入其他的内容那么在这个文件里声明的库都不再是全局的
// 可通过将内容声明在其他以.d.ts结尾的文件中来解决
import { Session } from "next-iron-session";
import { NextApiRequest } from "next";
interface NextIronSessionRequest extends NextApiRequest {
  session:Session
}
