// ✅ Messengerside.jsx (클라이언트)
import React, { useEffect, useState } from "react";
import { ChannelModal } from "./Modal/ChannelModal";
import { Messengermain } from "./Messengermain";
import socket, { getUserFromToken } from "../../socket";

export const Messengerside = () => {
  const [channels, setChannels] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [currentChannelId, setCurrentChannelId] = useState(null);
  const [channelCreator, setChannelCreator] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const user = getUserFromToken();
    if (!user || !user.uid) return;

    socket.emit("get_channels", user.uid);

    socket.on("channel_list", (channelList) => setChannels(channelList));

    socket.on("channel_invited", ({ channelId, channelName }) => {
      setChannels((prev) => {
        if (prev.some((c) => c._id === channelId)) return prev;
        return [...prev, { _id: channelId, name: channelName }];
      });
    });

    socket.on("kicked_from_channel", ({ channelId, channelName }) => {
      alert(` 채널 "${channelName}"에서 강퇴당했습니다.`);
      setChannels((prev) => prev.filter((c) => c._id !== channelId));
      if (currentChannelId === channelId) {
        setCurrentRoom(null);
        setCurrentChannelId(null);
        setChannelCreator(null);
      }
    });

    socket.emit("register_uid", user.uid);

    return () => {
      socket.off("channel_list");
      socket.off("channel_invited");
      socket.off("kicked_from_channel");
    };
  }, []);

  const handleAddChannel = (name) => {
    const user = getUserFromToken();
    if (!user || !user.uid) return alert("로그인이 필요합니다.");

    socket.emit("create_channel", { name, creator: user.uid }, (res) => {
      if (!res.ok) return alert("채널 생성 실패: " + res.error);
      setShowModal(false);
    });
  };

  const handleLeaveChannel = (channelId) => {
    const user = getUserFromToken();
    if (!user || !user.uid) return alert("로그인이 필요합니다.");

    const confirmLeave = window.confirm("이 채팅방에서 나가시겠습니까?");
    if (!confirmLeave) return;

    socket.emit("leave_channel", { channelId, uid: user.uid }, (res) => {
      if (res.ok) {
        alert("채팅방에서 나갔습니다.");
        setChannels((prev) => prev.filter((c) => c._id !== channelId));
        setCurrentRoom(null);
        setCurrentChannelId(null);
        setChannelCreator(null);
      } else {
        alert("채팅방 나가기 실패: " + res.error);
      }
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
            <div key={idx} className="channel-item-wrapper">
            <span
              className={`channel-item ${currentRoom === room.name ? "active" : ""}`}
              onClick={() => {
                setCurrentRoom(room.name);
                setCurrentChannelId(room._id);
                setChannelCreator(room.creator);
              }}
            >
              {room.name}
            </span>
            <span
              className="channel-settings-icon"
              onClick={(e) => {
                e.stopPropagation();
                handleLeaveChannel(room._id);
              }}
            >
              ⚙
            </span>
          </div>
          ))}
        </div>
      </div>

      {showModal && (
        <ChannelModal
          onClose={() => setShowModal(false)}
          onCreate={handleAddChannel}
        />
      )}

      {currentRoom && currentChannelId && (
        <Messengermain
          currentRoom={currentRoom}
          currentChannelId={currentChannelId}
          channelCreator={channelCreator}
        />
      )}
    </>
  );
};
