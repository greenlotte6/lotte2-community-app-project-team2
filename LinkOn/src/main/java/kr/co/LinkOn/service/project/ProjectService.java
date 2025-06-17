package kr.co.LinkOn.service.project;

import kr.co.LinkOn.dto.project.ProjectResponseDTO;
import kr.co.LinkOn.entity.project.Project;
import kr.co.LinkOn.entity.user.User;
import kr.co.LinkOn.repository.project.ProjectRepository;
import kr.co.LinkOn.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public Project createProject(String title, String uid) {
        User user = userRepository.findByUid(uid).orElseThrow();
        Project project = new Project();
        project.setTitle(title);
        project.setUser(user); // 소유자 설정
        return projectRepository.save(project);
    }

    public List<ProjectResponseDTO> getProjectsByUser(String uid) {
        return projectRepository.findByUser_Uid(uid).stream()
                .map(ProjectResponseDTO::from)
                .collect(Collectors.toList());
    }



    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
}
