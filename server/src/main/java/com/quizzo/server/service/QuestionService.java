package com.quizzo.server.service;

import com.quizzo.server.dto.request.quizz.CreateAnswerRequest;
import com.quizzo.server.dto.request.quizz.CreateQuestionRequest;
import com.quizzo.server.dto.request.quizz.FillBlankAnswerRequest;
import com.quizzo.server.dto.response.quizz.CreateQuestionResponse;
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

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final QuizzRepository quizzRepository;
    private final QuestionMapper questionMapper;
    private final FillBlankAnswerRepository fillBlankAnswerRepository;
    private final AnswerRepository answerRepository;

    @Transactional
    public List<CreateQuestionResponse> createQuestionForQuizz(CreateQuestionRequest request) {
        Quiz quiz = quizzRepository.findById(request.getQuizId())
                .orElseThrow(() -> new AppException(ErrorCode.QUIZ_NOT_FOUND));

        return request.getQuestionRequest().stream().map(qReq -> {

             validateQuestionRequest(qReq);

            Question question = questionMapper.toEntity(qReq);
            question.setQuiz(quiz);

            if (qReq.getUrl() != null) {
                question.setImageUrl(qReq.getUrl());
            }

            question = questionRepository.save(question);

            CreateQuestionResponse response = questionMapper.toResponse(question);

            switch (qReq.getQuestionType()) {
                case SINGLE_CHOICE, MULTIPLE_CHOICE, TRUE_FALSE -> {
                    List<Answer> answers = saveChoiceAnswers(question, qReq.getAnswers(), false);
                    response.setAnswers(questionMapper.toAnswerResponses(answers));
                }
                case FILL_BLANK -> {
                    List<FillBlankAnswer> blanks = saveFillBlankAnswers(question, qReq.getBlanks(), false);
                    response.setBlanks(questionMapper.toFillBlankResponses(blanks));
                }
            }

            return response;
        }).toList();
    }


    @Transactional
    public List<CreateQuestionResponse> updateQuestion(CreateQuestionRequest request) {
        return request.getQuestionRequest().stream().map(qReq -> {

            validateQuestionRequest(qReq);

            Question question = questionRepository.findById(qReq.getQuestionId())
                    .orElseThrow(() -> new AppException(ErrorCode.FORBIDDEN));

            CreateQuestionResponse response = questionMapper.toResponse(question);

            switch (qReq.getQuestionType()) {
                case SINGLE_CHOICE, MULTIPLE_CHOICE, TRUE_FALSE -> {
                    List<Answer> answers = saveChoiceAnswers(question, qReq.getAnswers(), true);
                    response.setAnswers(questionMapper.toAnswerResponses(answers));
                }
                case FILL_BLANK -> {
                    List<FillBlankAnswer> blanks = saveFillBlankAnswers(question, qReq.getBlanks(), true);
                    response.setBlanks(questionMapper.toFillBlankResponses(blanks));
                }
            }
            return response;
        }).toList();
    }


    public void deleteQuestion(String questionId) {
        Question question = questionRepository.findById(questionId).orElseThrow(() -> new AppException(ErrorCode.QUIZ_NOT_FOUND));
        questionRepository.delete(question);
    }

    private void validateQuestionRequest(CreateQuestionRequest.QuestionRequest q) {
        switch (q.getQuestionType()) {

            case SINGLE_CHOICE, MULTIPLE_CHOICE -> {
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

    private List<Answer> saveChoiceAnswers(
            Question question,
            List<CreateAnswerRequest> answers,
            boolean isUpdate
    ) {
        return answers.stream().map(a -> {

            Answer answer = isUpdate
                    ? answerRepository.findById(a.getAnswerId())
                    .orElseThrow(() -> new AppException(ErrorCode.FORBIDDEN))
                    : new Answer();

            answer.setQuestion(question);
            answer.setContent(a.getContent());
            answer.setIsCorrect(Boolean.TRUE.equals(a.getIsCorrect()));

            return answerRepository.save(answer);

        }).toList();
    }


    private List<FillBlankAnswer> saveFillBlankAnswers(
            Question question,
            List<FillBlankAnswerRequest> blanks,
            boolean isUpdate
    ) {
        return blanks.stream().map(b -> {

            FillBlankAnswer entity = isUpdate
                    ? fillBlankAnswerRepository.findById(b.getAnswerId())
                    .orElseThrow(() -> new AppException(ErrorCode.FORBIDDEN))
                    : new FillBlankAnswer();

            entity.setQuestion(question);
            entity.setBlankIndex(b.getBlankIndex());
            entity.setAnswerText(b.getAcceptedAnswers().trim());

            return fillBlankAnswerRepository.save(entity);

        }).toList();
    }

}
