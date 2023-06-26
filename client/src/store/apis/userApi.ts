import { createApi } from '@reduxjs/toolkit/query/react';

import customFetchBase from './customFetchBase';
import { UserState } from '../slices/userSlice';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customFetchBase,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getMe: builder.query<UserState, null>({
      query() {
        return {
          url: 'users/user',
          credentials: 'include',
        };
      },
    }),
  }),
});
