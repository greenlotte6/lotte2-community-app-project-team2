const FileUpload = () => {
  return (
    <div className="form-group line">
      <label htmlFor="file-upload">파일첨부</label>
      <input type="file" id="file-upload" multiple />
    </div>
  );
};

export default FileUpload;
