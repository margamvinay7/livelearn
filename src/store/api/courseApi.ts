import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Chapter {
  id: string;
  title: string;
  videoUrl: string | null;
}

export interface Course {
  id?: string;
  title: string;
  category: string;
  level: string;
  instructor: string;
  duration: string;
  price: string;
  description: string;
  poster?: File | null;
  chapters: Chapter[];
}

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8001/api',credentials:'include' }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (formData) => ({
        url: '/courses',
        method: 'POST',
        body: formData,
      }),
    }),
    getAllCourses: builder.query({
      query: (params) => ({
        url: '/courses',
        method: 'GET',
        params,
      }),
    }),
    getCourseById: builder.query<Course,string>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useCreateCourseMutation, useGetAllCoursesQuery, useGetCourseByIdQuery } = courseApi; 