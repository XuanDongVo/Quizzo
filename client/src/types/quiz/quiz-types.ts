import { CollectionResponse } from "../collection/collection-type";
import { QuestionResponse } from "./question-type";

export type QuestionStatus = "draft" | "complete";

export type QuestionType =
  | "single-choice"
  | "multiple-choice"
  | "true-false"
  | "fill-blank";

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
  collectionResponse: CollectionResponse;
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
  collectionResponse: { id: "", name: "" },
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
    case "single-choice":
      return {
        ...base,
        answers: [
          { clientTempId: crypto.randomUUID(), content: "", isCorrect: true },
          { clientTempId: crypto.randomUUID(), content: "", isCorrect: false },
          { clientTempId: crypto.randomUUID(), content: "", isCorrect: false },
          { clientTempId: crypto.randomUUID(), content: "", isCorrect: false },
        ],
      };

    case "multiple-choice":
      return {
        ...base,
        answers: [
          { clientTempId: crypto.randomUUID(), content: "", isCorrect: false },
          { clientTempId: crypto.randomUUID(), content: "", isCorrect: false },
          { clientTempId: crypto.randomUUID(), content: "", isCorrect: false },
          { clientTempId: crypto.randomUUID(), content: "", isCorrect: false },
        ],
      };

    case "true-false":
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

    case "fill-blank":
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
  "single-choice": "Single Choice",
  "multiple-choice": "Multiple Choice",
  "true-false": "True / False",
  "fill-blank": "Fill in the Blank",
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
  id: string;
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
