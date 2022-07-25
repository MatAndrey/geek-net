const express = require("express");
import config from "config";
import path from "path";
import jsonServer from "json-server";

const app = express();

app.use(express.json());

app.use("/api/auth/", require("./routes/auth.routes"));
app.use("/api/posts/", require("./routes/posts.routes"));
app.use("/api/comments/", require("./routes/comments.routes"));

app.use("/api", jsonServer.router(path.join(__dirname, "json-server", "db.json")));

app.use(express.static(path.join(__dirname, "..", "..", "client", "build")));
app.get("*", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "..", "..", "client", "build", "index.html"));
});

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
