package com.quizzo.server.controller;

import com.quizzo.server.dto.request.autoSaved.AutoSavedRequest;
import com.quizzo.server.dto.response.ApiResponse;
import com.quizzo.server.dto.response.quizz.UpsertQuestionResponse;
import com.quizzo.server.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v1/auto-saved")
@RequiredArgsConstructor
public class AutoSavedController {

    private final QuestionService questionService;

    @PostMapping
    public ResponseEntity<ApiResponse<List<UpsertQuestionResponse>>> autoSaved (@RequestBody AutoSavedRequest autoSavedRequest){
        if (!autoSavedRequest.getDeletedQuestionIds().isEmpty()){
            autoSavedRequest.getDeletedQuestionIds().forEach(questionService::deleteQuestion);
        }
        List<UpsertQuestionResponse> upsertQuestionResponse = questionService.upsertQuestion(autoSavedRequest.getListCreateQuestion());

        return ResponseEntity.ok(  ApiResponse.<List<UpsertQuestionResponse>>builder()
                .success(true)
                .code("QUESTION_SYNCED")
                .message("Questions synced successfully")
                .data(upsertQuestionResponse)
                .build());
    }

}
