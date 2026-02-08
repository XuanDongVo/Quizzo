package com.quizzo.server.controller;

import com.quizzo.server.dto.request.auth.LoginRequest;
import com.quizzo.server.dto.request.auth.SignUpRequest;
import com.quizzo.server.dto.response.ApiResponse;
import com.quizzo.server.dto.response.FieldErrorResponse;
import com.quizzo.server.dto.response.LoginResponse;
import com.quizzo.server.exception.AppException;
import com.quizzo.server.exception.ErrorCode;
import com.quizzo.server.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping("/check-username")
    public ResponseEntity<ApiResponse<Void>> checkUsername(
            @RequestParam String username
    ) {
        boolean available  = authService.isUsernameAvailable(username);

        if (!available) {
            return ResponseEntity.ok(
                    ApiResponse.<Void>builder()
                            .success(false)
                            .code("USERNAME_ALREADY_EXISTS")
                            .message("Username already exists")
                            .errors(List.of(
                                    new FieldErrorResponse(
                                            "name",
                                            ErrorCode.USER_ALREADY_EXISTS.getMessage()
                                    )
                            ))
                            .build()
            );
        }

        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .code("USERNAME_AVAILABLE")
                        .message("Username is available")
                        .build()
        );
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Void>> register(
            @RequestBody SignUpRequest request
    ) {
        authService.register(request);

        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .code("REGISTER_SUCCESS")
                        .message("Register successfully")
                        .build()
        );
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(
            @RequestBody LoginRequest request
    ) {
        LoginResponse loginResponse = authService.login(request);

        ResponseCookie refreshCookie = ResponseCookie.from(
                        "refreshToken",
                        loginResponse.getRefreshToken()
                )
                .httpOnly(true)
                .secure(true)
                .path("/v1/auth/refresh")
                .maxAge(30 * 24 * 60 * 60)
                .sameSite("Strict")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                .body(
                        ApiResponse.<LoginResponse>builder()
                                .success(true)
                                .code("LOGIN_SUCCESS")
                                .message("Login successfully")
                                .data(
                                        LoginResponse.builder()
                                                .userId(loginResponse.getUserId())
                                                .accessToken(loginResponse.getAccessToken())
                                                .build()
                                )
                                .build()
                );
    }

    @PostMapping("/refresh")
            public ResponseEntity<ApiResponse<LoginResponse>> refreshToken(
            @CookieValue(name = "refreshToken", required = false) String refreshToken
    ) {
        if (refreshToken == null) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        String newAccessToken = authService.refreshAccessToken(refreshToken);

        return ResponseEntity.ok(
                ApiResponse.<LoginResponse>builder()
                        .success(true)
                        .code("REFRESH_SUCCESS")
                        .message("Token refreshed")
                        .data(
                                LoginResponse.builder()
                                        .accessToken(newAccessToken)
                                        .build()
                        )
                        .build()
        );
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @CookieValue(value = "refreshToken", required = false) String refreshToken,
            HttpServletResponse response
    ) {
        String accessToken = null;

        if (authorization != null && authorization.startsWith("Bearer ")) {
            accessToken = authorization.substring(7);
        }

        authService.logout(accessToken, refreshToken, response);

        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Logout successfully")
                        .build()
        );
    }

}
