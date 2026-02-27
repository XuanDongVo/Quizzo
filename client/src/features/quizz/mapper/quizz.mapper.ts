import { QuizzData, QuizzInfoRequest, QuizzInfoResponse } from "@/types/quiz/quiz-types";

// export const mapQuizzDataToRequest = (
//   data: QuizzData
// ): QuizzInfoRequest => {
//   return {
//     id: data.id,
//     title: data.title,
//     description: data.description,
//     imageUrl: data.coverImageUrl,
//     collection: data.collection,

//     visibilityQuiz: data.isPublic,
//     visibilityQuestion: data.isPublicQuestion,
//     shuffle: data.shuffleQuestions,
//     showResults: data.showResults,
//   };
// };

export function mapQuizzResponseToState(
  res: QuizzInfoResponse
): QuizzData {
  return {
    id: res.quizzId,
    title: res.title ?? "",
    description: res.description ?? "",
    coverImageUrl: res.imageUrl ?? "",
    collection: res.collectionName ?? "",
    isPublic: res.visibilityQuiz ?? true,
    isPublicQuestion: res.visibilityQuestion ?? true,
    shuffleQuestions: res.shuffle ?? false,
    showResults: res.showResults ?? true,

    questions: [],
    passingScore: 70,
  };
}

export const mapQuizzRequestToData = (
  data: QuizzInfoRequest
): QuizzData => {
  return {
    id: data.id,
    title: data.title,
    description: data.description ?? "",
    coverImageUrl: data.imageUrl ?? "",
    collection: data.collection ?? "",
    questions: [],

    isPublic: data.visibilityQuiz,
    isPublicQuestion: data.visibilityQuestion,
    shuffleQuestions: data.shuffle,
    showResults: data.showResults,

    passingScore: 70,
  };
};