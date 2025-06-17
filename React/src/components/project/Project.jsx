import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MoreOption from './modals/MoreOption';
import AddProjectModal from './modals/AddProjectModal';
import { PROJECTS_API } from '../../api/_http.js';

export const Project = () => {
  const [projects, setProjects] = useState([]);
  const [openOptionIndex, setOpenOptionIndex] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const modalRef = useRef(null);

  // 프로젝트 목록 조회
  const fetchProjects = async () => {
    try {
      const res = await axios.get(PROJECTS_API, {
        withCredentials: true, // 쿠키를 자동으로 포함시킴
      });

      const projectsData = Array.isArray(res.data)
        ? res.data
        : (res.data && Array.isArray(res.data.projects) ? res.data.projects : []);
      setProjects(projectsData);
    } catch (error) {
      console.error('프로젝트 불러오기 실패:', error);
      setProjects([]);
    }
  };

  // 프로젝트 추가
  const handleAddProject = async (projectName) => {
    try {
      const res = await axios.post(PROJECTS_API, { title: projectName }, { withCredentials: true });
      setProjects(prev => [...prev, res.data]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('프로젝트 추가 실패:', error);
      alert('프로젝트 추가에 실패했습니다.');
    }
  };


  // 모달 외부 클릭 시 닫기 (MoreOption 모달)
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setOpenOptionIndex(null);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (openOptionIndex !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openOptionIndex]);

  const toggleOption = (index) => {
    setOpenOptionIndex(openOptionIndex === index ? null : index);
  };

  return (
    <section id="projectMain">
      <div className="sectionHeader">
        <h3>프로젝트</h3>
        <button
          type="button"
          className="addProject"
          onClick={() => setIsAddModalOpen(true)}
        >
          + 새 프로젝트 추가
        </button>
      </div>

      <div className="projectList">
        {Array.isArray(projects) && projects.length > 0 ? (
          projects.map((project, index) => (
            <div className="projects" key={project.id}>
              <div className="projectInfo">
                <div>
                  <img
                    src="/images/projects.svg"
                    alt="icon"
                    className="projectsIcon"
                  />
                  <Link to={`/project/${project.id}`} className="projectTitle">
                    {project.title}
                  </Link>
                </div>
                <p className="editDate">
                  {new Date(project.updatedAt).toLocaleString()}
                </p>
              </div>

              <div
                className="MoreBtnContainer"
                ref={openOptionIndex === index ? modalRef : null}
              >
                <button
                  type="button"
                  className="MoreIcon"
                  onClick={() => toggleOption(index)}
                >
                  <img src="/images/Morehorizontal.svg" alt="more icon" />
                </button>

                {openOptionIndex === index && (
                  <MoreOption
                    onEdit={() => alert(`프로젝트 ${project.id} 수정`)}
                    onDelete={() => alert(`프로젝트 ${project.id} 삭제`)}
                    onClose={() => setOpenOptionIndex(null)}
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <p>등록된 프로젝트가 없습니다.</p>
        )}
      </div>

      {isAddModalOpen && (
        <AddProjectModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddProject}
        />
      )}
    </section>
  );
};
