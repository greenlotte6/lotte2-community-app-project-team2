package kr.co.LinkOn.repository.project;

import kr.co.LinkOn.entity.project.Column;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ColumnRepository extends JpaRepository<Column, Long> {
}
