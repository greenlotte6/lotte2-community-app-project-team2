import React, { useState } from "react";

export const ChannelModal = ({ onClose, onCreate }) => {
  const [channelName, setChannelName] = useState("");

  const handleCreate = () => {
    if (channelName.trim()) {
      onCreate(channelName);
      setChannelName("");
    }
  };

  return (
    <div className="modal" id="channelModal">
      <div className="modal-content">
        <h3>새 채널 만들기</h3>
        <input
          type="text"
          placeholder="채널 이름을 입력하세요"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        />
        <div className="modal-buttons">
          <button id="createChannelBtn" onClick={handleCreate}>생성</button>
          <button id="closeModalBtn" onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};
