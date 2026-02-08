package com.quizzo.server.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor

public class TokenService {

    private final StringRedisTemplate redis;

    private static final String REFRESH_PREFIX = "refresh:";
    private static final String BLACKLIST_PREFIX = "blacklist:";

    public long calculateTtl(Instant expiresAt) {
        return Duration.between(Instant.now(), expiresAt).getSeconds();
    }
    // ===== Refresh token =====

    public void storeRefreshToken(String jti, Instant ttlSeconds) {

        redis.opsForValue().set(
                REFRESH_PREFIX + jti,
                "1",
                calculateTtl(ttlSeconds),
                TimeUnit.SECONDS
        );
    }

    public boolean isRefreshTokenValid(String jti) {
        return Boolean.TRUE.equals(
                redis.hasKey(REFRESH_PREFIX + jti)
        );
    }

    public void revokeRefreshToken(String jti) {
        redis.delete(REFRESH_PREFIX + jti);
    }

    // ===== Access token =====

    public void blacklistAccessToken(String jti, Instant ttlSeconds) {
        redis.opsForValue().set(
                BLACKLIST_PREFIX + jti,
                "1",
                calculateTtl(ttlSeconds),
                TimeUnit.SECONDS
        );
    }

    public boolean isAccessTokenBlacklisted(String jti) {
        return Boolean.TRUE.equals(
                redis.hasKey(BLACKLIST_PREFIX + jti)
        );
    }
}

