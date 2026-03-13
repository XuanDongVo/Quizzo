import {
  Question,
  AnswerOption,
  FillBlankOption,
} from "@/types/quiz/quiz-types";

export function mapQuestionToRequest(question: Question) {
  return {
    questionId: question.serverId,
    clientTempId: question.clientTempId,
    questionType: question.questionType,

    content: question.content,
    timeLimit: question.timeLimit,
    score: question.score,
    orderIndex: question.orderIndex,

    url: question.imageUrl ?? question.audioUrl ,

    answers: question.answers?.map(mapAnswerToRequest),

    blanks: question.blanks?.map(mapFillBlankToRequest),
  };
}

export function mapAnswerToRequest(answer: AnswerOption) {
  return {
    clientTempId: answer.clientTempId,
    answerId: answer.serverId,
    content: answer.content,
    isCorrect: answer.isCorrect,
  };
}

export function mapFillBlankToRequest(blank: FillBlankOption) {
  return {
    clientTempId: blank.clientTempId,
    answerId: blank.serverId,
    blankIndex: blank.blankIndex,
    acceptedAnswers: blank.acceptedAnswers,
  };
}
