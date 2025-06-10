import React from 'react'

export const TitleInput = () => {
  return (
    <div class="line">
      <div class="form-group">
        <label for="title" class="title-name">
          제목
        </label>
        <input class="title-input" type="text" id="title" />
      </div>
    </div>
  );
}
