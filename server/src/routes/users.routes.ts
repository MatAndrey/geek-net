import { Router } from "express";
import client from "../database/connect";
import authMiddleware from "../middleware/auth.middleware";
import { Req } from "../types/express.types";

const router = Router();

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
