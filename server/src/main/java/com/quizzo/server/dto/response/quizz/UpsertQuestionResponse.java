package com.quizzo.server.dto.response.quizz;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
public class CreateQuestionResponse {
    private String clientTempId;
    private String questionId;

    private List<CreateQuestionResponse.AnswerResponse> answers;

    // fill blank
    private List<CreateQuestionResponse.FillBlankAnswerResponse> blanks;

    @Builder
    @Getter
    @Setter
    public  static class AnswerResponse {
        private String clientTempId;
        private String answerId;
    }

    @Builder
    @Getter
    @Setter
    public static class FillBlankAnswerResponse {
        private String clientTempId;
        private String answerId;
    }
}

