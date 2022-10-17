import { Router } from "express";
import client from "../database/connect";
import { listToTree } from "../helpers/listToTree";
import authMiddleware from "../middleware/auth.middleware";
import { Req } from "../types/express.types";

const router = Router();

// /api/comments/create body{body, answeron, pageId}
router.post("/create", authMiddleware, async (req: Req, res: any) => {
  try {
    if (!["USER", "ADMIN"].includes(req.user.role)) {
      return res.status(403).json({ message: "Доступ запрещён" });
    }
    const { answeron, body, pageId } = req.body;
    const { id } = req.user;

    if (id && body) {
      const query = `INSERT INTO comments(createdat, body, authorid, pageid, answeron) values (now() at time zone 'utc', $1, $2, $3, $4)`;
      await client.query(query, [body, id, pageId, answeron]);
      res.status(200).json({ message: "Комментарий успешно опубликован" });
    } else {
      res.status(500).json({ message: "Ошибка при создании комментария" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ошибка при создании комментария" });
  }
});

// /api/comments/update body{id, body}
router.put("/update", authMiddleware, async (req: Req, res: any) => {
  try {
    if (!["USER", "ADMIN"].includes(req.user.role)) {
      return res.status(403).json({ message: "Доступ запрещён" });
    }
    const { body, id: commentId } = req.body;
    const { id } = req.user;

    if (id && body && commentId) {
      const query = `UPDATE comments SET body=$1 WHERE id=$2`;
      await client.query(query, [body, commentId]);
      res.status(200).json({ message: "Комментарий успешно обновлён" });
    } else {
      res.status(500).json({ message: "Ошибка при обновлении комментарий" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ошибка при обновлении комментарий" });
  }
});

// /api/comments/delete body{id}
router.delete("/delete", authMiddleware, async (req: Req, res: any) => {
  try {
    if (!["USER", "ADMIN"].includes(req.user.role)) {
      return res.status(403).json({ message: "Доступ запрещён" });
    }
    const { id } = req.body;

    if (id) {
      const query = `DELETE FROM comments WHERE id=$1`;
      await client.query(query, [id]);
      res.status(200).json({ message: "Коментарий успешно удалён" });
    } else {
      res.status(500).json({ message: "Ошибка при удалении комментария" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ошибка при удалении комментария" });
  }
});

// /api/comments/:pageId
router.get("/:pageId", async (req: Req, res: any) => {
  try {
    const { pageId } = req.params;

    if (pageId) {
      const query = `
        select *,
          (select avatar
          from users
          where users.id = comments.authorid),
          (select name
          from users
          where users.id = comments.authorid),
          (select count(*) as likes
          from comment_likes
          where type = 'LIKE' and comments.id = comment_likes.commentid),
          (select count(*) as dislikes
          from comment_likes
          where type = 'DISLIKE' and comments.id = comment_likes.commentid)
        from comments
        where comments.pageid = ${pageId}
      `;
      const comments = await client.query(query);
      const resp = comments.rows.map((row) => ({ ...row, likes: row.likes - row.dislikes }));
      const tree = listToTree(resp);

      res.json(tree);
    } else {
      res.status(500).json({ message: "Ошибка при получении поста" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ошибка при получении поста" });
  }
});

module.exports = router;
