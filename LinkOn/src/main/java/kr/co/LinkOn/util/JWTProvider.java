package kr.co.LinkOn.util;


import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;


import kr.co.LinkOn.entity.user.User;
import lombok.Getter;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Log4j2
@Getter
@Component
public class JWTProvider {

    private String issuer;
    private SecretKey secretKey;

    public JWTProvider(@Value("${jwt.issuer}") String issuer,
                       @Value("${jwt.secret}") String secretKey){
        this.issuer = issuer;
        this.secretKey = Keys.hmacShaKeyFor(secretKey.getBytes());
    }


    public String createToken(User user, int days){

        // 발급일, 만료일 생성
        Date issuedDate = new Date();
        Date expireDate = new Date(issuedDate.getTime() + Duration.ofDays(days).toMillis());
        //Date expireDate = new Date();
        //expireDate.setHours(expireDate.getHours() + 1);

        // 클레임 생성
        Claims claims = Jwts.claims();
        claims.put("username", user.getUid());
        claims.put("role", user.getRole());

        // 토큰 생성
        String token = Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setIssuer(issuer)
                .setIssuedAt(issuedDate)
                .setExpiration(expireDate)
                .addClaims(claims)
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();

        return token;
    }

    public Claims getClaims(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public Authentication getAuthentication(String token){

        // 클레임에서 사용자, 권한 가져오기
        Claims claims = getClaims(token);
        String uid  = (String) claims.get("username");
        String role = (String) claims.get("role");

        // 권한목록 생성
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(role));

        // 사용자 인증객체 생성
        User principal = User.builder()
                .uid(uid)
                .role(role)
                .build();

        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    public void validateToken(String token) throws Exception {

        try {
            Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token);

        }catch (Exception e){
            // 잘못된 JWT일 경우
            throw new Exception(e);
        }
    }

}
