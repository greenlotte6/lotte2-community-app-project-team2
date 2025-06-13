import React, { useState, useEffect } from "react";
import { MemberModal } from "./Modal/MemberModal";
import socket from "../../socket"; // socket.js import

export const Messengermain = ({ currentRoom }) => {
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!currentRoom) return;

    // 채팅방 입장
    socket.emit("join_room", currentRoom);

    // 메시지 수신
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, { ...data, type: "received" }]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [currentRoom]);

  const sendMessage = () => {
    if (input.trim()) {
      const msg = {
        room: currentRoom,
        sender: "나", // 임시
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
                  <div className="chat-username">{msg.sender}</div>
                  <img src="/images/Avatar.png" alt="상대방" className="chat-avatar" />
                </div>
              )}
              <div className="message-bubble-wrapper">
                <div className="bubble">{msg.message}</div>
                <div className="chat-time">{msg.time}</div>
              </div>
              {msg.type === "sent" && (
                <div className="profile-wrapper">
                  <img src="/images/Avatar.png" alt="나" className="chat-avatar" />
                  <div className="chat-username">{msg.sender}</div>
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

      {showMemberModal && <MemberModal onClose={() => setShowMemberModal(false)} />}
    </div>
  );
};
