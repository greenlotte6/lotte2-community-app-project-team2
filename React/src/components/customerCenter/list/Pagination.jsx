import React from "react";

export const Pagination = () => {
  return (
    <div className="page">
      <a href="#">&lt;</a>
      {[1, 2, 3, 4].map((n) => (
        <a key={n} href="#">
          {n}
        </a>
      ))}
      <a href="#">&gt;</a>
    </div>
  );
};
