import { CollectionResponse } from "../collection/collection-type";
import { QuestionResponse } from "./question-type";

export type QuestionStatus = "draft" | "complete";

export const QUESTION_TYPES = {
  SINGLE_CHOICE: "SINGLE_CHOICE",
  MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
  TRUE_FALSE: "TRUE_FALSE",
  FILL_BLANK: "FILL_BLANK",
} as const;

export type QuestionType =
  (typeof QUESTION_TYPES)[keyof typeof QUESTION_TYPES];

export interface AnswerOption {
  clientTempId: string;
  serverId?: string;
  content: string;
  isCorrect: boolean;
}
export interface FillBlankOption {
  clientTempId: string;
  serverId?: string;
  blankIndex: number;
  acceptedAnswers: string;
}

export interface Question {
  clientTempId: string;
  serverId?: string;
  questionType: QuestionType;

  content: string;
  timeLimit: number;
  score: number;
  orderIndex: number;

  imageUrl?: string;
  audioUrl?: string;
  answers?: AnswerOption[];
  blanks?: FillBlankOption[];

  status: QuestionStatus;
}

export interface QuizzData {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  collectionResponse?: CollectionResponse;
  questions: Question[];
  isPublic: boolean;
  shuffleQuestions: boolean;
  isPublicQuestion: boolean;
  showResults: boolean;
  passingScore: number;
  status?: "draft" | "published";
}

export const DEFAULT_QUIZZ: QuizzData = {
  id: "",
  title: "",
  description: "",
  coverImageUrl: "",
  collectionResponse: undefined,
  questions: [],
  isPublic: true,
  shuffleQuestions: false,
  isPublicQuestion: true,
  showResults: true,
  passingScore: 70,
};

export function createQuestion(
  type: QuestionType,
  orderIndex: number,
): Question {
  const tempId = crypto.randomUUID();

  const base: Question = {
    clientTempId: tempId,
    questionType: type,
    content: "",
    timeLimit: 30,
    score: 10,
    orderIndex,
    status: "draft",
  };

  switch (type) {
    case QUESTION_TYPES.SINGLE_CHOICE:
      return {
        ...base,
        answers: [
          { clientTempId: crypto.randomUUID(), content: "", isCorrect: true },
          { clientTempId: crypto.randomUUID(), content: "", isCorrect: false },
          { clientTempId: crypto.randomUUID(), content: "", isCorrect: false },
          { clientTempId: crypto.randomUUID(), content: "", isCorrect: false },
        ],
      };

    case QUESTION_TYPES.MULTIPLE_CHOICE:
      return {
        ...base,
        answers: [
          { clientTempId: crypto.randomUUID(), content: "", isCorrect: true },
          { clientTempId: crypto.randomUUID(), content: "", isCorrect: false },
          { clientTempId: crypto.randomUUID(), content: "", isCorrect: false },
          { clientTempId: crypto.randomUUID(), content: "", isCorrect: false },
        ],
      };

    case QUESTION_TYPES.TRUE_FALSE:
      return {
        ...base,
        answers: [
          {
            clientTempId: crypto.randomUUID(),
            content: "True",
            isCorrect: true,
          },
          {
            clientTempId: crypto.randomUUID(),
            content: "False",
            isCorrect: false,
          },
        ],
      };

    case QUESTION_TYPES.FILL_BLANK:
      return {
        ...base,
        blanks: [
          {
            clientTempId: crypto.randomUUID(),
            blankIndex: 0,
            acceptedAnswers: "",
          },
        ],
      };
  }
}

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  [QUESTION_TYPES.SINGLE_CHOICE]: "Single Choice",
  [QUESTION_TYPES.MULTIPLE_CHOICE]: "Multiple Choice",
  [QUESTION_TYPES.TRUE_FALSE]: "True / False",
  [QUESTION_TYPES.FILL_BLANK]: "Fill in the Blank",
};

export const COLLECTIONS = [
  "General Knowledge",
  "Science",
  "Mathematics",
  "History",
  "Geography",
  "Language",
  "Art & Culture",
  "Technology",
  "Sports",
  "Entertainment",
];

export interface CreateQuizzRequest {
  title: string;
}
export interface QuizzInfoRequest {
  title: string;
  description?: string;
  imageUrl?: string;
  collectionId?: string | null;
  visibilityQuiz: boolean;
  visibilityQuestion: boolean;
  shuffle: boolean;
  showResults: boolean;
}
export interface QuizzInfoResponse {
  quizzId: string;
  title: string;
  description?: string;
  imageUrl?: string;
  collectionResponse?: CollectionResponse;
  visibilityQuiz: boolean;
  visibilityQuestion: boolean;
  shuffle: boolean;
  showResults: boolean;
}

export interface  QuizzResponse {
  quizzInfoResponse: QuizzInfoResponse;
  questions: QuestionResponse[];
}
