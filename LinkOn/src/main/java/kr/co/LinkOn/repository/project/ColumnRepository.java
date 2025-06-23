package kr.co.LinkOn.repository.project;

import kr.co.LinkOn.entity.project.ProjectColumn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ColumnRepository extends JpaRepository<ProjectColumn, Long> {
    List<ProjectColumn> findByProject_Pid(Long pid);

}
