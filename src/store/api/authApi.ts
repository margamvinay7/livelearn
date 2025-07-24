
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a type for the user object we expect from the API
// This should align with the new Prisma schema
export interface User {
  id: string
  name: string
  email: string
  avatar?:string
  role: 'ADMIN' | 'INSTRUCTOR' | 'STUDENT'
  studentProfile?: { id: string }
  instructor?: { id: string }
  admin?: { id: string }
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://lmsserver-u6hs.onrender.com/api',
    credentials: 'include',
  }),
  tagTypes: ['User'],
  endpoints: builder => ({
    // The `me` endpoint is now the source of truth for the logged-in user
    getUser: builder.query<User, void>({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),
    login: builder.mutation<User,{email:string,password:string}>({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    register: builder.mutation<User,unknown>({
      query: userInfo => ({
        url: '/auth/register',
        method: 'POST',
        body: userInfo,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const {
  useGetUserQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = authApi 