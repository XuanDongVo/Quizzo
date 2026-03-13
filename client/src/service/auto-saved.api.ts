import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./apiConfig/baseQuery";
import { ApiResponse } from "@/types/api/base-response.type";
import {
  AutoSavedRequest,
  UpsertQuestionResponse,
} from "@/types/quiz/question-type";

// import {}

export const autoSavedApi = createApi({
  reducerPath: "autoSavedApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["auto-saved"],
  endpoints: (builder) => ({
    autoSaved: builder.mutation<
      ApiResponse<UpsertQuestionResponse[]>,
      AutoSavedRequest
    >({
      query: (body) => ({
        url: "/auto-saved",
        method: "POST",
        body,
      }),
      invalidatesTags: ["auto-saved"],
    }),
  }),
});

export const { useAutoSavedMutation } = autoSavedApi;
