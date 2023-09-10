import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { inProgressSlice } from '../../features/slice/inProgress';
import ColumnLayout from '../ColumnLayout';

export function InProgressColumn() {
  const { inProgress } = useSelector((state: AppDispatch) => state);

  const {
    actions: { completeStatus, remove, add, updateTextShowed },
  } = inProgressSlice;

  return (
    <>
      <Typography mb={3}>All inProgress tasks: {inProgress.length}</Typography>
      <ColumnLayout
        droppableId="inProgress"
        labelText="Type 'in progress' item"
        completedHandler={completeStatus}
        removeHandler={remove}
        addHandler={add}
        selectorState={inProgress}
        updateTextShowed={updateTextShowed}
      />
    </>
  );
}
