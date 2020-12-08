import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Fab
} from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';

import { toggleHobbiesModalOpened } from '../../redux/modal/modal.actions';

const HobbiesModal = () => {
  const { isHobbiesModalOpened } = useSelector(state => state.modal);

  const dispatch = useDispatch();

  const handleClose = () => dispatch(toggleHobbiesModalOpened());

  return (
    <Dialog open={isHobbiesModalOpened} onClose={handleClose}>
      <DialogTitle>Choose your hobbies</DialogTitle>
      <DialogContent>
        <FormControlLabel
          control={
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              name='books'
            />
          }
          label='Books'
        />
        <FormControlLabel
          control={
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              name='music'
            />
          }
          label='Music'
        />
        <FormControlLabel
          control={
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              name='travel'
            />
          }
          label='Travel'
        />
      </DialogContent>
      <DialogActions>
        <Fab onClick={handleClose} color='primary' variant='extended'>
          Save
        </Fab>
        <Fab onClick={handleClose} variant='extended'>
          Cancel
        </Fab>
      </DialogActions>
    </Dialog>
  );
};

export default HobbiesModal;
