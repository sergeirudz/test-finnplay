import { createApi } from '@reduxjs/toolkit/query/react';

import customFetchBase from './customFetchBase';
import { IUser } from './types';
import { UserState, setAuth } from '../slices/userSlice';

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
      // transformResponse: (result: { data: { user: IUser } }) =>
      //   result.data.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // await dispatch(setAuth(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});
