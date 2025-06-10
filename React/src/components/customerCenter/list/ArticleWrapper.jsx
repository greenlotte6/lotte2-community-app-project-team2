import React from "react";
import { SearchBox } from "./SearchBox";
import { PostTable } from "./PostTable";
import { Footer } from "./Footer";

export const ArticleWrapper = () => {
  return (
    <div className="article-wrapper">
      <SearchBox />
      <PostTable />
      <Footer />
    </div>
  );
};
