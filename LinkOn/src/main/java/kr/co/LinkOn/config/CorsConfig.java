package kr.co.LinkOn.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {

        // RESTfull 서비스를 위한 CORS 설정
        registry
                .addMapping("/**")        // 모든 엔드포인트에 대한 접근허용
                .allowedOriginPatterns("http://127.0.0.1:5173", "http://localhost:5173", "http://54.180.113.128:8080", "https://lotte2-community-app-project-team2-blush.vercel.app")             // 해당 도메인 origin의 요청 허용
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // 허용할 Methods 설정
                .allowedHeaders("*")        // 모든 헤더 정보 허용
                .allowCredentials(true)     // 자격 증명 허용
                .maxAge(3600);              // pre-flight 요청의 유효시간 설정
    }

}
