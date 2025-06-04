package kr.co.LinkOn.service;

import kr.co.LinkOn.dto.user.TermsDTO;
import kr.co.LinkOn.entity.user.Terms;
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
}
