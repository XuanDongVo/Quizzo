import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./apiConfig/baseQuery";
import { CreateQuizzRequest, QuizzInfoResponse, QuizzInfoRequest, QuizzResponse } from "@/types/quiz/quiz-types";
import { ApiResponse } from "@/types/api/base-response.type";

export const quizzApi = createApi({
  reducerPath: "quizzApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Quizz"],
  endpoints: (builder) => ({
    getQuizzById: builder.query<ApiResponse<QuizzResponse>, string>({
      query: (id) => `/quizz/${id}`,
      providesTags: (result, error, id) => [{ type: "Quizz", id }],
    }),

    createQuizz: builder.mutation<
      ApiResponse<QuizzInfoResponse>,
      CreateQuizzRequest
    >({
      query: (body) => ({
        url: "/quizz/create-quizz",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Quizz"],
    }),

    updateQuizz: builder.mutation<
      ApiResponse<QuizzInfoResponse>,
      { quizzId: String; quizzInfoRequest: QuizzInfoRequest }
    >({
      query: ({ quizzId, quizzInfoRequest }) => ({
        url: `/quizz/update-quizz/${quizzId}`,
        method: "PUT",
        body: quizzInfoRequest,
      }),
      invalidatesTags: ["Quizz"],
    }),

    deleteQuizz: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `quizz/delete-quizz/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quizz"],
    }),
  }),
});

export const {
  useGetQuizzByIdQuery,
  useCreateQuizzMutation,
  useUpdateQuizzMutation,
  useDeleteQuizzMutation,
} = quizzApi
