package kr.co.LinkOn.controller.membership;

import kr.co.LinkOn.dto.membership.CheckoutDTO;
import kr.co.LinkOn.dto.membership.MembershipDTO;
import kr.co.LinkOn.service.membership.MembershipService;
import kr.co.LinkOn.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RequiredArgsConstructor
@RestController
public class MembershipController {

    private final UserService userService;
    private final MembershipService membershipService;


    // 맴버십
    @GetMapping("/membership/membership")
    public ResponseEntity<List<MembershipDTO>> getMembershipPlans(){
        List<MembershipDTO> membershipDTOs = membershipService.getAllMemberships();
        return ResponseEntity.ok(membershipDTOs);
    }

    // 특정 멤버십 정보 조회가 필요하면 추가 가능 (예: /api/membership/{no})
    // @GetMapping("/{no}")
    // public ResponseEntity<MembershipDTO> getMembershipByNo(@PathVariable int no) {
    //     MembershipDTO membershipDTO = membershipService.getMembershipByNo(no);
    //     return ResponseEntity.ok(membershipDTO);
    // }

    // 맴버십 결제창
    @GetMapping("/membership/checkout")
    public ResponseEntity<MembershipDTO> getMembershipCheckout(@RequestParam("membershipNo") int no){
        MembershipDTO membershipDTO = membershipService.getMembershipByNo(no);
        return ResponseEntity.ok(membershipDTO);
    }

    @PostMapping("/membership/checkout") // /checkout/process 로 POST 요청
    public ResponseEntity<CheckoutDTO> processPayment(@RequestBody CheckoutDTO checkoutDTO) { // 요청 DTO도 CheckoutDTO 사용
        log.info("결제 요청 수신: {}", checkoutDTO);

        try {
            // 실제 운영 환경에서는 DTO의 userUid를 프론트엔드에서 직접 받는 대신,
            // Spring Security의 인증 컨텍스트에서 현재 로그인한 사용자의 UID를 가져와 설정하는 것이 보안상 안전합니다.
            // 예:
            // String currentUserId = SecurityContextHolder.getContext().getAuthentication().getName(); // 또는 다른 메서드
            // checkoutDTO.setUserUid(currentUserId);
            // 만약 현재 DTO에 userUid가 프론트에서 넘어온다면 그대로 사용.

            CheckoutDTO responseDTO = membershipService.processSimulatedPaymentAndUpdateMembership(checkoutDTO);
            return ResponseEntity.ok(responseDTO); // 성공 시 저장된 정보가 담긴 DTO 반환
        } catch (Exception e) {
            log.error("결제 시뮬레이션 및 멤버십 업데이트 중 오류 발생: {}", e.getMessage(), e);
            // 에러 시, HTTP 상태 코드와 메시지를 포함하는 ResponseEntity 반환
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(CheckoutDTO.builder().status("FAILED").build()); // 간단한 실패 DTO 반환 또는 에러 메시지 포함
        }
    }
}
