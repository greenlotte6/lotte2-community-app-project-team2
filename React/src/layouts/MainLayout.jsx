import React from "react";
import { Header } from "../components/common/Header";
import { Aside } from "../components/common/Aside";

export const MainLayout = ({ children }) => {
  return (
    <div id="container">
      <Header />
      <main>
      <Aside />
      {children}
      </main>
    </div>
  );
};