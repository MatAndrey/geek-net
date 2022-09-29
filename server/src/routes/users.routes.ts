import { Router } from "express";
import bcrypt from "bcrypt";
import client from "../database/connect";
import authMiddleware from "../middleware/auth.middleware";
import { Req } from "../types/express.types";

const router = Router();

// /api/users/update {name, password, avatar, oldPassword}
router.put("/update", authMiddleware, async (req: Req, res: any) => {
  try {
    if (!["USER", "ADMIN"].includes(req.user.role)) {
      return res.status(403).json({ message: "Доступ запрещён" });
    }

    const { name, password, avatar, oldPassword } = req.body;
    const { id } = req.user;

    const hashedPassword = (await client.query(`SELECT password FROM users WHERE id = ${id}`)).rows[0].password;
    const isAuth = await bcrypt.compare(oldPassword, hashedPassword);

    if (!isAuth) {
      return res.status(403).json({ message: "Нет авторизации" });
    }
    const newPassword = await bcrypt.hash(password, 8);

    const query = `UPDATE users SET 
    ${name === "" ? "" : `name=$SecretTag$${name}$SecretTag$,`} 
    ${password === "" ? "" : `password=$SecretTag$${newPassword}$SecretTag$,`} 
    avatar=$SecretTag$${avatar}$SecretTag$ 
    WHERE id=${id}`;
    await client.query(query);
    res.status(200).json({ message: "Информация успешно изменена" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ошибка при изменении пользователя" });
  }
});

// /api/users/
router.get("/:id", async (req: Req, res: any) => {
  try {
    const { id } = req.params;

    const query = `SELECT name, avatar, registratedat FROM users WHERE id = ${id}`;
    const response = await client.query(query);
    res.status(200).json(response.rows[0]);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ошибка при получении пользователя" });
  }
});

module.exports = router;
