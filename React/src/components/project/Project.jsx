import React from 'react'
import { Link } from 'react-router-dom'

export const Project = () => {
  return (
    <section id='projectMain'>
      <div className="sectionHeader">
        <h3>프로젝트</h3>
        <button type="button" className="addProject">+ 새 프로젝트 추가</button>
      </div>

      <div className="projectList">
        <div className="projects">
          <div className="projectInfo">
            <div>
              <img
                src="/images/projects.svg"
                alt="icon"
                className="projectsIcon"
              />
              <a href="#" className="projectTitle">
                롯데2차 사내 게시판 앱 프로젝트
              </a>
            </div>
            <p className="editDate">1시간 전에 업데이트됨</p>
          </div>

          <div className="MoreBtnContainer">
            <button type="button" className="MoreIcon">
              <img src="/images/Morehorizontal.svg" alt="more icon" />
            </button>
            <div className="MoreOption">
              <a href="#">
                <img
                  src="/images/edit2.svg"
                  alt="수정아이콘"
                  className="editIcon"
                />
                <p>프로젝트 수정</p>
              </a>
              <a href="#">
                <img
                  src="/images/remove.svg"
                  alt="삭제아이콘"
                  className="removeIcon"
                />
                <p>프로젝트 삭제</p>
              </a>
            </div>
          </div>
        </div>

        <div className="projects">
          <div className="projectInfo">
            <div>
              <img
                src="/images/projects.svg"
                alt="icon"
                className="projectsIcon"
              />
              <Link to="/project/inProject" className="projectTitle">
                롯데정보통신 사내 커뮤니티 게시판 사이트 개발 프로젝트 2조
              </Link>
            </div>
            <p className="editDate">1시간 전에 업데이트됨</p>
          </div>

          <div className="MoreBtnContainer">
            <button type="button" className="MoreIcon">
              <img src="/images/Morehorizontal.svg" alt="more icon" />
            </button>
            <div className="MoreOption">
              <a href="#">
                <img
                  src="/images/edit2.svg"
                  alt="수정아이콘"
                  className="editIcon"
                />
                <p>프로젝트 수정</p>
              </a>
              <a href="#">
                <img
                  src="/images/remove.svg"
                  alt="삭제아이콘"
                  className="removeIcon"
                />
                <p>프로젝트 삭제</p>
              </a>
            </div>
          </div>
        </div>

        <div className="projects">
          <div className="projectInfo">
            <div>
              <img
                src="/images/projects.svg"
                alt="icon"
                className="projectsIcon"
              />
              <a href="#" className="projectTitle">
                롯데2차 사내 게시판 앱 프로젝트
              </a>
            </div>
            <p className="editDate">1시간 전에 업데이트됨</p>
          </div>

          <div className="MoreBtnContainer">
            <button type="button" className="MoreIcon">
              <img src="/images/Morehorizontal.svg" alt="more icon" />
            </button>
            <div className="MoreOption">
              <a href="#">
                <img
                  src="/images/edit2.svg"
                  alt="수정아이콘"
                  className="editIcon"
                />
                <p>프로젝트 수정</p>
              </a>
              <a href="#">
                <img
                  src="/images/remove.svg"
                  alt="삭제아이콘"
                  className="removeIcon"
                />
                <p>프로젝트 삭제</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
