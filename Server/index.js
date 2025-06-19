// ✅ index.js (서버)
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

mongoose
  .connect("mongodb://localhost:27017/chatapp")
  .then(() => console.log("✅ MongoDB 연결 완료"))
  .catch((err) => console.error("❌ MongoDB 연결 실패:", err));

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

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log(`✅ 유저 연결됨: ${socket.id}`);

  socket.on("register_uid", (uid) => {
    userSocketMap[uid] = socket.id;
    console.log("🧾 사용자 등록됨:", uid, "→", socket.id);
  });

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

  socket.on("get_channels", async (uid) => {
    try {
      const channels = await Channel.find({ members: uid });
      socket.emit("channel_list", channels);
      console.log("📤 채널 목록 전송:", channels.map(c => c.name));
    } catch (err) {
      console.error("❌ 채널 목록 조회 실패:", err.message);
    }
  });

  socket.on("get_channel_members", async (channelId, callback) => {
    console.log("📩 참여자 요청 수신:", channelId);

    try {
      const channel = await Channel.findById(channelId);
      if (!channel) return callback({ ok: false, error: "채널을 찾을 수 없습니다." });

      const { data: allUsers } = await axios.get("http://localhost:8080/user/list");
      const members = allUsers.filter(user => channel.members.includes(user.uid));

      console.log("👥 참여자 목록:", members);
      callback({ ok: true, members });
    } catch (err) {
      console.error("❌ 참여자 조회 실패:", err.message);
      callback({ ok: false, error: err.message });
    }
  });

  socket.on("send_message", async (data) => {
    console.log("📨 메시지 수신:", data);

    try {
      await Message.create(data);
      console.log("✅ 메시지 DB 저장 완료");
    } catch (err) {
      console.error("❌ 메시지 저장 실패:", err);
    }

    io.to(data.room).emit("receive_message", data);
  });

  socket.on("create_channel", async ({ name, creator }, callback) => {
    try {
      const newChannel = await Channel.create({ name, creator, members: [creator] });
      console.log("✅ 새 채널 생성:", newChannel);
      const channels = await Channel.find({ members: creator });
      socket.emit("channel_list", channels);
      callback?.({ ok: true });
    } catch (err) {
      console.error("❌ 채널 생성 실패:", err);
      callback?.({ ok: false, error: err.message });
    }
  });

  socket.on("invite_users", async ({ channelId, invitedUsers }, callback) => {
  try {
    const channel = await Channel.findById(channelId);
    if (!channel) return callback?.({ ok: false, error: "채널을 찾을 수 없습니다." });

    const newMembers = invitedUsers.filter(uid => !channel.members.includes(uid));
    if (newMembers.length === 0) return callback?.({ ok: false, error: "이미 모두 초대됨" });

    channel.members.push(...newMembers);
    await channel.save();
    console.log("✅ 초대한 멤버 추가됨:", newMembers);

    newMembers.forEach(uid => {
      const socketId = userSocketMap[uid];
      if (socketId) {
        io.to(socketId).emit("channel_invited", { channelId: channel._id, channelName: channel.name });
      }
    });

    // 🔽 이름 조회
    const { data: allUsers } = await axios.get("http://localhost:8080/user/list");
    const nameMap = Object.fromEntries(allUsers.map(user => [user.uid, user.name]));
    const invitedNames = newMembers.map(uid => nameMap[uid] || uid).join(", ");

    const systemMessage = {
      room: channel.name,
      sender: "system",
      senderName: "System",
      message: `${invitedNames} 님이 채팅방에 초대되었습니다.`,
      time: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
      type: "system"
    };
    await Message.create(systemMessage);
    io.to(channel.name).emit("receive_message", systemMessage);

    callback?.({ ok: true });
  } catch (err) {
    console.error("❌ 초대 처리 중 오류:", err.message);
    callback?.({ ok: false, error: err.message });
  }
});


  socket.on("kick_user", async ({ channelId, targetUid }, callback) => {
  try {
    const channel = await Channel.findById(channelId);
    if (!channel) return callback?.({ ok: false, error: "채널을 찾을 수 없습니다." });

    if (!channel.members.includes(targetUid)) {
      return callback?.({ ok: false, error: "해당 사용자는 이미 채널에 없습니다." });
    }

    channel.members = channel.members.filter((m) => m !== targetUid);
    await channel.save();

    console.log(`🛑 ${targetUid} 강퇴됨 from ${channel.name}`);
    callback?.({ ok: true });

    const socketId = userSocketMap[targetUid];
    if (socketId) {
      io.to(socketId).emit("kicked_from_channel", { channelId, channelName: channel.name });
    }

    // 🔽 이름 조회
    const { data: allUsers } = await axios.get("http://localhost:8080/user/list");
    const nameMap = Object.fromEntries(allUsers.map(user => [user.uid, user.name]));
    const targetName = nameMap[targetUid] || targetUid;

    const systemMessage = {
      room: channel.name,
      sender: "system",
      senderName: "System",
      message: `${targetName} 님이 강퇴되었습니다.`,
      time: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
      type: "system"
    };
    await Message.create(systemMessage);
    io.to(channel.name).emit("receive_message", systemMessage);
  } catch (err) {
    console.error("❌ 강퇴 처리 실패:", err.message);
    callback?.({ ok: false, error: err.message });
  }
});


  socket.on("leave_channel", async ({ channelId, uid }, callback) => {
  try {
    const channel = await Channel.findById(channelId);
    if (!channel) return callback?.({ ok: false, error: "채널을 찾을 수 없습니다." });

    channel.members = channel.members.filter((member) => member !== uid);
    await channel.save();

    console.log(`🚪 ${uid}님이 채널을 나감: ${channel.name}`);
    callback?.({ ok: true });

    // 🔽 변경 1: 사용자 이름 조회
    const { data: allUsers } = await axios.get("http://localhost:8080/user/list");
    const nameMap = Object.fromEntries(allUsers.map(user => [user.uid, user.name]));
    const userName = nameMap[uid] || uid;

    const systemMessage = {
      room: channel.name,
      sender: "system",
      senderName: "System",
      // 🔽 변경 2: 이름 사용
      message: `${userName} 님이 채팅방에서 나갔습니다.`,
      time: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
      type: "system"
    };

    await Message.create(systemMessage);
    io.to(channel.name).emit("receive_message", systemMessage);
  } catch (err) {
    console.error("❌ 채널 나가기 실패:", err.message);
    callback?.({ ok: false, error: err.message });
  }
});


  socket.on("disconnect", () => {
    console.log(`❌ 연결 끊김: ${socket.id}`);
    for (const uid in userSocketMap) {
      if (userSocketMap[uid] === socket.id) {
        delete userSocketMap[uid];
        break;
      }
    }
  });
});

server.listen(3001, () => {
  console.log("🚀 Socket.io 서버가 3001번 포트에서 실행 중입니다");
});
