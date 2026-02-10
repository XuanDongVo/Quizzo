package com.quizzo.server.controller;

import com.quizzo.server.dto.request.quizz.QuizzInfoRequest;
import com.quizzo.server.dto.response.ApiResponse;
import com.quizzo.server.dto.response.quizz.QuizzInfoResponse;
import com.quizzo.server.service.QuizzService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/quizz")
@RequiredArgsConstructor
public class QuizzController {
    private final QuizzService quizzService;

    @PostMapping("/create-quizz")
    public ResponseEntity<ApiResponse<QuizzInfoResponse>> createQuizz(
            @Valid @RequestBody QuizzInfoRequest request
    ) {
        QuizzInfoResponse response = quizzService.createQuizzInfo(request);

        return ResponseEntity.ok(
                ApiResponse.<QuizzInfoResponse>builder()
                        .success(true)
                        .data(response)
                        .message("Quiz created successfully")
                        .build()
        );
    }

    @PutMapping("update-quizz/{quizzId}")
    public ResponseEntity<ApiResponse<QuizzInfoResponse>> updateQuizz(
            @PathVariable String quizzId,
            @Valid @RequestBody QuizzInfoRequest request
    ) {
        QuizzInfoResponse response = quizzService.updateQuizzInfo(quizzId, request);

        return ResponseEntity.ok(
                ApiResponse.<QuizzInfoResponse>builder()
                        .success(true)
                        .data(response)
                        .message("Quiz updated successfully")
                        .build()
        );
    }

    @DeleteMapping("delete-quizz/{quizzId}")
    public ResponseEntity<ApiResponse<Void>> deleteQuizz(
            @PathVariable String quizzId,
            @Valid @RequestBody QuizzInfoRequest request
    ) {
        quizzService.deleteQuizz(quizzId);

        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .data(null)
                        .message("Quiz delete successfully")
                        .build()
        );
    }
}
