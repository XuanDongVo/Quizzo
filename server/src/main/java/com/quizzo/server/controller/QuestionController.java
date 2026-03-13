package com.quizzo.server.controller;

import com.quizzo.server.dto.request.quizz.CreateQuestionRequest;
import com.quizzo.server.dto.response.ApiResponse;
import com.quizzo.server.dto.response.quizz.UpsertQuestionResponse;
import com.quizzo.server.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/question")
@RequiredArgsConstructor
public class QuestionController {
    private final QuestionService questionService;

    @PostMapping("/upsert-question")
    public ResponseEntity<ApiResponse<List<UpsertQuestionResponse>>> upsertQuestion(
            @RequestBody CreateQuestionRequest request
    ) {

        List<UpsertQuestionResponse> questions =
                questionService.upsertQuestion(request);

        return ResponseEntity.ok(
                ApiResponse.<List<UpsertQuestionResponse>>builder()
                        .success(true)
                        .code("QUESTION_SYNCED")
                        .message("Questions synced successfully")
                        .data(questions)
                        .build()
        );
    }


    @DeleteMapping("/delete-question/{questionId}")
    public ResponseEntity<ApiResponse<Void>> deleteQuestion(@PathVariable String questionId) {
        questionService.deleteQuestion(questionId);
        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .code("QUESTION_DELETED")
                        .message("Question delete successfully")
                        .data(null)
                        .build());
    }

}