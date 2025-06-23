package kr.co.LinkOn.entity.project;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "ProjectColumn")
public class ProjectColumn {

    @Id @GeneratedValue
    private Long cid;

    private String name; // ex: Todo, In Progress, Done

    @Column(nullable = false)
    private String color;

    private String content;

    @ManyToOne
    @JoinColumn(name = "pid")
    private Project project;

    @OneToMany(mappedBy = "projectColumn", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Task> tasks = new ArrayList<>();
}
