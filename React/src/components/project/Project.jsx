import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MoreOption from './modals/MoreOption';

export const Project = () => {
  const [openOptionIndex, setOpenOptionIndex] = useState(null);

  const toggleOption = (index) => {
    setOpenOptionIndex(openOptionIndex === index ? null : index);
  };

  const projects = [
    {
      title: '롯데2차 사내 게시판 앱 프로젝트',
      link: '#',
      updated: '1시간 전에 업데이트됨',
    },
    {
      title: '롯데정보통신 사내 커뮤니티 게시판 사이트 개발 프로젝트 2조',
      link: '/project/inProject',
      updated: '1시간 전에 업데이트됨',
    },
    {
      title: '롯데2차 사내 게시판 앱 프로젝트',
      link: '#',
      updated: '1시간 전에 업데이트됨',
    },
  ];

  return (
    <section id="projectMain">
      <div className="sectionHeader">
        <h3>프로젝트</h3>
        <button type="button" className="addProject">+ 새 프로젝트 추가</button>
      </div>

      <div className="projectList">
        {projects.map((project, index) => (
          <div className="projects" key={index}>
            <div className="projectInfo">
              <div>
                <img src="/images/projects.svg" alt="icon" className="projectsIcon" />
                {project.link === '#' ? (
                  <a href="#" className="projectTitle">{project.title}</a>
                ) : (
                  <Link to={project.link} className="projectTitle">{project.title}</Link>
                )}
              </div>
              <p className="editDate">{project.updated}</p>
            </div>

            <div className="MoreBtnContainer">
              <button type="button" className="MoreIcon" onClick={() => toggleOption(index)}>
                <img src="/images/Morehorizontal.svg" alt="more icon" />
              </button>

              {openOptionIndex === index && (
                <MoreOption
                  onEdit={() => alert(`프로젝트 ${index + 1} 수정`)}
                  onDelete={() => alert(`프로젝트 ${index + 1} 삭제`)}
                  onClose={() => setOpenOptionIndex(null)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
