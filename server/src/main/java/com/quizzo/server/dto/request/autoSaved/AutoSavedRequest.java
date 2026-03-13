package com.quizzo.server.dto.request.autoSaved;

import com.quizzo.server.dto.request.quizz.CreateQuestionRequest;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
public class AutoSavedRequest {
    private CreateQuestionRequest listCreateQuestion;
    private List<String> deletedQuestionIds;
}
