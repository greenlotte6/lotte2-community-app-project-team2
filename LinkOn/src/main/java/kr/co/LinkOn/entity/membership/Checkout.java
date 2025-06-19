package kr.co.LinkOn.entity.membership;

import jakarta.persistence.*;
import kr.co.LinkOn.entity.user.User;
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
@Table(name = "checkout")
public class Checkout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long no;

    // --- User 엔티티와의 관계 설정 ---
    @ManyToOne(fetch = FetchType.LAZY) // 다대일 관계
    @JoinColumn(name = "user_Uid", referencedColumnName = "uid", nullable = false)
    private User user; // 결제한 사용자 엔티티 참조

    @ManyToOne(fetch = FetchType.LAZY) // 다대일 관계
    @JoinColumn(name = "membership_No", referencedColumnName = "no", nullable = false)
    private Membership membership; // 결제된 멤버십 플랜 엔티티 참조

    @Column(nullable = false) // 필수 필드임을 명시
    String name;

    @Column(nullable = false) // 필수 필드임을 명시
    String email;

    @Column(nullable = false) // 필수 필드임을 명시
    String hp;

    @Column(nullable = false) // 필수 필드임을 명시
    String cardName;
    @Column(nullable = false) // 필수 필드임을 명시
    String cardNumber;
    @Column(nullable = false) // 필수 필드임을 명시
    String expiryDate;

    @Column(nullable = false)
    private Integer amount; // int price; 였으므로 int로 유지

    @CreationTimestamp // 결제 시간 자동 기록
    @Column(nullable = false)
    private LocalDateTime paymentDate;

    @Column(nullable = false)
    private String status; // 결제 상태 (예: "SUCCESS", "FAILED")
}
