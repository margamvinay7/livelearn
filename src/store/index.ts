import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './api/authApi'
import { instructorApi } from './api/instructorApi'
import { studentApi } from './api/studentApi'
import { courseApi } from './api/courseApi'; // Import the new courseApi
import { chapterApi } from './api/chapterApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [instructorApi.reducerPath]: instructorApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer, // Add the new courseApi reducer
    [chapterApi.reducerPath]: chapterApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      instructorApi.middleware,
      studentApi.middleware,
      courseApi.middleware, // Add the new courseApi middleware
      chapterApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 