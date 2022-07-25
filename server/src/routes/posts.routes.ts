import { Router } from "express";
import client from "../database/connect";
import authMiddleware from "../middleware/auth.middleware";
import { Req } from "../types/express.types";

const router = Router();

// /api/posts/create body{body, title}
router.post("/create", authMiddleware, async (req: Req, res: any) => {
  try {
    if (!["USER", "ADMIN"].includes(req.user.role)) {
      res.status(403).json({ message: "Доступ запрещён" });
    }
    const { title, body } = req.body;
    const { id } = req.user;

    if (id && title) {
      const query = `INSERT INTO posts(createdat, authorid, title, body) values (now(), ${id}, $SecretTag$${title}$SecretTag$, $SecretTag$${body}$SecretTag$) RETURNING id`;
      const response = await client.query(query);
      res.status(200).json({ message: "Пост успешно опубликован", id: response.rows[0].id });
    } else {
      res.status(500).json({ message: "Ошибка при создании поста" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ошибка при создании поста" });
  }
});

// /api/posts/update body{body, title, id}
router.put("/update", authMiddleware, async (req: Req, res: any) => {
  try {
    if (!["USER", "ADMIN"].includes(req.user.role)) {
      res.status(403).json({ message: "Доступ запрещён" });
    }
    const { title, body, id: postId } = req.body;
    const { id } = req.user;

    if (id && title) {
      const query = `UPDATE posts SET body=$SecretTag$${body}$SecretTag$ WHERE id=${postId}`;
      await client.query(query);
      res.status(200).json({ message: "Пост успешно обновлён" });
    } else {
      res.status(500).json({ message: "Ошибка при обновлении поста" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ошибка при обновлении поста" });
  }
});

// /api/posts/delete body{id}
router.delete("/delete", authMiddleware, async (req: Req, res: any) => {
  try {
    if (!["USER", "ADMIN"].includes(req.user.role)) {
      res.status(403).json({ message: "Доступ запрещён" });
    }
    const { id } = req.body;

    if (id) {
      const query = `DELETE FROM posts WHERE id=${id}`;
      await client.query(query);
      res.status(200).json({ message: "Пост успешно удалён" });
    } else {
      res.status(500).json({ message: "Ошибка при удалении поста" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ошибка при удалении поста" });
  }
});

// /api/posts/:id
router.get("/:id", async (req: Req, res: any) => {
  try {
    const { id } = req.params;

    if (id) {
      const query = `SELECT * FROM posts WHERE id=${id}`;
      const post = await client.query(query);
      res.json({ ...post.rows[0] });
    } else {
      res.status(500).json({ message: "Ошибка при получении поста" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ошибка при получении поста" });
  }
});

// /api/posts/
router.get("/", async (req: Req, res: any) => {
  try {
    const query = `SELECT * FROM posts`;
    const posts = await client.query(query);
    res.json(posts.rows);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ошибка при получении постов" });
  }
});

module.exports = router;
