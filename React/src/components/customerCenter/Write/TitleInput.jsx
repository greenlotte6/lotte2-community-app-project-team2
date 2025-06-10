const TitleInput = () => {
  return (
    <div className="line">
      <div className="form-group">
        <label htmlFor="title" className="title-name">
          제목
        </label>
        <input className="title-input" type="text" id="title" />
      </div>
    </div>
  );
};

export default TitleInput;
