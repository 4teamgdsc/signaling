import express from "express";
import { createServer } from "https";

import { Server } from "socket.io";
import cors from "cors";
import fs from "fs";

import * as signaling from "./signaling.js";

async function startSocketServer(server) {
  await signaling.socket(server);
}

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "*"],
  })
);

app.set("trust proxy", 1);
app.disable("x-powered-by");

const options = {
  key: fs.readFileSync("./front+3-key.pem"),
  cert: fs.readFileSync("./front+3.pem"),
};

const httpsServer = createServer(options);
const io = new Server(httpsServer, {
  cors: {
    origin: "*",
  },
});

console.log("[ + ] enable socket io");
let io_server = await startSocketServer(io);
httpsServer.listen(9300);
