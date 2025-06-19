package kr.co.LinkOn.entity.user;

import jakarta.persistence.*;
import kr.co.LinkOn.entity.membership.Membership;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "user")
public class User {

    @Id
    private String uid;
    private String pass;
    private String name;
    private String email;
    private String hp;
    private String role;
    private String regip;
    private String sms;
    private String provider;

    @CreationTimestamp
    private LocalDateTime regDate;
    private LocalDateTime leaveDate;

    private String department; //팀명
    private String position;  // 직급
    private String status;  // 상태

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "membership")
    private Membership membership;  // 맴버십


    // 사용자 권한 및 인가 설정을 hasRole() 메서드로 처리하기 위해 접두어 "ROLE_" 추가
    public String getRole() {
        return "ROLE_"+role;
    }

}
