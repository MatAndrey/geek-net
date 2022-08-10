import { response, Router } from "express";
import client from "../database/connect";
import authMiddleware from "../middleware/auth.middleware";
import { Req } from "../types/express.types";

const router = Router();

// /api/rating/posts body{type, postid}
router.post("/posts", authMiddleware, async (req: Req, res: any) => {
  try {
    if (!["USER", "ADMIN"].includes(req.user.role)) {
      return res.status(403).json({ message: "Доступ запрещён" });
    }
    const { type, postid } = req.body;
    const { id } = req.user;

    if (id && type && postid) {
      const delQuery = `delete from post_likes where authorid=${id} and postid =${postid}`;
      const resp = await client.query(delQuery);

      if (resp.rowCount === 0) {
        const query = `INSERT INTO post_likes(type, authorid, postid) values ('${type}', ${id}, ${postid})`;
        await client.query(query);
      }

      res.status(200).json({ message: "Рейтинг успешно изменён" });
    } else {
      res.status(500).json({ message: "Ошибка при изменении рейтинга" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ошибка при изменении рейтинга" });
  }
});

// /api/rating/comments body{type, commentid}
router.post("/comments", authMiddleware, async (req: Req, res: any) => {
  try {
    if (!["USER", "ADMIN"].includes(req.user.role)) {
      return res.status(403).json({ message: "Доступ запрещён" });
    }
    const { type, commentid } = req.body;
    const { id } = req.user;

    if (id && type && commentid) {
      const delQuery = `delete from comment_likes where authorid=${id} and commentid =${commentid}`;
      const resp = await client.query(delQuery);

      if (resp.rowCount === 0) {
        const query = `INSERT INTO comment_likes(type, authorid, commentid) values ('${type}', ${id}, ${commentid})`;
        await client.query(query);
      }
      res.status(200).json({ message: "Рейтинг успешно изменён" });
    } else {
      res.status(500).json({ message: "Ошибка при изменении рейтинга" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ошибка при изменении рейтинга" });
  }
});

// /api/rating/save-post body{postid}
router.post("/save-post", authMiddleware, async (req: Req, res: any) => {
  try {
    if (!["USER", "ADMIN"].includes(req.user.role)) {
      return res.status(403).json({ message: "Доступ запрещён" });
    }
    const { postid } = req.body;
    const { id } = req.user;

    if (id && postid) {
      const delQuery = `delete from saved_posts where userid=${id} and postid =${postid}`;
      const resp = await client.query(delQuery);

      if (resp.rowCount === 0) {
        const query = `INSERT INTO saved_posts(userid, postid) values ('${id}', ${postid})`;
        await client.query(query);
      }
      res.status(200).json({ message: "Пост успешно сохранён" });
    } else {
      res.status(500).json({ message: "Ошибка при сохранении поста" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ошибка при сохранении поста" });
  }
});

module.exports = router;
