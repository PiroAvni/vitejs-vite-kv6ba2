import { Box, Typography } from '@mui/material';
import { TodoInputBox } from '../Form/InputBox';
import Divider from '@mui/material/Divider';
import { Title } from '../Form/Title';
export const TodoForm = () => {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Title />
        <TodoInputBox />
        <Divider />
      </Box>
    </>
  );
};
