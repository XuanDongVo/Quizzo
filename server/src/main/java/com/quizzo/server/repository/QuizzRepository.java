package com.quizzo.server.repository;

import com.quizzo.server.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuizzRepository extends JpaRepository<Quiz, String> {
    Optional<Quiz> findByIdAndCreator_Id(String quizId, String creatorId);

}
