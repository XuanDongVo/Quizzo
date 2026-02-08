package com.quizzo.server.exception;

public class QuizNotFoundException extends AppException {
    public QuizNotFoundException() {
        super(ErrorCode.QUIZ_NOT_FOUND);
    }
}
