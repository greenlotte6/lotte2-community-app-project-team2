import React from 'react'
import { WorkArticle } from './articles/WorkArticle'

export const InProject = () => {
  return (
    <section id='inProject'>
          <div class="sectionHeader">
            <h3>롯데정보통신 사내 커뮤니티 게시판 사이트 개발 프로젝트 2조</h3>
          </div>
          <div class="workSection">
            <WorkArticle />
            <WorkArticle />
            <WorkArticle />
            <button class="addWorkStatus">
              <img src="/images/Plus.svg" alt="작업 상태 추가 버튼" />
            </button>
          </div>
        </section>
  )
}
