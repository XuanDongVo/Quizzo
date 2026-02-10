package com.quizzo.server.repository;

import com.quizzo.server.entity.CollectionQuiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CollectionQuizzRepository extends JpaRepository<CollectionQuiz, String> {

    Optional<CollectionQuiz> findByQuiz_Id(String quizId);

}
