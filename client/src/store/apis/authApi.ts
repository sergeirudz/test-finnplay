import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { LoginFormValuesProps } from '../../components/LoginForm';
import { UserState, logout, setAuth } from '../slices/userSlice';
import { resetFilter } from '../slices/filterSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    loginUser: builder.mutation<UserState, LoginFormValuesProps>({
      query(data) {
        return {
          url: 'user/login',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuth(data));

          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: 'user/logout',
          credentials: 'include',
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
          dispatch(resetFilter());
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginUserMutation, useLogoutUserMutation } = authApi;
