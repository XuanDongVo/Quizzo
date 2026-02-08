import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import {
  LoginFormValues,
  SignupFormValues,
} from "@/features/auth/schemas/auth.schema";
import { LoginResponse } from "@/types/auth/auth-response.type";
import { ApiResponse } from "@/types/api/base-response.type";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    checkUserNameAvailability: builder.query<
      ApiResponse<null>,
      { username: string }
    >({
      query: (params) => ({
        url: `/auth/check-username`,
        params,
      }),
    }),

    login: builder.mutation<ApiResponse<LoginResponse>, LoginFormValues>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    register: builder.mutation<ApiResponse<null>, SignupFormValues>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),

    refresh: builder.mutation<ApiResponse<LoginResponse>, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
    }),

    logout: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCheckUserNameAvailabilityQuery,
  useLoginMutation,
  useRegisterMutation,
  useRefreshMutation,
  useLogoutMutation,
} = authApi;
