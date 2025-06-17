package kr.co.LinkOn.dto.project;

import kr.co.LinkOn.entity.project.Project;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
public class ProjectResponseDTO {
    private Long id;
    private String title;
    private LocalDateTime updatedAt;

    public static ProjectResponseDTO from(Project project) {
        return ProjectResponseDTO.builder()
                .id(project.getPid())
                .title(project.getTitle())
                .updatedAt(project.getUpdatedAt())
                .build();
    }
}
