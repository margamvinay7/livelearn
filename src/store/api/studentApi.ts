import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from './authApi'

export interface StudentProfile {
  id: string;
  bio?: string;
  phone?: string;
  avatar?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const studentApi = createApi({
  reducerPath: 'studentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://lmsserver-u6hs.onrender.com/api',
    credentials: 'include',
  }),
  tagTypes: ['StudentProfile', 'StudentList'],
  endpoints: builder => ({
    getAllStudents: builder.query<StudentProfile[], void>({
      query: () => '/students',
      providesTags: ['StudentList'],
    }),
    getStudentProfile: builder.query<StudentProfile, void>({
      query: () => '/students/profile',
      providesTags: ['StudentProfile'],
    }),
    updateStudentProfile: builder.mutation<void, Partial<StudentProfile>>({
      query: (data) => ({
        url: '/students/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['StudentProfile'],
    }),
    createStudent: builder.mutation<User,Partial<User>>({
      query: (studentData) => ({
        url: '/users',
        method: 'POST',
        body: { ...studentData, role: 'STUDENT' },
      }),
      invalidatesTags: ['StudentList'],
    }),
  }),
})

export const {
  useGetAllStudentsQuery,
  useGetStudentProfileQuery,
  useUpdateStudentProfileMutation,
  useCreateStudentMutation,
} = studentApi 