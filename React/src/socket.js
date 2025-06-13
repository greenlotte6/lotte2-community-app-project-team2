// src/socket.js
import { io } from "socket.io-client";

// 개발 환경(local) vs 배포 환경(vercel) 구분
const SOCKET_SERVER_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3001" // 로컬 소켓 서버
    : "http://54.180.113.128:3001"; // EC2에 배포된 소켓 서버 주소 (HTTP or HTTPS 설정에 따라 조정)

// 소켓 클라이언트 생성
const socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;
