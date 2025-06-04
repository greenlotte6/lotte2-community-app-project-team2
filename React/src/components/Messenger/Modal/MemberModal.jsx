import React, { useState } from "react";

export const MemberModal = ({ onClose }) => {
  const friends = [
    { name: "홍길동", email: "hong@gmail.com" },
    { name: "김민수", email: "minsoo@naver.com" },
    { name: "이지은", email: "jieun@kakao.com" },
  ];

  const [members, setMembers] = useState([]);

  const handleInvite = (friend) => {
    // 중복 방지
    if (!members.find(m => m.email === friend.email)) {
      setMembers([...members, friend]);
    }
  };

  return (
    <div className="modal member-modal" id="memberModal">
      <div className="modal-content" style={{ display: "flex", gap: "1rem" }}>
        
        <div style={{ flex: 1 }}>
          <h3>친구 목록</h3>
          <ul className="member-list">
            {friends.map((f, i) => (
              <li key={i} onClick={() => handleInvite(f)} data-email={f.email}>
                {f.name} ({f.email})
              </li>
            ))}
          </ul>
        </div>

        <div style={{ flex: 1 }}>
          <h3>참여 인원</h3>
          <ul className="member-list">
            {members.map((m, i) => (
              <li key={i}>{m.name} ({m.email})</li>
            ))}
          </ul>
          <div className="modal-buttons">
            <button id="inviteMembersBtn" onClick={() => alert("초대 완료!")}>초대하기</button>
            <button id="closeMemberModal" onClick={onClose}>닫기</button>
          </div>
        </div>
      </div>
    </div>
  );
};
