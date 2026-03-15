package com.quizzo.server.service;

import com.quizzo.server.dto.request.quizz.CreateAnswerRequest;
import com.quizzo.server.dto.request.quizz.CreateQuestionRequest;
import com.quizzo.server.dto.request.quizz.FillBlankAnswerRequest;
import com.quizzo.server.dto.response.quizz.UpsertQuestionResponse;
import com.quizzo.server.entity.Answer;
import com.quizzo.server.entity.FillBlankAnswer;
import com.quizzo.server.entity.Question;
import com.quizzo.server.entity.Quiz;
import com.quizzo.server.exception.AppException;
import com.quizzo.server.exception.ErrorCode;
import com.quizzo.server.mapper.QuestionMapper;
import com.quizzo.server.repository.AnswerRepository;
import com.quizzo.server.repository.FillBlankAnswerRepository;
import com.quizzo.server.repository.QuestionRepository;
import com.quizzo.server.repository.QuizzRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final QuizzRepository quizzRepository;
    private final QuestionMapper questionMapper;
    private final FillBlankAnswerRepository fillBlankAnswerRepository;
    private final AnswerRepository answerRepository;

    @Transactional
    public List<UpsertQuestionResponse> upsertQuestion(CreateQuestionRequest questionRequest) {

        Quiz quiz = quizzRepository.findById(questionRequest.getQuizId())
                .orElseThrow(() -> new AppException(ErrorCode.QUIZ_NOT_FOUND));

        List<UpsertQuestionResponse> responses = new ArrayList<>();

        for (CreateQuestionRequest.QuestionRequest qReq : questionRequest.getQuestionRequest()) {

            validateQuestionRequest(qReq);

            Question question;
            boolean isCreate = qReq.getQuestionId() == null;

            if (isCreate) {
                question = questionMapper.toEntity(qReq);
                question.setQuiz(quiz);
            } else {
                question = questionRepository.findById(qReq.getQuestionId())
                        .orElseThrow(() -> new AppException(ErrorCode.FORBIDDEN));

                question.setContent(qReq.getContent());
                question.setTimeLimit(qReq.getTimeLimit());
                question.setScore(qReq.getScore());
                question.setOrderIndex(qReq.getOrderIndex());
            }

            if (qReq.getUrl() != null) {
                question.setImageUrl(qReq.getUrl());
            }

            question = questionRepository.save(question);

            UpsertQuestionResponse response = UpsertQuestionResponse.builder()
                    .clientTempId(isCreate ? qReq.getClientTempId() : null)
                    .questionId(question.getId())
                    .build();

            switch (qReq.getQuestionType()) {

                case SINGLE_CHOICE, MULTIPLE_CHOICE, TRUE_FALSE -> {

                    List<UpsertQuestionResponse.AnswerResponse> answerMappings =
                            upsertChoiceAnswers(question, qReq.getAnswers());

                    if (!answerMappings.isEmpty()) {
                        response.setAnswers(answerMappings);
                    }
                }

                case FILL_BLANK -> {

                    List<UpsertQuestionResponse.FillBlankAnswerResponse> blankMappings =
                            upsertFillBlankAnswers(question, qReq.getBlanks());

                    if (!blankMappings.isEmpty()) {
                        response.setBlanks(blankMappings);
                    }
                }
            }

            responses.add(response);
        }

        return responses;
    }

    public void deleteQuestion(String questionId) {
        Question question = questionRepository.findById(questionId).orElseThrow(() -> new AppException(ErrorCode.QUIZ_NOT_FOUND));
        questionRepository.delete(question);
    }

    private void validateQuestionRequest(CreateQuestionRequest.QuestionRequest q) {
        switch (q.getQuestionType()) {

            case SINGLE_CHOICE, MULTIPLE_CHOICE, TRUE_FALSE -> {
                if (q.getAnswers() == null || q.getAnswers().isEmpty()) {
                    throw new AppException(ErrorCode.INVALID_QUESTION_FORMAT);
                }
            }

            case FILL_BLANK -> {
                if (q.getBlanks() == null || q.getBlanks().isEmpty()) {
                    throw new AppException(ErrorCode.INVALID_QUESTION_FORMAT);
                }
            }

            default -> throw new AppException(ErrorCode.INVALID_QUESTION_FORMAT);
        }
    }

    private List<UpsertQuestionResponse.AnswerResponse> upsertChoiceAnswers(
            Question question,
            List<CreateAnswerRequest> answers
    ) {
        return answers.stream().map(a -> {
            boolean isCreate = a.getAnswerId() == null;
            Answer answer;

            if (isCreate) {
                answer = new Answer();
            } else {
                answer = answerRepository.findById(a.getAnswerId()).orElseThrow(() -> new AppException(ErrorCode.FORBIDDEN));
            }
            answer.setQuestion(question);


            answer.setContent(a.getContent());
            answer.setIsCorrect(Boolean.TRUE.equals(a.getIsCorrect()));

            answer = answerRepository.save(answer);

            if (isCreate) {
                return UpsertQuestionResponse.AnswerResponse.builder()
                        .clientTempId(a.getClientTempId())
                        .answerId(answer.getId())
                        .build();
            }

            return null;

        }).filter(mapping -> mapping != null).toList();
    }


    private List<UpsertQuestionResponse.FillBlankAnswerResponse> upsertFillBlankAnswers(
            Question question,
            List<FillBlankAnswerRequest> blanks
    ) {
        return blanks.stream().map(b -> {
            boolean isCreate = b.getAnswerId() == null;

            FillBlankAnswer entity;

            if (isCreate) {
                entity = new FillBlankAnswer();

            } else {
                entity = fillBlankAnswerRepository.findById(b.getAnswerId())
                        .orElseThrow(() -> new AppException(ErrorCode.FORBIDDEN));
            }
            entity.setQuestion(question);
            entity.setBlankIndex(b.getBlankIndex());
            entity.setAnswerText(b.getAcceptedAnswers().trim());

            entity = fillBlankAnswerRepository.save(entity);


            if (isCreate) {
                return UpsertQuestionResponse.FillBlankAnswerResponse.builder()
                        .clientTempId(b.getClientTempId())
                        .answerId(entity.getId())
                        .build();
            }

            return null;
        }).filter(Objects::nonNull).toList();
    }
}
