package kr.co.LinkOn.service.user;

import jakarta.mail.Message;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import kr.co.LinkOn.dto.user.TermsDTO;
import kr.co.LinkOn.dto.user.UserDTO;
import kr.co.LinkOn.entity.user.Terms;
import kr.co.LinkOn.entity.user.User;
import kr.co.LinkOn.repository.user.TermsRepository;
import kr.co.LinkOn.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final TermsRepository termsRepository;
    private final JavaMailSender mailSender;

    private final HttpServletRequest request;


    public TermsDTO terms() {

        Optional<Terms> optTerms = termsRepository.findById(1);

        if (optTerms.isPresent()) {
            Terms terms = optTerms.get();
            TermsDTO termsDTO = modelMapper.map(terms, TermsDTO.class); // 객체 생성modelMapper.map(terms, TermsDTO.class);
            return termsDTO;
        }
        return null;

    }

    public String register(UserDTO userDTO) {

        String encoded = passwordEncoder.encode(userDTO.getPass());
        userDTO.setPass(encoded);

        User user = modelMapper.map(userDTO, User.class);
        User savedUser = userRepository.save(user);

        return savedUser.getUid();
    }

    // 유효성 검사
    public long checkUser(String type, String value) {
        long count = 0;

        if (type.equals("uid")) {
            count = userRepository.countByUid(value);
        } else if (type.equals("email")) {
            count = userRepository.countByEmail(value); // ✅ 중복 여부만 확인
        } else if (type.equals("hp")) {
            count = userRepository.countByHp(value);
        }

        return count;
    }



    @Value("${spring.mail.username}") // <-- 이 어노테이션의 올바른 사용법 및 임포트 확인!
    private String senderEmail; // 필드명을 sender에서 senderEmail로 변경 (sender는 senderEmail 이메일 주소를 의미)

    // 이메일 인증 코드를 발송하고 세션에 저장하는 메서드
    public String sendEmailCode(String receiverEmail, HttpSession session) { // receiver는 이메일 주소
        // MimeMessage 생성
        MimeMessage message = mailSender.createMimeMessage();

        // 인증코드 생성 (6자리 숫자)
        int code = ThreadLocalRandom.current().nextInt(100000, 1000000);
        log.info("Generated Email Code: " + code);

        String subject = "LinkOn 이메일 인증 코드 안내";
        String content = "<h1 style='color: #0056b3;'>LinkOn 이메일 인증</h1>"
                + "<p>안녕하세요. LinkOn 회원가입을 위한 인증 코드입니다.</p>"
                + "<p style='font-size: 24px; font-weight: bold; color: #d9534f;'>" + code + "</p>"
                + "<p>인증 코드는 5분간 유효합니다.</p>"
                + "<p>본인이 요청하지 않았다면 이 메일을 무시해주세요.</p>";

        try {
            message.setFrom(new InternetAddress(senderEmail, "LinkOn", "UTF-8")); // 보내는 사람 이름 명시
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(receiverEmail));
            message.setSubject(subject);
            message.setContent(content, "text/html;charset=UTF-8");

            mailSender.send(message);

            // 중요: 세션에 인증 코드와 만료 시간 저장 (세션 사용 시)
            // 실제 구현에서는 Redis/Cache 사용을 강력 권장합니다.
            session.setAttribute("emailAuthCode", String.valueOf(code));
            session.setAttribute("emailAuthTime", LocalDateTime.now().plusMinutes(5)); // 5분 후 만료 설정
            log.info("Email code sent to {} and stored in session. Code: {}, Expiration: {}", receiverEmail, code, session.getAttribute("emailAuthTime"));

        } catch (Exception e) {
            log.error("Failed to send email to {}: {}", receiverEmail, e.getMessage(), e); // 스택 트레이스 포함
            // 이메일 발송 실패 시 예외를 다시 던져서 컨트롤러가 처리하도록 할 수 있습니다.
            throw new RuntimeException("이메일 발송에 실패했습니다.", e);
        }

        return String.valueOf(code); // 이 메서드에서 직접 반환된 코드는 주로 로깅/디버깅 목적
    }


    // 이메일 인증 코드 확인 메서드 (서비스 계층)
    public boolean verifyEmailCode(String inputCode, HttpSession session) {
        String storedCode = (String) session.getAttribute("emailAuthCode");
        LocalDateTime storedTime = (LocalDateTime) session.getAttribute("emailAuthTime");

        if (storedCode == null || storedTime == null) {
            log.warn("Email verification: No code or expiration time found in session.");
            return false; // 저장된 코드가 없음
        }

        // 만료 시간 확인
        if (LocalDateTime.now().isAfter(storedTime)) {
            session.removeAttribute("emailAuthCode"); // 만료된 코드 삭제
            session.removeAttribute("emailAuthTime");
            log.warn("Email verification: Code expired.");
            return false; // 코드 만료
        }

        // 코드 일치 여부 확인
        boolean isMatch = inputCode.equals(storedCode);
        if (isMatch) {
            // 인증 성공 시 세션에서 코드 삭제 (중요!)
            session.removeAttribute("emailAuthCode");
            session.removeAttribute("emailAuthTime");
            log.info("Email verification successful. Code removed from session.");
        } else {
            log.warn("Email verification failed: Input code '{}' does not match stored code.", inputCode);
        }
        return isMatch;
    }


}
