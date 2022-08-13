import { Router } from "express";
import { QueryResult, QueryResultRow } from "pg";
import client from "../database/connect";
import authMiddleware from "../middleware/auth.middleware";
import { Req } from "../types/express.types";

const router = Router();

// /api/posts/create body{body, title}
router.post("/create", authMiddleware, async (req: Req, res: any) => {
  try {
    if (!["USER", "ADMIN"].includes(req.user.role)) {
      return res.status(403).json({ message: "Доступ запрещён" });
    }
    const { title, body } = req.body;
    const { id } = req.user;

    if (id && title) {
      const query = `INSERT INTO posts(createdat, authorid, title, body) values (now() at time zone 'utc', ${id}, $SecretTag$${title}$SecretTag$, $SecretTag$${body}$SecretTag$) RETURNING id`;
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

// /api/posts/update body{body, id}
router.put("/update", authMiddleware, async (req: Req, res: any) => {
  try {
    if (!["ADMIN"].includes(req.user.role)) {
      return res.status(403).json({ message: "Доступ запрещён" });
    }
    const { body, id: postId } = req.body;
    const { id } = req.user;

    if (id) {
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
    if (!["ADMIN"].includes(req.user.role)) {
      return res.status(403).json({ message: "Доступ запрещён" });
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

// /api/posts/saved
router.get("/saved", authMiddleware, async (req: Req, res: any) => {
  if (!["ADMIN", "USER"].includes(req.user.role)) {
    return res.status(403).json({ message: "Доступ запрещён" });
  }
  const { id } = req.user;

  const order = (req.query.order || "createdat") as string;
  const page = +(req.query.page ? req.query.page : 1) as number;

  try {
    const posts = await getPosts(
      `
    where id in
    (
      select postid as id from saved_posts 
      where userid = ${id}
    )`,
      order,
      page
    );
    const resp = posts.rows.map((row) => ({ ...row, likes: row.likes - row.dislikes }));
    res.json(resp);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ошибка при получении постов" });
  }
});

// /api/posts/search ?search=string
router.get("/search", async (req: Req, res: any) => {
  const { search = "" } = req.query;
  const order = (req.query.order || "createdat") as string;
  const page = +(req.query.page ? req.query.page : 1) as number;

  try {
    const posts = await getPosts(
      `
    where id in (
      select id from posts
      where to_tsvector(title) || to_tsvector(body) @@ to_tsquery($SecretTag$${search
        .toString()
        .replace(/ +/g, " ")
        .trim()
        .replace(" ", " | ")}$SecretTag$)
    )`,
      order,
      page
    );
    const resp = posts.rows.map((row) => ({ ...row, likes: row.likes - row.dislikes }));
    res.json(resp);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ошибка при получении постов" });
  }
});

// /api/posts/user/:id
router.get("/user/:id", async (req: Req, res: any) => {
  try {
    const { id } = req.params;
    const order = (req.query.order || "createdat") as string;
    const page = +(req.query.page ? req.query.page : 1) as number;

    if (id) {
      const posts = await getPosts(`where authorid = ${id}`, order, page);
      const resp = posts.rows.map((row) => ({ ...row, likes: row.likes - row.dislikes }));
      res.json(resp);
    } else {
      res.status(500).json({ message: "Ошибка при получении постов" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ошибка при получении постов" });
  }
});

// /api/posts/:id
router.get("/:id", async (req: Req, res: any) => {
  try {
    const { id } = req.params;

    if (id) {
      const post = await getPosts(`where posts.id = ${id}`);
      if (!post.rows.length) {
        return res.status(404).json({ message: "Пост не существует" });
      }
      const resp = { ...post.rows[0], likes: post.rows[0].likes - post.rows[0].dislikes };
      res.json(resp);
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
  const order = (req.query.order || "createdat") as string;
  const page = +(req.query.page ? req.query.page : 1) as number;

  try {
    const posts = await getPosts(``, order, page);
    const resp = posts.rows.map((row) => ({ ...row, likes: row.likes - row.dislikes }));
    res.json(resp);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ошибка при получении постов" });
  }
});

async function getPosts(subquery: string, order?: string, page?: number): Promise<QueryResult<QueryResultRow>> {
  const orderBy = order ? `order by ${order} DESC` : "";
  const limit = page ? `limit 10 offset ${10 * (page - 1)}` : `limit 10 offset 0`;

  const query = `
  select *,
    (select avatar
    from users
    where users.id = posts.authorid),
    (select name
    from users
    where users.id = posts.authorid),
    (select count(*) as likes
    from post_likes
    where type = 'LIKE' and posts.id = post_likes.postid),
    (select count(*) as dislikes
    from post_likes
    where type = 'DISLIKE' and posts.id = post_likes.postid),
    (select count(*) as comments
    from comments
    where posts.id = comments.pageid)
  from posts
  ${subquery}
  ${orderBy}
  ${limit}
  `;
  return await client.query(query);
}

module.exports = router;
