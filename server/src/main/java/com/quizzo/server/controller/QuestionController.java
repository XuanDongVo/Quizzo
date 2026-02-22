package com.quizzo.server.controller;

import com.quizzo.server.dto.request.quizz.CreateQuestionRequest;
import com.quizzo.server.dto.response.ApiResponse;
import com.quizzo.server.dto.response.quizz.CreateQuestionResponse;
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

    @PostMapping("/add-question")
    public ResponseEntity<ApiResponse<List<CreateQuestionResponse>>> addQuestion(
            @RequestBody CreateQuestionRequest request
    ) {
        List<CreateQuestionResponse> question = questionService.createQuestionForQuizz(request);

        return ResponseEntity.ok(
                ApiResponse.<List<CreateQuestionResponse>>builder()
                        .success(true)
                        .code("QUESTION_CREATED")
                        .message("Question created successfully")
                        .data(question)
                        .build()
        );
    }

    @PostMapping("/udpate-question")
    public ResponseEntity<ApiResponse<List<CreateQuestionResponse>>> updateQuestion(
            @RequestBody CreateQuestionRequest request
    ) {
        List<CreateQuestionResponse> question = questionService.updateQuestion(request);

        return ResponseEntity.ok(
                ApiResponse.<List<CreateQuestionResponse>>builder()
                        .success(true)
                        .code("QUESTION_UPDATE")
                        .message("Questions updated successfully")
                        .data(question)
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
