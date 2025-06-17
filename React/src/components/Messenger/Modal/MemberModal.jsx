import React, { useEffect, useState } from "react";
import socket from "../../../socket";

export const MemberModal = ({ onClose, currentRoom }) => {
  const [allUsers, setAllUsers] = useState([]); // 전체 사용자 목록
  const [members, setMembers] = useState([]);   // 현재 참여자
  const [selected, setSelected] = useState([]); // 초대할 사용자 목록

  // ✅ 참여자 + 전체 사용자 불러오기
  useEffect(() => {
    if (!currentRoom) return;

    // 1. 참여 중인 사용자 목록
    socket.emit("get_channel_members", currentRoom, (res) => {
      if (res.ok) {
        setMembers(res.members.map((m) => m.uid));
      } else {
        alert("참여자 불러오기 실패");
      }
    });

    // 2. 전체 사용자 목록 (Spring API)
    fetch("http://localhost:8080/user/list")
      .then((res) => res.json())
      .then((users) => setAllUsers(users))
      .catch((err) => {
        console.error("사용자 목록 불러오기 실패", err);
        alert("사용자 목록 불러오기 실패");
      });
  }, [currentRoom]);

  // ✅ 초대 버튼 누르면 선택한 유저 emit
  const handleInvite = () => {
    socket.emit("invite_users", {
      room: currentRoom,
      uids: selected,
    }, (res) => {
      if (res.ok) {
        alert("초대 완료!");
        onClose();
      } else {
        alert("초대 실패: " + res.error);
      }
    });
  };

  // ✅ 초대할 유저 클릭 시 추가/제거
  const toggleSelect = (uid) => {
    setSelected((prev) =>
      prev.includes(uid) ? prev.filter((u) => u !== uid) : [...prev, uid]
    );
  };

  return (
    <div className="modal member-modal" id="memberModal">
      <div className="modal-content" style={{ display: "flex", gap: "1rem" }}>
        {/* 전체 유저 목록 중 참여자 제외 */}
        <div style={{ flex: 1 }}>
          <h3>초대 가능한 사용자</h3>
          <ul className="member-list">
            {allUsers
              .filter((user) => !members.includes(user.uid))
              .map((user) => (
                <li
                  key={user.uid}
                  onClick={() => toggleSelect(user.uid)}
                  style={{
                    background: selected.includes(user.uid)
                      ? "#d3eaff"
                      : "transparent",
                  }}
                >
                  {user.name} ({user.uid})
                </li>
              ))}
          </ul>
        </div>

        <div style={{ flex: 1 }}>
          <h3>선택된 사용자</h3>
          <ul className="member-list">
            {selected.map((uid) => {
              const user = allUsers.find((u) => u.uid === uid);
              return <li key={uid}>{user?.name} ({uid})</li>;
            })}
          </ul>
          <div className="modal-buttons">
            <button onClick={handleInvite}>초대하기</button>
            <button onClick={onClose}>닫기</button>
          </div>
        </div>
      </div>
    </div>
  );
};
