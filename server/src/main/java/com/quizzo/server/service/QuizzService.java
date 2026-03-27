package com.quizzo.server.service;

import com.quizzo.server.dto.request.quizz.CreateQuizzRequest;
import com.quizzo.server.dto.request.quizz.QuizzInfoRequest;
import com.quizzo.server.dto.response.quizz.QuestionResponse;
import com.quizzo.server.dto.response.quizz.QuizzInfoResponse;
import com.quizzo.server.dto.response.quizz.QuizzResponse;
import com.quizzo.server.entity.*;
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

import java.util.Comparator;
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
    private final CollectionService collectionService;

    private User getCurrentUser() {
        Jwt jwt = JwtUtils.getCurrentJwt().orElseThrow(() -> new AppException(ErrorCode.INVALID_TOKEN));
        String userId = jwt.getSubject();
        Optional<User> user = userRepository.findById(userId);
        return user.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
    }

    public QuizzResponse getQuizzByIdForCreator(String quizzId) {

        User creator = getCurrentUser();

        Quiz quiz = quizzRepository.findById(quizzId)
                .orElseThrow(() -> new AppException(ErrorCode.QUIZ_NOT_FOUND));

        if (!creator.getId().equals(quiz.getCreator().getId())) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }



        QuizzResponse quizzResponse = quizzMapper.toQuizzResponse(quiz);
        quizzResponse.getQuestions().sort(Comparator.comparing(QuestionResponse::getOrderIndex));
        return quizzResponse;
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
        quiz.setVisibilityQuestion(true);
        quiz.setShowResults(true);
        quiz.setCreator(creator);
        quiz = quizzRepository.save(quiz);

        return quizzMapper.toQuizzInfoResponse(quiz);
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
//        Collection collection = handleCollectionChange(quiz, request.getCollectionId());

        quiz = quizzRepository.save(quiz);

        return quizzMapper.toQuizzInfoResponse(quiz);
    }

    public void deleteQuizz(String quizzId) {
        User currentUser = getCurrentUser();
        Quiz quiz = quizzRepository
                .findByIdAndCreator_Id(quizzId, currentUser.getId())
                .orElseThrow(() -> new AppException(ErrorCode.QUIZ_NOT_FOUND));
        quizzRepository.delete(quiz);
    }

    private Collection handleCollectionChange(Quiz quiz, String collectionId) {

        if (collectionId != null && collectionId.isBlank()) {
            collectionId = null;
        }

        CollectionQuiz current = collectionQuizzRepository
                .findByQuiz_Id(quiz.getId())
                .orElse(null);

        // Case 1: client không chọn collection
        if (collectionId == null) {
            if (current != null) {
                collectionQuizzRepository.delete(current);
            }
            return null;
        }

        // Tìm collection có sẵn
        Collection newCollection = collectionRepository
                .findById(collectionId)
                .orElseThrow(() -> new AppException(ErrorCode.FORBIDDEN));

        // Case 2: trước đó chưa có relation -> tạo relation
        if (current == null) {
            CollectionQuiz relation = new CollectionQuiz();
            relation.setQuiz(quiz);
            relation.setCollection(newCollection);
            collectionQuizzRepository.save(relation);

            return newCollection;
        }

        // Case 3: đã có nhưng khác -> update
        if (!current.getCollection().getId().equals(collectionId)) {
            current.setCollection(newCollection);
            collectionQuizzRepository.save(current);
        }

        return newCollection;
    }


}
