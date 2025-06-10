import React from "react";
import { Pagination } from "./Pagination";
import { WriteButton } from "./WriteButton";

export const Footer = () => {
  return (
    <div className="footer">
      <div></div>
      <Pagination />
      <WriteButton />
    </div>
  );
};
