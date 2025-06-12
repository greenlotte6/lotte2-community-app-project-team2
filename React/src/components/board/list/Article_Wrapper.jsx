import React from "react";
import { Search } from "./Search";
import { Table } from "./Table";
import { Footer } from "./Footer";

export const Article_Wrapper = () => {
  return (
    <div className="article-wrapper">
      <Search />
      <Table />
      <Footer />
    </div>
  );
};
