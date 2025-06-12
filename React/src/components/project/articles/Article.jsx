import React from 'react'

export const Article = () => {
  return (
    <div class="articles">
        <p class="articleTitle">RQ-012 프로젝트 화면 구현</p>
        <button class="workMoreBtn">
        <img
            src="/images/MoreVertical.svg"
            class="workMoreIcon"
            alt="더보기 아이콘"
        />
        <div class="workMoreOption">
            <a href="#">
            <img
                src="/images/edit2.svg"
                alt="수정아이콘"
                class="editIcon"
            />
            <p>작업 수정</p>
            </a>
            <a href="#">
            <img
                src="/images/remove.svg"
                alt="삭제아이콘"
                class="removeIcon"
            />
            <p>삭제</p>
            </a>
        </div>
        </button>
    </div>
  )
}
