import React, { useEffect, useState } from "react";
import socket, { getUserFromToken } from "../../../socket";



export const MemberModal = ({ onClose, channelId, creatorUid }) => {
  const currentUser = getUserFromToken();
  const [allUsers, setAllUsers] = useState([]);
  const [members, setMembers] = useState([]); // [{uid, name}]
  const [selected, setSelected] = useState([]);

  // ✅ 사용자 목록 로딩
  useEffect(() => {
    if (!channelId) return;

    // 1. 채널 참여자 목록
    socket.emit("get_channel_members", channelId, (res) => {
      if (res && res.ok && Array.isArray(res.members)) {
        setMembers(res.members); // [{ uid, name }]
      } else {
        console.error("❌ 참여자 불러오기 실패:", res?.error || "알 수 없는 오류");
        alert("참여자 불러오기 실패: " + (res?.error || "서버 응답 오류"));
      }
    });

    // 2. 전체 사용자 목록
    fetch("http://localhost:8080/user/list")
      .then((res) => res.json())
      .then((users) => setAllUsers(users))
      .catch((err) => {
        console.error("❌ 사용자 목록 실패", err);
        alert("사용자 목록 불러오기 실패");
      });
  }, [channelId]);

  // ✅ 초대 emit
  const handleInvite = () => {
    if (!channelId || selected.length === 0) return;

    console.log("📤 초대 emit:", selected);
    socket.emit(
      "invite_users",
      { channelId, invitedUsers: selected },
      (res) => {
        console.log("📥 서버 응답:", res);
        if (res.ok) {
          alert("초대 완료!");
          onClose();
        } else {
          alert("초대 실패: " + res.error);
        }
      }
    );
  };

  const toggleSelect = (uid) => {
    setSelected((prev) =>
      prev.includes(uid) ? prev.filter((u) => u !== uid) : [...prev, uid]
    );
  };

  return (
    <div className="modal member-modal" id="memberModal">
      <div className="modal-content" style={{ display: "flex", gap: "1rem" }}>
        {/* ✅ 초대 가능한 사용자 */}
        <div style={{ flex: 1 }}>
          <h3>초대 가능한 사용자</h3>
          <ul className="member-list">
            {allUsers
              .filter((user) => !members.some((m) => m.uid === user.uid))
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

        {/* ✅ 채널 참여자 목록 */}
        <div style={{ flex: 1 }}>
          <h3>채팅방 참여자</h3>
          <ul className="member-list">
            {members.map((member) => (
              <li
                key={member.uid}
                onClick={() => {
                  if (currentUser?.uid === creatorUid && member.uid !== creatorUid) {
                    // 채널 생성자인 경우에만 강퇴 가능
                    const confirmKick = window.confirm(`${member.name}님을 강퇴하시겠습니까?`);
                    if (confirmKick) {
                      socket.emit("kick_user", { channelId, targetUid: member.uid }, (res) => {
                        if (res.ok) {
                          alert("강퇴 완료");
                          setMembers((prev) => prev.filter((m) => m.uid !== member.uid));
                        } else {
                          alert("강퇴 실패: " + res.error);
                        }
                      });
                    }
                  }
                }}
                style={{ cursor: currentUser?.uid === creatorUid && member.uid !== creatorUid ? "pointer" : "default" }}
              >
                {member.name} ({member.uid})
                {member.uid === creatorUid && " 👑"}
              </li>
            ))}
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
