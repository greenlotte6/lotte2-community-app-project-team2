package kr.co.LinkOn.repository.project;

import kr.co.LinkOn.entity.project.ProjectColumn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ColumnRepository extends JpaRepository<ProjectColumn, Long> {
}
