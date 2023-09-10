// Import necessary modules and types
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TActionSlice, TUpdateTextShowed, IModel } from '../../types';

// Initialize the initial state as an empty array
const initialState: IModel[] = [];

// Define a function to create a custom Redux Toolkit slice
export const createCustomSlice = (name: string) => {
  const {
    // Destructure the actions and reducer from createSlice
    actions: { add, remove, completeStatus, reorder, update, updateTextShowed },
    reducer,
  } = createSlice({
    name, // Specify the name of the slice
    initialState, // Use the initial state defined above
    reducers: {
      // Define the 'add' action
      add: {
        reducer: (state, action: PayloadAction<IModel>) => {
          state.push(action.payload); // Add the new todo to the state
        },
        prepare: (text: string) => ({
          payload: {
            id: uuidv4(), // Generate a unique ID for the new todo
            text, // Assign the text from the action parameter
            isFinished: false, // Initialize 'isFinished' as false
            createdAt: new Date().toLocaleString(), // Set the creation timestamp
            isTextShowed: false, // Initialize 'isTextShowed' as false
          } as IModel,
        }),
      },
      // Define the 'update' action
      update(state, action) {
        // Splice the state to update the todo at the specified destination index
        state.splice(
          action.payload.destination.index,
          0,
          action.payload.filterState
        );
      },
      // Define the 'remove' action
      remove(state, action: PayloadAction<string>) {
        // Find the index of the todo to be removed by its ID
        const index = state.findIndex(({ id }) => id === action.payload);
        // Remove the todo from the state
        state.splice(index, 1);
      },
      // Define the 'completeStatus' action
      completeStatus(state, action: PayloadAction<TActionSlice>) {
        // Find the index of the todo to be updated by its ID
        const index = state.findIndex(({ id }) => id === action.payload.id);
        // Update 'isFinished' and 'updatedAt' properties of the todo
        state[index].isFinished = action.payload.isFinished;
        state[index].updatedAt = action.payload.updatedAt;
      },
      // Define the 'updateTextShowed' action
      updateTextShowed(state, action: PayloadAction<TUpdateTextShowed>) {
        // Find the index of the todo to be updated by its ID
        const index = state.findIndex(({ id }) => id === action.payload.id);
        // Update 'isTextShowed' property of the todo
        state[index].isTextShowed = action.payload.isTextShowed;
      },
      // Define the 'reorder' action
      reorder(state, action) {
        // Remove an item from the source index and insert it at the destination index
        const [removed] = state.splice(action.payload.source.index, 1);
        state.splice(action.payload.destination.index, 0, removed);
      },
    },
  });

  // Return an object containing actions and the reducer
  return {
    actions: { add, remove, completeStatus, reorder, update, updateTextShowed },
    reducer,
  };
};

// Explanation:

// Import Statements:

// The code starts by importing necessary modules and types from Redux Toolkit, UUID for generating unique IDs, and custom types from an external file (../../types).
// Initial State:

// It initializes the initial state (initialState) as an empty array of IModel objects. This will be the initial state of the Redux slice.
// createCustomSlice Function:

// This function takes a name parameter and returns an object containing action creators and a reducer for a custom Redux Toolkit slice.
// Inside createSlice:

// It uses the createSlice function to define the Redux slice, specifying the name and initialState.
// Actions and Reducers:

// The code defines several actions and reducers for managing todo items within this slice.

// Each action has a unique name and defines a reducer function or logic for updating the state when the action is dispatched.

// add: Adds a new todo item to the state with a unique ID, text, creation timestamp, and default properties.

// update: Updates the state by splicing the todo item at the specified destination index.

// remove: Removes a todo item from the state based on its ID.

// completeStatus: Updates the completion status and updatedAt timestamp of a todo item.

// updateTextShowed: Updates the isTextShowed property of a todo item.

// reorder: Reorders todo items by removing and inserting items based on the source and destination indices.

// Returning Actions and Reducer:

// The function returns an object containing the action creators (add, remove, completeStatus, reorder, update, updateTextShowed) and the reducer. These can be used to interact with this Redux slice in your application.
// This code defines a custom Redux Toolkit slice for managing todo items with various actions and reducers, providing a structured way to handle todo-related state and actions in your application.
