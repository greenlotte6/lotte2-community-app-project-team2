// src/socket.js
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode"; //

// ✅ 환경에 따라 소켓 서버 주소 구분
const SOCKET_SERVER_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3001" // 로컬 소켓 서버
    : "http://54.180.113.128:3001"; // EC2에 배포된 소켓 서버 주소 (환경에 따라 HTTPS 등 조정 가능)

// ✅ 소켓 클라이언트 생성
const socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"],
  withCredentials: true, // 쿠키를 자동 전송하기 위해 필요
});

// ✅ JWT 토큰에서 사용자 정보 추출

function getUserFromToken() {
  const token = localStorage.getItem("access_token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.sub || decoded.uid || decoded.username || null;
  } catch (e) {
    console.error("❌ JWT 디코딩 실패:", e);
    return null;
  }
}

export default socket;
export { getUserFromToken };
