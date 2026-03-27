package com.quizzo.server.controller;

import com.quizzo.server.dto.request.quizz.CreateQuestionRequest;
import com.quizzo.server.dto.response.ApiResponse;
import com.quizzo.server.dto.response.collection.AvailableCollectionsResponse;
import com.quizzo.server.service.CollectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/collection")
@RequiredArgsConstructor
public class CollectionController {
    private final CollectionService collectionService;

//    @GetMapping("/available-collections")
//    public ResponseEntity<ApiResponse<AvailableCollectionsResponse>> upsertQuestion(
//            @RequestBody CreateQuestionRequest request
//    ) {
//
//        AvailableCollectionsResponse availableCollectionsResponse = collectionService.getAvailableCollections();
//
//        return ResponseEntity.ok(
//                ApiResponse.<AvailableCollectionsResponse>builder()
//                        .success(true)
//                        .code("QUESTION_SYNCED")
//                        .message("Questions synced successfully")
//                        .data(availableCollectionsResponse)
//                        .build()
//        );
//    }
}
