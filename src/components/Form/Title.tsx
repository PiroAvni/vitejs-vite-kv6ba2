import { Box, Typography } from '@mui/material';

import Divider from '@mui/material/Divider';
export const Title = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          Add ToDo's
        </Typography>

        <Divider />
      </Box>
    </>
  );
};
