import { Fab, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const AddButton = () => {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Box>
  );
};
