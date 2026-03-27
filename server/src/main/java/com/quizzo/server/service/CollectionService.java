package com.quizzo.server.service;

import com.quizzo.server.dto.response.collection.AvailableCollectionsResponse;
import com.quizzo.server.dto.response.collection.CollectionResponse;
import com.quizzo.server.entity.Collection;
import com.quizzo.server.entity.User;
import com.quizzo.server.exception.AppException;
import com.quizzo.server.exception.ErrorCode;
import com.quizzo.server.mapper.CollectionMapper;
import com.quizzo.server.repository.CollectionRepository;
import com.quizzo.server.repository.UserRepository;
import com.quizzo.server.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CollectionService {

    private final CollectionRepository collectionRepository;
    private final UserRepository userRepository;
    private final CollectionMapper collectionMapper;

    public AvailableCollectionsResponse getCollectionsForCurrentUser(User user) {


        List<CollectionResponse> systemCollections =
                collectionRepository.findByUserIsNullAndVisibilityTrue()
                        .stream()
                        .map(collectionMapper::toResponse)
                        .toList();

        List<CollectionResponse> userCollections =
                collectionRepository.findByUserId(user.getId())
                        .stream()
                        .map(collectionMapper::toResponse)
                        .toList();

        return AvailableCollectionsResponse.builder()
                .userCollections(userCollections)
                .systemCollections(systemCollections)
                .build();
    }

    private User getCurrentUser() {
        Jwt jwt = JwtUtils.getCurrentJwt()
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_TOKEN));

        String userId = jwt.getSubject();

        return userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
    }
}