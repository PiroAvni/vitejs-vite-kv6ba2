import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useDispatch } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { RootState } from '../store/store';
import { IColumnLayoutProps } from '../types';

// Function Component Declaration:
// This code defines a functional component named ColumnLayout, which takes an object of props with the following properties: labelText, addHandler, removeHandler, completedHandler, selectorState, droppableId, and updateTextShowed.

const ColumnLayout: React.FC<IColumnLayoutProps> = ({
  labelText,
  addHandler,
  removeHandler,
  completedHandler,
  selectorState,
  droppableId,
  updateTextShowed,
}) => {
  //   State Management with useState:
  // This code initializes a state variable isError using the useState hook. isError is an object with two properties: isShow and text. It's used to manage error messages and their visibility.
  const [isError, setIsError] = useState({
    isShow: false,
    text: '',
  });

  // More State and useDispatch:
  // This code initializes another state variable textDescription, which will be used to capture text input from the user.
  // It also retrieves the dispatch function from the Redux store using useDispatch. The type AppDispatch is used to specify the type of actions that can be dispatched.
  const [textDescription, setTextDescription] = useState('');

  const dispatch = useDispatch<RootState>();

  //   Input Change Handler:
  // This function (handleOnChange) is called when the user types in the input field.
  // It updates the textDescription state with the current input value.
  // It also checks the length of the input and updates the isError state to show an error message if the input exceeds 200 characters.
  const handleOnChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setTextDescription(value);

    setIsError({
      isShow: value.length > 200,
      text:
        value.length > 200
          ? 'The input value cannot be more than 200 characters'
          : '',
    });
  };

  //   Input Blur Handler:
  // This function (handleOnBlur) is called when the input field loses focus.
  // It sets isError.isShow to false, hiding any error message that might have been displayed.
  const handleOnBlur = () => {
    setIsError({ ...isError, isShow: false });
  };

  //   Button Click Handler:
  // This function (handleOnClick) is called when the "Add Item" button is clicked.
  // It checks if there are no errors (!isError.isShow) before dispatching the addHandler action with the textDescription and then clears the input field.
  const handleOnClick = () => {
    if (!isError.isShow) {
      dispatch(addHandler(textDescription));
      setTextDescription('');
    }
  };

  //   Input Key Down Handler:
  // This function (handleInputKeyDown) is called when a key is pressed while the input field is in focus.
  // It checks if the pressed key is 'Enter'.
  // If 'Enter' is pressed and the input is not empty and within the character limit (200), it calls handleOnClick.
  // If the input is empty or exceeds the character limit, it shows an error message.
  const handleInputKeyDown = ({
    target,
    key,
  }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      if (
        (target as HTMLInputElement).value.length > 0 &&
        (target as HTMLInputElement).value.length <= 200
      ) {
        handleOnClick();
      } else {
        setIsError({
          isShow: true,
          text: 'The input value cannot be empty',
        });
      }
    }
  };

  return (
    <Box borderRadius={1} width="100%" sx={{ boxShadow: 2, p: 3 }}>
      <TextField
        fullWidth
        label={labelText}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onKeyDown={handleInputKeyDown}
        value={textDescription}
        variant="outlined"
        size="small"
      />

      <Collapse in={isError.isShow}>
        <Alert severity="error" sx={{ my: 1 }}>
          {isError.text}
        </Alert>
      </Collapse>

      <Box width="100%" display="flex" justifyContent="center">
        <Button
          size="medium"
          sx={{ my: 1, maxWidth: 200 }}
          variant="outlined"
          color="primary"
          fullWidth
          onClick={handleOnClick}
          onKeyDown={({ key }) => key === 'Enter' && handleOnClick()}
          disabled={
            textDescription.length === 0 || textDescription.length > 200
          }
        >
          Add Item
        </Button>
      </Box>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <List
            sx={{
              minHeight: '300px',
              li: {
                flexDirection: 'column',
              },
              '& .MuiListItemText-root': {
                width: '100%',
              },
            }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {selectorState.map(
              (
                { id, text, isFinished, createdAt, updatedAt, isTextShowed },
                index: number
              ) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided, snapshot) => (
                    <ListItem
                      sx={{
                        transition: '.3s ease background-color',
                        color: snapshot.isDragging ? '#fff' : '#000',
                        bgcolor: snapshot.isDragging ? '#000' : '#fff',
                        position: 'relative',
                        border: '1px solid #989898',
                        my: 1,
                        borderRadius: '3px',
                        '& .MuiTypography-root': {
                          display: 'flex',
                          alignItems: 'center',
                        },
                      }}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ListItemText
                        sx={{
                          textDecoration: isFinished ? 'line-through' : 'none',
                          wordBreak: 'break-word',
                        }}
                      >
                        <IconButton
                          sx={{ p: 1, mr: 1 }}
                          onClick={() =>
                            dispatch(
                              updateTextShowed({
                                id,
                                isTextShowed: !isTextShowed,
                              })
                            )
                          }
                        >
                          <ArrowDownwardIcon
                            sx={{
                              color: snapshot.isDragging ? '#fff' : '#000',
                              transform: !isTextShowed ? 'rotate(180deg)' : '',
                            }}
                          />
                        </IconButton>

                        <Box
                          component="span"
                          width="100%"
                          position="absolute"
                          top="0"
                          fontSize=".7rem"
                        >
                          {updatedAt ? 'Updated' : 'Created'} at:{' '}
                          {updatedAt || createdAt}
                        </Box>

                        <Box component="span" width="100%">
                          {text}
                        </Box>

                        <Box display="flex" component="span">
                          <IconButton
                            onClick={() => dispatch(removeHandler(id))}
                          >
                            <DeleteIcon
                              sx={{
                                color: snapshot.isDragging ? '#fff' : '#000',
                              }}
                            />
                          </IconButton>
                          <Checkbox
                            edge="end"
                            value={isFinished}
                            checked={isFinished}
                            inputProps={{ 'aria-label': 'controlled' }}
                            onChange={() =>
                              dispatch(
                                completedHandler({
                                  isFinished: !isFinished,
                                  id,
                                  updatedAt: new Date().toLocaleString(),
                                })
                              )
                            }
                          />
                        </Box>
                      </ListItemText>
                      <Collapse in={isTextShowed}>
                        You can add here some content{' '}
                        <span role="img" aria-label="emoji">
                          😍
                        </span>
                      </Collapse>
                    </ListItem>
                  )}
                </Draggable>
              )
            )}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </Box>
  );
};

export default ColumnLayout;
