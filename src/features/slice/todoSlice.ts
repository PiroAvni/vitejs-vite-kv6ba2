import { IModel } from '../types/index.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// Define the initial state as an empty array of todo items
const initialState: IModel[] = [];

// Create a custom Redux Toolkit slice for managing todos
export const createCustomSlice = (name: string) => {
  const {
    actions: { add, remove, completeStatus, reorder, update, updateTextShowed },
    reducer,
  } = createSlice({
    name,
    initialState, // Use the initial state defined above
    reducers: {
      // Action for adding a new todo
      add: {
        reducer: (state, action: PayloadAction<IModel>) => {
          state.push(action.payload);
        },
        // Prepare function to create a new todo with a unique ID and timestamp
        prepare: (text: string) => ({
          payload: {
            id: uuidv4(), // Generate a unique ID using UUID
            text,
            isFinished: false,
            createdAt: new Date().toLocaleString(), // Add a timestamp
            isTextShowed: false,
          } as IModel,
        }),
      },
      // Action for removing a todo based on its ID
      remove: (state, action: PayloadAction<string>) => {
        return state.filter((todo) => todo.id !== action.payload);
      },
      // Action for toggling the complete status of a todo based on its ID
      completeStatus: (state, action: PayloadAction<string>) => {
        const todoToUpdate = state.find((todo) => todo.id === action.payload);
        if (todoToUpdate) {
          todoToUpdate.isFinished = !todoToUpdate.isFinished; // Toggle the status
        }
      },
      // Action for reordering todos when drag and drop is performed
      reorder: (
        state,
        action: PayloadAction<{ startIndex: number; endIndex: number }>
      ) => {
        const { startIndex, endIndex } = action.payload;
        const [movedItem] = state.splice(startIndex, 1); // Remove the item from the old position
        state.splice(endIndex, 0, movedItem); // Insert it at the new position
      },
      // Action for updating the properties of a todo
      update: (state, action: PayloadAction<IModel>) => {
        const updatedTodo = action.payload;
        const index = state.findIndex((todo) => todo.id === updatedTodo.id);
        if (index !== -1) {
          state[index] = updatedTodo; // Update the todo with the new data
        }
      },
      // Action for updating the 'isTextShowed' property of a todo
      updateTextShowed: (
        state,
        action: PayloadAction<{ id: string; isTextShowed: boolean }>
      ) => {
        const { id, isTextShowed } = action.payload;
        const todoToUpdate = state.find((todo) => todo.id === id);
        if (todoToUpdate) {
          todoToUpdate.isTextShowed = isTextShowed; // Update the property
        }
      },
    },
  });

  return {
    reducer, // The reducer function to be used in the Redux store
    actions: { add, remove, completeStatus, reorder, update, updateTextShowed }, // Action creators
  };
};

// Now, let's break down the code:

// Import Statements:

// We import the necessary functions and modules from Redux Toolkit (createSlice, PayloadAction) and the uuid library for generating unique IDs.
// Interface IModel:

// This interface defines the shape of a single todo item. It includes properties such as id, text, isFinished (indicating whether the task is completed), createdAt (timestamp when the task was created), and isTextShowed (indicating whether the full text of the task is displayed).
// Initial State:

// We define the initial state as an empty array (initialState) to hold todo items.
// createCustomSlice Function:

// This function takes a name parameter and returns an object containing a Redux slice with actions and a reducer.
// The name parameter is used to uniquely identify this slice.

// Redux Slice:

// Inside the createSlice function, we define actions and reducers for managing todos specific to this slice.
// The name parameter is used as the name of the slice.

// Action add:

// This action is used to add a new todo item to the state.
// It defines a reducer function that pushes the new todo item into the state.
// It also defines a prepare function that creates a new todo with a unique ID and timestamp based on the provided text.
// Action remove:

// This action is used to remove a todo item based on its ID.
// It uses the filter method to exclude the todo item with the specified ID from the state.
// Action completeStatus:

// This action is used to toggle the completion status of a todo item based on its ID.
// It finds the todo item by ID and toggles the isFinished property.

// Action reorder:

// This action is used for reordering todos when drag and drop is performed.
// It takes an object with startIndex and endIndex properties, indicating the old and new positions of the todo item.
// It uses splice to remove the item from the old position and insert it at the new position.

// Action update:

// This action is used to update the properties of a todo item.
// It finds the todo item by ID and updates it with the new data.
// Action updateTextShowed:

// This action is used to update the isTextShowed property of a todo item.
// It finds the todo item by ID and updates the property.
// Finally, the function returns an object with the reducer and action creators (add, remove, completeStatus, reorder, update, updateTextShowed) that can be used in your Redux store to manage todo items efficiently.
