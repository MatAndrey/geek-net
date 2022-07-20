import { Router } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";
import client from "../database/connect";

const router = Router();

// /api/auth/register body{name, password}
router.post(
  "/register",
  [
    check("name", "Имя не должно быть короче 3 символов").isLength({ min: 3 }),
    check("password", "Пароль должен быть длиннее 5 символов").isLength({ min: 6 }),
  ],
  async (req: any, res: any) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(500).json({ message: "Некорректные данные для регистрации", errors: errors.array() });
      }

      const { name, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 8);

      const checkQuery = `SELECT name FROM users WHERE name = '${name}'`;
      const candidate = await client.query(checkQuery);
      if (candidate.rows.length) {
        return res.status(501).json({ message: "Логин занят" });
      }
      const addQuery = `INSERT INTO users(name, avatar, registratedat, password, role) VALUES ('${name}', Null, now(), '${hashedPassword}', 'USER')`; // TODO AVATAR
      await client.query(addQuery);

      return res.status(200).json({ message: "Регистрация прошла успешно" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Ошибка при регистрации" });
    }
  }
);

// /api/auth/login body{name, password}
router.post("/login", async (req: any, res: any) => {
  try {
    const query = `SELECT password, id, role, name FROM users WHERE name = '${req.body.name}'`;
    const response = await client.query(query);

    if (!response.rows.length) {
      return res.status(401).json({ message: "Пользватель не существует" });
    }

    const { password: hashedPassword, id, role, name } = response.rows[0];

    const isAuth = await bcrypt.compare(req.body.password, hashedPassword);
    const token = jwt.sign({ id }, config.get("jwtSecret"), {});

    if (isAuth) {
      res.json({ token, id, role, name });
    } else {
      res.status(401).json({ message: "Неверный пароль" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ошибка при входе" });
  }
});

module.exports = router;
