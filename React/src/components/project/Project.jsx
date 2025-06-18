import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MoreOption from './modals/MoreOption';
import AddProjectModal from './modals/AddProjectModal';
import { PROJECT_DELETE_API, PROJECTS_API } from '../../api/_http.js';

export const Project = () => {
  const [projects, setProjects] = useState([]);
  const [openOptionIndex, setOpenOptionIndex] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
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

  // 수정 버튼을 클릭했을 때
  const handleEditClick = (index, title) => {
    setEditIndex(index);
    setEditedTitle(title);
    setOpenOptionIndex(null); // 옵션 닫기
  };

  // 프로젝트 제목 수정
  const handleUpdateProject = async (projectId) => {
    if (!editedTitle.trim()) {
      alert('프로젝트명을 입력해 주세요.');
      return;
    }

    try {
      await axios.put(`${PROJECTS_API}/${projectId}`, { title: editedTitle }, { withCredentials: true });
      // 로컬 상태 업데이트
      setProjects(prev =>
        prev.map((p, idx) => idx === editIndex ? { ...p, title: editedTitle } : p)
      );
      setEditIndex(null);
      setEditedTitle('');
    } catch (error) {
      console.error('프로젝트 수정 실패:', error);
      alert('수정에 실패했습니다.');
    }
  };

  // 프로젝트 삭제
  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      await axios.delete(PROJECT_DELETE_API(projectId), {
        withCredentials: true,
      });
      setProjects(prev => prev.filter(project => project.id !== projectId));
    } catch (error) {
      console.error('프로젝트 삭제 실패:', error);
      alert('삭제에 실패했습니다.');
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
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editedTitle}
                      className="editTitle"
                      placeholder="프로젝트명을 입력해 주세요."
                      onChange={(e) => setEditedTitle(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleUpdateProject(project.id)}
                      autoFocus
                    />
                  ) : (
                    <Link to={`/project/${project.id}`} className="projectTitle">
                      {project.title}
                    </Link>
                  )}
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
                    onEdit={() => handleEditClick(index, project.title)}
                    onDelete={() => handleDeleteProject(project.id)}
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
