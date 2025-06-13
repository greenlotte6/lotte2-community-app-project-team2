import React from 'react';

export default function AddProjectModal({ onClose, onAdd }) {
  return (
    <div className="modalContainer">
      <div className="addProjectModal modalWrapper">
        <div className="modalHeader">
          <p>프로젝트 추가</p>
          <button className="modalClose" onClick={onClose}>
            <img src="/images/cancel.svg" alt="취소 버튼" />
          </button>
        </div>

        <div className="modalContent">
          <div className="inputProjectName">
            <p>프로젝트 이름</p>
            <input
              type="text"
              name="projectName"
              placeholder="프로젝트 이름을 입력하세요"
            />
          </div>

          <div className="btnContainer">
            <div>
              <button type="button" className="modalClose" onClick={onClose}>
                취소
              </button>
              <button type="button" onClick={onAdd}>
                추가
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
