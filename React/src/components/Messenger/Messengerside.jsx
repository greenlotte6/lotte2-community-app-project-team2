import React, { useState } from 'react'
import { ChannelModal } from "./Modal/ChannelModal";



export const Messengerside = ({ currentRoom, setCurrentRoom }) => {
  const [channels, setChannels] = useState(["채팅 1", "채팅 2", "채팅 3"]);
  const [showModal, setShowModal] = useState(false);

  const handleAddChannel = (name) => {
    setChannels([...channels, name]);
    setShowModal(false);
  };

  return (
    <>
      <div className="sidebar-panel">
        <p>홍길동<br />hong@gmail.com</p>
        <div className="channel-list">
          <p data-role="add-channel" onClick={() => setShowModal(true)}>
            + 새 채널 만들기
          </p>
          {channels.map((room, idx) => (
            <p
              key={idx}
              data-room={room}
              className={`channel-item ${currentRoom === room ? "active" : ""}`}
              onClick={() => setCurrentRoom(room)}
            >
              {room} ⚙
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