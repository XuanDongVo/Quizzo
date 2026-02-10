package com.quizzo.server.repository;

import com.quizzo.server.entity.Collection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CollectionRepository extends JpaRepository<Collection, String> {
    Optional<Collection> findByName(String name);
}
