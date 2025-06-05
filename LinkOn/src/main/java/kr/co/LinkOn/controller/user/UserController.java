package kr.co.LinkOn.controller.user;

import kr.co.LinkOn.dto.user.TermsDTO;
import kr.co.LinkOn.dto.user.UserDTO;
import kr.co.LinkOn.entity.user.User;
import kr.co.LinkOn.security.MyUserDetails;
import kr.co.LinkOn.service.UserService;
import kr.co.LinkOn.util.JWTProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Log4j2
@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JWTProvider jwtProvider;


    // 이용약관 출력
    @GetMapping("/terms")
    public ResponseEntity terms(){
        TermsDTO termsDTO = userService.terms();
        return ResponseEntity.ok(termsDTO);
    }

    // 회원가입
    @PostMapping("/user")
    public Map<String, String> register(@RequestBody UserDTO userDTO){

        log.info(userDTO);

        String uid = userService.register(userDTO);
        return Map.of("userid", uid);
    }

    // 로그인
    @PostMapping("/user/login")
    public ResponseEntity login(@RequestBody UserDTO userDTO){

        log.info("login...1 : " + userDTO);
        try {
            // Security 인증 처리
            UsernamePasswordAuthenticationToken authToken
                    = new UsernamePasswordAuthenticationToken(userDTO.getUid(), userDTO.getPass());

            // 사용자 DB 조회
            Authentication authentication = authenticationManager.authenticate(authToken);
            log.info("login...2");

            // 인증된 사용자 가져오기
            MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();
            User user = userDetails.getUser();

            log.info("login...3 : " + user);

            // 토큰 발급(액세스, 리프레쉬)
            String access  = jwtProvider.createToken(user, 1); // 1일
            String refresh = jwtProvider.createToken(user, 7); // 7일

            // 리프레쉬 토큰 DB 저장

            // HttpOnly Cookie 생성
            ResponseCookie accessTokenCookie = ResponseCookie.from("access_token", access)
                    .httpOnly(true) // httpOnly 설정(XSS 방지)
                    .secure(false)  // https 보안 프로토콜 적용
                    .path("/")      // 쿠키 경로
                    .maxAge(Duration.ofDays(1)) // 쿠키 수명
                    .build();

            ResponseCookie refreshTokenCookie = ResponseCookie.from("refresh_token", refresh)
                    .httpOnly(true) // httpOnly 설정(XSS 방지)
                    .secure(false)  // https 보안 프로토콜 적용
                    .path("/")      // 쿠키 경로
                    .maxAge(Duration.ofDays(7)) // 쿠키 수명
                    .build();

            // 쿠키를 Response 헤더에 추가
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.SET_COOKIE, accessTokenCookie.toString());
            headers.add(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());

            // 액세스 토큰 클라이언트 전송
            Map<String, Object> map = new HashMap<>();
            map.put("grantType", "Bearer");
            map.put("username", user.getUid());
            //map.put("accessToken", access);
            //map.put("refreshToken", refresh);

            return ResponseEntity.ok().headers(headers).body(map);

        }catch (Exception e){
            log.info("login...3 : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user not found");
        }
    }

}
