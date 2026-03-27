import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./apiConfig/baseQuery";
import { ApiResponse } from "@/types/api/base-response.type";
import { AvailableCollectionsResponse } from "@/types/collection/collection-type";


export const collectionApi = createApi({
  reducerPath: "collectionApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Collection"],
  endpoints: (builder) => ({
    getAvailableCollections: builder.query<ApiResponse<AvailableCollectionsResponse>, void>({
      query: () => "/collection/available-collections",
      providesTags: ["Collection"],
    }),
  }),
});

export const { useGetAvailableCollectionsQuery } = collectionApi;