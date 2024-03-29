import { Router } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";
import client from "../database/connect";
import { Req } from "../types/express.types";
const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || config.get("jwtSecret");

// /api/auth/register body{name, password}
router.post(
  "/signup",
  [
    check("name", "Имя не должно быть короче 2 символов").isLength({ min: 2 }),
    check("password", "Пароль должен быть длиннее 5 символов").isLength({ min: 6 }),
  ],
  async (req: Req, res: any) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(500).json({ message: "Некорректные данные для регистрации", errors: errors.array() });
      }

      const { name, password, avatar } = req.body;

      const hashedPassword = await bcrypt.hash(password, 8);

      const checkQuery = `SELECT name FROM users WHERE name = '${name}'`;
      const candidate = await client.query(checkQuery);
      if (candidate.rows.length) {
        return res.status(501).json({ message: "Логин занят" });
      }
      const addQuery = `INSERT INTO users(name, avatar, registratedat, password, role) VALUES ($1, $2, now(), $3, 'USER')`;
      await client.query(addQuery, [name, avatar, hashedPassword]);

      login(req, res);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Ошибка при регистрации" });
    }
  }
);

// /api/auth/login body{name, password, remember}
router.post("/login", login);

async function login(req: Req, res: any) {
  try {
    const query = `SELECT password, id, role, name, avatar FROM users WHERE name = $1`;
    const response = await client.query(query, [req.body.name]);

    if (!response.rows.length) {
      return res.status(401).json({ message: "Пользватель не существует" });
    }

    if (!JWT_SECRET) {
      console.log("JWT_SECRET Does not exist");
      return res.status(500).json({ message: "Ошибка при входе" });
    }

    const { password: hashedPassword, id, role, name, avatar } = response.rows[0];

    const isAuth = await bcrypt.compare(req.body.password, hashedPassword);
    let token;
    if (req.body.remember === true) {
      token = jwt.sign({ id, role }, JWT_SECRET);
    } else {
      token = jwt.sign({ id, role }, JWT_SECRET, { expiresIn: "2h" });
    }

    if (isAuth) {
      res.json({ token, id, role, name, avatar });
    } else {
      res.status(401).json({ message: "Неверный пароль" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ошибка при входе" });
  }
}

module.exports = router;
