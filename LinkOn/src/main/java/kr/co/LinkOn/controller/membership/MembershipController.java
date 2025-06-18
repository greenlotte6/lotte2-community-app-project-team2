package kr.co.LinkOn.controller.membership;

import kr.co.LinkOn.dto.membership.MembershipDTO;
import kr.co.LinkOn.service.membership.MembershipService;
import kr.co.LinkOn.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
