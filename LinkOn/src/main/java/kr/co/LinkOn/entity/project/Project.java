package kr.co.LinkOn.entity.project;

import jakarta.persistence.*;
import kr.co.LinkOn.entity.user.User;
import lombok.*;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "Project")
public class Project {

    @Id @GeneratedValue
    private Long pid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uid")
    private User user;

    private String title;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Column> columns = new ArrayList<>();

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
