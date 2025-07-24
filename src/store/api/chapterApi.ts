import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chapterApi = createApi({
  reducerPath: 'chapterApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8001/api',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    createChapter: builder.mutation({
      query: (formData) => ({
        url: '/chapters',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useCreateChapterMutation } = chapterApi; 