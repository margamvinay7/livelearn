import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from './authApi' // Re-use the User type

export interface Instructor {
  id: string
  bio?: string
  department?: string
  skills?: string[]
  user: {
    name: string
    email: string
  }
  courses: {
    id: string
    title: string
    imageUrl?: string
  }[]
}

// Define a type for the data needed to create an instructor
export type CreateInstructorInput = Pick<User, 'name' | 'email'> & {
  password?: string;
  bio?: string;
  department?: string;
  designation?: string;
  experience?: string;
  skills?: string[];
  avatar?: string;
};


export const instructorApi = createApi({
  reducerPath: 'instructorApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://lmsserver-u6hs.onrender.com/api',
    credentials: 'include',
  }),
  tagTypes: ['Instructor'],
  endpoints: builder => ({
    getInstructors: builder.query<Instructor[], void>({
      query: () => '/instructors',
      providesTags: (result) => 
        result 
          ? [...result.map(({ id }) => ({ type: 'Instructor' as const, id })), { type: 'Instructor', id: 'LIST' }]
          : [{ type: 'Instructor', id: 'LIST' }]
    }),
    getInstructor: builder.query<Instructor, string>({
      query: id => `/instructors/${id}`,
      providesTags: (result, error, id) => [{ type: 'Instructor', id }],
    }),
    updateInstructorProfile: builder.mutation<void, Partial<Instructor>>({
      query: (data) => ({
        url: '/instructors/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Instructor', id }],
    }),
    createInstructor: builder.mutation<User, CreateInstructorInput>({
      query: (instructorData) => ({
        url: '/users',
        method: 'POST',
        body: { ...instructorData, role: 'INSTRUCTOR' },
      }),
      invalidatesTags: [{ type: 'Instructor', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetInstructorsQuery,
  useGetInstructorQuery,
  useUpdateInstructorProfileMutation,
  useCreateInstructorMutation,
} = instructorApi 