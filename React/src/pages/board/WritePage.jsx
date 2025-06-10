import React from 'react'
import { MainLayout } from '../../layouts/MainLayout'
import { Title } from "../../components/board/common/Title";
import ArticleWrapper from "../../components/board/write/ArticleWrapper";

export const WritePage = () => {
  return (
    <MainLayout>
      <section>
        <div>
          <Title />
          <ArticleWrapper />
        </div>
      </section>
    </MainLayout>
  );
}
