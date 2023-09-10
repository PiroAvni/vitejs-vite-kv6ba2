// Import AnyAction from Redux Toolkit
import { AnyAction } from '@reduxjs/toolkit';

// Define the shape of a single todo item using an interface
export interface IModel {
  id: string;
  text: string;
  isFinished: boolean;
  createdAt?: string; // Optional property for creation timestamp
  updatedAt?: string; // Optional property for update timestamp
  isTextShowed?: boolean; // Optional property for showing text
}

// Define a type TActionSlice that excludes the 'text' property from IModel
export type TActionSlice = Omit<IModel, 'text'>;

// Define a type TUpdateTextShowed that further excludes the 'isFinished' property
export type TUpdateTextShowed = Omit<TActionSlice, 'isFinished'>;

// Define an interface IColumnLayoutProps
export interface IColumnLayoutProps {
  labelText?: string; // Optional property for label text
  addHandler: (v: string) => AnyAction; // Function to handle adding a todo
  removeHandler: (v: string) => AnyAction; // Function to handle removing a todo
  completedHandler: (v: TActionSlice) => AnyAction; // Function to handle marking a todo as completed
  selectorState: IModel[]; // Array of todo items
  droppableId: string; // Identifier for a droppable area (e.g., a column in a kanban board)
  updateTextShowed: (v: TUpdateTextShowed) => AnyAction; // Function to update 'isTextShowed' property
}
