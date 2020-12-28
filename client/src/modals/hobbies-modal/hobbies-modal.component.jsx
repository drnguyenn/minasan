import React, { useEffect, useState } from 'react';
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
import {
  getCurrentUse,
  fetchHobbyStart,
  updateProfileStart
} from '../../redux/user/user.actions';

const HobbiesModal = () => {
  const [chosenList, setChosenList] = useState([]);
  const { isHobbiesModalOpened } = useSelector(state => state.modal);
  const { hobbyList } = useSelector(state => state.user);

  const dispatch = useDispatch();
  const handleClose = () => dispatch(toggleHobbiesModalOpened());

  const handleSubmit = async event => {
    event.preventDefault();

    dispatch(
      updateProfileStart({
        hobbyIds: chosenList
      })
    );
    dispatch(getCurrentUser());
    setChosenList([]);
    dispatch(toggleHobbiesModalOpened());
  };

  useEffect(() => {
    dispatch(fetchHobbyStart());
  }, [dispatch]);

  return (
    <Dialog open={isHobbiesModalOpened} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Choose your hobbies</DialogTitle>
        <DialogContent>
          {hobbyList.map(hobby => (
            <FormControlLabel
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  name={hobby.name}
                  onClick={() => {
                    let chosen = chosenList;
                    const index = chosen.indexOf(hobby.id);
                    if (index === -1) {
                      chosen.push(hobby.id);
                    } else {
                      chosen.splice(index, 1);
                    }
                    setChosenList(chosen);
                  }}
                />
              }
              label={hobby.name
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.substring(1))
                .join(' ')}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Fab type='submit' color='primary' variant='extended'>
            Save
          </Fab>
          <Fab onClick={handleClose} variant='extended'>
            Cancel
          </Fab>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default HobbiesModal;
