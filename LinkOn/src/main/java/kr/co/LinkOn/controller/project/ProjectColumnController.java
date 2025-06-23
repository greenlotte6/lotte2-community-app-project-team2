package kr.co.LinkOn.controller.project;

import kr.co.LinkOn.dto.project.ProjectColumnDTO;
import kr.co.LinkOn.dto.project.ProjectColumnRequestDTO;
import kr.co.LinkOn.entity.project.ProjectColumn;
import kr.co.LinkOn.service.project.ProjectColumnService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/projects")
public class ProjectColumnController {

    private final ProjectColumnService projectColumnService;

    @PostMapping("/{projectId}/columns")
    public ResponseEntity<?> addColumn(@PathVariable Long projectId, @RequestBody ProjectColumnRequestDTO dto) {
        projectColumnService.addProjectColumn(projectId, dto);
        return ResponseEntity.ok("컬럼이 추가되었습니다.");
    }

    @GetMapping("/{projectId}/columns")
    public List<ProjectColumnDTO> getProjectColumns(@PathVariable Long projectId) {
        List<ProjectColumnDTO> columns = projectColumnService.getColumnsByProjectId(projectId);
        return columns;
    }
}
