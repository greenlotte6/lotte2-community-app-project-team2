package kr.co.LinkOn.controller.user;

import jakarta.servlet.http.HttpSession;
import kr.co.LinkOn.dto.user.TermsDTO;
import kr.co.LinkOn.dto.user.UserDTO;
import kr.co.LinkOn.entity.user.User;
import kr.co.LinkOn.security.MyUserDetails;
import kr.co.LinkOn.service.user.UserService;
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
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.HashMap;
import java.util.List;
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
            map.put("name", user.getName());
            map.put("accessToken", access);
            //map.put("refreshToken", refresh);

            return ResponseEntity.ok().headers(headers).body(map);

        }catch (Exception e){
            log.info("login...3 : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user not found");
        }
    }

    // 유효성 검사
    @GetMapping("/user/{type}/{value}")
    public ResponseEntity<Map<String, Long>> user(@PathVariable("type") String type,
                                                  @PathVariable("value") String value) {
        log.info("type : " + type + ", value : " + value);

        long count = userService.checkUser(type, value);

        Map<String, Long> resultMap = new HashMap<>();
        resultMap.put("count", count);

        // JSON 반환
        return ResponseEntity.ok().body(resultMap);
    }

    // JSON 단일 문자열값이 직접 String으로 매핑되지 않기 때문에 JSON과 호환되는 Map 타입으로 JSON 수신

    //이메일
    // --- 이메일 인증 코드 발송 엔드포인트 ---
    @PostMapping("/user/email/sendCode") // 클라이언트에서 이메일 주소를 받아 인증 코드 발송
    public ResponseEntity<String> sendEmailCode(@RequestBody Map<String, String> map, HttpSession session) {
        String email = map.get("email");
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body("이메일 주소를 제공해야 합니다.");
        }
        try {
            userService.sendEmailCode(email, session); // UserService의 메서드 호출
            return ResponseEntity.ok().body("인증 코드가 이메일로 발송되었습니다.");
        } catch (RuntimeException e) { // UserService에서 발생한 예외를 여기서 처리
            log.error("Email sending failed for {}: {}", email, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이메일 발송에 실패했습니다: " + e.getMessage());
        }
    }

    // --- 이메일 인증 코드 확인 엔드포인트 ---
    // 기존 @PostMapping("/email/auth")를 그대로 사용하되, UserService를 통해 처리
    @PostMapping("/user/email/auth")
    public ResponseEntity<Map<String, Boolean>> emailAuth(@RequestBody Map<String, String> map, HttpSession session) {
        String authCode = map.get("authCode");
        log.info("Received authCode for verification: {}", authCode);

        // Map<String, Boolean> 형태로 변경하여 프론트에서 isVerified를 확인하도록 합니다.
        // 클라이언트에서 이메일 주소도 같이 보내주는 것이 좋습니다. (어떤 이메일에 대한 코드인지 명확히)
        // 현재는 세션에 하나만 저장한다고 가정
        boolean isVerified = userService.verifyEmailCode(authCode, session);

        // 결과 Map 생성
        Map<String, Boolean> response = Map.of("isVerified", isVerified);

        if (isVerified) {
            return ResponseEntity.ok().body(response);
        } else {
            // 400 Bad Request 대신 200 OK와 함께 isVerified: false를 보내는 것이 일반적
            // 클라이언트에서 isVerified 값을 보고 처리
            return ResponseEntity.ok().body(response);
        }
    }

    // 로그아웃
    @GetMapping("/user/logout")
    public ResponseEntity logout(){
        // HttpOnly Cookie 생성
        ResponseCookie accessTokenCookie = ResponseCookie.from("access_token", "")
                .httpOnly(true) // httpOnly 설정(XSS 방지)
                .secure(false)  // https 보안 프로토콜 적용
                .path("/")      // 쿠키 경로
                .maxAge(0) // 쿠키 수명
                .build();

        ResponseCookie refreshTokenCookie = ResponseCookie.from("refresh_token", "")
                .httpOnly(true) // httpOnly 설정(XSS 방지)
                .secure(false)  // https 보안 프로토콜 적용
                .path("/")      // 쿠키 경로
                .maxAge(0) // 쿠키 수명
                .build();

        // 쿠키를 Response 헤더에 추가
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.SET_COOKIE, accessTokenCookie.toString());
        headers.add(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());

        return ResponseEntity.ok().headers(headers).body(null);
    }

    @GetMapping("/user/list")
    public ResponseEntity<List<Map<String, String>>> getAllUsers() {
        List<User> users = userService.getAllUsers(); // 서비스 계층에 위임

        List<Map<String, String>> userList = users.stream()
                .map(user -> Map.of(
                        "uid", user.getUid(),
                        "name", user.getName()
                ))
                .toList();

        return ResponseEntity.ok(userList);
    }
}
