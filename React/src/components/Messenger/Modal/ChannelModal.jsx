import React, { useState } from "react";

export const ChannelModal = ({ onClose, onCreate }) => {
  const [channelName, setChannelName] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    if (channelName.trim()) {
      onCreate(channelName.trim());
      setChannelName("");
    } else {
      alert("채널 이름을 입력하세요.");
    }
  };

  return (
    <div className="modal" id="channelModal">
      <div className="modal-content">
        <h3>새 채널 만들기</h3>
        <form onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="채널 이름을 입력하세요"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
          <div className="modal-buttons">
            <button type="submit" id="createChannelBtn">생성</button>
            <button type="button" id="closeModalBtn" onClick={onClose}>취소</button>
          </div>
        </form>
      </div>
    </div>
  );
};
