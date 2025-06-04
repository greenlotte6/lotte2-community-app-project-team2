package kr.co.LinkOn.security;


import kr.co.LinkOn.entity.user.User;

import kr.co.LinkOn.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class SecurityUserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        log.info("loadUserByUsername...1 : " + username);
        Optional<User> result = userRepository.findById(username);

        log.info("loadUserByUsername...2 : " + result);
        UserDetails userDetails = null;

        if(!result.isEmpty()){
            log.info("loadUserByUsername...3 : " + result.get());
            // 해당하는 사용자가 존재하면 인증 객체 생성
            userDetails = MyUserDetails.builder()
                                        .user(result.get())
                                        .build();
        }
        log.info("loadUserByUsername...4 : " + userDetails);
        // Security ContextHolder 저장
        return userDetails;
    }
}
