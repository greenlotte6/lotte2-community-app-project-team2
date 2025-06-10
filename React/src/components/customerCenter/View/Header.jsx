const Header = ({ category, title, date }) => {
  return (
    <div className="notice-header">
      <div className="notice-title">
        <span>{category}</span>
        <span>{title}</span>
      </div>
      <div className="notice-date">{date}</div>
    </div>
  );
};

export default Header;
