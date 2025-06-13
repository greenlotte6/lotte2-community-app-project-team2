import React, { useEffect, useRef } from 'react';

export default function MoreOption({ onEdit, onDelete, onClose }) {
  const optionRef = useRef();

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (optionRef.current && !optionRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="MoreOption" ref={optionRef}>
      <button onClick={onEdit}>
        <img src="/images/edit2.svg" alt="수정아이콘" className="editIcon" />
        <p>프로젝트 수정</p>
      </button>
      <button onClick={onDelete}>
        <img src="/images/remove.svg" alt="삭제아이콘" className="removeIcon" />
        <p>프로젝트 삭제</p>
      </button>
    </div>
  );
}
