import React from 'react'
import { MainLayout } from '../../layouts/MainLayout'
import { Article_Wrapper } from '../../components/board/main/Article_Wrapper'
import '../../styles/board/main.scss'

export const MainPage = () => {
  return (
    <div id="board_main">
      <MainLayout>
        <Article_Wrapper />
      </MainLayout>
    </div>
  );
}
