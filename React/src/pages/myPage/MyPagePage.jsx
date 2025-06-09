import React from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { MyPage } from "../../components/myPage/MyPage";

export const MyPagePage = () => {
  return (
    <MainLayout>
      <section id="myPage">
        <MyPage />
      </section>
    </MainLayout>
  );
};
