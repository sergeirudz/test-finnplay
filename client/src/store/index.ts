import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import filterSlice from './slices/filterSlice';

const reducer = combineReducers({
  auth: authSlice,
  filter: filterSlice,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
