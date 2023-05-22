import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

interface AuthState {
  auth: boolean;
  username: string;
}

const initialState: AuthState = {
  auth: false,
  username: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setAuth } = authSlice.actions;
export const { setUsername } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth.auth;
export const selectUsername = (state: RootState) => state.auth.username;

export default authSlice.reducer;
