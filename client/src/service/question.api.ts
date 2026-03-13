import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./apiConfig/baseQuery";
import { ApiResponse } from "@/types/api/base-response.type";
import {
  CreateQuestionRequest,
  UpsertQuestionResponse,
} from "@/types/quiz/question-type";

export const questionApi = createApi({
  reducerPath: "questionApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Question"],
  endpoints: (builder) => ({

    addQuestion: builder.mutation<
      ApiResponse<UpsertQuestionResponse[]>,
      CreateQuestionRequest
    >({
      query: (body) => ({
        url: "/question/add-question",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Question"],
    }),

    updateQuestion: builder.mutation<
      ApiResponse<UpsertQuestionResponse[]>,
      CreateQuestionRequest
    >({
      query: (body) => ({
        url: "/question/update-question", 
        method: "POST",
        body,
      }),
      invalidatesTags: ["Question"],
    }),

    deleteQuestion: builder.mutation<
      ApiResponse<void>,
      string
    >({
      query: (questionId) => ({
        url: `/question/delete-question/${questionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Question"],
    }),

  }),
});

export const {
  useAddQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = questionApi;
