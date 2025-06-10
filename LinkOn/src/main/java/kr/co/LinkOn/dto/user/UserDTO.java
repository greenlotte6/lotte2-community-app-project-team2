package kr.co.LinkOn.dto.user;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class UserDTO {

    private String uid;
    private String pass;
    private String name;
    private String email;
    private String hp;
    private String role;    // 권한
    private String regip;
    private String sms;
    private String regDate;
    private String leaveDate;
    private String department; //팀명
    private String position;  // 직급
    private String status;  // 상태
    private String membership;  // 맴버십
}
