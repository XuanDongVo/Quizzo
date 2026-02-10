package com.quizzo.server.dto.request.quizz;

import com.quizzo.server.utils.enums.QuestionType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.util.List;

@Getter
public class CreateQuestionRequest {
    @NotNull
    private String quizId;
    private List<QuestionRequest> questionRequest;

    @Getter
    public static class QuestionRequest {
        private String questionId;
        @NotNull
        private QuestionType questionType;

        @NotBlank
        private String content;

        private Integer timeLimit;
        private Integer score;
        private Integer orderIndex;

        // url for (image, audio, video)
        private String url;

        private List<CreateAnswerRequest> answers;

        // Fill_blank
        private List<FillBlankAnswerRequest> blanks;
    }
}
