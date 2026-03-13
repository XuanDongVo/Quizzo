import { QuestionStatus, QuestionType, QuizzData, QuizzInfoRequest, QuizzInfoResponse, QuizzResponse } from "@/types/quiz/quiz-types";


export function mapQuizzInfoResponseToState(
  res: QuizzInfoResponse
): QuizzData {
  return {
    id: res.quizzId,
    title: res.title ?? "",
    description: res.description ?? "",
    coverImageUrl: res.imageUrl ?? "",
    collectionResponse: {
      id: res.collectionResponse?.id ?? "",
      name: res.collectionResponse?.name ?? "",
    },
    isPublic: res.visibilityQuiz ?? true,
    isPublicQuestion: res.visibilityQuestion ?? true,
    shuffleQuestions: res.shuffle ?? false,
    showResults: res.showResults ?? true,

    questions: [],
    passingScore: 70,
  };
}

export function mapQuizzResponseToState(res: QuizzResponse): QuizzData {
  return {
    id: res.quizzInfoResponse.quizzId,
    title: res.quizzInfoResponse.title,
    description: res.quizzInfoResponse?.description || "",
    coverImageUrl: res.quizzInfoResponse?.imageUrl || "",

    collectionResponse: {
      id: res.quizzInfoResponse.collectionResponse?.id ?? "",
      name: res.quizzInfoResponse.collectionResponse?.name ?? "",
    },

    isPublic: res.quizzInfoResponse.visibilityQuiz ?? true,
    isPublicQuestion: res.quizzInfoResponse.visibilityQuestion ?? true,
    shuffleQuestions: res.quizzInfoResponse.shuffle ?? false,
    showResults: res.quizzInfoResponse.showResults ?? true,

    passingScore: 70,

    questions:
      res.questions?.map((q, index) => ({
        clientTempId: q.questionId, 
        serverId: q.questionId,

        questionType: q.questionType as QuestionType,

        content: q.content,

        timeLimit: q.timeLimit ?? 30,
        score: q.score ?? 100,
        orderIndex: q.orderIndex ?? index,

        imageUrl: q.imageUrl,

        answers: q.answers?.map((a) => ({
          clientTempId: a.answerId, 
          serverId: a.answerId,
          content: a.content,
          isCorrect: a.isCorrect,
        })),

        blanks: q.blanks?.map((b) => ({
          clientTempId: b.answerId, 
          serverId: b.answerId,
          blankIndex: b.blankIndex,
          acceptedAnswers: b.acceptedAnswers,
        })),

         status: "published" as QuestionStatus ,
      })) ?? [],

    status: "published",
  };
}
     

