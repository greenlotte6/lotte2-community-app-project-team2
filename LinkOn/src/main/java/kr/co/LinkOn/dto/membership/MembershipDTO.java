package kr.co.LinkOn.dto.membership;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class MembershipDTO {

    Integer no;
    String membership;
    Integer price;
}
