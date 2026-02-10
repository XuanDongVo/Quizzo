package com.quizzo.server.dto.response.quizz;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
public class CreateQuestionResponse {

    private String questionId;
    private String content;

    private Integer timeLimit;
    private Integer score;
    private Integer orderIndex;

    private String imageUrl;

    // choice questions
    private List<AnswerResponse> answers;

    // fill blank
    private List<FillBlankAnswerResponse> blanks;

    @Builder
    @Getter
    public static class AnswerResponse {
        private String answerId;
        private String content;
        private Boolean isCorrect;
    }

    @Builder
    @Getter
    public static class FillBlankAnswerResponse {
        private String answerId;
        private Integer blankIndex;
        private String acceptedAnswers;
    }
}

