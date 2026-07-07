package com.doctor_patient.consultant.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;  // keep in application.properties or env variable

    private final long EXPIRATION_TIME = 86400000; // 1 day

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    // Generate JWT token with email + role
    public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Extract all claims
    private Claims extractClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            throw new RuntimeException("JWT expired", e);
        } catch (JwtException e) {
            throw new RuntimeException("JWT invalid", e);
        }
    }


    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    public String extractRole(String token) {
        return (String) extractClaims(token).get("role");
    }

    private boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

}










//package com.doctor_patient.consultant.security;
//
//import io.jsonwebtoken.*;
//import org.springframework.stereotype.Component;
//import java.util.Date;
//
//@Component
//public class JwtUtil {
//    private final String SECRET_KEY = "mysecretkey123"; // keep in env variable
//    private final long EXPIRATION_TIME = 86400000; // 1 day
//
//    public String generateToken(String email, String role) {
//        return Jwts.builder()
//                .setSubject(email)
//                .claim("role", role)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
//                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
//                .compact();
//    }
//    
//    public Claims extractClaims(String token) {
//        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
//    }
//
//    public String extractUsername(String token) {
//        return extractClaims(token).getSubject();
//    }
//
//    public String extractRole(String token) {
//        return (String) extractClaims(token).get("role");
//    }
//
//    public boolean isTokenExpired(String token) {
//        return extractClaims(token).getExpiration().before(new Date());
//    }
//
//    public boolean validateToken(String token, String username) {
//        return (username.equals(extractUsername(token)) && !isTokenExpired(token));
//    }
//
////    public String extractEmail(String token) {
////        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().getSubject();
////    }
////
////    public String extractRole(String token) {
////        return (String) Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().get("role");
////    }
//
//
//}
//
