import React from 'react'

export const FileUploader = () => {
  return (
    <div class="form-group line">
      <label for="file-upload">파일첨부</label>
      <input type="file" id="file-upload" multiple />
    </div>
  );
}
