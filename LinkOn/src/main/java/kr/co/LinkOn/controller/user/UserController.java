package kr.co.LinkOn.controller.user;

import kr.co.LinkOn.dto.user.TermsDTO;
import kr.co.LinkOn.service.UserService;
import kr.co.LinkOn.util.JWTProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JWTProvider jwtProvider;


    @GetMapping("/terms")
    public ResponseEntity terms(){
        TermsDTO termsDTO = userService.terms();
        return ResponseEntity.ok(termsDTO);
    }

}
