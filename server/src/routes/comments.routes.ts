import { Router } from "express";
import client from "../database/connect";
import { listToTree } from "../helpers/listToTree";
import authMiddleware from "../middleware/auth.middleware";
import { Req } from "../types/express.types";

const router = Router();

// /api/comments/create body{body, answeron, pageid}
router.post("/create", authMiddleware, async (req: Req, res: any) => {
  try {
    if (!["USER", "ADMIN"].includes(req.user.role)) {
      res.status(403).json({ message: "Доступ запрещён" });
    }
    const { answeron, body, pageid } = req.body;
    const { id } = req.user;

    if (id && body) {
      const query = `INSERT INTO comments(createdat, body, authorid, pageid, answeron) values (now(), $SecretTag$${body}$SecretTag$, ${id}, ${pageid}, ${answeron})`;
      await client.query(query);
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
      res.status(403).json({ message: "Доступ запрещён" });
    }
    const { body, id: commentId } = req.body;
    const { id } = req.user;

    if (id && body && commentId) {
      const query = `UPDATE comments SET body=$SecretTag$${body}$SecretTag$ WHERE id=${commentId}`;
      await client.query(query);
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
      res.status(403).json({ message: "Доступ запрещён" });
    }
    const { id } = req.body;

    if (id) {
      const query = `DELETE FROM comments WHERE id=${id}`;
      await client.query(query);
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
          where comment_likes.authorid = comments.authorid and type = 'LIKE' and comments.id = comment_likes.commentid),
          (select count(*) as dislikes
          from comment_likes
          where comment_likes.authorid = comments.authorid and type = 'DISLIKE' and comments.id = comment_likes.commentid)
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