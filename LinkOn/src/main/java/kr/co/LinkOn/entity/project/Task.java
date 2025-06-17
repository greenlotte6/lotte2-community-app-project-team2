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
@Table(name = "Task")
public class Task {
    @Id @GeneratedValue
    private Long id;

    private String title;

    private String description;

    @ManyToOne
    @JoinColumn(name = "cid")
    private Column column;
}
