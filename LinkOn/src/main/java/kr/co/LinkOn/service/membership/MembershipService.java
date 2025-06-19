package kr.co.LinkOn.service.membership;

import jakarta.servlet.http.HttpServletRequest;
import kr.co.LinkOn.dto.membership.CheckoutDTO;
import kr.co.LinkOn.dto.membership.MembershipDTO;
import kr.co.LinkOn.entity.membership.Checkout;
import kr.co.LinkOn.entity.membership.Membership;
import kr.co.LinkOn.entity.user.User;
import kr.co.LinkOn.repository.membership.CheckoutRepository;
import kr.co.LinkOn.repository.membership.MembershipRepository;
import kr.co.LinkOn.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class MembershipService {

    private final MembershipRepository membershipRepository;
    private final ModelMapper modelMapper;
    private final HttpServletRequest request;
    private final CheckoutRepository checkoutRepository;
    private final UserRepository userRepository;

    public List<MembershipDTO> getAllMemberships() {

        // 1. 모든 Membership 엔티티 조회
        List<Membership> memberships = membershipRepository.findAll(); // 모든 엔티티를 가져오는 JPA 메서드

        // 2. 엔티티 리스트를 DTO 리스트로 변환
        List<MembershipDTO> membershipDTOs = memberships.stream()
                .map(membership -> modelMapper.map(membership, MembershipDTO.class))
                .collect(Collectors.toList());

        log.info("Found {} membership plans.", membershipDTOs.size());
        return membershipDTOs;
    }

    /**
     * 특정 멤버십 번호로 멤버십 정보를 조회합니다. (선택 사항, Checkout 페이지에서 사용 가능)
     * @param no 멤버십 고유 번호
     * @return MembershipDTO
     */
    public MembershipDTO getMembershipByNo(int no) {
        Membership membership = membershipRepository.findById(no)
                .orElseThrow(() -> new IllegalArgumentException("Membership not found with No: " + no));
        return modelMapper.map(membership, MembershipDTO.class);
    }

    @Transactional
    public CheckoutDTO processSimulatedPaymentAndUpdateMembership(CheckoutDTO checkoutDTO) {
        log.info("결제 시뮬레이션 및 멤버십 업데이트 서비스 시작. 요청 DTO: {}", checkoutDTO);

        // 1. 사용자 조회 (user_uid를 User의 PK로 사용)
        User user = userRepository.findById(checkoutDTO.getUser_Uid())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다: " + checkoutDTO.getUser_Uid()));
        log.info("사용자 조회 성공: {}", user.getUid());

        // 2. 선택된 멤버십 플랜 정보 조회
        Membership selectedMembership = membershipRepository.findById(checkoutDTO.getMembership_No())
                .orElseThrow(() -> new RuntimeException("선택된 멤버십 플랜을 찾을 수 없습니다: " + checkoutDTO.getMembership_No()));
        log.info("멤버십 플랜 조회 성공: {}", selectedMembership.getMembership());

        // 3. 가상 결제 시뮬레이션 (항상 성공으로 간주)
        boolean paymentSuccess = true;
        if (!paymentSuccess) {
            log.warn("가상 결제 실패: 사용자 UID={}, 멤버십 No={}", checkoutDTO.getUser_Uid(), checkoutDTO.getMembership_No());
            throw new RuntimeException("가상 결제에 실패했습니다.");
        }

        // 4. Checkout Entity 생성 및 저장
        Checkout checkoutEntity = Checkout.builder()
                .user(user) // User 엔티티 객체 설정
                .membership(selectedMembership) // Membership 엔티티 객체 설정
                .name(checkoutDTO.getName())
                .email(checkoutDTO.getEmail())
                .hp(checkoutDTO.getHp())
                .cardName(checkoutDTO.getCardName())
                .cardNumber(checkoutDTO.getCardNumber())
                .expiryDate(checkoutDTO.getExpiryDate())
                .amount(selectedMembership.getPrice()) // Membership 엔티티에서 가격 가져옴
                .paymentDate(LocalDateTime.now()) // 현재 시간으로 설정
                .status("SUCCESS") // 결제 성공 상태
                .build();

        Checkout savedCheckout = checkoutRepository.save(checkoutEntity);
        log.info("결제 기록 저장 완료 (Checkout ID: {}), 사용자: {}", savedCheckout.getNo(), user.getUid());

        // 5. User Entity의 멤버십 컬럼 업데이트
        user.setMembership(selectedMembership); // User 엔티티의 'membership' 필드를 새로운 Membership 엔티티로 업데이트
        userRepository.save(user); // 변경된 User 정보 저장
        log.info("사용자 {}의 멤버십이 {} 플랜으로 업데이트되었습니다.", user.getUid(), selectedMembership.getMembership());

        // 응답을 위한 DTO 반환
        // 저장된 엔티티 정보를 바탕으로 DTO를 다시 빌드하여 반환할 수도 있습니다.
        return CheckoutDTO.builder()
                .no(savedCheckout.getNo())
                .user_Uid(savedCheckout.getUser().getUid())
                .membership_No(savedCheckout.getMembership().getNo())
                .name(savedCheckout.getName())
                .email(savedCheckout.getEmail())
                .hp(savedCheckout.getHp())
                .cardName(savedCheckout.getCardName())
                .cardNumber(savedCheckout.getCardNumber())
                .expiryDate(savedCheckout.getExpiryDate())
                .amount(savedCheckout.getAmount())
                .paymentDate(savedCheckout.getPaymentDate())
                .status(savedCheckout.getStatus())
                .build();
    }
}
