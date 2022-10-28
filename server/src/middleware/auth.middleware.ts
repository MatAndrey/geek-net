import client from "../database/connect";

const config = require("config");
const jwt = require("jsonwebtoken");

export default async (req: any, res: any, next: any) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    if (!req.headers.authentication) {
      req.user = {
        role: "GUEST",
      };
      next();
    } else {
      let token = req.headers.authentication.split(" ")[1];
      token = token === "null" ? null : token;

      const decoded = jwt.verify(token, config.get("jwtSecret"));
      req.user = decoded;
      next();
    }
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: "Нет авторизации" });
  }
};
