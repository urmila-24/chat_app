import express, { Express } from "express";
import http from "http";
import cors from "cors";
import { Socket } from "socket.io";

const App: Express = express();
const server = http.createServer(App);
const IO: Socket = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

App.use(cors());

const PORT: string | number = process.env.PORT || 5000;

App.get("/", (req, res) => {
  res.send("Server is running");
});

IO.on("connection", (socket: Socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callended");
  });

  socket.on("calluser", ({ userToCall, signalData, from, name }) => {
    IO.to(userToCall).emit("calluser", { signal: signalData, from, name });
  });

  socket.on("answercall", (data) => {
    IO.to(data.to).emit("callaccepted", data.signal);
  });
});

server.listen(PORT, () => console.log("Server is running!!!!!!!!!🚀"));
