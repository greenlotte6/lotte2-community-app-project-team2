const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        <strong>OO님의 페이지</strong>
        <div className="sidebar-actions">
          <span>&lt;&lt;</span>
          <button>
            <img src="/images/page/Icon (1).png" alt="글작성" />
          </button>
        </div>
      </div>
      <ul className="page-list">
        <li>개인 페이지</li>
        <li>공유된 페이지</li>
      </ul>
      <div className="trash">
        <img src="/images/page/Icon (2).png" alt="휴지통" />
      </div>
    </aside>
  );
};

export default Sidebar;
