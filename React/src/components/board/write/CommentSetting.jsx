import React from 'react'

export const CommentSetting = () => {
  return (
    <div class="form-group">
      <label>댓글 설정</label>
      <label>
        <input type="radio" name="comment" /> 모두
      </label>
      <label>
        <input type="radio" name="comment" checked /> 작성자 및 관리자
      </label>
    </div>
  );
}
