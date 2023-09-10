import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
});

export type RootState = typeof store.dispatch;
export type AppDispatch = ReturnType<typeof store.getState>;
