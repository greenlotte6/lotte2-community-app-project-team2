package kr.co.LinkOn.dto.membership;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class MembershipDTO {

    int no;
    String membership;
    int price;
}
