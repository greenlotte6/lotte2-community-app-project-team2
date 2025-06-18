package kr.co.LinkOn.controller.project;

import kr.co.LinkOn.dto.project.ProjectDTO;
import kr.co.LinkOn.dto.project.ProjectResponseDTO;
import kr.co.LinkOn.entity.project.Project;
import kr.co.LinkOn.repository.project.ProjectRepository;
import kr.co.LinkOn.security.MyUserDetails;
import kr.co.LinkOn.service.project.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/projects")  // <-- 공통 prefix 선언
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;
    private final ProjectRepository projectRepository;

    @PostMapping
    public ResponseEntity<?> create(
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal MyUserDetails userDetails) {

        if (userDetails == null) {
            // 인증되지 않은 사용자라면 401 Unauthorized 반환
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증이 필요합니다.");
        }

        String title = body.get("title");
        String uid = userDetails.getUser().getUid(); // 현재 로그인된 사용자의 ID

        Project createdProject = projectService.createProject(title, uid);
        return ResponseEntity.ok(createdProject);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponseDTO>> getAllProjects(
            @AuthenticationPrincipal MyUserDetails userDetails) {

        String uid = userDetails.getUser().getUid();
        return ResponseEntity.ok(projectService.getProjectsByUser(uid));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String title = request.get("title");
        Project updated = projectService.modifyProject(id, title);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDTO> getProject(@PathVariable Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        // LAZY로딩 때문에 user 필드를 강제로 초기화하거나 getter로 접근
        String username = project.getUser().getName();

        ProjectDTO dto = new ProjectDTO(project.getPid(), project.getTitle(), username);

        return ResponseEntity.ok(dto);
    }


}
