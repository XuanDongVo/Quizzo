package com.quizzo.server.dto.response.quizz;

import com.quizzo.server.utils.enums.QuestionType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
public class QuestionResponse {
    private String questionId;
    private String clientTempId;
    private String content;
    private QuestionType questionType;

    private Integer timeLimit;
    private Integer score;
    private Integer orderIndex;

    private String imageUrl;

    // choice questions
    private List<AnswerResponse> answers;
    private List<FillBlankAnswerResponse> blanks;

    @Builder
    @Getter
    @Setter
    public static class AnswerResponse {
        private String clientTempId;
        private String answerId;
        private String content;
        private Boolean isCorrect;
    }

    @Builder
    @Getter
    @Setter
    public static class FillBlankAnswerResponse {
        private String clientTempId;
        private String answerId;
        private Integer blankIndex;
        private String acceptedAnswers;
    }
}


