package com.quizzo.server.mapper;

import com.quizzo.server.dto.request.quizz.CreateQuestionRequest;
import com.quizzo.server.dto.response.quizz.CreateQuestionResponse;
import com.quizzo.server.entity.Answer;
import com.quizzo.server.entity.FillBlankAnswer;
import com.quizzo.server.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "quiz", ignore = true)
    @Mapping(target = "imageUrl", ignore = true)
    Question toEntity (CreateQuestionRequest.QuestionRequest request);

    @Mapping(source = "id", target = "questionId")
    @Mapping(source = "fillBlankAnswers", target = "blanks")
    CreateQuestionResponse toResponse(Question question);

    @Mapping(source = "id", target = "answerId")
    CreateQuestionResponse.AnswerResponse toAnswerResponse(Answer answer);

    @Mapping(source = "id", target = "answerId")
    @Mapping(source = "answerText", target = "acceptedAnswers")
    CreateQuestionResponse.FillBlankAnswerResponse toFillBlankResponse(FillBlankAnswer entity);


    List<CreateQuestionResponse.AnswerResponse> toAnswerResponses(List<Answer> answers);

    List<CreateQuestionResponse.FillBlankAnswerResponse> toFillBlankResponses(List<FillBlankAnswer> blanks);
}
