package kr.co.LinkOn.entity.membership;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "membership")
public class Membership {

    @Id
    int no;
    String membership;
    int price;
}
