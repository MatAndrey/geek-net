import client from "../database/connect";

const config = require("config");
const jwt = require("jsonwebtoken");

export default async (req: any, res: any, next: any) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    let token = req.headers.authorization.split(" ")[1];
    token = token === "null" ? null : token;

    if (!token) {
      req.user = {
        role: "UNREG",
      };
      return next();
    }

    if (token !== null) {
      const decoded = jwt.verify(token, config.get("jwtSecret"));
      req.user = decoded;

      const query = `
      SELECT role
      FROM users
      WHERE id ='${decoded.userId}'
      `;
      const role = (await client.query(query)).rows[0].role;
      req.user.role = role;
      next();
    }
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: "Нет авторизации" });
  }
};
