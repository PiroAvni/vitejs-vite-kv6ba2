import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { doneSlice } from '../../features/slice/done';
import ColumnLayout from '../ColumnLayout';

export function DoneColumn() {
  const { done } = useSelector((state: RootState) => state);
  const {
    actions: { completeStatus, remove, add, updateTextShowed },
  } = doneSlice;

  return (
    <>
      <Typography mb={3}>All done tasks: {done.length}</Typography>
      <ColumnLayout
        droppableId="done"
        labelText="Type 'done' item"
        completedHandler={completeStatus}
        removeHandler={remove}
        addHandler={add}
        selectorState={done}
        updateTextShowed={updateTextShowed}
      />
    </>
  );
}
