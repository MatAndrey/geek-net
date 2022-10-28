import ws from "ws";
import jwt from "jsonwebtoken";
import config from "config";
import client from "../database/connect";

export const wsServer = new ws.Server({ noServer: true, path: "/ws/chat" });

interface ChatUser {
  connection: ws.WebSocket;
  id?: number;
}

interface WSMessage {
  type: "message";
  data: string;
  token: string;
}

interface UserChatInfo {
  name: string;
  avatar: string;
}

const users: ChatUser[] = [];

wsServer.on("connection", async (socket) => {
  const user = {
    connection: socket,
  };
  users.push(user);

  socket.on("message", async (messageBuffer) => {
    const message: WSMessage = JSON.parse(messageBuffer.toString());

    if (message.type === "message" && message.token !== "") {
      jwt.verify(message.token, config.get("jwtSecret"), async (err, decoded) => {
        if (err) {
          return socket.close();
        }

        if (decoded && typeof decoded === "object") {
          const userInfo = await getUserChatInfo(decoded.id);
          const returnMessage = JSON.stringify({
            ...userInfo,
            authorid: decoded.id,
            type: message.type,
            data: message.data,
            createdAt: Date.now(),
          });
          for (let user of users) {
            user.connection.send(returnMessage);
          }
        }
      });
    }
  });

  socket.on("close", function () {
    const id = users.indexOf(user);
    users.splice(id, 1);
  });
});

export function upgrageServer(request: any, socket: any, head: any) {
  wsServer.handleUpgrade(request, socket, head, (socket) => {
    wsServer.emit("connection", socket, request);
  });
}

async function getUserChatInfo(id: number): Promise<UserChatInfo> {
  const query = `SELECT name, avatar FROM users WHERE id=$1`;
  const response = await client.query(query, [id]);
  return {
    name: response.rows[0].name,
    avatar: response.rows[0].avatar,
  };
}
