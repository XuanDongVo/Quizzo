package com.quizzo.server.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ApiResponse<T> {
    private boolean success;
    private String code;
    private String message;
    private T data;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<FieldErrorResponse> errors;
}



