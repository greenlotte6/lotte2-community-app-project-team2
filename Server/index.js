const axios = require("axios");
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const Message = require("./models/message.model");
const Channel = require("./models/channel.model");
const User = require("./models/user.model");

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

    try {
      const prevMessages = await Message.find({ room });
      socket.emit("previous_messages", prevMessages);
    } catch (err) {
      console.error("❌ 이전 메시지 불러오기 실패:", err);
    }
  });

  socket.on("get_channel_members", async (channelName, callback) => {
  console.log("📩 참여자 요청 수신:", channelName);

  try {
    const channel = await Channel.findOne({ name: channelName });
    if (!channel) {
      console.log("❌ 채널 없음:", channelName);
      return callback({ ok: false, error: "채널을 찾을 수 없습니다." });
    }

    // Spring API에서 모든 사용자 uid + name 가져오기
    const { data: allUsers } = await axios.get("http://localhost:8080/user/list");

    // 해당 채널에 속한 UID만 필터링
    const members = allUsers.filter(user => channel.members.includes(user.uid));

    console.log("👥 참여자 목록:", members);
    callback({ ok: true, members });
  } catch (err) {
    console.error("❌ 참여자 조회 실패:", err.message);
    callback({ ok: false, error: err.message });
  }
});

  // ✅ 메시지 전송 처리
  socket.on("send_message", async (data) => {
    console.log(`📨 메시지 수신:`, data);

    try {
      await Message.create({
        room: data.room,
        sender: data.sender,
        senderName: data.senderName, // ✅ 이름도 함께 저장
        message: data.message,
        time: data.time,
      });
      console.log("✅ 메시지 DB 저장 완료");
    } catch (err) {
      console.error("❌ 메시지 저장 실패:", err);
    }

    io.to(data.room).emit("receive_message", data);
  });

  // ✅ 새 채널 생성 처리
  socket.on("create_channel", async ({ name, creator }, callback) => {
    try {
      const newChannel = await Channel.create({
        name,
        creator,
        members: [creator],
      });

      console.log("✅ 새 채널 생성:", newChannel);

      // 생성자 기준 채널 목록 다시 보내기
      const channels = await Channel.find({ members: creator });
      socket.emit("channel_list", channels);

      if (callback) callback({ ok: true });
    } catch (err) {
      console.error("❌ 채널 생성 실패:", err);
      if (callback) callback({ ok: false, error: err.message });
    }
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
