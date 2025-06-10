const CircleItem = ({ imgSrc, alt, label }) => {
  return (
    <div className="circle-item">
      <img src={imgSrc} alt={alt} />
      <span>{label}</span>
    </div>
  );
};

export default CircleItem;
