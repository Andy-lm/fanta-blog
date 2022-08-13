import { NextApiHandler } from "next";
import fs, { promises as fsPromise } from "fs";
import path from "path";

const fsPath = path.join(process.cwd(), "public/demo.html");

const getCKEdit: NextApiHandler = async (request, response) => {
  if (request.method === "GET") {
    const file = await fsPromise.readFile(fsPath, "utf-8");
    if (file) {
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/html");
      response.end(file);
    }
  }
};

export default getCKEdit;
