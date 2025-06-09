import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import app from "./app.js"; // 파일 확장자 꼭 필요!
import registerSocketHandlers from "./utils/io.js";
dotenv.config();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

registerSocketHandlers(io);

httpServer.listen(process.env.PORT, () => {
  console.log("server listening on port", process.env.PORT);
});