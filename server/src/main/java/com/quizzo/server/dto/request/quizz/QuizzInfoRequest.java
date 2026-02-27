package com.quizzo.server.dto.request.quizz;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class QuizzInfoRequest {

    @NotBlank
    private String title;
    private String description;
    private String imageUrl;
    private String collection;
    private boolean visibilityQuiz;
    private boolean visibilityQuestion;
    private boolean shuffle;
    private boolean showResults;

}
