import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { ToDoColumn } from './components/columns/Todo';
import { DoneColumn } from './components/columns/Done';
import { InProgressColumn } from './components/columns/InProgress';
import { todoSlice as todo } from './features/slice/todo';
import { inProgressSlice as inProgress } from './features/slice/inProgress';
import { doneSlice as done } from './features/slice/done';
import { AppDispatch } from './store/store';
import { IModel } from './types';

// Define a type for slices
type TAllSilces = 'todo' | 'inProgress' | 'done';

// Define the main App component
function App() {
  // Get the Redux dispatch function
  const dispatch = useDispatch();

  // Select data from the Redux store using useSelector
  const appState = useSelector((state: AppDispatch) => state);

  // Define a function to handle the end of a drag-and-drop operation
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const { destination, source, draggableId } = result;

    // Define an object mapping droppableIds to slices
    const allSlices = { todo, inProgress, done };

    if (destination.droppableId === source.droppableId) {
      // If the drag-and-drop occurred within the same column, reorder the items
      dispatch(
        allSlices[destination.droppableId as TAllSilces].actions.reorder(result)
      );
    } else {
      // If the drag-and-drop occurred between different columns
      const [filterState] = (
        (appState as any)[source.droppableId] as IModel[]
      ).filter(({ id }) => id === draggableId);

      // Remove the item from the source column
      dispatch(
        allSlices[source.droppableId as TAllSilces].actions.remove(draggableId)
      );

      // Add the item to the destination column with updated data
      dispatch(
        allSlices[destination.droppableId as TAllSilces].actions.update({
          ...result,
          filterState,
        })
      );
    }
  };

  // Render the main application UI
  return (
    <Container>
      <Typography textAlign="center" variant="h3" mt={3} mb={5}>
        This is a ToDo APP with Redux
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <DragDropContext onDragEnd={(res) => onDragEnd(res)}>
          <Grid item md={4}>
            <ToDoColumn />
          </Grid>
          <Grid item md={4}>
            <InProgressColumn />
          </Grid>
          <Grid item md={4}>
            <DoneColumn />
          </Grid>
        </DragDropContext>
      </Grid>
    </Container>
  );
}

export default App;

// Explanation:

// Import Statements:

// The code starts by importing various components and libraries such as Container, Grid, and Typography from Material-UI (@mui/material) for building the user interface.
// It also imports DragDropContext and DropResult from react-beautiful-dnd for implementing drag-and-drop functionality.
// useDispatch and useSelector are imported from react-redux for interacting with the Redux store.
// Various components like ToDoColumn, InProgressColumn, and DoneColumn are imported from specific paths.
// Type Declaration:

// It defines a type TAllSilces, which represents the possible values for droppableIds associated with different slices or columns.
// App Component:

// The main App component is defined. It serves as the root component of the application.
// useDispatch:

// const dispatch = useDispatch(); retrieves the Redux dispatch function, which is used to dispatch actions.
// useSelector:

// const appState = useSelector((state: RootState) => state); uses the useSelector hook to select the entire Redux state and store it in the appState variable.
// onDragEnd Function:

// const onDragEnd = (result: DropResult) => { ... } defines a function to handle the end of a drag-and-drop operation.
// It checks if there is a valid destination for the dropped item and handles actions accordingly.
// Depending on whether the drag-and-drop occurred within the same column or between different columns, it dispatches actions to update the state.
// UI Rendering:

// The component returns JSX to render the user interface.
// It uses Material-UI components for layout and styling.
// The DragDropContext component wraps the columns to enable drag-and-drop functionality.
// Columns (ToDoColumn, InProgressColumn, DoneColumn) are rendered within Grid components.
// The main title is displayed using Typography.
// Overall, this code sets up the main application component (App) and initializes drag-and-drop functionality using the react-beautiful-dnd library. It also connects to the Redux store using useDispatch and useSelector to manage and display the state of different columns in the todo application.
