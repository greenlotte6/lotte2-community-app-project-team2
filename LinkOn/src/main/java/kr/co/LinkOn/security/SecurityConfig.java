package kr.co.LinkOn.security;


import kr.co.LinkOn.security.filter.JWTAuthenticationFilter;

import kr.co.LinkOn.util.JWTProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.FormLoginConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JWTProvider jwtProvider;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {

        // 토큰기반 인증 시큐리티 설정
        httpSecurity
                .csrf(CsrfConfigurer::disable)              // 사이트 위변조 방지
                .httpBasic(HttpBasicConfigurer::disable)    // 기본 HTTP 인증 방식 비활성
                .formLogin(FormLoginConfigurer::disable)
                .sessionManagement(config -> config.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션 비활성
                // 토큰 검사 필터 등록
                .addFilterBefore(new JWTAuthenticationFilter(jwtProvider), UsernamePasswordAuthenticationFilter.class)

                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        //.requestMatchers("/article/**").hasAnyRole("ADMIN", "USER") <- 프론트에서 테스트할 때 인가 처리 아래처럼 수정
                        .requestMatchers(HttpMethod.GET,"/article/**").permitAll()
                        .requestMatchers(HttpMethod.POST,"/article/**").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.GET,"/product/**").permitAll()
                        .requestMatchers(HttpMethod.POST,"/product/**").hasRole("ADMIN")
                        .anyRequest().permitAll());


        return httpSecurity.build();
    }

    // Security 인증 암호화 인코더 설정
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

}
