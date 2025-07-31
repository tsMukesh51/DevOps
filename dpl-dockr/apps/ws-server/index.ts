import { prismaClient } from "db";

Bun.serve({
  port: 8080,
  fetch(req, server) {
    // upgrade the request to a WebSocket
    if (server.upgrade(req)) {
      return; // do not return a Response
    }
    return new Response("Upgrade failed", { status: 500 });
  },
  websocket: {
    async message(ws, message) {
      if (message === "getUser") {
        const randNum = Math.floor(Math.random() * 10);
        const user = await prismaClient.user.findFirst({ where: { id: randNum } });
        if (!user)
          ws.send("User not found");
        else
          ws.send(JSON.stringify(user));
      } else {
        ws.send("Hi, what do you want?");
      }
    },
  },
});