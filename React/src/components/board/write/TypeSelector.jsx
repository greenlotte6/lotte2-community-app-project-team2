import React from 'react'

export const TypeSelector = () => {
  return (
    <div class="form-group bold-line">
      <label>
        유형
        <select>
          <option value="">선택</option>
          <option value="공지">공지</option>
          <option value="일반">일반</option>
        </select>
        <span class="inline" style="float: right;">
          <label class="check">
            <input type="checkbox" /> 중요
          </label>
        </span>
      </label>
    </div>
  );
}
