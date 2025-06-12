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
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    // modifyUser 메서드에 loginUserId 파라미터 추가
    @Transactional
    public UserDTO modifyUser(UserDTO userDTO, String loginUserId) { // <-- 파라미터 추가
        // SecurityContextHolder에서 직접 가져오지 않고, 컨트롤러에서 넘겨받은 loginUserId 사용
        log.info("MyPageService - User modify request for user ID: {}", loginUserId);
        log.info("MyPageService - Received DTO for update: {}", userDTO);

        Optional<User> optUser = userRepository.findByUid(loginUserId); // UID로 사용자 조회

        if (optUser.isPresent()) {
            User user = optUser.get(); // 기존 사용자 데이터 조회

            // 새로운 값으로 업데이트 (값이 제공된 경우에만 업데이트!)
            if (userDTO.getPass() != null && !userDTO.getPass().trim().isEmpty()) {
                user.setPass(passwordEncoder.encode(userDTO.getPass()));
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

            // 추가적인 필드가 있다면 여기에 업데이트 로직 추가
            // user.setName(userDTO.getName()); // 예를 들어 이름도 수정한다면
            // user.setDepartment(userDTO.getDepartment());

            // 저장
            User updatedUser = userRepository.save(user); // 변경된 엔티티 저장 후 반환

            // 업데이트된 User 엔티티를 UserDTO로 변환하여 반환
            return modelMapper.map(updatedUser, UserDTO.class);
        } else {
            log.error("MyPageService - User not found for modification: {}", loginUserId);
            throw new IllegalArgumentException("해당 회원이 존재하지 않습니다.");
        }
    }
}
