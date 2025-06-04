package kr.co.LinkOn.security.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import kr.co.LinkOn.util.JWTProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Log4j2
@RequiredArgsConstructor
@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private final JWTProvider jwtProvider;

    private static final String AUTH_HEADER = "Authorization";
    private static final String TOKEN_PREFIX = "Bearer";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // 요청 주소에서 마지막 문자열 추출
        String uri = request.getRequestURI();
        int i = uri.lastIndexOf("/");
        String path = uri.substring(i);

        log.info("doFilterInternal...1 : " + path);

        // HttpOnly 쿠키에서 토큰 추출
        String token = null;

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("access_token")) {
                    token = cookie.getValue();
                }
            }
        }

        /*
        // 토큰 추출
        String header = request.getHeader(AUTH_HEADER);
        log.info("doFilterInternal...2 : " + header);

        String token = null;

        if(header != null && header.startsWith(TOKEN_PREFIX)){
            token = header.substring(TOKEN_PREFIX.length());
        }
         */

        log.info("doFilterInternal...3 : " + token);

        // 토큰 검사
        if(token != null){
            try{
                log.info("doFilterInternal...4");
                jwtProvider.validateToken(token);

                log.info("doFilterInternal...5");
                // 시큐리티 인증 처리
                Authentication authentication = jwtProvider.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);

            }catch (Exception e) {
                log.info("doFilterInternal...9");

                // 토큰 유효성 검사 실패 응답
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write(e.getMessage());
                return;
            }
        }
        log.info("doFilterInternal...11");
        // 다음 필터 이동
        filterChain.doFilter(request, response);
    }
}
