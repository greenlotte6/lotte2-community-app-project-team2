import React, { useState } from "react";
import { MemberModal } from "./Modal/MemberModal";

export const Messengermain = ({ currentRoom }) => {
  const [showMemberModal, setShowMemberModal] = useState(false);

  const dummyChats = {
    "채팅 1": [
      { sender: "홍길동", message: "채팅1", time: "오후 2:30", type: "received" },
      { sender: "나", message: "채팅1", time: "오후 2:31", type: "sent" },
    ],
    "채팅 2": [
      { sender: "김영희", message: "채팅 2", time: "오전 11:00", type: "received" },
      { sender: "나", message: "채팅 2", time: "오전 11:02", type: "sent" },
    ],
    "채팅 3": [
      { sender: "박철수", message: "채팅 3", time: "오후 4:12", type: "received" },
      { sender: "나", message: "채팅 3", time: "오후 4:13", type: "sent" },
    ],
  };

  const messages = dummyChats[currentRoom] || [];

  return (
    <div className="main-panel">
      <div className="chat-wrapper">
        <div className="chat-header">
          <h2 id="chat-title">{currentRoom}</h2>
          <span
            className="status online manage-members"
            data-role="view-members"
            onClick={() => setShowMemberModal(true)}
          >
            참여인원관리
          </span>
        </div>

        <div className="chat-messages" id="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              {msg.type === "received" && (
                <div className="profile-wrapper">
                  <div className="chat-username">{msg.sender}</div>
                  <img
                    className="chat-avatar"
                    src="/images/Avatar.png"
                    alt="상대방 프로필"
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
                    className="chat-avatar"
                    src="/images/Avatar.png"
                    alt="내 프로필"
                  />
                  <div className="chat-username">{msg.sender}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input type="text" placeholder="메시지를 입력하세요..." />
          <button>전송</button>
        </div>
      </div>

      {showMemberModal && (
        <MemberModal onClose={() => setShowMemberModal(false)} />
      )}
    </div>
  );
};
