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
import { StoreState } from './store/store';
import { IModel } from './types';
c;
type TAllSilces = 'todo' | 'inProgress' | 'done';

function App() {
  const dispatch = useDispatch();
  const appState = useSelector((state: StoreState) => state);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const { destination, source, draggableId } = result;
    const allSlices = { todo, inProgress, done };

    if (destination.droppableId === source.droppableId) {
      dispatch(
        allSlices[destination.droppableId as TAllSilces].actions.reorder(result)
      );
    } else {
      const [filterState] = (
        (appState as any)[source.droppableId] as IModel[]
      ).filter(({ id }) => id === draggableId);

      dispatch(
        allSlices[source.droppableId as TAllSilces].actions.remove(draggableId)
      );
      dispatch(
        allSlices[destination.droppableId as TAllSilces].actions.update({
          ...result,
          filterState,
        })
      );
    }
  };

  return (
    <Container>
      <Typography textAlign="center" variant="h3" mt={3} mb={5}>
        This is a ToDo APP with Redux
      </Typography>{' '}
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
