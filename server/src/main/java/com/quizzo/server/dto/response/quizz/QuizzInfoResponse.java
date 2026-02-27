package com.quizzo.server.dto.response.quizz;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class QuizzInfoResponse {
    private String quizzId;
    private String title;
    private String description;
    private String imageUrl;
    private String collectionName;
    private Boolean visibilityQuiz;
    private Boolean visibilityQuestion;
    private Boolean shuffle;
    private Boolean showResults;
}
