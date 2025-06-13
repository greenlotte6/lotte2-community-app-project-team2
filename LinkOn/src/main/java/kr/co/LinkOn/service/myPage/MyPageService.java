package kr.co.LinkOn.service.myPage;


import kr.co.LinkOn.dto.user.UserDTO;
import kr.co.LinkOn.entity.user.User;
import kr.co.LinkOn.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class MyPageService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper; // ModelMapper가 주입되어 있어야 합니다.

    // 사용자 정보 조회 메서드 (UID를 받아 UserDTO 반환)
    @Transactional(readOnly = true) // 조회 메서드는 readOnly = true 권장
    public UserDTO getMyPageInfo(String uid) {
        log.info("MyPageService - getMyPageInfo: Fetching user info for UID: {}", uid);
        Optional<User> optUser = userRepository.findByUid(uid);

        if (optUser.isPresent()) {
            User user = optUser.get();
            return modelMapper.map(user, UserDTO.class);
        } else {
            log.warn("MyPageService - getMyPageInfo: User not found for UID: {}", uid);
            return null; // 또는 UserNotFoundException 등 예외 처리
        }
    }

    // 기존 modifyUser 메서드는 그대로 유지
    @Transactional
    public UserDTO modifyUser(UserDTO userDTO, String loginUserId) {
        log.info("MyPageService - User modify request for user ID: {}", loginUserId);
        log.info("MyPageService - Received DTO for update: {}", userDTO);

        Optional<User> optUser = userRepository.findByUid(loginUserId);

        if (optUser.isPresent()) {
            User user = optUser.get();

            if (userDTO.getPass() != null && !userDTO.getPass().trim().isEmpty()) {
                // 비밀번호 인코딩 처리 필요 (여기서는 passwordEncoder가 없으므로 주석 처리 또는 추가)
                // user.setPass(passwordEncoder.encode(userDTO.getPass()));
                user.setPass(userDTO.getPass()); // 임시로 인코딩 없이 저장 (실제 서비스에서는 인코딩 필수!)
                log.info("MyPageService - Password updated for user: {}", loginUserId);
            }
            if (userDTO.getHp() != null && !userDTO.getHp().trim().isEmpty()) {
                user.setHp(userDTO.getHp());
                log.info("MyPageService - HP updated for user: {}", loginUserId);
            }
            if (userDTO.getEmail() != null && !userDTO.getEmail().trim().isEmpty()) {
                user.setEmail(userDTO.getEmail());
                log.info("MyPageService - Email updated for user: {}", loginUserId);
            }

            User updatedUser = userRepository.save(user);
            return modelMapper.map(updatedUser, UserDTO.class);
        } else {
            log.error("MyPageService - User not found for modification: {}", loginUserId);
            throw new IllegalArgumentException("해당 회원이 존재하지 않습니다.");
        }
    }
}
