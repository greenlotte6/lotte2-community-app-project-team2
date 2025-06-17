import React, { useEffect, useState } from "react";
import { ChannelModal } from "./Modal/ChannelModal";
import socket, { getUserFromToken } from "../../socket";

export const Messengerside = ({ currentRoom, setCurrentRoom }) => {
  const [channels, setChannels] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const uid = getUserFromToken();
    if (!uid) return;

    // ✅ 처음 연결 시 채널 목록 요청
    socket.emit("get_channels", uid); // (추후 사용 가능)

    // ✅ 서버에서 보낸 채널 목록 수신
    socket.on("channel_list", (channelList) => {
      setChannels(channelList);
    });

    // ✅ 클린업
    return () => {
      socket.off("channel_list");
    };
  }, []);

  const handleAddChannel = (name) => {
    const uid = getUserFromToken();
    console.log("채널 생성 요청됨:", name, uid); // ✅ 콘솔 확인

    if (!uid) return alert("로그인이 필요합니다.");

    socket.emit("create_channel", { name, creator: uid }, (res) => {
      if (!res.ok) {
        alert("채널 생성 실패: " + res.error);
        return;
      }
      setShowModal(false);
    });
  };

  return (
    <>
      <div className="sidebar-panel">
        <p>내 채널</p>
        <div className="channel-list">
          <p data-role="add-channel" onClick={() => setShowModal(true)}>
            + 새 채널 만들기
          </p>
          {channels.map((room, idx) => (
            <p
              key={idx}
              data-room={room.name}
              className={`channel-item ${currentRoom === room.name ? "active" : ""}`}
              onClick={() => setCurrentRoom(room.name)}
            >
              {room.name} ⚙
            </p>
          ))}
        </div>
      </div>

      {showModal && (
        <ChannelModal
          onClose={() => setShowModal(false)}
          onCreate={handleAddChannel}
        />
      )}
    </>
  );
};
