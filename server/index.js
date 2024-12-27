const express = require("express");
const app = express();
const WSserver = require("express-ws")(app);
const aWss = WSserver.getWss();

const PORT = process.env.PORT || 5000;

app.ws("/", (ws, req) => {
  ws.on("message", (msg) => {
    const jsonMsg = JSON.parse(msg);
    switch (jsonMsg.method) {
      case "connection":
        connectionHandler(ws, jsonMsg);
        break;
      case "draw":
        broadcastConnection(ws, jsonMsg);
        break;
    }
  });
});

app.listen(PORT, () => console.log("server started on PORT: ", PORT));

const connectionHandler = (ws, msg) => {
  ws.id = msg.id;
  broadcastConnection(ws, msg);
};

const broadcastConnection = (ws, msg) => {
  aWss.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(JSON.stringify(msg));
    }
  });
};
