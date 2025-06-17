package kr.co.LinkOn.controller.project;

import kr.co.LinkOn.dto.project.ProjectResponseDTO;
import kr.co.LinkOn.entity.project.Project;
import kr.co.LinkOn.security.MyUserDetails;
import kr.co.LinkOn.service.project.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/projects")  // <-- 공통 prefix 선언
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

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
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponseDTO>> getAllProjects(
            @AuthenticationPrincipal MyUserDetails userDetails) {

        String uid = userDetails.getUser().getUid();
        return ResponseEntity.ok(projectService.getProjectsByUser(uid));
    }

}
