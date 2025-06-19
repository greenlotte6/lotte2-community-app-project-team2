import React, { useState, useEffect } from "react";
import { MemberModal } from "./Modal/MemberModal";
import socket, { getUserFromToken } from "../../socket";

export const Messengermain = ({ currentRoom, currentChannelId, channelCreator }) => {
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const user = getUserFromToken();
  const uid = user?.uid;

  useEffect(() => {
    if (!currentRoom || !uid) return;

    socket.emit("join_room", currentRoom);

    socket.on("previous_messages", (prevMsgs) => {
    const formatted = prevMsgs.map((msg) => {
      const isSystem = msg.type === "system" || msg.sender === "system"; // fallback
      return {
        ...msg,
        type: isSystem ? "system" : msg.sender === uid ? "sent" : "received",
        time:
          msg.time ||
          new Date().toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
      };
    });
    setMessages(formatted);
  });



    socket.on("receive_message", (data) => {
      console.log("📥 수신 메시지:", data);

       if (data.room !== currentRoom) return;

      if (data.type === "system") {
        console.log("✅ 시스템 메시지 반영됨!");
        setMessages((prev) => [...prev, data]);
        return;
      }

      if (data.sender === uid) return;

      setMessages((prev) => [...prev, { ...data, type: "received" }]);
    });

    return () => {
      socket.off("receive_message");
      socket.off("previous_messages");
    };
  }, [currentRoom, currentChannelId, uid]);

  const sendMessage = () => {
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
          {messages.map((msg, i) =>
            msg.type === "system" ? (
              <div key={i} className="system-message">
                {msg.message}
              </div>
            ) : (
              <div key={i} className={`message ${msg.type}`}>
                {msg.type === "received" && (
                  <div className="profile-wrapper">
                    <div className="chat-username">{msg.senderName || msg.sender}</div>
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
                    <div className="chat-username">{msg.senderName || msg.sender}</div>
                  </div>
                )}
              </div>
            )
          )}
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
          channelId={currentChannelId}
          creatorUid={channelCreator}
        />
      )}
    </div>
  );
};
