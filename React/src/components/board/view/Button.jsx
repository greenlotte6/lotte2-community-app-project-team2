import React from 'react'

export const Button = () => {
  return (
    <>
      <div class="btn-area1">
        <button class="btn-edit all-button">수정</button>
        <button class="btn-delete all-button">삭제</button>
      </div>

      <div class="btn-area2">
        <button class="btn-back all-button">목록</button>
      </div>
    </>
  );
}
