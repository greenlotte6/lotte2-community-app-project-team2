import React from 'react'
import { Article } from './Article'

export const WorkArticle = () => {
  return (
    <div class="workArticle">
        <div class="articleHeader">
            <div>
                <div
                className="statusColor"
                style={{ border: '2px solid rgb(94, 94, 218)', backgroundColor: 'rgba(67, 67, 194, 0.33)'}}>
                </div>
                <p class="articleName">Ready</p>
                <div class="workCount">45</div>
            </div>
            <button class="moreBtn">
                <img
                src="/images/Morehorizontal.svg"
                class="MoreIcon"
                alt=""
                />
                <div class="MoreOption">
                <a href="#">
                    <img
                    src="/images/edit2.svg"
                    alt="수정아이콘"
                    class="editIcon"
                    />
                    <p>작업 상태 수정</p>
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
        <div class="articleDesc">
            <p>작업 준비 사항들</p>
        </div>
        <div class="articleWrapper">
            <Article />
            <Article />
            <Article />
        </div>
        <div class="articleFooter">
            <button class="addWorkBtn">작업 추가</button>
        </div>
    </div>
  )
}
