package com.quizzo.server.dto.request.quizz;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.util.List;

@Getter
public class FillBlankAnswerRequest {
    private String answerId;

    @NotNull
    private Integer blankIndex;

    @NotEmpty
    private String acceptedAnswers;
}
