package com.quizzo.server.service;

import com.quizzo.server.dto.TokenPayload;
import com.quizzo.server.dto.request.auth.LoginRequest;
import com.quizzo.server.dto.request.auth.SignUpRequest;
import com.quizzo.server.dto.response.LoginResponse;
import com.quizzo.server.entity.User;
import com.quizzo.server.exception.AppException;
import com.quizzo.server.exception.ErrorCode;
import com.quizzo.server.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final TokenService tokenService;

    public boolean isUsernameAvailable(String username) {
        return !userRepository.existsByUsername(username);
    }


    public void register(SignUpRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
        }
        String urlAvatar = "https://i.pravatar.cc/100?img=" + new Random().nextInt(50) ;
        User user = new User();
        user.setUsername(request.getName());
        user.setEmail(request.getEmail());
        user.setAvatarUrl(urlAvatar);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);
    }

    public LoginResponse login(LoginRequest request) {
        Authentication authenticationToken = UsernamePasswordAuthenticationToken.unauthenticated(request.getEmail(), request.getPassword());
        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        User user = (User) authentication.getPrincipal();
        if (user == null) {
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }

        TokenPayload accessToken = jwtService.generateAccessToken(user);
        TokenPayload refreshToken = jwtService.generateRefreshToken(user);
        tokenService.storeRefreshToken(refreshToken.getJwtId(), refreshToken.getExpiresAt());

        return LoginResponse.builder().accessToken(accessToken.getToken()).refreshToken(refreshToken.getToken()).userId(user.getId()).build();
    }

    public String refreshAccessToken(String refreshToken) {
        Jwt jwt;
        try {
            jwt = jwtService.extractToken(refreshToken);
        } catch (JwtException e) {
            throw new AppException(ErrorCode.INVALID_TOKEN);
        }

        Instant expiresAt = jwt.getExpiresAt();
        if (expiresAt == null || expiresAt.isBefore(Instant.now())) {
            throw new AppException(ErrorCode.INVALID_TOKEN);
        }

        String jwtId = jwt.getClaim("jwtId");
        if (!tokenService.isRefreshTokenValid(jwtId)) {
            throw new AppException(ErrorCode.INVALID_TOKEN);
        }

        User user = userRepository.findById(jwt.getSubject())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        return jwtService.generateAccessToken(user).getToken();
    }


    public void logout(String accessToken, String refreshToken, HttpServletResponse response) {
        // Blacklist access token
        if (accessToken != null && jwtService.isValidToken(accessToken)) {
            Jwt jwt = jwtService.extractToken(accessToken);
            String accessJti = jwt.getClaim("jwtId");
            Instant accessExp =  jwt.getExpiresAt();
            long ttl = Duration.between(Instant.now(), accessExp).getSeconds();
            if (ttl > 0) {
                tokenService.blacklistAccessToken(accessJti, accessExp);
            }
        }

        // Revoke refresh token
        if (refreshToken != null && jwtService.isValidToken(refreshToken)) {
            Jwt jwt = jwtService.extractToken(accessToken);
            tokenService.revokeRefreshToken(jwt.getClaim("jwtId"));
        }

        // Clear refresh cookie
        ResponseCookie clearCookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .build();

        response.addHeader("Set-Cookie", clearCookie.toString());
    }

}
