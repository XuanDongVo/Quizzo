import { QuestionType } from "./quiz-types";

export interface AutoSavedRequest {
  listCreateQuestion: CreateQuestionRequest;
  deletedQuestionIds: string[];
}
export interface CreateQuestionRequest {
  quizId: string;
  questionRequest: QuestionRequest[];
}

export interface QuestionRequest {
  questionId?: string;
  clientTempId?: string;
  questionType: QuestionType;
  content: string;
  timeLimit?: number;
  score?: number;
  orderIndex?: number;
  url?: string;
  answers?: CreateAnswerRequest[];
  blanks?: FillBlankAnswerRequest[];
}

export interface CreateAnswerRequest {
  clientTempId?: string;
  answerId?: string;
  content: string;
  isCorrect?: boolean;
}

export interface FillBlankAnswerRequest {
  clientTempId?: string;
  answerId?: string;
  blankIndex: number;
  acceptedAnswers: string;
}

// Answer Response
export interface AnswerResponse {
  answerId: string;
  content: string;
  isCorrect: boolean;
}

// Fill Blank Response
export interface FillBlankAnswerResponse {
  answerId: string;
  blankIndex: number;
  acceptedAnswers: string;
}

// Create Question Response
export interface QuestionResponse {
  questionId: string;
  content: string;
  questionType: QuestionType;

  timeLimit?: number;
  score?: number;
  orderIndex?: number;

  imageUrl?: string;

  answers?: AnswerResponse[];
  blanks?: FillBlankAnswerResponse[];
}

// Upsert Answer Response (mapping tempId -> realId)
export interface UpsertAnswerResponse {
  clientTempId?: string;
  answerId: string;
}

// Upsert Fill Blank Response
export interface UpsertFillBlankResponse {
  clientTempId?: string;
  answerId: string;
}

// Upsert Question Response
export interface UpsertQuestionResponse {
  clientTempId?: string;
  questionId: string;

  answers?: UpsertAnswerResponse[];
  blanks?: UpsertFillBlankResponse[];
}

