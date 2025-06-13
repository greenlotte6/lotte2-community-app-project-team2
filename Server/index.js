const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:5173", // Vite 개발용
      "http://127.0.0.1:5173",
      "https://lotte2-community-app-project-team2-blush.vercel.app", // ✅ Vercel 배포 주소
    ], // 리액트 포트
    methods: ["GET", "POST"],
  },
});

// ✅ 소켓 연결 처리
io.on("connection", (socket) => {
  console.log(`✅ 유저 연결됨: ${socket.id}`);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`📥 ${socket.id}가 ${room} 채팅방에 참여함`);
  });

  socket.on("send_message", (data) => {
    console.log(`📨 메시지 수신:`, data);
    io.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`❌ 연결 끊김: ${socket.id}`);
  });
});

// ✅ 서버 실행
server.listen(3001, () => {
  console.log("🚀 Socket.io 서버가 3001번 포트에서 실행 중입니다");
});
