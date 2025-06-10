import React from 'react'

export const SearchBox = () => {
  return (
    <div className="search">
      <div>
        <select>
          <option value="">제목</option>
          <option value="">작성자</option>
        </select>
      </div>
      <div>
        <input type="text" placeholder="검색" />
        <a href="#">
          <img src="/images/board/notice/Icon.png" alt="검색" />
        </a>
      </div>
    </div>
  );
};
