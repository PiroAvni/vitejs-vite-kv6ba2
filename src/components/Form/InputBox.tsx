import {
  AppBar,
  Box,
  TextField,
  FormControl,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';

import { AddButton } from '../Form/AddButton';

export const TodoInputBox = () => {
  return (
    <>
      <Box
        sx={{
          width: 500,
          maxWidth: '100%',
          py: '40px',
        }}
      >
        <FormControl fullWidth sx={{ display: 'flex', alignItems: 'left' }}>
          <TextField
            autoFocus
            margin="normal"
            id="name"
            label="Add your ToDo"
            type="text"
            fullWidth
            //  inputRef={nameRef}
            inputProps={{ minLength: 2 }}
            required
            multiline
            maxRows={4}
          />
          <AddButton />
        </FormControl>
      </Box>
     
    </>
  );
};
