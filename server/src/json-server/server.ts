const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));

// const middlewares = jsonServer.defaults({ static: path.join(__dirname, "..", "..", "client", "build") });
// server.use(middlewares);

server.use((req: any, res: any, next: any) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

server.use(router);
server.listen(5001, () => {
  console.log("JSON Server is running http://localhost:5001");
});
