package com.quizzo.server.dto.response.quizz;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class QuizzResponse {
    private QuizzInfoResponse quizzInfoResponse;
    private List<CreateQuestionResponse> questionResponses;
}
