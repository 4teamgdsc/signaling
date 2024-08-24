import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import * as signaling from "./signaling.js";

async function socketInit(server) {
  const io = new Server(server);
  return io;
}

async function startSocketServer(server) {
  let io = await socketInit(server);
  await signaling.socket(io);
}

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "*"],
  })
);

app.set("trust proxy", 1);
app.disable("x-powered-by");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

httpServer.listen(9300);

console.log("[ + ] enable socket io");
let io_server = await startSocketServer(io);
