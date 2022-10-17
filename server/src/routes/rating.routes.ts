import { response, Router } from "express";
import client from "../database/connect";
import authMiddleware from "../middleware/auth.middleware";
import { Req } from "../types/express.types";

const router = Router();

// /api/rating/posts body{type, postId}
router.post("/posts", authMiddleware, async (req: Req, res: any) => {
  try {
    if (!["USER", "ADMIN"].includes(req.user.role)) {
      return res.status(403).json({ message: "Доступ запрещён" });
    }
    const { type, postId } = req.body;
    const { id } = req.user;

    if (id && type && postId) {
      const delQuery = `delete from post_likes where authorid=$1 and postid=$2`;
      const resp = await client.query(delQuery, [id, postId]);

      if (resp.rowCount === 0) {
        const query = `INSERT INTO post_likes(type, authorid, postid) values ($1, $2, $3)`;
        await client.query(query, [type, id, postId]);
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
      const delQuery = `delete from comment_likes where authorid=$1 and commentid=$1`;
      const resp = await client.query(delQuery, [id, commentid]);

      if (resp.rowCount === 0) {
        const query = `INSERT INTO comment_likes(type, authorid, commentid) values ($1, $2, $3)`;
        await client.query(query, [type, id, commentid]);
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
      const delQuery = `delete from saved_posts where userid=$1 and postid=$2`;
      const resp = await client.query(delQuery, [id, postid]);

      if (resp.rowCount === 0) {
        const query = `INSERT INTO saved_posts(userid, postid) values ($1, $2)`;
        await client.query(query, [id, postid]);
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
