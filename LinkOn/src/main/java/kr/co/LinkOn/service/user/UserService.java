package kr.co.LinkOn.service.user;

import kr.co.LinkOn.dto.user.TermsDTO;
import kr.co.LinkOn.dto.user.UserDTO;
import kr.co.LinkOn.entity.user.Terms;
import kr.co.LinkOn.entity.user.User;
import kr.co.LinkOn.repository.user.TermsRepository;
import kr.co.LinkOn.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final TermsRepository termsRepository;


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


}
