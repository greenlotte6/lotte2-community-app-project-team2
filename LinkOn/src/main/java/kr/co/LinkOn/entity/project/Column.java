package kr.co.LinkOn.entity.project;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "Column")
public class Column {
    @Id @GeneratedValue
    private Long cid;

    private String name; // ex: Todo, In Progress, Done

    @ManyToOne
    @JoinColumn(name = "pid")
    private Project project;

    @OneToMany(mappedBy = "column", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> tasks = new ArrayList<>();
}
