package com.quizzo.server.dto.response.quizz;

import com.quizzo.server.dto.response.collection.CollectionResponse;
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
    private CollectionResponse collectionResponse;
    private Boolean visibilityQuiz;
    private Boolean visibilityQuestion;
    private Boolean shuffle;
    private Boolean showResults;
}
