import React from 'react'

export const CommentInput = () => {
  return (
    <div class="comment-input-wrapper">
      <textarea placeholder="댓글 입력..." class="comment-input"></textarea>
      <div class="comment-input-footer">
        <div class="comment-icons">
          <img src="/images/board/notice/attachment.png" alt="파일 첨부" />
          <input type="file" class="hidden-file-input" multiple />
          <img src="/images/board/notice/😀.png" alt="이모지" />
        </div>
        <button class="comment-submit">입력</button>
      </div>
    </div>
  );
}
