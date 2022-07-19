import express, { Response, Request, Express } from "express";
import config from "config";
import path from "path";
import jsonServer from "json-server";

const app: Express = express();

app.use(express.json());

app.use("/api/auth/", require("./routes/auth.routes"));
// app.use("/api/posts/", require("./routes/posts.routes"));
// app.use("/api/comments/", require("./routes/comments.routes"));

app.use("/api", jsonServer.router(path.join(__dirname, "json-server", "db.json")));

if (process.env.NODE_MOD === "production") {
  app.use("/", express.static(path.join("../../client", "build")));
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.resolve("../../client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || config.get("port") || 5000;

async function start() {
  try {
    app.listen(PORT, () => console.log("Server was started on " + PORT));
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

start();
