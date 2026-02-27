    package com.quizzo.server.mapper;

    import com.quizzo.server.dto.request.quizz.QuizzInfoRequest;
    import com.quizzo.server.dto.response.quizz.QuizzInfoResponse;
    import com.quizzo.server.dto.response.quizz.QuizzResponse;
    import com.quizzo.server.entity.Collection;
    import com.quizzo.server.entity.Quiz;
    import org.mapstruct.Mapper;
    import org.mapstruct.Mapping;
    import org.mapstruct.MappingTarget;

    @Mapper(componentModel = "spring", uses = { QuestionMapper.class })
    public interface QuizzMapper {

        @Mapping(target = "id", ignore = true)
        Quiz toEntity(QuizzInfoRequest request);

        @Mapping(target = "id", ignore = true)
        void updateEntityFromRequest(
                QuizzInfoRequest request,
                @MappingTarget Quiz quiz
        );

        @Mapping(source = "quiz.id", target = "quizzId")
        @Mapping(source = "collection.name", target = "collectionName")
        QuizzInfoResponse toQuizzInfoResponse(Quiz quiz, Collection collection);

        @Mapping(source = "quiz.questions", target = "questionResponses")
        @Mapping(target = "quizzInfoResponse", expression = "java(toQuizzInfoResponse(quiz, collection))")
        QuizzResponse toQuizzResponse(Quiz quiz, Collection collection);
    }
