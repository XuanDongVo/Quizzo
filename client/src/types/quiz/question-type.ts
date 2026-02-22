import { QuestionType } from "./quiz-types"

// Create Answer Request
export interface CreateAnswerRequest {
  answerId?: string
  content: string
  isCorrect?: boolean
}

// Fill Blank Answer Request
export interface FillBlankAnswerRequest {
  answerId?: string
  blankIndex: number
  acceptedAnswers: string
}

// Question Request
export interface QuestionRequest {
  questionId?: string
  questionType: QuestionType
  content: string
  timeLimit?: number
  score?: number
  orderIndex?: number

  // image, audio, video
  url?: string

  // choice
  answers?: CreateAnswerRequest[]

  // fill blank
  blanks?: FillBlankAnswerRequest[]
}

// Create Question Request
export interface CreateQuestionRequest {
  quizId: string
  questionRequest: QuestionRequest[]
}

// Answer Response
export interface AnswerResponse {
  answerId: string
  content: string
  isCorrect: boolean
}

// Fill Blank Response
export interface FillBlankAnswerResponse {
  answerId: string
  blankIndex: number
  acceptedAnswers: string
}

// Create Question Response
export interface CreateQuestionResponse {
  questionId: string
  content: string

  timeLimit?: number
  score?: number
  orderIndex?: number

  imageUrl?: string

  answers?: AnswerResponse[]
  blanks?: FillBlankAnswerResponse[]
}

