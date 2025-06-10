const TypeSelector = () => {
  return (
    <div className="form-group bold-line">
      <label>
        유형
        <select>
          <option value="">선택</option>
          <option value="공지">공지</option>
          <option value="일반">일반</option>
        </select>
        <span className="inline" style={{ float: "right" }}>
          <label className="check">
            <input type="checkbox" /> 중요
          </label>
        </span>
      </label>
    </div>
  );
};

export default TypeSelector;
