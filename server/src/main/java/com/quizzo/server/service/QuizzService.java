package com.quizzo.server.service;

import com.quizzo.server.dto.request.quizz.CreateQuizzRequest;
import com.quizzo.server.dto.request.quizz.QuizzInfoRequest;
import com.quizzo.server.dto.response.quizz.QuizzInfoResponse;
import com.quizzo.server.entity.Collection;
import com.quizzo.server.entity.CollectionQuiz;
import com.quizzo.server.entity.Quiz;
import com.quizzo.server.entity.User;
import com.quizzo.server.exception.AppException;
import com.quizzo.server.exception.ErrorCode;
import com.quizzo.server.mapper.QuestionMapper;
import com.quizzo.server.mapper.QuizzMapper;
import com.quizzo.server.repository.*;
import com.quizzo.server.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuizzService {
    private final QuizzRepository quizzRepository;
    private final CollectionRepository collectionRepository;
    private final CollectionQuizzRepository collectionQuizzRepository;
    private final UserRepository userRepository;
    private final QuizzMapper quizzMapper;
    private final QuestionRepository questionRepository;
    private final QuestionMapper questionMapper;

    private User getCurrentUser() {
        Jwt jwt = JwtUtils.getCurrentJwt().orElseThrow(() -> new AppException(ErrorCode.INVALID_TOKEN));
        String userId = jwt.getSubject();
        Optional<User> user = userRepository.findById(userId);
        return user.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
    }

    public void getQuizzByIdForCreator(String quizzId){
        User creator = getCurrentUser();
        Quiz quizz = quizzRepository.findById(quizzId).orElseThrow(() -> new AppException(ErrorCode.QUIZ_NOT_FOUND));

        if (!creator.getId().equals(quizz.getCreator().getId())){
            return;
        }


        return;

    }

    @Transactional
    public QuizzInfoResponse createQuizz(CreateQuizzRequest request) {
        User creator = getCurrentUser();
        Quiz quiz = new Quiz();
        quiz.setTitle(request.getTitle());
        quiz.setCreator(creator);
        quiz.setDescription("");
        quiz.setVisibilityQuiz(true);
        quiz.setShuffle(false);
        quiz.setShowResults(true);
        quiz.setShowResults(true);
        quiz.setCreator(creator);
        quiz = quizzRepository.save(quiz);

        return quizzMapper.toQuizzInfoResponse(quiz, null);
    }

    @Transactional
    public QuizzInfoResponse updateQuizzInfo(String quizzId, QuizzInfoRequest request) {
        User currentUser = getCurrentUser();
        Quiz quiz = quizzRepository
                .findByIdAndCreator_Id(quizzId, currentUser.getId())
                .orElseThrow(() -> new AppException(ErrorCode.QUIZ_NOT_FOUND));

        // Update basic fields
        quizzMapper.updateEntityFromRequest(request, quiz);

        // Handle collection change
        Collection collection = handleCollectionChange(quiz, request.getCollection());

        quiz = quizzRepository.save(quiz);

        return quizzMapper.toQuizzInfoResponse(quiz, collection);
    }

    public void deleteQuizz(String quizzId) {
        User currentUser = getCurrentUser();
        Quiz quiz = quizzRepository
                .findByIdAndCreator_Id(quizzId, currentUser.getId())
                .orElseThrow(() -> new AppException(ErrorCode.QUIZ_NOT_FOUND));
        quizzRepository.delete(quiz);
    }

    private Collection handleCollectionChange(Quiz quiz, String collectionName) {
        CollectionQuiz current = collectionQuizzRepository
                .findByQuiz_Id(quiz.getId())
                .orElseThrow(() -> new AppException(ErrorCode.FORBIDDEN));

        // Case: client want to remove collection
        if (collectionName == null) {
            if (current != null) {
                collectionQuizzRepository.delete(current);
            }
            return null;
        }

        // Find new collection
        Collection newCollection = collectionRepository
                .findByName(collectionName)
                .orElseThrow(() -> new AppException(ErrorCode.FORBIDDEN));

        // Case: change collection
        if (!current.getCollection().getId().equals(newCollection.getId())) {
            current.setCollection(newCollection);
            collectionQuizzRepository.save(current);
        }

        return newCollection;
    }


}
