// Import Statements: In this section, various imports are made from different modules.
// configureStore: This function is imported from @reduxjs/toolkit and is used to create a Redux store with a set of pre-configured options.
// combineReducers: This function is also imported from @reduxjs/toolkit and is used to combine multiple reducer functions into a single reducer.

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { doneSlice } from '../features/slice/done';
import { inProgressSlice } from '../features/slice/inProgress';
import { todoSlice } from '../features/slice/todo';

// Creating the Redux Store:
// This code defines a Redux store named store.
// The configureStore function is called with an object that specifies the store configuration.
// Inside the configuration object, the reducer key is set to the result of combineReducers.
// combineReducers is used to combine multiple reducer functions into a single reducer. In this case, three reducers are combined: doneSlice.reducer, inProgressSlice.reducer, and todoSlice.reducer.
// Each of these reducers corresponds to a different slice of the Redux store, and they will handle different parts of the application's state.

export const store = configureStore({
  reducer: combineReducers({
    done: doneSlice.reducer,
    inProgress: inProgressSlice.reducer,
    todo: todoSlice.reducer,
  }),
});

// Type Definitions:
// These lines define TypeScript types that provide type safety when working with the Redux store and dispatch.

// RootState is defined as the type of store.dispatch, which represents the action dispatch function.

// AppDispatch is defined as the type of store.getState, which represents the state of the Redux store.
export type RootState = typeof store.dispatch;
export type AppDispatch = ReturnType<typeof store.getState>;
