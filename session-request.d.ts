// 注意：一旦当我们在这个文件里有引入其他的内容那么在这个文件里声明的库都不再是全局的
// 可通过将内容声明在其他以.d.ts结尾的文件中来解决
import { Session } from "next-iron-session";
import { NextApiRequest } from "next";
interface NextIronSessionRequest extends NextApiRequest {
  session:Session
}