const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const Message = require("./models/message.model");

const app = express();
const server = http.createServer(app);

// ✅ MongoDB 연결
mongoose
  .connect("mongodb://localhost:27017/chatapp")
  .then(() => console.log("✅ MongoDB 연결 완료"))
  .catch((err) => console.error("❌ MongoDB 연결 실패:", err));

// ✅ Socket.io 설정
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://lotte2-community-app-project-team2-blush.vercel.app",
    ],
    methods: ["GET", "POST"],
  },
});

// ✅ 소켓 연결 처리
io.on("connection", (socket) => {
  console.log(`✅ 유저 연결됨: ${socket.id}`);

  // ✅ 채팅방 입장 처리
  socket.on("join_room", async (room) => {
    socket.join(room);
    console.log(`📥 ${socket.id}가 ${room} 채팅방에 참여함`);

    // ✅ 이전 메시지 전송
    try {
      const prevMessages = await Message.find({ room });
      socket.emit("previous_messages", prevMessages);
    } catch (err) {
      console.error("❌ 이전 메시지 불러오기 실패:", err);
    }
  });

  // ✅ 메시지 전송 처리
  socket.on("send_message", async (data) => {
    console.log(`📨 메시지 수신:`, data);

    // ✅ MongoDB 저장
    try {
      await Message.create(data);
      console.log("✅ 메시지 DB 저장 완료");
    } catch (err) {
      console.error("❌ 메시지 저장 실패:", err);
    }

    // ✅ 메시지 브로드캐스트
    io.to(data.room).emit("receive_message", data);
  });

  // ✅ 연결 종료 처리
  socket.on("disconnect", () => {
    console.log(`❌ 연결 끊김: ${socket.id}`);
  });
});

// ✅ 서버 실행
server.listen(3001, () => {
  console.log("🚀 Socket.io 서버가 3001번 포트에서 실행 중입니다");
});
