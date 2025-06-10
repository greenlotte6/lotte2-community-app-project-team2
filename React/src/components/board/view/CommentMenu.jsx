import React from 'react'

export const CommentMenu = () => {
  return (
    <div class="comment-menu">
      <button class="menu-button">⋮</button>
      <ul class="menu-dropdown hidden">
        <li>
          <button type="button">신고</button>
        </li>
        <li>
          <button type="button">삭제</button>
        </li>
        <li>
          <button type="button">수정</button>
        </li>
      </ul>
    </div>
  );
}
