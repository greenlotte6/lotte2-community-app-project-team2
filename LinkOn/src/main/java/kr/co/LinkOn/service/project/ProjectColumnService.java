package kr.co.LinkOn.service.project;

import kr.co.LinkOn.dto.project.ProjectColumnDTO;
import kr.co.LinkOn.dto.project.ProjectColumnRequestDTO;
import kr.co.LinkOn.entity.project.Project;
import kr.co.LinkOn.entity.project.ProjectColumn;
import kr.co.LinkOn.repository.project.ColumnRepository;
import kr.co.LinkOn.repository.project.ProjectRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Builder
public class ProjectColumnService {

    private final ProjectRepository projectRepository;
    private final ColumnRepository columnRepository;

    public void addProjectColumn(Long projectId, ProjectColumnRequestDTO dto) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("해당 프로젝트가 없습니다."));

        ProjectColumn column = ProjectColumn.builder()
                .name(dto.getName())
                .content(dto.getContent())
                .color(dto.getColor())
                .project(project)
                .build();

        columnRepository.save(column);
    }

    public List<ProjectColumnDTO> getColumnsByProjectId(Long projectId) {
        List<ProjectColumn> entities = columnRepository.findByProject_Pid(projectId);
        return entities.stream()
                .map(e -> {
                    ProjectColumnDTO dto = new ProjectColumnDTO();
                    dto.setCid(e.getCid());
                    dto.setName(e.getName());
                    dto.setContent(e.getContent());
                    dto.setColor(e.getColor());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
