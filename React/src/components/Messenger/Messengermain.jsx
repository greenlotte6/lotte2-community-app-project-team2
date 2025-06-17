import React, { useState, useEffect } from "react";
import { MemberModal } from "./Modal/MemberModal";
import socket, { getUserFromToken } from "../../socket";

export const Messengermain = ({ currentRoom }) => {
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!currentRoom) return;

    const uid = getUserFromToken();

    // ✅ 채팅방 입장
    socket.emit("join_room", currentRoom);

    // ✅ 이전 메시지 불러오기
    socket.on("previous_messages", (prevMsgs) => {
      const formatted = prevMsgs.map((msg) => ({
        ...msg,
        type: msg.sender === uid ? "sent" : "received",
        time:
          msg.time ||
          new Date().toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
      }));
      setMessages(formatted);
    });

    // ✅ 실시간 메시지 수신
    socket.on("receive_message", (data) => {
      // 내가 보낸 메시지는 이미 sent로 추가했기 때문에 중복 제거
      if (data.sender === uid) return;

      setMessages((prev) => [...prev, { ...data, type: "received" }]);
    });

    // ✅ 클린업
    return () => {
      socket.off("receive_message");
      socket.off("previous_messages");
    };
  }, [currentRoom]);

  // ✅ 메시지 전송
  const sendMessage = () => {
    const uid = getUserFromToken();
    const name = localStorage.getItem("user_name");

    if (!uid || !name) return alert("로그인이 필요합니다.");

    if (input.trim()) {
      const msg = {
        room: currentRoom,
        sender: uid,
        senderName: name,
        message: input,
        time: new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      socket.emit("send_message", msg);
      setMessages((prev) => [...prev, { ...msg, type: "sent" }]);
      setInput("");
    }
  };

  return (
    <div className="main-panel">
      <div className="chat-wrapper">
        <div className="chat-header">
          <h2 id="chat-title">{currentRoom}</h2>
          <span
            className="status online manage-members"
            onClick={() => setShowMemberModal(true)}
          >
            참여인원관리
          </span>
        </div>

        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.type}`}>
              {msg.type === "received" && (
                <div className="profile-wrapper">
                  <div className="chat-username">{msg.senderName || msg.sender}</div>
                  <img
                    src="/images/Avatar.png"
                    alt="상대방"
                    className="chat-avatar"
                  />
                </div>
              )}
              <div className="message-bubble-wrapper">
                <div className="bubble">{msg.message}</div>
                <div className="chat-time">{msg.time}</div>
              </div>
              {msg.type === "sent" && (
                <div className="profile-wrapper">
                  <img
                    src="/images/Avatar.png"
                    alt="나"
                    className="chat-avatar"
                  />
                  <div className="chat-username">{msg.senderName || msg.sender}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="메시지를 입력하세요..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>전송</button>
        </div>
      </div>

      {showMemberModal && (
        <MemberModal
          onClose={() => setShowMemberModal(false)}
          currentRoom={currentRoom} // ✅ 이 줄이 꼭 필요!
        />
      )}
    </div>
  );
};
