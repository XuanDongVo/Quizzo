package com.quizzo.server.dto.request.quizz;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class CreateAnswerRequest {
    private String clientTempId;
    private String answerId;
    @NotBlank
    private String content;
    private Boolean isCorrect;
}