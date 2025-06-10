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
    private String role;
    private String regip;
    private String sms;
    private String regDate;
    private String leaveDate;
}
