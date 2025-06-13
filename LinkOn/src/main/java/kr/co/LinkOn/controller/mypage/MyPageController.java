package kr.co.LinkOn.controller.mypage;


import kr.co.LinkOn.dto.user.UserDTO;
import kr.co.LinkOn.entity.user.User;
import kr.co.LinkOn.security.MyUserDetails;
import kr.co.LinkOn.service.myPage.MyPageService;
import kr.co.LinkOn.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Log4j2
@RequiredArgsConstructor
@RestController
public class MyPageController {

    private final MyPageService myPageService;
    private final UserService userService;

    // 나의 설정
    @GetMapping("/myPage/myPage")
    public ResponseEntity<UserDTO> myPage(@AuthenticationPrincipal MyUserDetails myUserDetails) { // MyUserDetails로 직접 받음

        if (myUserDetails == null) {
            log.warn("MyPageController - myPage: @AuthenticationPrincipal MyUserDetails is null. User not authenticated.");
            // 401 Unauthorized 또는 다른 적절한 에러 처리
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(null); // 또는 에러 DTO 반환
        }

        // MyUserDetails 객체에서 User 엔티티를 가져옵니다.
        // MyUserDetails는 User 엔티티가 아니므로 직접 캐스팅하면 안 됩니다.
        User user = myUserDetails.getUser(); // MyUserDetails 내부에 있는 User 엔티티를 가져옴

        if (user == null) {
            log.error("MyPageController - myPage: User entity inside MyUserDetails is null for principal: {}", myUserDetails.getUsername());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null); // 또는 적절한 에러 DTO 반환
        }

        log.info("MyPageController - myPage: Authenticated user UID: {}", user.getUid());

        // MyPageService에서 사용자 정보를 조회하는 메서드 호출
        // 서비스 메서드는 User 엔티티 또는 UID를 인자로 받을 수 있습니다.
        UserDTO myPageInfo = myPageService.getMyPageInfo(user.getUid()); // UID를 서비스로 전달

        if (myPageInfo == null) {
            log.warn("MyPageController - myPage: MyPage info not found for UID: {}", user.getUid());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }

        return ResponseEntity.ok(myPageInfo);
    }

    // 나의 설정 수정 엔드포인트 (PUT 요청)
    @PutMapping("/myPage/myPage")
    public ResponseEntity<UserDTO> modify(
            @RequestBody UserDTO userDTO,
            @AuthenticationPrincipal MyUserDetails myUserDetails) {

        if (myUserDetails == null) {
            log.warn("MyPageController - modify: @AuthenticationPrincipal MyUserDetails is null. User not authenticated.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(null); // 또는 오류 메시지 포함한 DTO
        }

        // MyUserDetails 객체에서 직접 UID를 가져옵니다. (getUsername() 사용)
        String loginUserId = myUserDetails.getUsername();
        log.info("MyPageController - modify: Received request to modify user for UID: {}", loginUserId);
        log.info("MyPageController - modify: Received DTO: {}", userDTO);

        // 서비스 메서드 호출 시 추출한 loginUserId를 넘겨줍니다.
        UserDTO updatedUser = myPageService.modifyUser(userDTO, loginUserId);
        return ResponseEntity.ok(updatedUser);
    }
}