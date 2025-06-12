package kr.co.LinkOn.controller.mypage;


import kr.co.LinkOn.dto.user.UserDTO;
import kr.co.LinkOn.entity.user.User;
import kr.co.LinkOn.security.MyUserDetails;
import kr.co.LinkOn.service.myPage.MyPageService;
import kr.co.LinkOn.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
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
    public ResponseEntity<UserDTO> myPage(Principal principal) {
        String userId = null;

        // 1. Principal 객체가 Spring Security의 Authentication 타입인지 확인합니다.
        //    대부분의 경우 주입되는 Principal은 Authentication 인스턴스입니다.
        if (principal instanceof Authentication) {
            Authentication authentication = (Authentication) principal;

            // 2. Authentication 객체에서 실제 principal(사용자 정보) 객체를 가져옵니다.
            //    JWTProvider에서 User 엔티티를 principal로 설정했으므로, 이 시점에서는 User 엔티티 객체입니다.
            Object authenticatedPrincipal = authentication.getPrincipal();

            // 3. 가져온 principal 객체가 User 엔티티 타입인지 확인하고, User 타입으로 캐스팅합니다.
            if (authenticatedPrincipal instanceof User) {
                User userEntity = (User) authenticatedPrincipal;
                // 4. User 엔티티에서 올바른 uid 값을 추출합니다.
                userId = userEntity.getUid();
            } else {
                // 예상치 못한 타입인 경우 (로그를 남기고 런타임 예외를 발생시켜 디버깅에 도움을 줍니다.)
                log.error("Error: Authenticated principal is not an instance of User entity. Type: {}", authenticatedPrincipal.getClass().getName());
                throw new RuntimeException("인증된 사용자 주체 타입이 올바르지 않습니다.");
            }
        } else {
            // Principal이 Authentication이 아닌 경우 (Spring Security 설정에 문제가 있을 수 있습니다.)
            log.error("Error: Principal is not an instance of Authentication. Type: {}", principal.getClass().getName());
            throw new RuntimeException("인증 객체를 Principal에서 찾을 수 없습니다.");
        }

        // 최종적으로 추출된 userId가 null이면 예외를 발생시킵니다.
        if (userId == null) {
            throw new RuntimeException("인증된 사용자 ID를 추출할 수 없습니다.");
        }

        log.info("Extracted User ID for myPage: {}", userId); // 추출된 최종 userId를 확인합니다.
        UserDTO userDTO = userService.getUserInfo(userId);
        return ResponseEntity.ok(userDTO);
    }

    // 나의 설정 수정 엔드포인트 (PUT 요청)
    @PutMapping("/myPage/myPage")
    public ResponseEntity<UserDTO> modify(
            @RequestBody UserDTO userDTO,
            @AuthenticationPrincipal MyUserDetails myUserDetails) { // <-- 이 부분이 핵심 변경

        // MyUserDetails 객체에서 직접 UID를 가져옵니다.
        String loginUserId = myUserDetails.getUsername();

        log.info("Received request to modify user for UID: {}", loginUserId);
        log.info("Received DTO: {}", userDTO);

        // 서비스 메서드 호출 시 추출한 loginUserId를 넘겨줍니다.
        UserDTO updatedUser = myPageService.modifyUser(userDTO, loginUserId);
        return ResponseEntity.ok(updatedUser);
    }
}