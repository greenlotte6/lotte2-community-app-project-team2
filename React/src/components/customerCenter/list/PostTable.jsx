import React from "react";
import { TableRow } from "./TableRow";

export const PostTable = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일자</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 10 }).map((_, idx) => (
          <TableRow key={idx} />
        ))}
      </tbody>
    </table>
  );
};
