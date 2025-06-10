import React from "react";

export const TableRow = ({
  number = "번호",
  title = "제목",
  author = "작성자",
  date = "작성일자",
}) => {
  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>{number}</td>
      <td>
        <a href="#">{title}</a>
      </td>
      <td>{author}</td>
      <td>{date}</td>
    </tr>
  );
};
