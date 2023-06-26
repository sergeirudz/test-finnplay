import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface UserState {
  logged_in: boolean;
  username?: string;
  access_token: string;
  refresh_token: string;
}

const initialState: UserState = {
  logged_in: false,
  username: '',
  access_token: '',
  refresh_token: '',
};

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    logout: () => initialState,
    setAuth: (state, action: PayloadAction<UserState>) => {
      state.logged_in = action.payload.logged_in;
      state.username = action.payload.username;
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
    },
  },
});

export default userSlice.reducer;

export const { logout, setAuth } = userSlice.actions;

export const selectUsername = (state: RootState) => state.user.username;
export const selectLoggedIn = (state: RootState) => state.user.logged_in;
export const selectAccessToken = (state: RootState) => state.user.access_token;
export const selectRefreshToken = (state: RootState) =>
  state.user.refresh_token;
