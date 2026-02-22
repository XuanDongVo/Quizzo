export type QuestionStatus = "draft" | "complete";

export type QuestionType =
  | "single-choice"
  | "multiple-choice"
  | "true-false"
  | "fill-blank";

export interface AnswerOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  imageUrl?: string;
  audioUrl?: string;
  options: AnswerOption[];
  timeLimit: number;
  points: number;
  order: number;
  status: QuestionStatus;
  syncStatus: "synced" | "dirty";
}

export interface QuizzData {
  id?: string;
  title: string;
  description: string;
  coverImageUrl: string;
  collection: string;
  questions: Question[];
  isPublic: boolean;
  shuffleQuestions: boolean;
  isPublicQuestion: boolean;
  showResults: boolean;
  passingScore: number;
  status?: "draft" | "published";
}

export const DEFAULT_QUIZZ: QuizzData = {
  title: "",
  description: "",
  coverImageUrl: "",
  collection: "",
  questions: [],
  isPublic: true,
  shuffleQuestions: false,
  isPublicQuestion: true,
  showResults: true,
  passingScore: 70,
};

export function createQuestion(type: QuestionType, order: number): Question {
  const id = crypto.randomUUID();

  const base = {
    id,
    type,
    text: "",
    timeLimit: 30,
    points: 10,
    order,
    status: "draft" as const,
    syncStatus: "dirty" as const,
  };

  switch (type) {
    case "single-choice":
      return {
        ...base,
        options: [
          { id: crypto.randomUUID(), text: "", isCorrect: true },
          { id: crypto.randomUUID(), text: "", isCorrect: false },
          { id: crypto.randomUUID(), text: "", isCorrect: false },
          { id: crypto.randomUUID(), text: "", isCorrect: false },
        ],
      };

    case "multiple-choice":
      return {
        ...base,
        options: [
          { id: crypto.randomUUID(), text: "", isCorrect: false },
          { id: crypto.randomUUID(), text: "", isCorrect: false },
          { id: crypto.randomUUID(), text: "", isCorrect: false },
          { id: crypto.randomUUID(), text: "", isCorrect: false },
        ],
      };

    case "true-false":
      return {
        ...base,
        options: [
          { id: crypto.randomUUID(), text: "True", isCorrect: true },
          { id: crypto.randomUUID(), text: "False", isCorrect: false },
        ],
      };

    case "fill-blank":
      return {
        ...base,
        options: [{ id: crypto.randomUUID(), text: "", isCorrect: true }],
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
export interface QuizzInfoRequest {
  id?: string 
  name: string
  description?: string
  imageUrl?: string
  collection?: string | null
  visibilityQuiz: boolean
  visibilityQuestion: boolean
  shuffle: boolean
  showResults: boolean
}
export interface QuizzInfoResponse {
  quizzId: string
  name: string
  description?: string
  imageUrl?: string
  collectionName?: string
  visibilityQuiz: boolean
  visibilityQuestion: boolean
  shuffle: boolean
  showResults: boolean
}

