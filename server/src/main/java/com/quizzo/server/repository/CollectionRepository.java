package com.quizzo.server.repository;

import com.quizzo.server.entity.Collection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CollectionRepository extends JpaRepository<Collection, String> {
    Optional<Collection> findByName(String name);

    List<Collection> findByUserId(String userId);

    List<Collection> findByUserIsNullAndVisibilityTrue();

    Optional<Collection> findByUserIdAndName(String userId, String name);

    boolean existsByUserIdAndName(String userId, String name);

    boolean existsByUserIsNullAndName(String name);
}
